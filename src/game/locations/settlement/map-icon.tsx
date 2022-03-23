import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

import { Location } from "src/generated/graphql";

import { BoundingBox, getBoundingBox } from "./helpers";

export function MapIcon({
  location,
  icon,
  cellSize,
  boundingBox,
  tooltip,
  hover = false,
  onClick,
}: {
  location: Location;
  icon: JSX.Element;
  cellSize: number;
  boundingBox: BoundingBox;
  tooltip?: string;
  hover?: boolean;
  onClick?: () => void;
}): JSX.Element {
  const relativeLocation = [
    location.x - boundingBox.min.x,
    location.y - boundingBox.min.y,
  ];
  const centerPadding = 0;
  const xTile = relativeLocation[0] + 2;
  const yTile = relativeLocation[1] + 2;
  return (
    <Tooltip
      title={
        <React.Fragment>
          {location.x}, {location.y}
          <br />
          {tooltip}
        </React.Fragment>
      }
    >
      <Box
        onClick={onClick}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          position: "absolute",
          left: `${xTile * cellSize}px`,
          top: `${yTile * cellSize}px`,
          backgroundColor: "rgba(22, 0, 22, 0.4)",
          "&:hover": hover
            ? {
                backgroundColor: "rgba(33, 5, 33, 0.8)",
              }
            : undefined,
        }}
      >
        {icon}
      </Box>
    </Tooltip>
  );
}
