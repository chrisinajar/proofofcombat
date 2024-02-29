import React, { useMemo } from "react";

import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

import type { Hero } from "src/generated/graphql";
import { useDarkMode } from "src/hooks/use-dark-mode";
import { AppBarHeroStats, AppBarHero } from "./app-bar-hero-stats";
import { LogoutButton } from "./logout-button";
import { ThemeProvider, createTheme } from "@mui/material/styles";

type AppBarProps = {
  hero?: AppBarHero & Pick<Hero, "name">;
};

export function AppBar({ hero }: AppBarProps): JSX.Element {
  const [darkMode, setDarkMode] = useDarkMode();
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: darkMode
            ? {
                main: "#0d2b4a",
              }
            : {
                main: "#1976d2",
              },
        },
      }),
    [darkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <MuiAppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>
          <Container>
            <Grid container columns={3}>
              <Grid item xs={2}>
                <Typography variant="h4" component="p">
                  Proof of Combat
                </Typography>
              </Grid>
              <Grid item xs={1} aria-hidden="true">
                {hero && (
                  <React.Fragment>
                    <Typography variant="h6" align="right">
                      {hero.name}
                      <br />
                      <LogoutButton />
                    </Typography>
                  </React.Fragment>
                )}
                <FormGroup>
                  <Typography variant="caption" align="right">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={darkMode ?? false}
                          onChange={(e) => setDarkMode(e.target.checked)}
                        />
                      }
                      label={darkMode ? "Dark mode" : "Light mode"}
                    />
                  </Typography>
                </FormGroup>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
        <Container>{hero && <AppBarHeroStats hero={hero} />}</Container>
      </MuiAppBar>
    </ThemeProvider>
  );
}
