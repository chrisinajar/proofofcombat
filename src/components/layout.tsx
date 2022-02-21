import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";

import { useMeQuery } from "src/generated/graphql";
import { DelayContext } from "src/hooks/use-delay";
import { AppBar } from "./app-bar";
import { DelayBar } from "./delay-bar";
import { Footer } from "./footer";

type LayoutProps = {
  children: React.ReactChild | React.ReactChild[];
  showHero?: boolean;
};

export function Layout({
  children,
  showHero = false,
}: LayoutProps): JSX.Element {
  const [timeDifference, setTimeDifference] = useState<number>(0);
  const { data } = useMeQuery({
    skip: !showHero,
    onCompleted: (data) => {
      if (data?.me?.now && !timeDifference) {
        setTimeDifference(now - Number(data?.me?.now));
      }
    },
  });
  const [currentDelay, setCurrentDelay] = useState<number>(0);
  const [currentMaxDelay, setCurrentMaxDelay] = useState<number>(0);
  const nextTime =
    Number(data?.me?.account?.nextAllowedAction ?? 0) + timeDifference;
  const now = Date.now();

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
        <DelayContext.Provider value={[currentDelay, setCurrentDelay]}>
          <AppBar hero={hero} />
          <DelayBar delay={currentDelay} />
          <Container>{children}</Container>
          <Footer />
        </DelayContext.Provider>
      );
    }
  }

  return (
    <DelayContext.Provider value={[currentDelay, setCurrentDelay]}>
      <AppBar />
      <Container>{children}</Container>
      <Footer />
    </DelayContext.Provider>
  );
}
