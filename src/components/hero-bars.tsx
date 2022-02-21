import React from "react";

import LinearProgress from "@mui/material/LinearProgress";

type HeroBarsProps = {
  hero: {
    experience: number;
    needed: number;
    combat: {
      maxHealth: number;
      health: number;
    };
  };
};

export function HeroBars({ hero }: HeroBarsProps): JSX.Element {
  return (
    <React.Fragment>
      <LinearProgress
        sx={{ height: 10 }}
        variant="determinate"
        value={(hero.combat.health / hero.combat.maxHealth) * 100}
        color="success"
      />
      <LinearProgress
        sx={{ height: 10 }}
        variant="determinate"
        value={(hero.experience / hero.needed) * 100}
        color="secondary"
      />
    </React.Fragment>
  );
}
