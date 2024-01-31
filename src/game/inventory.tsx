import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import { useHero } from "src/hooks/use-hero";
import { useDelay } from "src/hooks/use-delay";
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
  itemAllowsRebirth,
  itemAllowsCrafting,
  itemAllowsVoidTravel,
  getEnchantmentDisplay,
} from "src/helpers";
import { RebirthMenu } from "./rebirth";
import { CreaftingMenu } from "./crafting";
import { VoidTravelMenu } from "./void-travel";

type Slots =
  | "leftHand"
  | "rightHand"
  | "bodyArmor"
  | "handArmor"
  | "legArmor"
  | "headArmor"
  | "footArmor";

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

function EquipmentSlot({
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
            {items.map((inventoryItem) => (
              <MenuItem
                key={inventoryItem.id}
                value={inventoryItem.id}
                disabled={otherEquippedItems.indexOf(inventoryItem.id) >= 0}
              >
                {inventoryItem.id === equipped ? (
                  <b>{itemDisplayName(inventoryItem)}</b>
                ) : (
                  itemDisplayName(inventoryItem)
                )}
                {inventoryItem.enchantment && (
                  <Typography variant="subtitle2" sx={{ color: "info.main" }}>
                    &nbsp;{getEnchantmentDisplay(inventoryItem.enchantment)}
                  </Typography>
                )}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </React.Fragment>
  );
}

function QuestItems({
  hero,
  disabled,
  onChange,
}: {
  hero: Hero;
  disabled: boolean;
  onChange?: (val: string) => void;
}): JSX.Element {
  const [value, setValue] = useState<string>("");
  const items = hero.inventory
    .filter((item) => item.type === InventoryItemType.Quest)
    // higher level quest items first!
    .sort((a, b) => b.level - a.level);

  const label = "Quest items (passive, always active)";

  const existingItem = hero.inventory.find((item) => item.id === value);

  useEffect(() => {
    if (value.length && !existingItem) {
      setValue("");
    }
  }, [existingItem, value]);

  return (
    <React.Fragment>
      <div>
        <FormControl fullWidth>
          <InputLabel id={`quest-item-label`}>{label}</InputLabel>
          <Select
            id={`quest-item`}
            labelId={`quest-item-label`}
            value={value}
            label={label}
            disabled={disabled}
            onChange={(e) => {
              setValue(e.target.value);
              if (onChange) {
                const actualItem = items.find((i) => i.id === e.target.value);
                if (actualItem) {
                  onChange(actualItem.baseItem);
                }
              }
            }}
          >
            {items.map((inventoryItem) => (
              <MenuItem key={inventoryItem.id} value={inventoryItem.id}>
                {itemDisplayName(inventoryItem)}
                {getEnchantmentDisplay(inventoryItem.baseItem) !== "???" && (
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "primary.main" }}
                  >
                    &nbsp;{getEnchantmentDisplay(inventoryItem.baseItem)}
                  </Typography>
                )}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </React.Fragment>
  );
}

export function Inventory(): JSX.Element | null {
  const [currentDelay] = useDelay();
  const [equipItemMutation, { loading }] = useEquipItemMutation();
  const [selectedQuestItem, setSelectedQuestItem] = useState<string>("");
  const hero = useHero();

  const shouldDisable = loading || currentDelay > 0;

  if (!hero) {
    return null;
  }

  async function handleEquip(slot: Slots, item: string) {
    try {
      await equipItemMutation({
        variables: {
          item,
          slot,
        },
      });
    } catch (e) {}
  }

  return (
    <React.Fragment>
      <Grid container columns={6} spacing={1}>
        <Grid item xs={6}>
          <Typography>Equipped items</Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <EquipmentSlot
            hero={hero}
            slot="leftHand"
            label="Left Hand"
            onEquip={handleEquip}
            disabled={shouldDisable}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <EquipmentSlot
            hero={hero}
            slot="rightHand"
            label="Right Hand"
            onEquip={handleEquip}
            disabled={shouldDisable}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <EquipmentSlot
            hero={hero}
            slot="bodyArmor"
            label="Body Armor"
            onEquip={handleEquip}
            disabled={shouldDisable}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <EquipmentSlot
            hero={hero}
            slot="handArmor"
            label="Gauntlets"
            onEquip={handleEquip}
            disabled={shouldDisable}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <EquipmentSlot
            hero={hero}
            slot="legArmor"
            label="Leggings"
            onEquip={handleEquip}
            disabled={shouldDisable}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <EquipmentSlot
            hero={hero}
            slot="headArmor"
            label="Helmets"
            onEquip={handleEquip}
            disabled={shouldDisable}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <EquipmentSlot
            hero={hero}
            slot="footArmor"
            label="Greaves"
            onEquip={handleEquip}
            disabled={shouldDisable}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <QuestItems
            hero={hero}
            disabled={shouldDisable}
            onChange={setSelectedQuestItem}
          />
        </Grid>
        {hero.level === hero.levelCap && itemAllowsRebirth(selectedQuestItem) && (
          <Grid item xs={6}>
            <RebirthMenu hero={hero} disabled={shouldDisable} />
          </Grid>
        )}
        {itemAllowsCrafting(selectedQuestItem) && (
          <Grid item xs={6}>
            <CreaftingMenu hero={hero} disabled={shouldDisable} />
          </Grid>
        )}
        {itemAllowsVoidTravel(selectedQuestItem) && (
          <Grid item xs={6}>
            <VoidTravelMenu hero={hero} disabled={shouldDisable} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
