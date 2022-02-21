import React, { useState } from "react";

import Grid from "@mui/material/Grid";

import { Layout } from "src/components/layout";
import RawLocationData from "./location-data.json";

type IndividualLocation = {
  terrain: TerrainType;
};

type MapNames = "default";

type LocationDataType = {
  [x in MapNames]: {
    locations: IndividualLocation[][];
  };
};
const LocationData: LocationDataType = RawLocationData as LocationDataType;

const gridSize = 16;

type TerrainType = "land" | "water";
const terrainTypes: TerrainType[] = ["land", "water"];

const terrainColors: { [x in TerrainType]: string } = {
  land: "brown",
  water: "blue",
};

function saveLocationData() {
  console.log(JSON.stringify(LocationData));
}

declare global {
  interface Window {
    saveLocationData: () => void;
  }
}

if (typeof window !== "undefined") {
  window.saveLocationData = saveLocationData;
}

function useForceUpdate(): () => void {
  const [value, setValue] = useState<number>(0);
  return () => setValue((value) => (value + 1) % 3);
}

function SpecialLocationEditor({
  x,
  y,
  rerender,
}: {
  x: number;
  y: number;
  rerender: () => void;
}): JSX.Element {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x * gridSize}px`,
        top: `${y * gridSize}px`,
        width: `${gridSize}px`,
        height: `${gridSize}px`,
        backgroundColor: "white",
        opacity: 0.1,
        border: "1px solid black",
      }}
    />
  );
}

function TerrainEditor({
  x,
  y,
  rerender,
}: {
  x: number;
  y: number;
  rerender: () => void;
}): JSX.Element {
  const rerenderLocal = useForceUpdate();
  const location = LocationData.default.locations[x][y];
  function setTerrain(
    terrainX: number,
    terrainY: number,
    terrain: TerrainType
  ) {
    LocationData.default.locations[terrainX][terrainY].terrain = terrain;
  }
  function getNextTerrain(terrainX: number, terrainY: number): TerrainType {
    const nextTerrainIndex =
      (terrainTypes.indexOf(
        LocationData.default.locations[terrainX][terrainY].terrain
      ) +
        1) %
      terrainTypes.length;

    return terrainTypes[nextTerrainIndex];
  }
  function toggleTerrain(terrainX: number, terrainY: number) {
    setTerrain(terrainX, terrainY, getNextTerrain(terrainX, terrainY));
  }
  function floodFill(terrainX: number, terrainY: number, terrain: TerrainType) {
    if (terrainX >= 128 || terrainY >= 96 || terrainX < 0 || terrainY < 0) {
      return;
    }
    if (
      LocationData.default.locations[terrainX][terrainY].terrain === terrain
    ) {
      return;
    }
    console.log("Flooding from", terrainX, terrainY);

    setTerrain(terrainX, terrainY, terrain);

    floodFill(terrainX + 1, terrainY, terrain);
    floodFill(terrainX - 1, terrainY, terrain);
    floodFill(terrainX, terrainY + 1, terrain);
    floodFill(terrainX, terrainY - 1, terrain);
  }
  function handleClick(e: React.MouseEvent) {
    if (e.shiftKey) {
      console.log("FLOOD");
      const nextTerrain = getNextTerrain(x, y);
      floodFill(x, y, nextTerrain);
      rerender();
    } else {
      toggleTerrain(x, y);

      rerenderLocal();
    }
  }
  function handleMouseEnter(e: React.MouseEvent) {
    if (e.buttons === 1) {
      toggleTerrain(x, y);
      rerenderLocal();
    }
  }
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{
        position: "absolute",
        left: `${x * gridSize}px`,
        top: `${y * gridSize}px`,
        width: `${gridSize}px`,
        height: `${gridSize}px`,
        backgroundColor: terrainColors[location.terrain],
        opacity: 0.5,
        border: "1px solid black",
      }}
    />
  );
}
export default function MapPreview(): JSX.Element {
  const rerender = useForceUpdate();
  return (
    <div
      style={{
        position: "relative",
        width: `${128 * gridSize}px`,
        height: `${96 * gridSize}px`,
        backgroundImage: "url(maps/default.jpg)",
        backgroundSize: "100% 100%",
      }}
    >
      {LocationData.default.locations.map((worldColumn, x) =>
        worldColumn.map((location, y) => {
          return (
            <TerrainEditor key={`${x}, ${y}`} x={x} y={y} rerender={rerender} />
          );
        })
      )}
    </div>
  );
}
