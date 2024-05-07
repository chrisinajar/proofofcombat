import React, { useState, useEffect } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import {
  Hero,
  InventoryItem,
  InventoryItemType,
  useEquipItemMutation,
  EnchantmentType,
} from "src/generated/graphql";

import {
  itemSorter,
  itemDisplayName,
  getEnchantmentDisplay,
} from "src/helpers";

import { Slots } from "./types";

function canEquipTo(slot: Slots, item: InventoryItem): boolean {
  switch (slot) {
    case "rightHand":
    case "leftHand":
      if (
        item.type === InventoryItemType.MeleeWeapon ||
        item.type === InventoryItemType.RangedWeapon ||
        item.type === InventoryItemType.Shield ||
        item.type === InventoryItemType.SpellFocus
      ) {
        return true;
      }
      return false;
      break;

    case "bodyArmor":
      if (item.type === InventoryItemType.BodyArmor) {
        return true;
      }
      return false;
      break;
    case "handArmor":
      if (item.type === InventoryItemType.HandArmor) {
        return true;
      }
      return false;
      break;
    case "legArmor":
      if (item.type === InventoryItemType.LegArmor) {
        return true;
      }
      return false;
      break;
    case "headArmor":
      if (item.type === InventoryItemType.HeadArmor) {
        return true;
      }
      return false;
      break;
    case "footArmor":
      if (item.type === InventoryItemType.FootArmor) {
        return true;
      }
      return false;
      break;
    // case "accessory":
    default:
      return false;
      break;
  }
}

export function EquipmentSlot({
  hero,
  slot,
  label,
  onEquip,
  disabled,
}: {
  hero: Hero;
  slot: Slots;
  label: string;
  onEquip: (slot: Slots, id: string) => void;
  disabled: boolean;
}): JSX.Element {
  const equipped = hero.equipment[slot]?.id;

  const otherEquipmentSlots: Slots[] = [
    "leftHand",
    "rightHand",
    "bodyArmor",
    "handArmor",
    "legArmor",
    "headArmor",
    "footArmor",
  ];
  const otherEquippedItems = otherEquipmentSlots
    .filter(
      (otherSlot: Slots) => hero.equipment[otherSlot] && otherSlot !== slot,
    )
    .map((otherSlot: Slots) => hero.equipment[otherSlot]?.id);

  const [value, setValue] = useState<string>(equipped || "");
  const items = hero.inventory
    .filter((item) => canEquipTo(slot, item))
    .sort(itemSorter);

  const quantityMap: { [x in string]: number } = {};
  items.forEach((item) => {
    const displayName = itemDisplayName(item);
    if (quantityMap[displayName]) {
      quantityMap[displayName] += 1;
    } else {
      quantityMap[displayName] = 1;
    }
  });

  const uniqueItems: InventoryItem[] = Object.keys(quantityMap).map(
    (displayName) => {
      const item = items.find((i) => itemDisplayName(i) === displayName);
      return item;
    },
  ) as InventoryItem[];

  return (
    <React.Fragment>
      <div>
        <FormControl fullWidth>
          <InputLabel id={`${slot}-equip-select-label`}>{label}</InputLabel>
          <Select
            id={`${slot}-equip-select`}
            labelId={`${slot}-equip-select-label`}
            value={equipped || ""}
            label={label}
            disabled={disabled}
            onChange={(e) => {
              setValue(e.target.value);
              onEquip(slot, e.target.value);
            }}
          >
            {uniqueItems.map((inventoryItem) => {
              return (
                <MenuItem
                  key={inventoryItem.id}
                  value={inventoryItem.id}
                  disabled={otherEquippedItems.indexOf(inventoryItem.id) >= 0}
                >
                  {inventoryItem.id === equipped ? (
                    <b>{itemDisplayName(inventoryItem)}</b>
                  ) : (
                    <>
                      {itemDisplayName(inventoryItem)}
                      {quantityMap[itemDisplayName(inventoryItem)] > 1
                        ? ` x${quantityMap[itemDisplayName(inventoryItem)]}`
                        : ""}
                    </>
                  )}
                  <Typography
                    variant="caption"
                    sx={{ color: "info.secondary" }}
                  >
                    &nbsp;Lvl. {inventoryItem.level}
                  </Typography>
                  {inventoryItem.enchantment && (
                    <Typography variant="subtitle2" sx={{ color: "info.main" }}>
                      &nbsp;{getEnchantmentDisplay(inventoryItem.enchantment)}
                    </Typography>
                  )}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </React.Fragment>
  );
}
