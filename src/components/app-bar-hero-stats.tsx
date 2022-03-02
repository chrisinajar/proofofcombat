import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";

import HelpIcon from "@mui/icons-material/Help";

import { Hero, HeroClasses } from "src/generated/graphql";
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

const ClassDescrptions: { [x in HeroClasses]?: string } = {
  [HeroClasses.Monster]: "???",
  [HeroClasses.Adventurer]:
    "Brand new heroes gain bonus experience until they find their niche.",
  [HeroClasses.JackOfAllTrades]: "You gain +50% in all stats.",
  [HeroClasses.Gambler]:
    "Gamblers gain an additional level of crit, random amounts of their luck added to accuracy and dodge, +20% to dexteriry wisdom and luck and +10% to all other stats",
  [HeroClasses.Fighter]:
    "Fighters gain +50% strength, +30% to dexterity, and +20% to willpower",
  [HeroClasses.Berserker]:
    "Berserkers received +100% strengtth and +30% dexterity",
  [HeroClasses.Wizard]: "You receive +100% intelligence and +30% wisdom",
  [HeroClasses.Warlock]:
    "You receive +50% intelligence, +30% wisdom, and +20% willpower",
  [HeroClasses.BattleMage]:
    "Battle Mage's can attack with both a spell and a weapon at the same time, additionally they receive +100% strength, +30% dexterity, +100% intelligence, +30% wisdom, and +20% willpower",
  [HeroClasses.Paladin]:
    "Paladins can use shields as weapons, additionally they receive +30% willpower",
  [HeroClasses.Ranger]: "Rangers receive +100% dexterity and double accuracy",
  [HeroClasses.BloodMage]:
    "Blood Mages damage themselves every time they attack",
  // [HeroClasses.Daredevil]: "???",
  // [HeroClasses.Gladiator]: "???",
  // [HeroClasses.EnragedBerserker]: "???",
  // [HeroClasses.MasterWizard]: "???",
  // [HeroClasses.MasterWarlock]: "???",
  // [HeroClasses.DemonHunter]: "???",
  // [HeroClasses.Zealot]: "???",
  // [HeroClasses.Archer]: "???",
  // [HeroClasses.Vampire]: "???",
};

export function AppBarHeroStats({ hero }: AppBarHeroStatsProps): JSX.Element {
  const classDescription = ClassDescrptions[hero.class] ?? "???";
  return (
    <React.Fragment>
      <Grid container columns={6}>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Level:{" "}
          <span id="hero-stats-level">{hero.level.toLocaleString()}</span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          <Tooltip title={classDescription} leaveDelay={2000}>
            <span>
              Class: <span id="hero-stats-class">{addSpaces(hero.class)}</span>
              <HelpIcon sx={{ fontSize: 10, verticalAlign: "top" }} />
            </span>
          </Tooltip>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Gold: <span id="hero-stats-gold">{hero.gold.toLocaleString()}</span>
        </Grid>

        <Grid item lg={1} md={2} sm={3} xs={6}>
          Location:{" "}
          <span id="hero-stats-location">
            {hero.location.x}, {hero.location.y}
          </span>
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
          Willpower:{" "}
          <span id="hero-stats-willpower">
            {hero.stats.willpower.toLocaleString()}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          Luck:{" "}
          <span id="hero-stats-luck">{hero.stats.luck.toLocaleString()}</span>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
