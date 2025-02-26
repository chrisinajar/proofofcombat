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
  | "enchantingDust"
  | "class"
>;

export type AppBarHeroStatsProps = {
  hero: AppBarHero;
};

const ClassDescrptions: { [x in HeroClasses]?: string } = {
  [HeroClasses.Monster]: "???",
  [HeroClasses.Adventurer]:
    "Brand new heroes gain bonus experience until they find their niche.",
  [HeroClasses.JackOfAllTrades]:
    "All your stats are the same. Did you forget to level up?",
  [HeroClasses.Gambler]:
    "Gamblers gain an additional level of crit, random amounts of their luck added to accuracy and dodge, +20% to dexterity wisdom and luck and +10% to all other stats",
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
  [HeroClasses.Ranger]: "Rangers receive double accuracy and +1 weapon level",
  [HeroClasses.BloodMage]:
    "Blood Mages damage themselves every time they attack but gain +20% Constitution",
  [HeroClasses.Daredevil]:
    "+10-110% Strength Constitution Intelligence and Willpower, +20-120% Wisdom Dexterity and Luck, 2x accuracy, and +0-3 weapon levels",
  [HeroClasses.Gladiator]:
    "+200% Strength, +160% Dexterity, +20% Willpower, 2x accuracy, and +1 weapon level",
  [HeroClasses.EnragedBerserker]:
    "+300% Strength, +160% Dexterity, 2x accuracy, and +1 weapon level",
  [HeroClasses.MasterWizard]:
    "+300% Intelligence, +160% Wisdom, 2x accuracy, and +1 weapon level",
  [HeroClasses.MasterWarlock]:
    "+200% Intelligence, +160% Wisdom, +20% Willpower, 2x accuracy, and +1 weapon level",
  [HeroClasses.DemonHunter]:
    "+500% Strength and Intelligence, +70% Dexterity and Wisdom, +50% Willpower, 2x accuracy, and +1 weapon level",
  [HeroClasses.Zealot]: "+70% Willpower, +100% Wisdom, double accuracy",
  [HeroClasses.Archer]: "+200% Dexterity and +2 weapon levels",
  [HeroClasses.Vampire]:
    "+80% Constitution, +50% Willpower, Halves enemy base damage, and +1 weapon level",
};

export function AppBarHeroStats({ hero }: AppBarHeroStatsProps): JSX.Element {
  const classDescription = ClassDescrptions[hero.class] ?? "???";
  return (
    <React.Fragment>
      <Grid container columns={6}>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          <label htmlFor="hero-stats-level">Level: </label>
          <span id="hero-stats-level" data-testid="character-level">{hero.level.toLocaleString()}</span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          <Tooltip title={classDescription} leaveTouchDelay={5000}>
            <span>
              <label htmlFor="hero-stats-class">Class: </label>
              <span id="hero-stats-class">{addSpaces(hero.class)}</span>
              <HelpIcon sx={{ fontSize: 10, verticalAlign: "top" }} />
            </span>
          </Tooltip>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          <label htmlFor="hero-stats-gold">Gold: </label>
          <span id="hero-stats-gold">{hero.gold.toLocaleString()}</span>
        </Grid>

        <Grid item lg={1} md={2} sm={3} xs={6}>
          <label htmlFor="hero-stats-location">Location: </label>
          <span id="hero-stats-location">
            {hero.location.x}, {hero.location.y}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          <label htmlFor="hero-stats-experience-container">Experience: </label>
          <span
            id="hero-stats-experience-container"
            aria-label={`${hero.experience} out of ${hero.needed}`}
          >
            <span id="hero-stats-experience">
              {hero.experience.toLocaleString()}
            </span>{" "}
            /{" "}
            <span id="hero-stats-experience-needed">
              {hero.needed.toLocaleString()}
            </span>
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          <label htmlFor="hero-stats-health">Health: </label>
          <span id="hero-stats-health">
            {hero.combat.health.toLocaleString()} /{" "}
            {hero.combat.maxHealth.toLocaleString()}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          <label htmlFor="hero-stats-strength">Strength: </label>
          <span id="hero-stats-strength">
            {hero.stats.strength.toLocaleString()}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          <label htmlFor="hero-stats-dexterity">Dexterity: </label>
          <span id="hero-stats-dexterity">
            {hero.stats.dexterity.toLocaleString()}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          <label htmlFor="hero-stats-constitution">Constitution: </label>
          <span id="hero-stats-constitution">
            {hero.stats.constitution.toLocaleString()}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          <label htmlFor="hero-stats-intelligence">Intelligence: </label>
          <span id="hero-stats-intelligence">
            {hero.stats.intelligence.toLocaleString()}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          <label htmlFor="hero-stats-wisdom">Wisdom: </label>
          <span id="hero-stats-wisdom">
            {hero.stats.wisdom.toLocaleString()}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          <label htmlFor="hero-stats-willpower">Willpower: </label>
          <span id="hero-stats-willpower">
            {hero.stats.willpower.toLocaleString()}
          </span>
        </Grid>
        <Grid item lg={1} md={2} sm={3} xs={6}>
          <label htmlFor="hero-stats-luck">Luck: </label>
          <span id="hero-stats-luck">{hero.stats.luck.toLocaleString()}</span>
        </Grid>
        {hero.enchantingDust > 200 && (
          <Grid item lg={1} md={2} sm={3} xs={6}>
            <label htmlFor="hero-stats-gold">Dust: </label>
            <span id="hero-stats-gold">
              {hero.enchantingDust.toLocaleString()}
            </span>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
