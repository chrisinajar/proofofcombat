import React from "react";

import { useHero } from "src/hooks/use-hero";

const minimapSize = [16, 16];
const gridSize = [128, 96];
const cellSize = 16;
const indicatorSize = 8;

export function Map(): JSX.Element | null {
  const hero = useHero();
  if (!hero) {
    return null;
  }

  const { location } = hero;

  const centerPoint = [
    Math.round(
      Math.min(
        gridSize[0] - minimapSize[0] / 2,
        Math.max(0, location.x - minimapSize[0] / 2)
      )
    ),
    Math.round(
      Math.min(
        gridSize[1] - minimapSize[1] / 2,
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
