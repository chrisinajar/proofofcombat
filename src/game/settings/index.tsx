import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import { useHero } from "src/hooks/use-hero";
import {
  useChangeMinimumStatMutation,
  useChangeAutoDustMutation,
  Hero,
} from "src/generated/graphql";

import { AutoDustSetting } from "./auto-dust";
import { SkillSettings } from "./skills";

function MaximumStatField({
  hero,
  stat,
}: {
  hero: Hero;
  stat:
    | "strength"
    | "dexterity"
    | "constitution"
    | "intelligence"
    | "wisdom"
    | "willpower"
    | "luck";
}): JSX.Element {
  const [statValue, setStatValue] = useState<number>(
    hero.settings.minimumStats[stat] ?? 10,
  );
  const [changeMinimumStatMutation] = useChangeMinimumStatMutation();

  async function handleValueChange(value: string) {
    let numVal = Number(value);
    if (isNaN(numVal) || !Number.isFinite(numVal)) {
      return;
    }
    numVal = Math.max(1, Math.min(2000000000, numVal));
    setStatValue(numVal);
  }

  async function handleChangeMinimumStat() {
    await changeMinimumStatMutation({
      variables: {
        name: stat,
        value: statValue,
      },
    });
  }

  return (
    <React.Fragment>
      <Grid item md={1} xs={2}>
        {`${stat.substr(0, 1).toUpperCase()}${stat.substr(1)}`}:
      </Grid>
      <Grid item xs={1} sm={2}>
        <TextField
          fullWidth
          label={`Minimum ${stat}`}
          value={statValue}
          onChange={(e) => handleValueChange(e.target.value)}
        />
      </Grid>
      <Grid item md={3} sm={2} xs={3}>
        <Button onClick={handleChangeMinimumStat}>Set minimum {stat}</Button>
      </Grid>
    </React.Fragment>
  );
}

export function Settings(): JSX.Element {
  const hero = useHero();

  if (!hero) {
    return <div />;
  }

  return (
    <Box>
      <Typography variant="h2">Settings</Typography>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Configure your mysterious automation
      </Typography>
      <SkillSettings hero={hero} />
      <Typography variant="h5">Minimum Stats</Typography>
      <Typography variant="subtitle2">
        Prevents transfering from lowering your stats below these values...
      </Typography>
      <Grid container columns={6} spacing={2}>
        <MaximumStatField hero={hero} stat="strength" />
        <MaximumStatField hero={hero} stat="dexterity" />
        <MaximumStatField hero={hero} stat="constitution" />
        <MaximumStatField hero={hero} stat="intelligence" />
        <MaximumStatField hero={hero} stat="wisdom" />
        <MaximumStatField hero={hero} stat="willpower" />
        <MaximumStatField hero={hero} stat="luck" />
      </Grid>

      <AutoDustSetting hero={hero} />
    </Box>
  );
}
