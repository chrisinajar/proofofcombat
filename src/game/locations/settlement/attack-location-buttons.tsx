import React from "react";

import CastleIcon from "@mui/icons-material/Castle";

import { PlayerLocation } from "src/generated/graphql";

import { BoundingBox } from "./helpers";
import { MapIcon } from "./map-icon";

type MinimalLocation = Pick<PlayerLocation, "location">;

export function AttackLocationButtons({
  cellSize,
  x,
  y,
  boundingBox,
  onClick,
  adjacentTiles,
}: {
  cellSize: number;
  x: number;
  y: number;
  boundingBox: BoundingBox;
  onClick: (location: MinimalLocation) => void;
  adjacentTiles: MinimalLocation[];
}): JSX.Element | null {
  const location = adjacentTiles.find(
    (loc) => loc.location.x === x && loc.location.y === y,
  );

  if (!location) {
    return null;
  }

  return (
    <MapIcon
      key={`${x}-${y}`}
      onClick={() => onClick(location)}
      hover
      cellSize={cellSize}
      boundingBox={boundingBox}
      location={{ x, y }}
      tooltip="Attack here"
      color="rgb(140, 0, 0)"
      icon={<CastleIcon />}
    />
  );
}
