import React, { useMemo } from "react";

import ConstructionIcon from "@mui/icons-material/Construction";

import {
  PlayerLocation,
  PlayerLocationType,
  Location,
  useBuildBuildingMutation,
} from "src/generated/graphql";

import { BoundingBox } from "./helpers";
import { MapIcon } from "./map-icon";

export function BuildBuildingMapButtons({
  cellSize,
  x,
  y,
  capital,
  type,
  range,
  boundingBox,
}: {
  cellSize: number;
  x: number;
  y: number;
  capital: PlayerLocation;
  type: PlayerLocationType;
  range: number;
  boundingBox: BoundingBox;
}): JSX.Element | null {
  const [buildBuildingMutation] = useBuildBuildingMutation();
  const allLocations = capital.connections
    .map((conn) => conn.location)
    .concat(capital.location);

  // console.log(boundingBox, allLocations, range);

  const entry: Location | null = useMemo(() => {
    if (
      Math.abs(x - capital.location.x) + Math.abs(y - capital.location.y) >=
      range
    ) {
      return null;
    }
    const location = allLocations.find((e) => e.x === x && e.y === y);
    if (location) {
      return null;
    }
    const neightbor = allLocations.find(
      (e) =>
        (e.x === x + 1 && e.y === y) ||
        (e.x === x - 1 && e.y === y) ||
        (e.x === x && e.y === y + 1) ||
        (e.x === x && e.y === y - 1),
    );
    if (!neightbor) {
      return null;
    }

    return { x, y, map: capital.location.map };
  }, [allLocations.length, x, y, range]);

  async function handleBuildBuilding(location: Location) {
    try {
      await buildBuildingMutation({
        variables: {
          location,
          type,
        },
      });
    } catch (e) {}
  }

  if (!entry) {
    return null;
  }

  return (
    <React.Fragment>
      <MapIcon
        key={`${entry.x}-${entry.y}`}
        onClick={() => handleBuildBuilding(entry)}
        hover
        color="rgb(10, 120, 10)"
        cellSize={cellSize}
        boundingBox={boundingBox}
        location={entry}
        tooltip="Build here"
        icon={<ConstructionIcon />}
      />
    </React.Fragment>
  );
}
