import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import {
  useCreateItemMutation,
  BaseAccount,
  EnchantmentType,
  AdminAccountQuery,
} from "src/generated/graphql";

export function CreateItem({
  account,
}: {
  account: AdminAccountQuery["account"];
}): JSX.Element {
  const [baseItem, setBaseItem] = useState<string>("");
  const [enchantment, setEnchantment] = useState<string>("");
  const [createItemMutation, { data }] = useCreateItemMutation();

  function handleCreateItem() {
    if (!baseItem.length) {
      return;
    }
    createItemMutation({
      variables: {
        id: account.id,
        baseItem,
        enchantment: enchantment.length
          ? (enchantment as EnchantmentType)
          : undefined,
      },
    });
  }

  return (
    <Box>
      <TextField
        value={baseItem}
        onChange={(e) => setBaseItem(e.target.value)}
      />
      <TextField
        value={enchantment}
        onChange={(e) => setEnchantment(e.target.value)}
      />
      <Button onClick={handleCreateItem}>Give Item To {account.name}</Button>
      {data?.createItem?.id}
    </Box>
  );
}
