import React, { useEffect, useState } from "react";
import tc2 from "tinycolor2";

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

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
  color = "white",
  bgcolor,
}: {
  location: { x: number; y: number };
  icon: JSX.Element;
  cellSize: number;
  boundingBox: BoundingBox;
  tooltip?: string;
  hover?: boolean;
  onClick?: () => void;
  color?: string;
  bgcolor?: string;
}): JSX.Element {
  const relativeLocation = [
    location.x - boundingBox.min.x,
    location.y - boundingBox.min.y,
  ];
  const centerPadding = 0;
  const xTile = relativeLocation[0] + 2;
  const yTile = relativeLocation[1] + 2;
  return (
    <Tooltip describeChild title={`${location.x}, ${location.y}: ${tooltip}`}>
      <IconButton
        onClick={onClick}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          color,
          backgroundColor: bgcolor,
          border: `1px solid ${color}`,
          "&:hover": {
            backgroundColor: tc2(bgcolor || color)
              .setAlpha(bgcolor ? (hover ? 0.2 : 0.8) : hover ? 0.7 : 0.1)
              .toRgbString(),
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
