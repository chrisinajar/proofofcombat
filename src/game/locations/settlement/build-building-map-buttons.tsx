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
  boundingBox,
  capital,
  type,
  range,
}: {
  cellSize: number;
  boundingBox: BoundingBox;
  capital: PlayerLocation;
  type: PlayerLocationType;
  range: number;
}): JSX.Element {
  const [buildBuildingMutation] = useBuildBuildingMutation();
  const allLocations = capital.connections
    .map((conn) => conn.location)
    .concat(capital.location);

  // console.log(boundingBox, allLocations, range);

  const min = {
    x: Math.max(0, boundingBox.min.x - 1),
    y: Math.max(0, boundingBox.min.y - 1),
  };
  const max = {
    x: Math.min(127, boundingBox.max.x + 1),
    y: Math.min(95, boundingBox.max.y + 1),
  };

  const entries: Location[] = useMemo(() => {
    const entries: Location[] = [];
    for (let ix = min.x, lx = max.x; ix <= lx; ++ix) {
      for (let iy = min.y, ly = max.y; iy <= ly; ++iy) {
        if (
          Math.abs(ix - capital.location.x) +
            Math.abs(iy - capital.location.y) >=
          range
        ) {
          continue;
        }
        const location = allLocations.find((e) => e.x === ix && e.y === iy);
        if (location) {
          continue;
        }
        const neightbor = allLocations.find(
          (e) =>
            (e.x === ix + 1 && e.y === iy) ||
            (e.x === ix - 1 && e.y === iy) ||
            (e.x === ix && e.y === iy + 1) ||
            (e.x === ix && e.y === iy - 1)
        );
        if (!neightbor) {
          continue;
        }

        entries.push({ x: ix, y: iy, map: capital.location.map });
      }
    }
    return entries;
  }, [allLocations.length, min.x, min.y, max.x, max.y, range]);

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

  return (
    <React.Fragment>
      {entries.map((entry) => (
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
      ))}
    </React.Fragment>
  );
}
