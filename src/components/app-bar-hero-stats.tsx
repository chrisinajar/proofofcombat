import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import type { Hero } from "src/generated/graphql";

export type AppBarHero = Pick<
  Hero,
  "gold" | "level" | "experience" | "combat" | "location" | "stats" | "needed"
>;

export type AppBarHeroStatsProps = {
  hero: AppBarHero;
};

export function AppBarHeroStats({ hero }: AppBarHeroStatsProps): JSX.Element {
  return (
    <React.Fragment>
      <Grid container columns={6}>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Level: {hero.level.toLocaleString()}
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Location: {hero.location.x}, {hero.location.y}
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Gold: {hero.gold.toLocaleString()}
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Experience: {hero.experience.toLocaleString()} /{" "}
          {hero.needed.toLocaleString()}
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Health: {hero.combat.health.toLocaleString()} /{" "}
          {hero.combat.maxHealth.toLocaleString()}
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Luck: {hero.stats.luck.toLocaleString()}
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Strength: {hero.stats.strength.toLocaleString()}
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Dexterity: {hero.stats.dexterity.toLocaleString()}
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Constitution: {hero.stats.constitution.toLocaleString()}
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Intelligence: {hero.stats.intelligence.toLocaleString()}
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Wisdom: {hero.stats.wisdom.toLocaleString()}
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Charisma: {hero.stats.charisma.toLocaleString()}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
