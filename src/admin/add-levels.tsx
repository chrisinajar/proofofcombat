import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useAddLevelsMutation, AdminAccountQuery } from "src/generated/graphql";

export function AddLevels({
  account,
}: {
  account: AdminAccountQuery["account"];
}): JSX.Element {
  const [levels, setLevels] = useState<string>("");
  const [giveGoldMutation, { data }] = useAddLevelsMutation();

  function handleAddLevels() {
    if (!levels.length) {
      return;
    }
    giveGoldMutation({
      variables: {
        id: account.id,
        levels: Number(levels),
      },
    });
  }

  return (
    <Box>
      <TextField value={levels} onChange={(e) => setLevels(e.target.value)} />
      <Button onClick={handleAddLevels}>
        Add {Number(levels).toLocaleString()} levels to {account.name}
      </Button>
      {data?.addLevels?.id}
    </Box>
  );
}
