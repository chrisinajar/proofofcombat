import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

import { useHero } from "src/hooks/use-hero";
import { useDelay } from "src/hooks/use-delay";
import {
  useLocation,
  useSpecialLocation,
  usePlayerLocation,
} from "src/hooks/use-location";

import { distance2d } from "src/helpers";

import {
  useMoveLocationMutation,
  MoveDirection,
  useTeleportMutation,
} from "src/generated/graphql";

import { Map } from "./map";
import { Docks } from "./docks";
import { NpcShop } from "./npc-shop";
import { Camp } from "./camp";
import { SettlementManager } from "./settlement";

export function Locations(): JSX.Element | null {
  const hero = useHero();
  const [showSettlementManager, setIsShowingSettlement] =
    useState<boolean>(false);
  const [teleportX, setTeleportX] = useState<number>(-1);
  const [teleportY, setTeleportY] = useState<number>(-1);
  const [currentDelay, setDelay] = useDelay();
  const [moveMutation, { loading }] = useMoveLocationMutation();
  const [teleportMutation, { loading: teleportLoading }] =
    useTeleportMutation();

  const locationDetails = useLocation();
  const specialLocation = useSpecialLocation();
  const playerLocation = usePlayerLocation();

  useEffect(() => {
    if (hero) {
      setTeleportX(hero.location.x);
      setTeleportY(hero.location.y);
    }
  }, [hero]);

  if (!hero) {
    return null;
  }

  if (showSettlementManager) {
    return <SettlementManager hero={hero} />;
  }

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
    yInput: string | number,
  ) {
    let x = Number(xInput);
    let y = Number(yInput);

    if (x === NaN || y === NaN || !Number.isFinite(x) || !Number.isFinite(y)) {
      return;
    }

    y = Math.min(95, Math.max(0, Math.round(y)));
    x = Math.min(127, Math.max(0, Math.round(x)));

    if (x !== teleportX) {
      setTeleportX(x);
    }
    if (y !== teleportY) {
      setTeleportY(y);
    }
  }

  const teleportCost = Math.round(
    Math.pow(
      distance2d(hero.location, { x: teleportX, y: teleportY }) * 5,
      1.3,
    ),
  );

  function handleShowSettlement() {
    setIsShowingSettlement(true);
  }

  return (
    <React.Fragment>
      <Grid container columns={2} spacing={3}>
        <Grid item xs={2} sm={1}>
          <Grid container columns={6} spacing={3}>
            <Grid item style={{ textAlign: "center" }} xs={6}>
              <Camp hero={hero} onShowSettlement={handleShowSettlement} />
            </Grid>
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
                  Teleport
                  <br />
                  {teleportCost > 0 &&
                    `${teleportCost.toLocaleString()} minimum intelligence`}
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
          {playerLocation && (
            <React.Fragment>
              <Typography variant="h6">
                {playerLocation.publicOwner?.name ?? "???"}'s Settlement
              </Typography>
              <Typography variant="subtitle2">{playerLocation.type}</Typography>
            </React.Fragment>
          )}
          {!specialLocation && !playerLocation && locationDetails && (
            <React.Fragment>
              <Typography variant="h6">Wilderness</Typography>
              <Typography variant="subtitle2">
                {locationDetails.terrain.terrain}
              </Typography>
            </React.Fragment>
          )}
          {!specialLocation && !playerLocation && !locationDetails && (
            <React.Fragment>
              <Typography variant="h6">&nbsp;</Typography>
              <Typography variant="subtitle2">loading...</Typography>
            </React.Fragment>
          )}
          <Map location={hero.location} />
          {specialLocation?.description &&
            specialLocation.description.map((line, i) => (
              <Typography variant="body1" key={`loc-desc-${i}`}>
                {line}
              </Typography>
            ))}
        </Grid>
        {specialLocation?.type === "dock" && (
          <Grid item style={{ textAlign: "center" }} xs={2}>
            <Docks location={specialLocation} />
          </Grid>
        )}
        {/*specialLocation?.type === "tavern" && (
          <Grid item style={{ textAlign: "center" }} xs={2}>
            <Button>Talk to the tavern keeper</Button>
          </Grid>
        )*/}

        {locationDetails?.shop && (
          <Grid item style={{ textAlign: "center" }} xs={2}>
            <NpcShop shop={locationDetails?.shop} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
