import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import NoSsr from "@mui/material/NoSsr";

import { Layout } from "src/components/layout";
import RawLocationData from "./location-data.json";

type TerrainType = "land" | "water" | "forbidden";
type MapNames = "default" | "void";
type SpecialLocationType =
  | "dock"
  | "quest"
  | "city"
  | "bridge"
  | "tavern"
  | "hermit"
  | "altar"
  | "fortress";

type LocationData = {
  terrain: TerrainType;
};

type LocationDataType = {
  [x in MapNames]: {
    locations: LocationData[][];
    specialLocations: {
      x: number;
      y: number;
      name: string;
      type: SpecialLocationType;
    }[];
  };
};

const LocationData: LocationDataType = RawLocationData as LocationDataType;

const gridSize = 16;

const terrainTypes: TerrainType[] = ["land", "forbidden", "water"];

const terrainColors: { [x in TerrainType]: string } = {
  land: "green",
  forbidden: "red",
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
  const location = LocationData.default.locations[x][y];
  const specialLocation = LocationData.default.specialLocations.find(
    (sloc) => sloc.x === x && sloc.y === y,
  );

  function findTerrainType(
    x: number,
    y: number,
    terrain: TerrainType,
    direction: number,
    maxMagnitude: number,
    magnitude: number,
  ) {
    const checkLocation = LocationData.default.locations[x][y];
    console.log(x, y, checkLocation.terrain, terrain);
    if (checkLocation.terrain === terrain) {
      return;
    }
    switch (direction) {
      case 0:
        x = x + 1;
        break;
      case 1:
        y = y - 1;
        break;
      case 2:
        x = x - 1;
        break;
      case 3:
        y = y + 1;
        break;
    }

    magnitude = magnitude - 1;
    if (magnitude === 0) {
      direction = (direction + 1) % 4;
      magnitude = maxMagnitude;
    }
    if (direction === 0) {
      magnitude++;
    }
    findTerrainType(x, y, terrain, direction, maxMagnitude, magnitude);
  }

  function handleClick() {
    console.log("Clicked on", x, y, location.terrain);
    findTerrainType(x, y, "land", 0, 1, 1);
  }

  // if (specialLocation) {
  //   console.log({ x, y, specialLocation });
  // }

  if (!specialLocation) {
    return (
      <Tooltip title={`${x}, ${y}`}>
        <div
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
      </Tooltip>
    );
  }

  return (
    <Tooltip
      title={`${specialLocation.type} - ${specialLocation.name} (${x}, ${y})`}
    >
      <div
        onClick={handleClick}
        style={{
          position: "absolute",
          left: `${x * gridSize}px`,
          top: `${y * gridSize}px`,
          width: `${gridSize}px`,
          height: `${gridSize}px`,
          backgroundColor: terrainColors[location.terrain],
          opacity: 0.8,
          border: "3px solid purple",
        }}
      />
    </Tooltip>
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
    terrain: TerrainType,
  ) {
    LocationData.default.locations[terrainX][terrainY].terrain = terrain;
  }
  function getNextTerrain(terrainX: number, terrainY: number): TerrainType {
    const nextTerrainIndex =
      (terrainTypes.indexOf(
        LocationData.default.locations[terrainX][terrainY].terrain,
      ) +
        1) %
      terrainTypes.length;

    return terrainTypes[nextTerrainIndex];
  }
  function toggleTerrain(terrainX: number, terrainY: number) {
    setTerrain(terrainX, terrainY, getNextTerrain(terrainX, terrainY));
  }
  function floodFill(
    terrainX: number,
    terrainY: number,
    terrain: TerrainType,
    fillTerrain: TerrainType,
  ) {
    if (terrainX >= 128 || terrainY >= 96 || terrainX < 0 || terrainY < 0) {
      return;
    }
    if (
      LocationData.default.locations[terrainX][terrainY].terrain !== fillTerrain
    ) {
      return;
    }
    console.log("Flooding from", terrainX, terrainY);

    setTerrain(terrainX, terrainY, terrain);

    floodFill(terrainX + 1, terrainY, terrain, fillTerrain);
    floodFill(terrainX - 1, terrainY, terrain, fillTerrain);
    floodFill(terrainX, terrainY + 1, terrain, fillTerrain);
    floodFill(terrainX, terrainY - 1, terrain, fillTerrain);
  }
  function handleClick(e: React.MouseEvent) {
    if (e.shiftKey) {
      console.log("FLOOD");
      const nextTerrain = getNextTerrain(x, y);
      floodFill(
        x,
        y,
        nextTerrain,
        LocationData.default.locations[x][y].terrain,
      );
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
    <div style={{ overflow: "scroll" }}>
      <div
        style={{
          position: "relative",
          width: `${128 * gridSize}px`,
          height: `${96 * gridSize}px`,
          backgroundImage: "url(maps/default.jpg)",
          backgroundSize: "100% 100%",
        }}
      >
        <NoSsr>
          {LocationData.default.locations.map((worldColumn, x) =>
            worldColumn.map((location, y) => {
              return (
                <SpecialLocationEditor
                  key={`${x}, ${y}`}
                  x={x}
                  y={y}
                  rerender={rerender}
                />
              );
            }),
          )}
        </NoSsr>
      </div>
    </div>
  );
}
