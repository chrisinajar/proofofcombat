import React from "react";
import Container from "@mui/material/Container";

import { useMeQuery } from "src/generated/graphql";
import { AppBar } from "./app-bar";

type LayoutProps = {
  children: JSX.Element;
  showHero: boolean;
};

export function Layout({
  children,
  showHero = false,
}: LayoutProps): JSX.Element {
  const { data } = useMeQuery({
    skip: !showHero,
  });

  if (data && showHero) {
    const {
      me: {
        account: { hero },
      },
    } = data;

    return (
      <React.Fragment>
        <AppBar hero={hero} />
        <Container>{children}</Container>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <AppBar />
      <Container>{children}</Container>
    </React.Fragment>
  );
}
