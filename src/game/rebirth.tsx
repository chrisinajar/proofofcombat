import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Hero, useRebirthMutation } from "src/generated/graphql";

type MinimalHero = Pick<Hero, "level" | "levelCap">;

export function RebirthMenu({
  hero,
  disabled,
}: {
  hero: MinimalHero;
  disabled: boolean;
}): JSX.Element {
  const [rebirthMutation, { loading }] = useRebirthMutation();
  const atLevelCap = hero.level >= hero.levelCap;

  async function handleRebirth() {
    try {
      await rebirthMutation();
    } catch (e) {
      console.log(e);
    }
  }

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
        <React.Fragment>
          <Typography>
            This will reset your character's level and attributes, however you
            will keep all gold and items and will receive special bonuses
            depending on your current level cap.
          </Typography>
          <br />
          <Button
            size="large"
            variant="outlined"
            color="secondary"
            onClick={handleRebirth}
            data-testid="rebirth-button"
          >
            Reset Character to Level 1
          </Button>
        </React.Fragment>
      )}
    </Box>
  );
}
