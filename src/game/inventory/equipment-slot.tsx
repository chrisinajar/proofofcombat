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
  ArtifactAttributeType,
} from "src/generated/graphql";

import { itemSorter, itemDisplayName, getEnchantmentDisplay } from "src/helpers";
import { modifierText } from "src/helpers";
import { visuallyHidden } from "@mui/utils";

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

function isWeapon(type: InventoryItemType): boolean {
  return (
    type === InventoryItemType.MeleeWeapon ||
    type === InventoryItemType.RangedWeapon ||
    type === InventoryItemType.SpellFocus
  );
}

function isArmor(type: InventoryItemType): boolean {
  return (
    type === InventoryItemType.BodyArmor ||
    type === InventoryItemType.HandArmor ||
    type === InventoryItemType.LegArmor ||
    type === InventoryItemType.HeadArmor ||
    type === InventoryItemType.FootArmor ||
    type === InventoryItemType.Shield
  );
}

function computeBaseWeaponDamage(level: number): number {
  const increasedBaseDamage = 20;
  const base = Math.max(1, Math.pow(1.05, level) * level * 8 + increasedBaseDamage);
  return Math.round(base);
}

const ArmorSlotPenalty: Record<InventoryItemType, number> = {
  [InventoryItemType.BodyArmor]: 1,
  [InventoryItemType.FootArmor]: 3,
  [InventoryItemType.HandArmor]: 3,
  [InventoryItemType.HeadArmor]: 2,
  [InventoryItemType.LegArmor]: 2,
  [InventoryItemType.Shield]: 1,
  [InventoryItemType.Accessory]: 0,
  [InventoryItemType.MeleeWeapon]: 0,
  [InventoryItemType.Quest]: 0,
  [InventoryItemType.RangedWeapon]: 0,
  [InventoryItemType.SpellFocus]: 0,
};

function armorForTier(level: number, type: InventoryItemType): number {
  if (level < 1) return 0;
  const raw = Math.round((level / 2 + Math.log(level)) * Math.pow(level, 1.3));
  const penalty = ArmorSlotPenalty[type] ?? 1;
  const adjusted = penalty > 0 ? (raw + penalty) / penalty : 0;
  return Math.round(adjusted);
}

function weaponDamageWithBuiltIns(item: InventoryItem): number | undefined {
  // Prefer server-computed field when available
  const serverVal = (item as any).baseDamage as number | undefined;
  if (typeof serverVal === "number") return serverVal;
  if (!isWeapon(item.type)) return undefined;
  const base = computeBaseWeaponDamage(item.level);
  const flat = (item.builtIns || [])
    .filter((a) => a.type === ArtifactAttributeType.ItemFlatDamage)
    .reduce((m, a) => m + a.magnitude, 0);
  const bonusSum = (item.builtIns || [])
    .filter((a) => a.type === ArtifactAttributeType.ItemBonusDamage)
    .reduce((m, a) => m + a.magnitude, 0);
  const multiplier = bonusSum ? (bonusSum >= 1 ? bonusSum : 1 + bonusSum) : 1;
  return Math.round(base * multiplier + flat);
}

function armorWithBuiltIns(item: InventoryItem): number | undefined {
  // Prefer server-computed field when available
  const serverVal = (item as any).baseArmor as number | undefined;
  if (typeof serverVal === "number") return serverVal;
  if (!isArmor(item.type)) return undefined;
  const base = armorForTier(item.level, item.type);
  const flat = (item.builtIns || [])
    .filter((a) => a.type === ArtifactAttributeType.ItemFlatArmor)
    .reduce((m, a) => m + a.magnitude, 0);
  const bonusSum = (item.builtIns || [])
    .filter((a) => a.type === ArtifactAttributeType.ItemBonusArmor)
    .reduce((m, a) => m + a.magnitude, 0);
  const multiplier = bonusSum ? (bonusSum >= 1 ? bonusSum : 1 + bonusSum) : 1;
  return Math.round(base * multiplier + flat);
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

  // make sure equipped item is standalone
  const equippedItem = items.find((item) => item.id === equipped);
  if (equippedItem && !uniqueItems.find((item) => item.id === equipped)) {
    uniqueItems.push(equippedItem);
    quantityMap[itemDisplayName(equippedItem)] -= 1;
  }
  // check if item is equipped in another slot and duplicate those
  otherEquippedItems.forEach((id) => {
    const otherEquippedItem = uniqueItems.find((item) => item.id === id);
    if (otherEquippedItem) {
      const name = itemDisplayName(otherEquippedItem);
      if (quantityMap[name] > 1) {
        // there's more than one of this item but the one in the unique item list is already equipped
        // find an unequipped one
        const unequippedItem = items.find(
          (item) => itemDisplayName(item) === name && item.id !== id,
        );
        if (unequippedItem) {
          uniqueItems.push(unequippedItem);
          quantityMap[name] -= 1;
        }
      }
    }
  });

  uniqueItems.sort(itemSorter);

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
              const isSuperior = (inventoryItem.builtIns || []).length > 0;
              const builtInText = (inventoryItem.builtIns || [])
                .map((b) => modifierText(b))
                .join(", ");
              return (
                <MenuItem
                  key={inventoryItem.id}
                  value={inventoryItem.id}
                  disabled={otherEquippedItems.indexOf(inventoryItem.id) >= 0}
                >
                  {isSuperior && (
                    <span style={visuallyHidden as any}>(Superior base) </span>
                  )}
                  {inventoryItem.id === equipped ? (
                    <b>{itemDisplayName(inventoryItem)}</b>
                  ) : (
                    <>
                      {itemDisplayName(inventoryItem)}
                      {quantityMap[itemDisplayName(inventoryItem)] > 1 &&
                      otherEquippedItems.indexOf(inventoryItem.id) === -1
                        ? ` x${quantityMap[itemDisplayName(inventoryItem)]}`
                        : ""}
                    </>
                  )}
                  {isWeapon(inventoryItem.type) ? (
                    <Typography variant="caption" sx={{ color: "info.secondary" }}>
                      &nbsp;{weaponDamageWithBuiltIns(inventoryItem) ?? "—"} Damage
                    </Typography>
                  ) : isArmor(inventoryItem.type) ? (
                    <Typography variant="caption" sx={{ color: "info.secondary" }}>
                      &nbsp;{armorWithBuiltIns(inventoryItem) ?? "—"} Armor
                    </Typography>
                  ) : (
                    <Typography variant="caption" sx={{ color: "info.secondary" }}>
                      &nbsp;Lvl. {inventoryItem.level}
                    </Typography>
                  )}
                  {inventoryItem.enchantment && (
                    <Typography variant="subtitle2" sx={{ color: "info.main" }}>
                      &nbsp;{getEnchantmentDisplay(inventoryItem.enchantment)}
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
        </FormControl>
      </div>
    </React.Fragment>
  );
}
