import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import type { Hero } from "src/generated/graphql";
import { addSpaces } from "src/helpers";

export type AppBarHero = Pick<
  Hero,
  | "gold"
  | "level"
  | "experience"
  | "combat"
  | "location"
  | "stats"
  | "needed"
  | "class"
>;

export type AppBarHeroStatsProps = {
  hero: AppBarHero;
};

export function AppBarHeroStats({ hero }: AppBarHeroStatsProps): JSX.Element {
  return (
    <React.Fragment>
      <Grid container columns={6}>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Level:{" "}
          <span id="hero-stats-level">{hero.level.toLocaleString()}</span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Location:{" "}
          <span id="hero-stats-location">
            {hero.location.x}, {hero.location.y}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Gold: <span id="hero-stats-gold">{hero.gold.toLocaleString()}</span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Experience:{" "}
          <span id="hero-stats-experience">
            {hero.experience.toLocaleString()}
          </span>{" "}
          /{" "}
          <span id="hero-stats-experience-needed">
            {hero.needed.toLocaleString()}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Health:{" "}
          <span id="hero-stats-health">
            {hero.combat.health.toLocaleString()} /{" "}
            {hero.combat.maxHealth.toLocaleString()}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Luck:{" "}
          <span id="hero-stats-luck">{hero.stats.luck.toLocaleString()}</span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Strength:{" "}
          <span id="hero-stats-strength">
            {hero.stats.strength.toLocaleString()}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Dexterity:{" "}
          <span id="hero-stats-dexterity">
            {hero.stats.dexterity.toLocaleString()}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Constitution:{" "}
          <span id="hero-stats-constitution">
            {hero.stats.constitution.toLocaleString()}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Intelligence:{" "}
          <span id="hero-stats-intelligence">
            {hero.stats.intelligence.toLocaleString()}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Wisdom:{" "}
          <span id="hero-stats-wisdom">
            {hero.stats.wisdom.toLocaleString()}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Charisma:{" "}
          <span id="hero-stats-charisma">
            {hero.stats.charisma.toLocaleString()}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Class: <span id="hero-stats-class">{addSpaces(hero.class)}</span>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
