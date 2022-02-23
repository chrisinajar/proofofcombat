import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useHero } from "src/hooks/use-hero";
import { useDelay } from "src/hooks/use-delay";

import {
  useMoveLocationMutation,
  MoveDirection,
  useLocationDetailsQuery,
} from "src/generated/graphql";

import { Map } from "./map";
import { Docks } from "./docks";

export function Locations(): JSX.Element | null {
  const hero = useHero();
  const [currentDelay, setDelay] = useDelay();
  const [moveMutation, { loading }] = useMoveLocationMutation();
  const { data: locationData } = useLocationDetailsQuery({
    variables: hero?.location
      ? {
          location: {
            x: hero.location.x,
            y: hero.location.y,
            map: hero.location.map,
          },
        }
      : undefined,
    skip: !hero?.location,
  });

  if (!hero) {
    return null;
  }

  const locationDetails = locationData?.locationDetails;
  const specialLocations = locationDetails?.specialLocations || [];

  // for now we're only supporting 1 special location
  const specialLocation = specialLocations.length ? specialLocations[0] : null;

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
          {specialLocation && (
            <Typography variant="h6">{specialLocation.name}</Typography>
          )}
          {specialLocation && (
            <Typography variant="subtitle2">{specialLocation.type}</Typography>
          )}
          {!specialLocation && locationDetails && (
            <React.Fragment>
              <Typography variant="h6">Wilderness</Typography>
              <Typography variant="subtitle2">
                {locationDetails.terrain.terrain}
              </Typography>
            </React.Fragment>
          )}
          <Map />
        </Grid>
        {specialLocation?.type === "dock" && (
          <Grid item style={{ textAlign: "center" }} xs={2}>
            <Docks location={specialLocation} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
