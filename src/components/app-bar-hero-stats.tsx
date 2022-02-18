import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import type { Hero } from "src/generated/graphql";

type AppBarHeroStatsProps = {
  hero?: Hero;
};

export function AppBarHeroStats({ hero }: AppBarHeroStatsProps): JSX.Element {
  console.log({ hero });

  return (
    <React.Fragment>
      <Grid container columns={6}>
        <Grid item md={1} sm={2} xs={6}>
          Gold: {hero.gold}
        </Grid>
        <Grid item md={1} sm={2} xs={6}>
          Level: {hero.level}
        </Grid>
        <Grid item md={1} sm={2} xs={6}>
          Experience: {hero.experience}
        </Grid>
        <Grid item md={1} sm={2} xs={6}>
          Health: {hero.combat.health} / {hero.combat.maxHealth}
        </Grid>
        <Grid item md={1} sm={2} xs={6}>
          Location: {hero.location.x}, {hero.location.y}
        </Grid>
        <Grid item md={1} sm={2} xs={6}>
          Luck: {hero.stats.luck}
        </Grid>
        <Grid item md={1} sm={2} xs={6}>
          Strength: {hero.stats.strength}
        </Grid>
        <Grid item md={1} sm={2} xs={6}>
          Dexterity: {hero.stats.dexterity}
        </Grid>
        <Grid item md={1} sm={2} xs={6}>
          Constitution: {hero.stats.constitution}
        </Grid>
        <Grid item md={1} sm={2} xs={6}>
          Intelligence: {hero.stats.intelligence}
        </Grid>
        <Grid item md={1} sm={2} xs={6}>
          Wisdom: {hero.stats.wisdom}
        </Grid>
        <Grid item md={1} sm={2} xs={6}>
          Charisma: {hero.stats.charisma}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
