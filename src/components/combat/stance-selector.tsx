import React, { useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { useHero } from "src/hooks/use-hero";
import { HeroStance } from "src/generated/graphql";

const stanceNameMap: { [x in HeroStance]?: string } = {
  [HeroStance.Fire]: "Fireball",
  [HeroStance.Ice]: "Blizzard",
  [HeroStance.Lightning]: "Lightning Bolt",
  [HeroStance.Blight]: "Wrathful",
};

const stanceDescriptions: { [x in HeroStance]: string } = {
  [HeroStance.Normal]: "Normal stance with no pros or cons.",

  [HeroStance.Reckless]: "Double accuracy but makes you twice as easy to hit.",

  [HeroStance.Fire]: "Converts 20% of magic damage into Fire damage.",
  [HeroStance.Ice]: "Converts 20% of magic damage into Ice damage.",
  [HeroStance.Lightning]: "Converts 20% of magic damage into Lightning damage.",

  [HeroStance.Sunder]: "Converts 50% of damage into Physical damage.",
  [HeroStance.Blight]: "Changes base damage type of smite from Holy to Blight.",
};

export function StanceSelector(props: {
  onChange?: (stance: HeroStance) => void;
}): JSX.Element | null {
  const hero = useHero();
  const [selectedStance, setSelectedStance] = useState(
    hero?.activeStance || HeroStance.Normal,
  );

  if (!hero) {
    return null;
  }
  const stances = hero.availableStances.map((stance) => ({
    name: stanceNameMap[stance] ?? stance,
    stance,
    tooltip: stanceDescriptions[stance],
  }));

  function handleChangeStance(stance: HeroStance) {
    setSelectedStance(stance);
    if (props.onChange) {
      props.onChange(stance);
    }
  }

  // do not show selector if there aren't enough stances
  if (stances.length < 2) {
    return null;
  }

  return (
    <Grid item xs={12}>
      <Grid container sx={{ textAlign: "center" }} columns={6} spacing={2}>
        <Grid item xs={6}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">Select Combat Style</Typography>
        </Grid>
        {stances.map((stance) => (
          <Grid item lg={1} md={2} sm={3} xs={6} key={stance.name}>
            <Tooltip title={stance.tooltip}>
              <Button
                variant={selectedStance === stance.name ? "outlined" : "text"}
                sx={{ fontSize: "1rem", padding: 2 }}
                size="large"
                id={`set-stance-${stance.name.toLowerCase()}`}
                onClick={() => handleChangeStance(stance.stance)}
                aria-label={`set stance ${stance.name}`}
                /* startIcon={<ShieldIcon />} */
              >
                {stance.name}
              </Button>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
