import React from "react";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import type { Hero } from "src/generated/graphql";
import { useToken } from "src/token";
import { AppBarHeroStats, AppBarHero } from "./app-bar-hero-stats";

type AppBarProps = {
  hero?: AppBarHero & Pick<Hero, "name">;
};

export function AppBar({ hero }: AppBarProps): JSX.Element {
  const router = useRouter();
  const client = useApolloClient();

  const [token, setToken] = useToken();
  function handleLogout() {
    setToken(null);
    client.clearStore();
    router.push("/");
  }

  return (
    <MuiAppBar position="static" color="primary" enableColorOnDark>
      <Toolbar>
        <Container>
          <Grid container columns={3}>
            <Grid item xs={2}>
              <Typography variant="h4">Proof of Combat</Typography>
            </Grid>
            <Grid item xs={1}>
              {hero && (
                <React.Fragment>
                  <Typography variant="h6" align="right">
                    {hero.name}
                    <br />
                    <Button
                      color="error"
                      variant="contained"
                      disableElevation
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Typography>
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
      <Container>{hero && <AppBarHeroStats hero={hero} />}</Container>
    </MuiAppBar>
  );
}
