import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

import { useHero } from "src/hooks/use-hero";
import { useDelay } from "src/hooks/use-delay";

import { distance2d } from "src/helpers";

import {
  useMoveLocationMutation,
  MoveDirection,
  useLocationDetailsQuery,
  useTeleportMutation,
} from "src/generated/graphql";

import { Map } from "./map";
import { Docks } from "./docks";

export function Locations(): JSX.Element | null {
  const hero = useHero();
  const [teleportX, setTeleportX] = useState<number>(-1);
  const [teleportY, setTeleportY] = useState<number>(-1);
  const [currentDelay, setDelay] = useDelay();
  const [moveMutation, { loading }] = useMoveLocationMutation();
  const [teleportMutation, { loading: teleportLoading }] =
    useTeleportMutation();
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

  useEffect(() => {
    if (hero) {
      setTeleportX(hero.location.x);
      setTeleportY(hero.location.y);
    }
  }, [hero]);

  if (!hero) {
    return null;
  }

  const locationDetails = locationData?.locationDetails;
  const specialLocations = locationDetails?.specialLocations || [];

  // for now we're only supporting 1 special location
  const specialLocation = specialLocations.length ? specialLocations[0] : null;

  const shouldDisable =
    loading || hero.combat.health === 0 || currentDelay > 0 || teleportLoading;

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
  async function handlTeleport() {
    try {
      await teleportMutation({
        variables: {
          x: teleportX,
          y: teleportY,
        },
      });
    } catch (e: any) {
      if (e.graphQLErrors && e.graphQLErrors[0]?.extensions?.delay) {
        setDelay(e.graphQLErrors[0].extensions.remaining);
      }
    }
  }

  function handleTeleportChange(
    xInput: string | number,
    yInput: string | number
  ) {
    let x = Number(xInput);
    let y = Number(yInput);

    if (x === NaN || y === NaN || !Number.isFinite(x) || !Number.isFinite(y)) {
      return;
    }
    console.log({ x, y });

    y = Math.min(127, Math.max(0, Math.round(y)));
    x = Math.min(95, Math.max(0, Math.round(x)));

    if (x !== teleportX) {
      setTeleportX(x);
    }
    if (y !== teleportY) {
      setTeleportY(y);
    }
  }

  const teleportCost = Math.round(
    Math.pow(distance2d(hero.location, { x: teleportX, y: teleportY }) * 5, 1.3)
  );

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
            {hero.stats.intelligence > 100 && (
              <Grid item style={{ textAlign: "center" }} xs={6}>
                <Divider />
                <Typography variant="h6" color="secondary" sx={{ margin: 1 }}>
                  Teleport
                </Typography>
                <TextField
                  label="X coordinate"
                  value={teleportX}
                  onChange={(e) =>
                    handleTeleportChange(e.target.value, teleportY)
                  }
                  sx={{
                    width: "100px",
                    margin: 1,
                  }}
                />
                <TextField
                  label="Y coordinate"
                  value={teleportY}
                  onChange={(e) =>
                    handleTeleportChange(teleportX, e.target.value)
                  }
                  sx={{
                    width: "100px",
                    margin: 1,
                  }}
                />
                <br />
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handlTeleport}
                  disabled={
                    teleportCost === 0 ||
                    teleportCost > hero.stats.intelligence ||
                    shouldDisable
                  }
                >
                  {teleportCost > 0 &&
                    `Teleport for ${teleportCost.toLocaleString()} intelligence`}
                  {teleportCost <= 0 && "Teleport"}
                </Button>
              </Grid>
            )}
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
          {!specialLocation && !locationDetails && (
            <React.Fragment>
              <Typography variant="h6">&nbsp;</Typography>
              <Typography variant="subtitle2">loading...</Typography>
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
