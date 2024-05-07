import React, { useEffect, useState, useMemo } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
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
  const now = Date.now();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState<boolean | null>(true);
  const [timeDifference, setTimeDifference] = useState<number>(0);
  const [lastMeTime, setLastMeTime] = useState<number>(0);

  const { data, networkStatus } = useMeQuery({
    pollInterval: 60000,
    skip: !showHero,
    returnPartialData: true,
  });

  useEffect(() => {
    if (data?.me?.now) {
      const serverNow = Number(data.me.now);
      console.log("Update time drift:", now - serverNow);
      setTimeDifference(now - serverNow);
    }
  }, [data?.me?.now]);
  useEffect(() => {
    if (
      data?.me?.account?.timeRemaining &&
      data?.me?.account?.nextAllowedAction &&
      data?.me?.account?.timeRemaining > 0
    ) {
      // if we're in delay right now, correct time differences that are too large
      // the difference between nextAllowedAction and now should be at most timeRemaining
      // time difference is the clock scew between server and client
      // timeRemaining might be more than the actual remaining time, but it's never less
      const nextAllowedAction = Number(data.me.account.nextAllowedAction);
      const inferredTimeRemaining = nextAllowedAction + timeDifference - now;
      if (inferredTimeRemaining > data.me.account.timeRemaining) {
        console.log(
          "Shortening time difference by",
          inferredTimeRemaining - data.me.account.timeRemaining,
        );
        setTimeDifference(
          timeDifference -
            (inferredTimeRemaining - data.me.account.timeRemaining),
        );
      }
    }
  }, [data?.me?.account?.timeRemaining, timeDifference]);

  const [currentDelay, setCurrentDelay] = useDelay();
  const [currentMaxDelay, setCurrentMaxDelay] = useState<number>(0);
  const nextTime =
    Number(data?.me?.account?.nextAllowedAction ?? 0) + timeDifference;

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
          error: actuallyDarkMode
            ? {
                main: "#f44336",
                dark: "#621c13",
              }
            : {
                main: "#df1a0c",
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
    [actuallyDarkMode],
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
