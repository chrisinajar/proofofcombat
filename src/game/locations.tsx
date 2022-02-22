import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useHero } from "src/hooks/use-hero";
import { useDelay } from "src/hooks/use-delay";

import { useMoveLocationMutation, MoveDirection } from "src/generated/graphql";

import { Map } from "./map";

export function Locations(): JSX.Element | null {
  const hero = useHero();
  const [currentDelay, setDelay] = useDelay();
  const [moveMutation, { loading }] = useMoveLocationMutation();

  if (!hero) {
    return null;
  }

  const shouldDisable = loading || hero.combat.health === 0 || currentDelay > 0;

  async function handleMove(direction: MoveDirection) {
    try {
      await moveMutation({
        variables: {
          direction,
        },
      });
    } catch (e: any) {
      if (e.graphQLErrors && e.graphQLErrors[0]?.extensions?.delay) {
        setDelay(e.graphQLErrors[0].extensions.remaining);
      }
    }
  }

  return (
    <React.Fragment>
      <Grid container columns={2} spacing={3}>
        <Grid item xs={2} sm={1}>
          <Grid container columns={6} spacing={3}>
            <Grid item style={{ textAlign: "center" }} xs={6}>
              {hero.combat.health > 0 && (
                <Typography>Use buttons to move around the map.</Typography>
              )}
              {hero.combat.health === 0 && (
                <Typography variant="h6">
                  You cannot move while dead. Heal yourself in the Combat tab.
                </Typography>
              )}
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}></Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}>
              <Button
                disabled={shouldDisable}
                variant="contained"
                onClick={() => handleMove(MoveDirection.North)}
              >
                North
              </Button>
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}></Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}>
              <Button
                disabled={shouldDisable}
                variant="contained"
                onClick={() => handleMove(MoveDirection.West)}
              >
                West
              </Button>
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}>
              <Typography>
                {hero.location.x}, {hero.location.y}
              </Typography>
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}>
              <Button
                disabled={shouldDisable}
                variant="contained"
                onClick={() => handleMove(MoveDirection.East)}
              >
                East
              </Button>
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}></Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}>
              <Button
                disabled={shouldDisable}
                variant="contained"
                onClick={() => handleMove(MoveDirection.South)}
              >
                South
              </Button>
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}></Grid>
          </Grid>
        </Grid>
        <Grid item style={{ textAlign: "center" }} xs={2} sm={1}>
          <Map />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
