import React, { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  useStartDungeonMutation,
  useClearDungeonMutation,
  DungeonSelectionMode,
  AdminAccountQuery,
} from "src/generated/graphql";

type Props = {
  account: AdminAccountQuery["account"];
};

export function DungeonTools({ account }: Props): JSX.Element {
  const [mode, setMode] = useState<DungeonSelectionMode>(
    DungeonSelectionMode.LockedOrder,
  );

  const [startDungeon, { loading: startLoading }] = useStartDungeonMutation();
  const [clearDungeon, { loading: clearLoading }] = useClearDungeonMutation();

  const sequence = useMemo(() => {
    // Simple, low-tier land monsters for easy testing
    return ["Giant crab", "Forest imp", "Traveling bandit"];
  }, []);

  async function handleStart() {
    await startDungeon({
      variables: {
        id: account.id,
        sequence,
        selection: mode,
        dungeonId: "test-dungeon-1",
      },
    });
  }

  async function handleClear() {
    await clearDungeon({ variables: { id: account.id } });
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Dungeon Tools
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="dungeon-mode-label">Selection Mode</InputLabel>
          <Select
            labelId="dungeon-mode-label"
            id="dungeon-mode"
            value={mode}
            label="Selection Mode"
            onChange={(e) => setMode(e.target.value as DungeonSelectionMode)}
          >
            <MenuItem value={DungeonSelectionMode.LockedOrder}>Locked order</MenuItem>
            <MenuItem value={DungeonSelectionMode.AnyOrder}>Any order</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleStart}
          disabled={startLoading}
        >
          Start Test Dungeon
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClear}
          disabled={clearLoading}
        >
          Clear Dungeon
        </Button>
      </Stack>
      <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
        Uses sequence: {sequence.join(" → ")}
      </Typography>
    </Box>
  );
}

