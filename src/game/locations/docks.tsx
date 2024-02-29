import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { useDockListQuery, useSailMutation } from "src/generated/graphql";
import { distance2d } from "src/helpers";

type Dock = {
  name: string;
  location: {
    x: number;
    y: number;
  };
};

export function Docks({
  location,
}: {
  location: { name: string; location: { x: number; y: number } };
}): JSX.Element {
  const [sailMutation, { loading }] = useSailMutation();
  const { data: docksData } = useDockListQuery();
  const [dock, setDock] = useState<string>("");
  const sailLabel = "Choose a port to sail to";

  function dockDistance(dock: Dock): number {
    const distance = distance2d(dock.location, location.location);
    return distance;
  }

  function goldCost(dock: Dock): number {
    return Math.round(distance2d(dock.location, location.location) * 12);
  }

  function handleSail() {
    if (!docksData) {
      return;
    }
    const targetDock = docksData.docks.find(
      (otherDock) => otherDock.name === dock,
    );

    if (!targetDock) {
      return;
    }

    sailMutation({
      variables: { x: targetDock.location.x, y: targetDock.location.y },
    });
  }

  return (
    <Box>
      <Typography variant="h5">{location.name}</Typography>
      <Typography>
        The wooden docks creak and sway with the water below.
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="sail-dock-select-label">{sailLabel}</InputLabel>
        <Select
          id="sail-select"
          labelId="sail-dock-select-label"
          value={dock}
          label={sailLabel}
          onChange={(e) => setDock(e.target.value)}
        >
          {docksData?.docks &&
            [...docksData?.docks]
              .sort((a, b) => dockDistance(a) - dockDistance(b))
              .map((dockInstance) => (
                <MenuItem
                  key={dockInstance.name}
                  value={dockInstance.name}
                  disabled={dockInstance.name === location.name}
                >
                  {dockInstance.name}:{" "}
                  {dockInstance.name !== location.name && (
                    <React.Fragment>
                      {goldCost(dockInstance).toLocaleString()} Gold
                    </React.Fragment>
                  )}
                  {dockInstance.name === location.name && "Current location"}
                </MenuItem>
              ))}
        </Select>
        <Button
          onClick={handleSail}
          variant="outlined"
          color="success"
          disabled={!dock.length || loading}
        >
          Sail!
        </Button>
      </FormControl>
    </Box>
  );
}
