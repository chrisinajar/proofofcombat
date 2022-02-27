import React, { useState } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Hero, InventoryItemType } from "src/generated/graphql";

import { itemDisplayName, addSpaces, isItemEquipped } from "src/helpers";

export function EnchantItems({ hero }: { hero: Hero }): JSX.Element {
  const [value, setValue] = useState<string>("");
  const destroyableItems = hero.inventory
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
  const label = "Select item to destroy";

  return (
    <React.Fragment>
      Select an enchanted item you would like to destroy, smashing it with the
      crafting hammer into fine Enchanting Dust.
      <FormControl fullWidth>
        <InputLabel id="destroy-select-label">{label}</InputLabel>
        <Select
          id="destroy-select"
          labelId="destroy-select-label"
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
          {destroyableItems.map((item) => {
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
      </FormControl>
    </React.Fragment>
  );
}
