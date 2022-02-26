import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Hero } from "src/generated/graphql";

export function RebirthMenu({
  hero,
  disabled,
}: {
  hero: Hero;
  disabled: boolean;
}): JSX.Element {
  const atLevelCap = hero.level >= hero.levelCap;
  return (
    <Box sx={{ padding: 1, margin: 1 }}>
      <Typography color="secondary" variant="h2">
        Rebirth
      </Typography>
      {!atLevelCap && (
        <Typography>
          You may only be reborn when you are at level cap. Keep leveling up
          your character in order to be reborn!
        </Typography>
      )}
      {atLevelCap && (
        <Typography>
          This will reset your character's level and attributes, however you
          will keep all gold and items and will receive special bonuses
          depending on your current level cap.
        </Typography>
      )}
    </Box>
  );
}
