import React from "react";

import { useHero } from "src/hooks/use-hero";

const minimapSize = [16, 16];
const gridSize = [132, 99];
const cellSize = 12;

export function Map(): JSX.Element {
  const hero = useHero();
  if (!hero) {
    return;
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

  console.log({ location, centerPoint });
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

          left: `${(location.x - centerPoint[0]) * cellSize}px`,
          top: `${(location.y - centerPoint[1]) * cellSize}px`,
          width: "5px",
          height: "5px",
          backgroundColor: "blue",
        }}
      />
    </div>
  );
}
