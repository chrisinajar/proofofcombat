import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import type { Hero } from "src/generated/graphql";

export type AppBarHero = Pick<
  Hero,
  "gold" | "level" | "experience" | "combat" | "location" | "stats"
>;

export type AppBarHeroStatsProps = {
  hero: AppBarHero;
};

export function AppBarHeroStats({ hero }: AppBarHeroStatsProps): JSX.Element {
  console.log({ hero });

  return (
    <React.Fragment>
      <Grid container columns={6}>
        <Grid item lg={1} md={2} xs={3}>
          Gold: {hero.gold}
        </Grid>
        <Grid item lg={1} md={2} xs={3}>
          Level: {hero.level}
        </Grid>
        <Grid item lg={1} md={2} xs={3}>
          Experience: {hero.experience}
        </Grid>
        <Grid item lg={1} md={2} xs={3}>
          Health: {hero.combat.health} / {hero.combat.maxHealth}
        </Grid>
        <Grid item lg={1} md={2} xs={3}>
          Location: {hero.location.x}, {hero.location.y}
        </Grid>
        <Grid item lg={1} md={2} xs={3}>
          Luck: {hero.stats.luck}
        </Grid>
        <Grid item lg={1} md={2} xs={3}>
          Strength: {hero.stats.strength}
        </Grid>
        <Grid item lg={1} md={2} xs={3}>
          Dexterity: {hero.stats.dexterity}
        </Grid>
        <Grid item lg={1} md={2} xs={3}>
          Constitution: {hero.stats.constitution}
        </Grid>
        <Grid item lg={1} md={2} xs={3}>
          Intelligence: {hero.stats.intelligence}
        </Grid>
        <Grid item lg={1} md={2} xs={3}>
          Wisdom: {hero.stats.wisdom}
        </Grid>
        <Grid item lg={1} md={2} xs={3}>
          Charisma: {hero.stats.charisma}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
