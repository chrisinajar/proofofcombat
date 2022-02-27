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
  useEnchantItemMutation,
  EnchantmentType,
} from "src/generated/graphql";

import {
  pureEnchantmentDisplayName,
  itemDisplayName,
  enchantmentDisplayName,
  addSpaces,
  isItemEquipped,
} from "src/helpers";

export function EnchantItems({
  hero,
  disabled,
}: {
  hero: Hero;
  disabled: boolean;
}): JSX.Element {
  let [value, setValue] = useState<string>("");
  let [enchantment, setEnchantment] = useState<EnchantmentType | "">("");
  const [enchantItemMutation, { loading }] = useEnchantItemMutation();
  const enchantableItems = hero.inventory
    .filter((item) => {
      if (item.type === InventoryItemType.Quest) {
        return false;
      }

      return !item.enchantment;
    })
    .sort((a, b) => a.level - b.level);
  const enchantmentsFound: { [x in EnchantmentType]?: true } = {};
  const enchantments: EnchantmentType[] = [...hero.enchantments]
    .sort()
    .filter((ench) => {
      if (enchantmentsFound[ench]) {
        return false;
      }
      enchantmentsFound[ench] = true;
      return true;
    });

  let selectedItem = enchantableItems.find((item) => item.id === value);

  if (!selectedItem && value.length) {
    if (enchantableItems.length) {
      selectedItem = enchantableItems[0];
      value = selectedItem.id;
    } else {
      value = "";
    }
  }

  let selectedEnchantment = enchantments.find((ench) => ench === enchantment);

  if (!selectedEnchantment && value.length) {
    if (enchantments.length) {
      selectedEnchantment = enchantments[0];
      enchantment = selectedEnchantment;
    } else {
      enchantment = "";
    }
  }

  async function handleEnchantItem() {
    if (enchantment === "") {
      return;
    }
    try {
      await enchantItemMutation({
        variables: {
          item: value,
          enchantment,
        },
      });
    } catch (e) {}
  }

  const enchantmentDustCost = selectedItem ? selectedItem.level : 0;

  const baseItemLabel = "Select base item";
  const enchantmentLabel = "Select an enchantment";

  return (
    <React.Fragment>
      <Typography variant="body1">
        Enchanting allows you to combine a pure item and pure enchantment into a
        new enchanted item! You can acquire pure enchantments through
        disenchanting items.
      </Typography>
      <br />
      <FormControl fullWidth sx={{ margin: 1 }}>
        <InputLabel id="enchant-baseItem-select-label">
          {baseItemLabel}
        </InputLabel>
        <Select
          id="enchant-baseItem-select"
          labelId="enchant-baseItem-select-label"
          value={value || ""}
          label={baseItemLabel}
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
          {enchantableItems.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {itemDisplayName(item)}{" "}
                {isItemEquipped(hero, item) && "*EQUIPPED*"}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ margin: 1 }}>
        <InputLabel id="enchant-enchantment-select-label">
          {enchantmentLabel}
        </InputLabel>
        <Select
          id="enchant-enchantment-select"
          labelId="enchant-enchantment-select-label"
          value={enchantment || ""}
          label={enchantmentLabel}
          onChange={(e) => {
            const ench = e.target.value;
            const existingEnchantment = enchantments.find(
              (ench) => ench === enchantment
            );
            if (existingEnchantment) {
              setEnchantment(existingEnchantment);
            }
          }}
        >
          {enchantments.map((ench) => {
            return (
              <MenuItem key={ench} value={ench}>
                {pureEnchantmentDisplayName(ench)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button
        fullWidth
        variant="contained"
        disabled={
          !selectedItem ||
          disabled ||
          loading ||
          enchantmentDustCost > hero.enchantingDust
        }
        color="success"
        onClick={handleEnchantItem}
      >
        {selectedItem && enchantment !== "" && (
          <Box>
            <Typography>
              Create{" "}
              <b>
                {enchantmentDisplayName(selectedItem.baseItem, enchantment)}
              </b>
            </Typography>
            <Typography variant="subtitle2">
              Costs {enchantmentDustCost.toLocaleString()} Enchantment Dust
            </Typography>
          </Box>
        )}
        {!selectedItem && "Select Item"}
      </Button>
    </React.Fragment>
  );
}
