import React, { useEffect, useState } from "react";
import { words } from "capitalize";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ConstructionIcon from "@mui/icons-material/Construction";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import HouseIcon from "@mui/icons-material/House";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import DeleteIcon from "@mui/icons-material/Delete";
import ShieldIcon from "@mui/icons-material/Shield";
import ApartmentIcon from "@mui/icons-material/Apartment";

import LoadingButton from "@mui/lab/LoadingButton";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";

import {
  Hero,
  Location,
  useSettlementManagerQuery,
  useDestroyBuildingMutation,
  PlayerLocationType,
  PlayerLocation,
} from "src/generated/graphql";

import { CampResourceShop } from "../camp-resource-shop";
import { Map } from "../map";
import { getBoundingBox, combineResources } from "./helpers";
import { MapIcon } from "./map-icon";
import { BuildBuildingMapButtons } from "./build-building-map-buttons";
import { BuildingDetails } from "./building-details";

const IconMap: { [x in PlayerLocationType]?: JSX.Element } = {
  [PlayerLocationType.Farm]: <AgricultureIcon />,
  [PlayerLocationType.Shrine]: <AccountBalanceIcon />,
  [PlayerLocationType.Apiary]: <EmojiNatureIcon />,
  [PlayerLocationType.Barracks]: <ShieldIcon />,
};

export function SettlementManager({
  hero,
  onClose,
}: {
  hero: Hero;
  onClose?: () => void;
}): JSX.Element | null {
  const [destroyBuildingMutation, { loading: destroyBuildingLoading }] =
    useDestroyBuildingMutation();
  const [destroyConfirmation, setDestroyConfirmation] =
    useState<PlayerLocation | null>(null);
  const [selectedBuilding, setSelectedBuilding] =
    useState<PlayerLocation | null>(null);
  const [buildBuilding, setBuildBuilding] = useState<PlayerLocationType | null>(
    null,
  );
  const {
    data: managerData,
    loading: managerDataLoading,
    refetch,
  } = useSettlementManagerQuery({ pollInterval: 60000 });
  const theme = useTheme();
  const atLeastSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const atLeastMedium = useMediaQuery(theme.breakpoints.up("md"));
  const atLeastLarge = useMediaQuery(theme.breakpoints.up("lg"));

  const xs = !atLeastSmall && !atLeastMedium && !atLeastLarge;
  const sm = atLeastSmall && !atLeastMedium && !atLeastLarge;
  const md = atLeastSmall && atLeastMedium && !atLeastLarge;
  const lg = atLeastSmall && atLeastMedium && atLeastLarge;

  const [currentMode, setCurrentMode] = useState<string>("info");
  useEffect(() => {
    if (!hero.home && onClose) {
      onClose();
    }
  }, [hero.home, onClose]);

  // home type narrowing
  if (!hero.home) {
    return null;
  }

  if (managerDataLoading) {
    return null;
  }

  if (!managerData) {
    return null;
  }

  const { settlementManager } = managerData;

  const {
    capital: capitalData,
    availableBuildings,
    availableUpgrades,
    range,
  } = settlementManager;

  const capital = capitalData as PlayerLocation;

  const resources = combineResources(
    capital.resources,
    ...capital.connections.map((loc) => loc.resources),
  );
  const population = resources.find((r) => r.name === "population")?.value ?? 0;
  const food = resources.find((r) => r.name === "food")?.value ?? 0;

  const boundingBox = getBoundingBox(
    [...capital.connections, capital].map((loc) => loc.location),
  );

  // 1 padding on all sides + center point
  const width = boundingBox.max.x - boundingBox.min.x + 5;
  const height = boundingBox.max.y - boundingBox.min.y + 5;
  let desiredMapSize = 290;
  if (xs) {
    // desiredMapSize = theme.breakpoints.values.xs;
  } else if (sm) {
    desiredMapSize = theme.breakpoints.values.sm - 60;
  } else if (md) {
    desiredMapSize = theme.breakpoints.values.md / 2 - 40;
  } else if (lg) {
    desiredMapSize = theme.breakpoints.values.lg / 2 - 80;
  }
  const cellResolution = 8;
  const cellSize =
    Math.round(
      Math.min(desiredMapSize / width, desiredMapSize / height) /
        cellResolution,
    ) * cellResolution;

  function cancelDestroyBuilding() {
    setDestroyConfirmation(null);
  }
  function handleClickLocation(location: PlayerLocation) {
    console.log(currentMode);
    if (currentMode === "destroy") {
      setDestroyConfirmation(location);
    } else if (currentMode === "info") {
      setSelectedBuilding(location);
    }
  }
  async function handleDestroyBuilding() {
    if (!destroyConfirmation) {
      return;
    }
    try {
      await destroyBuildingMutation({
        variables: {
          location: {
            x: destroyConfirmation.location.x,
            y: destroyConfirmation.location.y,
            map: destroyConfirmation.location.map,
          },
        },
      });
    } catch (e) {
    } finally {
      setDestroyConfirmation(null);
    }
  }

  function handleBuyResource() {
    refetch();
  }

  return (
    <Box>
      <Dialog
        open={!!destroyConfirmation}
        onClose={cancelDestroyBuilding}
        aria-labelledby="destroy-building-title"
        aria-describedby="destroy-building-description"
      >
        <DialogTitle id="destroy-building-title">Destroy Building?</DialogTitle>
        <DialogContent>
          {destroyConfirmation && (
            <DialogContentText id="destroy-building-description">
              Are you sure you want to destroy the {destroyConfirmation.type} at{" "}
              {destroyConfirmation.location.x}, {destroyConfirmation.location.y}
              ?
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDestroyBuilding} color="info">
            Cancel
          </Button>
          <LoadingButton
            loading={destroyBuildingLoading}
            onClick={handleDestroyBuilding}
            color="error"
          >
            Destroy
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <TabContext value={currentMode}>
        <Grid container columns={6} spacing={1}>
          <Grid item xs={6}>
            <Typography variant="h4">Settlement Manager</Typography>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Typography>
              <b>Capital</b>: {capital.location.x}, {capital.location.y}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Typography>
              <b>Map tiles</b>:{" "}
              {(capital.connections.length + 1).toLocaleString()}
            </Typography>
          </Grid>
          {[...resources]
            .sort((a, b) => b.value - a.value)
            .map((resource) => {
              if (
                resource.value < population &&
                (resource.name === "food" || resource.name === "water")
              ) {
                return (
                  <Grid key={resource.name} item xs={6} sm={3} md={2} lg={1}>
                    <Typography color="error">
                      <b>{words(resource.name)}</b>:{" "}
                      {resource.value.toLocaleString()}
                      {resource.maximum &&
                        ` / ${resource.maximum.toLocaleString()}`}
                    </Typography>
                  </Grid>
                );
              }
              return (
                <Grid key={resource.name} item xs={6} sm={3} md={2} lg={1}>
                  <b>{words(resource.name)}</b>:{" "}
                  {resource.value.toLocaleString()}
                  {resource.maximum &&
                    ` / ${resource.maximum.toLocaleString()}`}
                </Grid>
              );
            })}

          <Grid item xs={6}>
            <TabList
              aria-label="navigation tabs"
              variant="scrollable"
              textColor="secondary"
              indicatorColor="secondary"
              onChange={(e, val) => {
                if (buildBuilding) {
                  setBuildBuilding(null);
                }
                setCurrentMode(val);
              }}
              sx={{
                flexShrink: 0,
                flexGrow: 1,
              }}
            >
              <Tab icon={<ApartmentIcon />} label="View" value="info" />
              <Tab icon={<ConstructionIcon />} label="Build" value="build" />
              <Tab icon={<DeleteIcon />} label="Destroy" value="destroy" />
              <Tab icon={<StorefrontIcon />} label="Market" value="market" />
            </TabList>
          </Grid>
          <Grid item xs={6} md={3} lg={3}>
            <Box sx={{ position: "relative" }}>
              <Typography variant="h6" style={visuallyHidden}>
                Buildings
              </Typography>
              <Map
                location={capital.location}
                indicatorSize={0}
                minimapSize={[width, height]}
                cellSize={cellSize}
              />
              <MapIcon
                onClick={() =>
                  handleClickLocation({ ...capital, connections: [] })
                }
                cellSize={cellSize}
                boundingBox={boundingBox}
                location={capital.location}
                tooltip="Capital"
                icon={<HouseIcon />}
              />
              {capital.connections.map((connection) => (
                <MapIcon
                  hover={currentMode === "destroy"}
                  key={connection.id}
                  onClick={() => handleClickLocation(connection)}
                  cellSize={cellSize}
                  boundingBox={boundingBox}
                  location={connection.location}
                  tooltip={connection.type}
                  icon={IconMap[connection.type] ?? <AccountBalanceIcon />}
                />
              ))}
              {buildBuilding && (
                <React.Fragment>
                  <BuildBuildingMapButtons
                    type={buildBuilding}
                    cellSize={cellSize}
                    boundingBox={boundingBox}
                    capital={capital}
                    range={range}
                  />
                </React.Fragment>
              )}
            </Box>
          </Grid>
          <Grid item xs={6} md={3} lg={3}>
            <TabPanel value="build">
              <Typography variant="h6">Construct new buildings</Typography>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Each building uses a map tile.
              </Typography>
              <Stack alignItems="start">
                {availableBuildings.map((building) => (
                  <Card sx={{ mb: 3 }} key={building.name}>
                    <CardHeader title={building.name} />
                    <CardContent>
                      <Typography sx={{ mb: 1 }}>
                        {building.description}
                      </Typography>
                      <Typography variant="h6">Cost to build</Typography>
                      <ul style={{ margin: 2 }}>
                        {building.cost.map((cost) => (
                          <React.Fragment key={cost.name}>
                            <li>
                              <label
                                style={{ fontWeight: "bold" }}
                                htmlFor={`cost-value-${cost.name}`}
                              >
                                {words(cost.name)}:
                              </label>{" "}
                              <span id={`cost-value-${cost.name}`}>
                                {cost.value.toLocaleString()}
                              </span>
                            </li>
                          </React.Fragment>
                        ))}
                      </ul>
                    </CardContent>
                    <CardActions>
                      <Button
                        key={building.type}
                        onClick={() => setBuildBuilding(building.type)}
                        variant="contained"
                        color="success"
                      >
                        Build Building
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Stack>
            </TabPanel>
            <TabPanel value="destroy">
              Click on a location to demolish the building there. You will get
              nothing back, and this cannot be undone.
            </TabPanel>
            <TabPanel value="market">
              <CampResourceShop
                hero={hero}
                camp={capital}
                onBuyResource={handleBuyResource}
              />
            </TabPanel>
            <TabPanel value="info">
              <Typography variant="h5">Building Details</Typography>
              {!selectedBuilding && (
                <Typography variant="body1">
                  Select a building from the map on the left to see details
                  about it here.
                </Typography>
              )}
              {selectedBuilding && (
                <BuildingDetails location={selectedBuilding} />
              )}
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </Box>
  );
}
