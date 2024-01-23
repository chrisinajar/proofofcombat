import React from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { useHero } from "src/hooks/use-hero";
import { HeroStance } from "src/generated/graphql";

const stanceDescriptions: { [x in HeroStance]?: string } = {
  [HeroStance.Normal]: "Normal stance with no pros or cons.",
};

export function StanceSelector(): JSX.Element {
  const hero = useHero();

  console.log(hero.availableStances);

  const stances = hero.availableStances.map((stance) => ({
    name: stance,
    tooltip: stanceDescriptions[stance],
  }));

  function handleChangeStance(stance) {
    console.log("Setting stance to", stance, hero);
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
                variant={
                  hero.activeStance === stance.name ? "outlined" : "text"
                }
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
