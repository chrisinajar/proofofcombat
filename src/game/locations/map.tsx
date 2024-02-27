import React from "react";
import styled from "@emotion/styled";

import { useHero } from "src/hooks/use-hero";
import { Location } from "src/generated/graphql";

const imageCellSize = 16;

type CellProps = { cellSize: number };
const StyledMapTable = styled.table<CellProps>`
  border-collapse: collapse;

  tr {
    margin: 0px;
    padding: 0px;
    td {
      position: relative;
      width: ${({ cellSize }) => cellSize}px;
      height: ${({ cellSize }) => cellSize}px;
      overflow: visible;
      margin: 0px;
      padding: 0px;
    }
  }
`;

export function Map({
  location,
  minimapSize = [24, 24],
  gridSize = [128, 96],
  cellSize = 16,
  renderCell = () => null,
}: {
  location: Location;
  minimapSize?: [number, number];
  gridSize?: [number, number];
  cellSize?: number;
  renderCell: (loc: { x: number; y: number }) => JSX.Element | null;
}): JSX.Element | null {
  const centerPoint = [
    Math.round(
      Math.min(
        gridSize[0] - minimapSize[0],
        Math.max(0, location.x - minimapSize[0] / 2),
      ),
    ),
    Math.round(
      Math.min(
        gridSize[1] - minimapSize[1],
        Math.max(0, location.y - minimapSize[1] / 2),
      ),
    ),
  ];

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        backgroundImage: `url(/maps/${location.map}.jpg)`,
        backgroundPosition: `-${centerPoint[0] * cellSize}px -${
          centerPoint[1] * cellSize
        }px`,
        backgroundSize: `${128 * cellSize}px ${96 * cellSize}px `,
        width: `${minimapSize[0] * cellSize}px`,
        height: `${minimapSize[1] * cellSize}px`,
      }}
    >
      <StyledMapTable cellSize={cellSize}>
        <tbody>
          {[...Array(minimapSize[1])].map((v, i) => (
            <tr key={`row-${centerPoint[1] + i}`}>
              {[...Array(minimapSize[0])].map((v2, j) => (
                <td key={`cell-${centerPoint[0] + j}-${centerPoint[1] + i}`}>
                  {renderCell({ x: centerPoint[0] + j, y: centerPoint[1] + i })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledMapTable>
    </div>
  );
}
