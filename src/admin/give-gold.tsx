import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useGiveGoldMutation, AdminAccountQuery } from "src/generated/graphql";

export function GiveGold({
  account,
}: {
  account: AdminAccountQuery["account"];
}): JSX.Element {
  const [amount, setAmount] = useState<string>("");
  const [giveGoldMutation, { data }] = useGiveGoldMutation();

  function handleCreateItem() {
    if (!amount.length) {
      return;
    }
    giveGoldMutation({
      variables: {
        id: account.id,
        amount: Number(amount),
      },
    });
  }

  return (
    <Box>
      <TextField value={amount} onChange={(e) => setAmount(e.target.value)} />
      <Button onClick={handleCreateItem}>
        Give {Number(amount).toLocaleString()} Gold to {account.name}
      </Button>
      {data?.giveGold?.id}
    </Box>
  );
}
