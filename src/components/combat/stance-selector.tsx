import React, { useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { useHero } from "src/hooks/use-hero";
import { HeroStance } from "src/generated/graphql";

const stanceDescriptions: { [x in HeroStance]: string } = {
  [HeroStance.Normal]: "Normal stance with no pros or cons.",

  [HeroStance.Combat]: "???",
  [HeroStance.Reckless]: "???",
  [HeroStance.Aggressive]: "???",
  [HeroStance.Defensive]: "???",
  [HeroStance.NecroticBeam]: "???",
  [HeroStance.CloudofKnives]: "???",
  [HeroStance.FrozenOrb]: "???",
  [HeroStance.MageArmor]: "???",
  [HeroStance.NormalArrow]: "???",
  [HeroStance.BarbedArrow]: "???",
  [HeroStance.BloodHunter]: "???",
  [HeroStance.DarkPresence]: "???",
  [HeroStance.AuraoftheLifeless]: "???",
  [HeroStance.ShieldSmash]: "???",
  [HeroStance.ShieldSlash]: "???",
  [HeroStance.HolySmite]: "???",
  [HeroStance.VengefulSmite]: "???",
  [HeroStance.WarriorsStance]: "???",
  [HeroStance.Hexblade]: "???",
  [HeroStance.Focus]: "???",
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
    name: stance,
    tooltip: stanceDescriptions[stance],
  }));

  function handleChangeStance(stance: HeroStance) {
    console.log("Setting stance to", stance, hero);
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
      <Grid container sx={{ textAlign: "center" }} columns={6}>
        <Grid item xs={6}>
          <hr />
        </Grid>
        <Grid item lg={1} xs={6}>
          <Typography variant="h5">Select Stance</Typography>
        </Grid>
        {stances.map((stance) => (
          <Grid item lg={1} md={2} sm={3} xs={6} key={stance.name}>
            <Tooltip title={stance.tooltip}>
              <Button
                variant={selectedStance === stance.name ? "outlined" : "text"}
                sx={{ fontSize: "1rem", padding: 2 }}
                size="large"
                id={`set-stance-${stance.name.toLowerCase()}`}
                onClick={() => handleChangeStance(stance.name)}
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
