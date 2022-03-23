import React from "react";

import ConstructionIcon from "@mui/icons-material/Construction";

import { PlayerLocation, Location } from "src/generated/graphql";

import { BoundingBox } from "./helpers";
import { MapIcon } from "./map-icon";

export function BuildBuildingMapButtons({
  cellSize,
  boundingBox,
  capital,
}: {
  cellSize: number;
  boundingBox: BoundingBox;
  capital: PlayerLocation;
}): JSX.Element {
  const entries: Location[] = [];
  const allLocations = capital.connections
    .map((conn) => conn.location)
    .concat(capital.location);
  console.log(boundingBox, allLocations);

  const min = {
    x: Math.max(0, boundingBox.min.x - 1),
    y: Math.max(0, boundingBox.min.y - 1),
  };
  const max = {
    x: Math.min(127, boundingBox.max.x + 1),
    y: Math.min(95, boundingBox.max.y + 1),
  };

  for (let ix = min.x, lx = max.x; ix <= lx; ++ix) {
    for (let iy = min.y, ly = max.y; iy <= ly; ++iy) {
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
      console.log(ix, iy);
    }
  }

  return (
    <React.Fragment>
      {entries.map((entry) => (
        <MapIcon
          hover
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
