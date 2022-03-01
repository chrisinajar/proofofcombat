import React, { useEffect, useState, useMemo } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";

import { useMeQuery } from "src/generated/graphql";
import { useDelay } from "src/hooks/use-delay";
import { DarkModeContext } from "src/hooks/use-dark-mode";
import { AppBar } from "./app-bar";
import { DelayBar } from "./delay-bar";
import { Footer } from "./footer";
import { HeroBars } from "./hero-bars";

type LayoutProps = {
  children: React.ReactChild | React.ReactChild[];
  showHero?: boolean;
};

export function Layout({
  children,
  showHero = false,
}: LayoutProps): JSX.Element {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const [timeDifference, setTimeDifference] = useState<number>(0);
  const { data } = useMeQuery({
    fetchPolicy: "network-only",
    pollInterval: 60000,
    skip: !showHero,
    onCompleted: (data) => {
      if (data?.me?.now) {
        // console.log(
        //   "Adjusting time drift to",
        //   Date.now() - Number(data?.me?.now)
        // );
        setTimeDifference(Date.now() - Number(data?.me?.now));
      }
    },
  });
  const [currentDelay, setCurrentDelay] = useDelay();
  const [currentMaxDelay, setCurrentMaxDelay] = useState<number>(0);
  const nextTime =
    Number(data?.me?.account?.nextAllowedAction ?? 0) + timeDifference;
  const now = Date.now();

  const actuallyDarkMode = darkMode === null ? prefersDarkMode : darkMode;

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: actuallyDarkMode ? "dark" : "light",
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#9c27b0",
          },
          info: {
            main: "#339cef",
          },
          error: {
            main: "#f44336",
            dark: "#621c13",
          },
          background: actuallyDarkMode
            ? {
                default: "#141414",
                paper: "#383838",
              }
            : {
                default: "#ededed",
                paper: "#ddd",
              },
        },
        shape: {
          borderRadius: 2,
        },
      }),
    [actuallyDarkMode]
  );

  useEffect(() => {
    if (currentDelay > 0) {
      const timer = setTimeout(() => {
        const newDelay = nextTime - Date.now();
        setCurrentDelay(newDelay);
      }, Math.max(50, currentDelay));

      return () => clearTimeout(timer);
    }
  }, [currentDelay]);

  useEffect(() => {
    if (!data?.me?.account?.nextAllowedAction) {
      return;
    }
    const newDelay = nextTime - now;

    if (newDelay > 0) {
      if (newDelay > currentDelay) {
        setCurrentMaxDelay(newDelay);
      }
      setCurrentDelay(newDelay);
    }
  }, [data?.me?.account?.nextAllowedAction, timeDifference]);

  if (data && showHero) {
    const {
      me: {
        now: serverNow,
        account: { hero, nextAllowedAction },
      },
    } = data;

    if (hero) {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <DarkModeContext.Provider value={[actuallyDarkMode, setDarkMode]}>
            <AppBar hero={hero} />
            <HeroBars hero={hero} />
            <DelayBar delay={currentDelay} />
            <Container>{children}</Container>
            <Footer />
          </DarkModeContext.Provider>
        </ThemeProvider>
      );
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <DarkModeContext.Provider value={[actuallyDarkMode, setDarkMode]}>
        <AppBar />
        <Container>{children}</Container>
        <Footer />
      </DarkModeContext.Provider>
    </ThemeProvider>
  );
}
