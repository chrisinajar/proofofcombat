import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
      <Grid item xs={2}>
        Auto dust equipment at or below this level:
      </Grid>
      <Grid item xs={2}>
        <TextField
          value={autoDust}
          onChange={(e) => handleValueChange(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <Button onClick={handleChangeAutoDust}>Save</Button>
      </Grid>
    </React.Fragment>
  );
}
