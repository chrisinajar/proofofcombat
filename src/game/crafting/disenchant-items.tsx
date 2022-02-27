import React, { useState, useEffect } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import {
  Hero,
  InventoryItemType,
  useDisenchantItemMutation,
} from "src/generated/graphql";

import { itemDisplayName, addSpaces, isItemEquipped } from "src/helpers";

export function DisenchantItems({
  hero,
  disabled,
}: {
  hero: Hero;
  disabled: boolean;
}): JSX.Element {
  let [value, setValue] = useState<string>("");
  const [disenchantItemMutation, { loading }] = useDisenchantItemMutation();
  const disenchantableItems = hero.inventory
    .filter((item) => {
      if (item.type === InventoryItemType.Quest) {
        return false;
      }
      if (isItemEquipped(hero, item)) {
        return false;
      }

      return !!item.enchantment;
    })
    .sort((a, b) => a.level - b.level);

  let selectedItem = disenchantableItems.find((item) => item.id === value);

  if (!selectedItem && value.length) {
    if (disenchantableItems.length) {
      selectedItem = disenchantableItems[0];
      value = selectedItem.id;
    } else {
      value = "";
    }
  }

  async function handleDisenchantItem() {
    try {
      await disenchantItemMutation({
        variables: {
          item: value,
        },
      });
    } catch (e) {}
  }

  const label = "Select item to disenchant";
  const enchantmentDustCost = selectedItem ? selectedItem.level : 0;

  return (
    <React.Fragment>
      <Typography variant="body1">
        Select an item to split from its enchantment. You will keep both the
        base item and the enchantment itself for use in further crafting.
      </Typography>
      <br />
      <FormControl fullWidth>
        <InputLabel id="disenchant-select-label">{label}</InputLabel>
        <Select
          id="disenchant-select"
          labelId="disenchant-select-label"
          value={value || ""}
          label={label}
          onChange={(e) => {
            const itemId = e.target.value;
            const inventoryItem = hero.inventory.find(
              (item) => item.id === itemId
            );
            if (!inventoryItem) {
              return;
            }
            setValue(itemId);
          }}
        >
          {disenchantableItems.map((item) => {
            return (
              <MenuItem
                key={item.id}
                value={item.id}
                disabled={isItemEquipped(hero, item)}
              >
                {itemDisplayName(item)}{" "}
                {isItemEquipped(hero, item) && "*EQUIPPED*"}
              </MenuItem>
            );
          })}
        </Select>
        <Button
          variant="contained"
          disabled={
            !selectedItem ||
            disabled ||
            loading ||
            enchantmentDustCost > hero.enchantingDust
          }
          color="error"
          onClick={handleDisenchantItem}
        >
          {selectedItem && (
            <Box>
              <Typography>
                Disenchant <b>{itemDisplayName(selectedItem)}</b>
              </Typography>
              <Typography variant="subtitle2">
                Costs {enchantmentDustCost.toLocaleString()} Enchantment Dust
              </Typography>
            </Box>
          )}
          {!selectedItem && "Select Item"}
        </Button>
      </FormControl>
    </React.Fragment>
  );
}
