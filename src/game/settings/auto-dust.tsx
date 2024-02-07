import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useHero } from "src/hooks/use-hero";
import { useChangeAutoDustMutation, Hero } from "src/generated/graphql";

export function AutoDustSetting({ hero }: { hero: Hero }): JSX.Element {
  const [changeAutoDustMutation] = useChangeAutoDustMutation();
  const [autoDust, setAutoDust] = useState<number>(hero.settings.autoDust);

  function handleValueChange(value: string) {
    const num = Math.round(Number(value));

    if (isNaN(num) || !Number.isFinite(num)) {
      return;
    }
    setAutoDust(num);
  }

  async function handleChangeAutoDust() {
    await changeAutoDustMutation({
      variables: {
        value: autoDust,
      },
    });
  }

  return (
    <React.Fragment>
      <Grid container columns={6}>
        <Grid item xs={6}>
          <Typography variant="h5">Autodust</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">
            Automatically destroy enchanted items as they drop off monsters if
            they are at or below the following level.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Gear Level"
            value={autoDust}
            onChange={(e) => handleValueChange(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Button onClick={handleChangeAutoDust}>Save</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
