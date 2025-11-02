import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Hero, useReadMapMutation } from "src/generated/graphql";

export function ReadMapMenu({
  hero,
  itemId,
  disabled,
}: {
  hero: Hero;
  itemId?: string | null;
  disabled: boolean;
}): JSX.Element | null {
  const [readMap, { data, loading, error }] = useReadMapMutation();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (data?.readMap?.message) {
      setMessage(data.readMap.message);
    }
  }, [data]);

  useEffect(() => {
    // Clear message when switching items
    setMessage("");
  }, [itemId]);

  async function onRead() {
    if (!itemId) return;
    try {
      await readMap({ variables: { itemId } });
    } catch (e) {
      // ignore; error state rendered below
    }
  }

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="h3" sx={{ fontSize: "1.2rem", mb: 1 }}>
        Treasure Map
      </Typography>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
        <Button
          variant="contained"
          size="small"
          onClick={onRead}
          disabled={disabled || !itemId || loading}
        >
          {loading ? "Reading..." : "Read Map"}
        </Button>
        {!itemId && (
          <Typography variant="caption" color="text.secondary">
            Select a Treasure Map to read
          </Typography>
        )}
      </Box>
      {error && (
        <Typography variant="body2" color="error">
          {String(error.message || error)}
        </Typography>
      )}
      {message && (
        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

