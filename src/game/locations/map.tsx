import React from "react";

import { useHero } from "src/hooks/use-hero";

import { Location } from "src/generated/graphql";

const imageCellSize = 16;

export function Map({
  location,
  minimapSize = [24, 24],
  gridSize = [128, 96],
  cellSize = 16,
  indicatorSize = 8,
}: {
  location: Location;
  minimapSize?: [number, number];
  gridSize?: [number, number];
  cellSize?: number;
  indicatorSize?: number;
}): JSX.Element | null {
  const centerPoint = [
    Math.round(
      Math.min(
        gridSize[0] - minimapSize[0],
        Math.max(0, location.x - minimapSize[0] / 2)
      )
    ),
    Math.round(
      Math.min(
        gridSize[1] - minimapSize[1],
        Math.max(0, location.y - minimapSize[1] / 2)
      )
    ),
  ];

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        backgroundImage: "url(/maps/default.jpg)",
        backgroundPosition: `-${centerPoint[0] * cellSize}px -${
          centerPoint[1] * cellSize
        }px`,
        backgroundSize: `${128 * cellSize}px ${96 * cellSize}px `,
        width: `${minimapSize[0] * cellSize}px`,
        height: `${minimapSize[1] * cellSize}px`,
      }}
    >
      <div
        style={{
          position: "absolute",
          borderRadius: `${indicatorSize / 2}px`,
          backgroundColor: "red",
          border: "2px solid rgba(255,255,255,0.3)",

          left: `${
            (location.x - centerPoint[0]) * cellSize +
            (cellSize - indicatorSize) / 2
          }px`,
          top: `${
            (location.y - centerPoint[1]) * cellSize +
            (cellSize - indicatorSize) / 2
          }px`,
          width: `${indicatorSize}px`,
          height: `${indicatorSize}px`,
        }}
      />
    </div>
  );
}
