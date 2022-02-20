import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { AttributeType, useLevelUpMutation } from "src/generated/graphql";
import { useDelay } from "src/hooks/use-delay";

export function LevelUpBox(): JSX.Element {
  const [currentDelay] = useDelay();
  const [levelUpMutation, { loading }] = useLevelUpMutation();
  async function levelUp(attribute: AttributeType) {
    console.log("Leveling up...", attribute);
    await levelUpMutation({ variables: { attribute } });
  }
  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: "secondary.light",
        }}
      >
        <br />
        <Typography variant="h5" align="center">
          You have leveled up!
        </Typography>
        <Typography align="center">
          Choose an attribute to increase by 1.
        </Typography>
        <br />
        <Grid container columns={7} spacing={2}>
          {Object.keys(AttributeType)
            .sort()
            .map<JSX.Element>((name) => {
              return (
                <Grid item key={name} xs={7} sm={3} md={2} lg={1}>
                  <Typography align="center">
                    <Button
                      disabled={loading || currentDelay > 0}
                      onClick={() =>
                        levelUp(
                          AttributeType[name as keyof typeof AttributeType]
                        )
                      }
                      variant="contained"
                    >
                      {name}
                    </Button>
                  </Typography>
                </Grid>
              );
            })}
        </Grid>
        <br />
        <br />
        <br />
      </Box>
      <Divider />
    </React.Fragment>
  );
}
