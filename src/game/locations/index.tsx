import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

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
  useMonstersQuery,
  useTeleportMutation,
  MonsterInstance,
} from "src/generated/graphql";

import { Map } from "./map";
import { Docks } from "./docks";
import { NpcShop } from "./npc-shop";
import { Camp } from "./camp";
import { SettlementManager } from "./settlement";
import { MapModal } from "./map-modal";
import { TavernGossip } from "./tavern-gossip";

const specialMonsterHints: { [x in string]: string } = {
  "random-aberration-unholy-paladin": "The darkness here isn't natural",
  "random-aberration-thornbrute": "The overgrowth here is hostile and deadly",
  "domari-aberration-1":
    "The ash in the air is so thick you can barely breathe",
  "random-aberration-moving-mountain": "The ground itself threatens you",
  "random-aberration-artificer": "Ancient machinery whirs and clicks around you, filling the air with an otherworldly hum",
};

type PartialMonsterInstance = Pick<MonsterInstance, "monster" | "id">;

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
  const { data: monsters, refetch: refetchMonsters } = useMonstersQuery();

  const hints =
    monsters?.monsters?.map?.(
      (monster: PartialMonsterInstance) =>
        specialMonsterHints[monster.monster.id] ?? "",
    ) ?? [];

  const locationDetails = useLocation();
  const specialLocation = useSpecialLocation();
  const playerLocation = usePlayerLocation();

  const northTerrain = locationDetails?.neighborTerrain.north
    ? locationDetails.neighborTerrain.north.terrain
    : "blocked";
  const southTerrain = locationDetails?.neighborTerrain.south
    ? locationDetails.neighborTerrain.south.terrain
    : "blocked";
  const eastTerrain = locationDetails?.neighborTerrain.east
    ? locationDetails.neighborTerrain.east.terrain
    : "blocked";
  const westTerrain = locationDetails?.neighborTerrain.west
    ? locationDetails.neighborTerrain.west.terrain
    : "blocked";

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
  const disableReason = (() => {
    if (hero.combat.health === 0) return "You are dead. Heal in the Combat tab.";
    if (currentDelay > 0)
      return `In delay: available in ${(currentDelay / 1000).toFixed(1)}s`;
    if (loading) return "Moving...";
    if (teleportLoading) return "Teleporting...";
    return "";
  })();

  async function handleMove(direction: MoveDirection) {
    try {
      await moveMutation({
        variables: {
          direction,
        },
      });
      refetchMonsters();
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
      refetchMonsters();
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

    if (isNaN(x) || isNaN(y) || !Number.isFinite(x) || !Number.isFinite(y)) {
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
              <Typography variant="h3">Travel</Typography>
              {hero.combat.health > 0 && (
                <Typography>Use buttons to move around the map.</Typography>
              )}
              {hero.combat.health === 0 && (
                <Typography component="p" variant="h6">
                  You cannot move while dead. Heal yourself in the Combat tab.
                </Typography>
              )}
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={6}>
              {disableReason && (
                <Typography variant="caption" color="text.secondary">
                  {disableReason}
                </Typography>
              )}
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}></Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}>
              <Button
                aria-label={`North terrain: ${northTerrain}`}
                disabled={shouldDisable}
                variant="contained"
                onClick={() => handleMove(MoveDirection.North)}
                startIcon={<KeyboardArrowUpIcon />}
              >
                North
              </Button>
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}></Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}>
              <Button
                aria-label={`West terrain: ${westTerrain}`}
                disabled={shouldDisable}
                variant="contained"
                onClick={() => handleMove(MoveDirection.West)}
                startIcon={<KeyboardArrowLeftIcon />}
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
                aria-label={`East terrain: ${eastTerrain}`}
                disabled={shouldDisable}
                variant="contained"
                onClick={() => handleMove(MoveDirection.East)}
                startIcon={<KeyboardArrowRightIcon />}
              >
                East
              </Button>
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}></Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}>
              <Button
                aria-label={`South terrain: ${southTerrain}`}
                disabled={shouldDisable}
                variant="contained"
                onClick={() => handleMove(MoveDirection.South)}
                startIcon={<KeyboardArrowDownIcon />}
              >
                South
              </Button>
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={2}></Grid>
            {hero.stats.intelligence > 100 && (
              <Grid item style={{ textAlign: "center" }} xs={6}>
                <Divider />
                <Typography
                  variant="h5"
                  component="h3"
                  color="secondary"
                  sx={{ margin: 1 }}
                >
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
                <Box sx={{ my: 1 }}>
                  <Typography
                    variant="caption"
                    color={
                      teleportCost > hero.stats.intelligence
                        ? "error"
                        : "text.secondary"
                    }
                  >
                    Cost: {teleportCost.toLocaleString()} INT; You have {" "}
                    {hero.stats.intelligence.toLocaleString()} INT
                  </Typography>
                </Box>
                <Tooltip
                  title={
                    teleportCost === 0
                      ? "Already at target coordinates"
                      : teleportCost > hero.stats.intelligence
                      ? "Insufficient intelligence"
                      : currentDelay > 0
                      ? `In delay: available in ${(currentDelay / 1000).toFixed(
                          1,
                        )}s`
                      : hero.combat.health === 0
                      ? "Cannot teleport while dead"
                      : shouldDisable
                      ? "Action temporarily unavailable"
                      : "Teleport to target coordinates"
                  }
                  disableHoverListener={
                    !(
                      teleportCost === 0 ||
                      teleportCost > hero.stats.intelligence ||
                      shouldDisable
                    )
                  }
                >
                  <span>
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
                    </Button>
                  </span>
                </Tooltip>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item style={{ textAlign: "center" }} xs={2} sm={1}>
          {specialLocation && (
            <Typography variant="h6" component="h4">
              {specialLocation.name}
            </Typography>
          )}
          {specialLocation && (
            <Typography variant="subtitle2" component="p">
              {specialLocation.type}
            </Typography>
          )}
          {playerLocation && (
            <React.Fragment>
              <Typography variant="h6" component="h4">
                {playerLocation.publicOwner?.name ?? "???"}'s Settlement
              </Typography>
              <Typography variant="subtitle2" component="p">
                {playerLocation.type}
              </Typography>
            </React.Fragment>
          )}
          {!specialLocation && !playerLocation && locationDetails && (
            <React.Fragment>
              <Typography variant="h6" component="h4">
                Wilderness
              </Typography>
              <Typography variant="subtitle2" component="p">
                {locationDetails.terrain.terrain}
              </Typography>
            </React.Fragment>
          )}
          {!specialLocation && !playerLocation && !locationDetails && (
            <React.Fragment>
              <Typography variant="h6" component="h4">
                &nbsp;
              </Typography>
              <Typography variant="subtitle2" component="p">
                loading...
              </Typography>
            </React.Fragment>
          )}
          <Map
            location={hero.location}
            renderCell={({ x, y }) => {
              if (hero.location.x === x && hero.location.y === y) {
                return (
                  <div
                    style={{
                      borderRadius: `${8 / 2}px`,
                      backgroundColor: "red",
                      border: "2px solid rgba(255,255,255,0.3)",

                      width: `${8}px`,
                      height: `${8}px`,
                      margin: "auto",
                    }}
                  />
                );
              }
              return null;
            }}
          />
          {specialLocation?.description &&
            specialLocation.description.map((line, i) => (
              <Typography component="h4" variant="body1" key={`loc-desc-${i}`}>
                {line}
              </Typography>
            ))}
          {hints
            .filter((a) => !!a)
            .map((hint) => (
              <Typography component="h4" variant="body1" key={hint}>
                {hint}
              </Typography>
            ))}
          {/*<MapModal />*/}
        </Grid>
        {specialLocation?.type === "dock" && (
          <Grid item style={{ textAlign: "center" }} xs={2}>
            <Docks location={specialLocation} />
          </Grid>
        )}
        {specialLocation?.type === "tavern" && (
          <Grid item style={{ textAlign: "center" }} xs={2}>
            <TavernGossip />
          </Grid>
        )}

        {locationDetails?.shop && (
          <Grid item style={{ textAlign: "center" }} xs={2}>
            <NpcShop shop={locationDetails?.shop} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
