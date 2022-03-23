import React, { useEffect, useState } from "react";
import { words } from "capitalize";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ConstructionIcon from "@mui/icons-material/Construction";
import StorefrontIcon from "@mui/icons-material/Storefront";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";

import {
  Hero,
  Location,
  useSettlementManagerQuery,
  PlayerLocationType,
} from "src/generated/graphql";

import { CampResourceShop } from "../camp-resource-shop";
import { Map } from "../map";
import { getBoundingBox, combineResources } from "./helpers";
import { MapIcon } from "./map-icon";
import { BuildBuildingMapButtons } from "./build-building-map-buttons";

export function SettlementManager({
  hero,
  onClose,
}: {
  hero: Hero;
  onClose?: () => void;
}): JSX.Element | null {
  const [buildBuilding, setBuildBuilding] = useState<PlayerLocationType | null>(
    null
  );
  const { data: managerData, loading } = useSettlementManagerQuery();
  const theme = useTheme();
  const atLeastSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const atLeastMedium = useMediaQuery(theme.breakpoints.up("md"));
  const atLeastLarge = useMediaQuery(theme.breakpoints.up("lg"));

  const xs = !atLeastSmall && !atLeastMedium && !atLeastLarge;
  const sm = atLeastSmall && !atLeastMedium && !atLeastLarge;
  const md = atLeastSmall && atLeastMedium && !atLeastLarge;
  const lg = atLeastSmall && atLeastMedium && atLeastLarge;

  const [currentMode, setCurrentMode] = useState<string>("");
  useEffect(() => {
    if (!hero.home && onClose) {
      onClose();
    }
  }, [hero.home, onClose]);

  // home type narrowing
  if (!hero.home) {
    return null;
  }

  if (loading) {
    return null;
  }

  if (!managerData) {
    return null;
  }

  const { settlementManager } = managerData;

  console.log({ buildBuilding });

  const { capital, availableBuildings, availableUpgrades } = settlementManager;

  const resources = combineResources(
    capital.resources,
    ...capital.connections.map((loc) => loc.resources)
  );
  const population = resources.find((r) => r.name === "population")?.value ?? 0;
  const food = resources.find((r) => r.name === "food")?.value ?? 0;

  const boundingBox = getBoundingBox([...capital.connections, capital]);

  // 1 padding on all sides + center point
  const width = boundingBox.max.x - boundingBox.min.x + 5;
  const height = boundingBox.max.y - boundingBox.min.y + 5;
  let desiredMapSize = 290;
  if (xs) {
    // desiredMapSize = theme.breakpoints.values.xs;
  } else if (sm) {
    desiredMapSize = theme.breakpoints.values.sm - 110;
  } else if (md) {
    desiredMapSize = theme.breakpoints.values.md / 2 - 160;
  } else if (lg) {
    desiredMapSize = theme.breakpoints.values.lg / 2 - 80;
  }
  const cellResolution = 8;
  const cellSize =
    Math.round(
      Math.min(desiredMapSize / width, desiredMapSize / height) / cellResolution
    ) * cellResolution;

  return (
    <Box>
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
                  <Grid item xs={6} sm={3} md={2} lg={1}>
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
                <Grid item xs={6} sm={3} md={2} lg={1}>
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
              <Tab icon={<ConstructionIcon />} label="Build" value="1" />
              <Tab icon={<StorefrontIcon />} label="Market" value="2" />
            </TabList>
          </Grid>
          <Grid item xs={6} md={2} lg={3}>
            <Box sx={{ position: "relative" }}>
              <Map
                location={capital.location}
                indicatorSize={0}
                minimapSize={[width, height]}
                cellSize={cellSize}
              />
              <MapIcon
                cellSize={cellSize}
                boundingBox={boundingBox}
                location={capital.location}
                tooltip="Capital"
                icon={<AccountBalanceIcon />}
              />
              {buildBuilding && (
                <React.Fragment>
                  <BuildBuildingMapButtons
                    cellSize={cellSize}
                    boundingBox={boundingBox}
                    capital={capital}
                  />
                </React.Fragment>
              )}
            </Box>
          </Grid>
          <Grid item xs={6} md={4} lg={3}>
            <TabPanel value=""></TabPanel>
            <TabPanel value="1">
              <Typography variant="h6">Construct new buildings</Typography>
              <Typography variant="subtitle2">
                Each building uses a map tile.
              </Typography>
              <Stack alignItems="start">
                {availableBuildings.map((building) => (
                  <Button
                    key={building.type}
                    onClick={() => setBuildBuilding(building.type)}
                  >
                    {building.name}
                  </Button>
                ))}
              </Stack>
            </TabPanel>
            <TabPanel value="2">
              <CampResourceShop hero={hero} camp={capital} />
            </TabPanel>
          </Grid>
        </Grid>
      </TabContext>
    </Box>
  );
}
