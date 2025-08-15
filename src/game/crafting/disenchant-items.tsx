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
  EnchantmentType,
} from "src/generated/graphql";

import {
  itemDisplayName,
  addSpaces,
  isItemEquipped,
  itemSorter,
  itemImprovesCrafting,
  pureEnchantmentDisplayName,
  getEnchantmentDisplay,
} from "src/helpers";
import { modifierText } from "src/helpers";
import { visuallyHidden } from "@mui/utils";

export function DisenchantItems({
  hero,
  disabled,
}: {
  hero: Hero;
  disabled: boolean;
}): JSX.Element {
  let [selectedEnchantment, setSelectedEnchantment] = useState<string>("");
  let [value, setValue] = useState<string>("");
  const hasImprovedCrafting = !!hero.inventory.find((item) =>
    itemImprovesCrafting(item.baseItem),
  );
  const [disenchantItemMutation, { loading }] = useDisenchantItemMutation();
  const disenchantableItems = hero.inventory.filter((item) => {
    if (item.type === InventoryItemType.Quest) {
      return false;
    }
    if (isItemEquipped(hero, item)) {
      return false;
    }

    return !!item.enchantment;
  });
  const filteredItems = disenchantableItems
    .filter(
      (item) =>
        selectedEnchantment === "" || item.enchantment === selectedEnchantment,
    )
    .sort(itemSorter);

  const destroyableEnchantments: EnchantmentType[] = disenchantableItems
    .filter((item) => !isItemEquipped(hero, item))
    .map((item) => item.enchantment)
    .reduce<EnchantmentType[]>((memo, item) => {
      if (!item) {
        return memo;
      }
      if (memo.indexOf(item) < 0) {
        memo.push(item);
      }
      return memo;
    }, []);

  let selectedItem = filteredItems.find((item) => item.id === value);

  if (!selectedItem && value.length) {
    if (filteredItems.length) {
      selectedItem = filteredItems[0];
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
              (item) => item.id === itemId,
            );
            if (!inventoryItem) {
              return;
            }
            setValue(itemId);
          }}
        >
          {filteredItems.map((item) => {
            const isSuperior = (item.builtIns || []).length > 0;
            const builtInText = (item.builtIns || [])
              .map((b) => modifierText(b))
              .join(", ");
            return (
              <MenuItem
                key={item.id}
                value={item.id}
                disabled={isItemEquipped(hero, item)}
              >
                {isSuperior && (
                  <span style={visuallyHidden as any}>(Superior base) </span>
                )}
                {itemDisplayName(item)}{" "}
                {isItemEquipped(hero, item) && "*EQUIPPED*"}
                {item.enchantment && (
                  <Typography variant="subtitle2" sx={{ color: "info.main" }}>
                    &nbsp;{getEnchantmentDisplay(item.enchantment)}
                  </Typography>
                )}
                {isSuperior && builtInText && (
                  <Typography variant="caption" sx={{ display: "block" }}>
                    {builtInText}
                  </Typography>
                )}
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
      <br />
      <br />
      {hasImprovedCrafting && (
        <FormControl fullWidth>
          <InputLabel id="filter-select-label">
            Filter by enchantment
          </InputLabel>
          <Select
            id="filter-select"
            labelId="filter-select-label"
            value={selectedEnchantment || ""}
            label="Filter by enchantment"
            onChange={(e) => {
              const itemId = e.target.value;
              const inventoryItem = hero.inventory.find(
                (item) => item.enchantment === itemId,
              );
              if (!inventoryItem) {
                return;
              }
              setSelectedEnchantment(itemId);
            }}
          >
            {destroyableEnchantments.map((enchantment) => {
              return (
                <MenuItem key={enchantment} value={enchantment}>
                  {pureEnchantmentDisplayName(enchantment)}
                  {getEnchantmentDisplay(enchantment) !== "???" && (
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "primary.main" }}
                    >
                      &nbsp;{getEnchantmentDisplay(enchantment)}
                    </Typography>
                  )}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </React.Fragment>
  );
}
