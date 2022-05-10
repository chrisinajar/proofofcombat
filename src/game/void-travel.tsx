import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useCanVoidTravel } from "src/hooks/use-location";
import { useVoidTravelMutation, Hero } from "src/generated/graphql";

export function VoidTravelMenu({
  hero,
  disabled,
}: {
  hero: Hero;
  disabled: boolean;
}): JSX.Element {
  const canTravel = useCanVoidTravel();
  const [voidTravelMutation] = useVoidTravelMutation();

  return (
    <Box sx={{ padding: 1, margin: 1 }}>
      <Typography color="secondary" variant="h2">
        Void Travel
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Void dimensions have different rules than the overworld. While each void
        world which you visit may varry in mechanics, there is one common rule:
        Death in a void world results in immediate overworld rebirth.
      </Typography>
      {!canTravel && (
        <Button disabled size="large" variant="outlined" color="error">
          You must be near a void conduit
        </Button>
      )}
      {canTravel && (
        <Button
          size="large"
          variant="outlined"
          color="secondary"
          onClick={() => voidTravelMutation()}
        >
          Travel to the void
        </Button>
      )}
    </Box>
  );
}
