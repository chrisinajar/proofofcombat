import React, { useState, useEffect } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Hero, InventoryItemType } from "src/generated/graphql";

import { itemDisplayName, addSpaces, isItemEquipped } from "src/helpers";

export function DestroyItems({ hero }: { hero: Hero }): JSX.Element {
  let [value, setValue] = useState<string>("");
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

  const selectedItem = destroyableItems.find((item) => item.id === value);

  if (!selectedItem && value.length) {
    if (destroyableItems.length) {
      value = destroyableItems[0].id;
    } else {
      value = "";
    }
  }

  return (
    <React.Fragment>
      <Typography variant="body1">
        Select an enchanted item you would like to destroy, smashing it with the
        crafting hammer into fine Enchanting Dust.
      </Typography>
      <br />
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
        <Button variant="contained" disabled={!selectedItem} color="error">
          {selectedItem && (
            <React.Fragment>
              Destroy {itemDisplayName(selectedItem)}
            </React.Fragment>
          )}
          {!selectedItem && "Select Item"}
        </Button>
      </FormControl>
    </React.Fragment>
  );
}
