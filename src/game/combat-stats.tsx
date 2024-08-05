import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Grid";

import { ExtendedCombatStats, HeroSkills } from "src/generated/graphql";

function formatPercentage(num: number, base: number): string {
  return `${(Math.round((num / base) * 1000) / 10).toLocaleString()}%`;
}

export function CombatStats({
  stats,
  skills,
}: {
  stats: ExtendedCombatStats;
  skills: HeroSkills;
}): JSX.Element {
  return (
    <Box>
      <Grid container columns={6} spacing={2}>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Strength</b>: {stats.stats.strength.toLocaleString()}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Dexterity</b>: {stats.stats.dexterity.toLocaleString()}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Constitution</b>: {stats.stats.constitution.toLocaleString()}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Intelligence</b>: {stats.stats.intelligence.toLocaleString()}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Wisdom</b>: {stats.stats.wisdom.toLocaleString()}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Willpower</b>: {stats.stats.willpower.toLocaleString()}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Luck</b>: {stats.stats.luck.toLocaleString()}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Bonus Armor</b>: {formatPercentage(stats.damageReduction - 1, 1)}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Bonus Damage</b>:{" "}
          {formatPercentage(stats.damageAmplification - 1, 1)}
        </Grid>

        <Grid item xs={6}>
          <Divider />
          <Typography variant="h6">Skills</Typography>
        </Grid>

        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Attacking Accuracy</b>: {skills.attackingAccuracy.toLocaleString()}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Attacking Damage</b>: {skills.attackingDamage.toLocaleString()}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Casting Accuracy</b>: {skills.castingAccuracy.toLocaleString()}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Casting Damage</b>: {skills.castingDamage.toLocaleString()}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Vitality</b>: {skills.vitality.toLocaleString()}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Resilience</b>: {skills.resilience.toLocaleString()}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Regeneration</b>: {skills.regeneration.toLocaleString()}
        </Grid>

        <Grid item xs={6}>
          <Divider />
          <Typography variant="h6">Resistances</Typography>
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Physical</b>: {formatPercentage(stats.physicalResistance, 1)}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Magical</b>: {formatPercentage(stats.magicalResistance, 1)}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Fire</b>: {formatPercentage(stats.fireResistance, 1)}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Ice</b>: {formatPercentage(stats.iceResistance, 1)}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Lightning</b>: {formatPercentage(stats.lightningResistance, 1)}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Holy</b>: {formatPercentage(stats.holyResistance, 1)}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Blight</b>: {formatPercentage(stats.blightResistance, 1)}
        </Grid>

        <Grid item xs={6}>
          <Divider />
        </Grid>

        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Enemy Strength</b>:{" "}
          {formatPercentage(stats.enemyStats.strength - 1000000, 1000000)}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Enemy Dexterity</b>:{" "}
          {formatPercentage(stats.enemyStats.dexterity - 1000000, 1000000)}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Enemy Constitution</b>:{" "}
          {formatPercentage(stats.enemyStats.constitution - 1000000, 1000000)}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Enemy Intelligence</b>:{" "}
          {formatPercentage(stats.enemyStats.intelligence - 1000000, 1000000)}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Enemy Wisdom</b>:{" "}
          {formatPercentage(stats.enemyStats.wisdom - 1000000, 1000000)}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Enemy Willpower</b>:{" "}
          {formatPercentage(stats.enemyStats.willpower - 1000000, 1000000)}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Enemy Luck</b>:{" "}
          {formatPercentage(stats.enemyStats.luck - 1000000, 1000000)}
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <b>Armor Reduction</b>:{" "}
          {formatPercentage(stats.armorReduction - 1, 1)}
        </Grid>
      </Grid>
    </Box>
  );
}
