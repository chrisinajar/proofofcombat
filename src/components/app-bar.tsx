import React, { useMemo } from "react";

import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import type { Hero } from "src/generated/graphql";
import { useDarkMode } from "src/hooks/use-dark-mode";
import { AppBarHeroStats, AppBarHero } from "./app-bar-hero-stats";
import { LogoutButton } from "./logout-button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

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
              <Grid item xs={1}>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                  {hero && (
                    <Typography variant="body1" component="p" sx={{ mr: 1 }}>
                      {hero.name} <LogoutButton />
                    </Typography>
                  )}
                  <Tooltip title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
                    <IconButton
                      size="small"
                      color="inherit"
                      aria-label={darkMode ? "toggle light mode" : "toggle dark mode"}
                      onClick={() => setDarkMode(!darkMode)}
                    >
                      {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
        <Container>{hero && <AppBarHeroStats hero={hero} />}</Container>
      </MuiAppBar>
    </ThemeProvider>
  );
}
