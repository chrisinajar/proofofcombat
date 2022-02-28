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
  itemDisplayName,
  itemAllowsRebirth,
  itemAllowsCrafting,
} from "src/helpers";
import { RebirthMenu } from "./rebirth";
import { CreaftingMenu } from "./crafting";

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
      (otherSlot: Slots) => hero.equipment[otherSlot] && otherSlot !== slot
    )
    .map((otherSlot: Slots) => hero.equipment[otherSlot]?.id);

  const [value, setValue] = useState<string>(equipped || "");
  const items = hero.inventory
    .filter((item) => canEquipTo(slot, item))
    .sort((a, b) => a.level - b.level);

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
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "primary.main" }}
                  >
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
        {itemAllowsRebirth(selectedQuestItem) && (
          <Grid item xs={6}>
            <RebirthMenu hero={hero} disabled={shouldDisable} />
          </Grid>
        )}
        {itemAllowsCrafting(selectedQuestItem) && (
          <Grid item xs={6}>
            <CreaftingMenu hero={hero} disabled={shouldDisable} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}

function getEnchantmentDisplay(enchantment: string): string {
  switch (enchantment) {
    // quest items
    case "fishermans-strength":
      return "+50% Strength";
      break;
    case "fishermans-dexterity":
      return "+50% Dexterity";
      break;
    case "fishermans-constitution":
      return "+50% Constitution";
      break;
    case "fishermans-intelligence":
      return "+50% Intelligence";
      break;
    case "fishermans-wisdom":
      return "+50% Wisdom";
      break;
    case "fishermans-willpower":
      return "+50% Willpower";
      break;
    case "fishermans-luck":
      return "+50% Luck";
      break;
    case "totem-of-champion":
      return "+Level cap, auto-battler, +100% XP";
      break;
    case "totem-of-hero":
      return "2x Leveling rate, +Level cap, auto-battler, +100% XP";
      break;
    // menus
    case "totem-of-champion-rebirth":
    case "totem-of-hero-rebirth":
    case "totem-of-rebirth":
      return "Select to show rebirth menu";
      break;
    case "crafting-hammer":
      return "Select to show crafting menu";
      break;

    case EnchantmentType.BonusStrength:
      return "+20% Strength";
      break;
    case EnchantmentType.BonusDexterity:
      return "+20% Dexterity";
      break;
    case EnchantmentType.BonusConstitution:
      return "+20% Constitution";
      break;
    case EnchantmentType.BonusIntelligence:
      return "+20% Intelligence";
      break;
    case EnchantmentType.BonusWisdom:
      return "+20% Wisdom";
      break;
    case EnchantmentType.BonusWillpower:
      return "+20% Willpower";
      break;
    case EnchantmentType.BonusLuck:
      return "+20% Luck";
      break;
    case EnchantmentType.BonusPhysical:
      return "+10% Strength, Dexterity, Constitution";
      break;
    case EnchantmentType.BonusMental:
      return "+10% Intelligence, Wisdom, Willpower";
      break;
    case EnchantmentType.BonusAllStats:
      return "+10% All Stats";
      break;
    case EnchantmentType.MinusEnemyArmor:
      return "-50% Enemy Armor";
      break;
    case EnchantmentType.BonusArmor:
      return "+100% Armor";
      break;
    case EnchantmentType.MinusEnemyStrength:
      return "-20% Enemy Strength";
      break;
    case EnchantmentType.MinusEnemyDexterity:
      return "-20% Enemy Dexterity";
      break;
    case EnchantmentType.MinusEnemyConstitution:
      return "-20% Enemy Constitution";
      break;
    case EnchantmentType.MinusEnemyIntelligence:
      return "-20% Enemy Intelligence";
      break;
    case EnchantmentType.MinusEnemyWisdom:
      return "-20% Enemy Wisdom";
      break;
    case EnchantmentType.MinusEnemyWillpower:
      return "-20% Enemy Willpower";
      break;
    case EnchantmentType.MinusEnemyPhysical:
      return "-10% Enemy Strength, Dexterity, Constitution";
      break;
    case EnchantmentType.MinusEnemyMental:
      return "-10% Enemy Intelligence, Wisdom, Willpower";
      break;
    case EnchantmentType.MinusEnemyAllStats:
      return "-10% All Enemy Stats";
      break;
    case EnchantmentType.LifeHeal:
      return "Heal 10% Constitution";
      break;
    case EnchantmentType.LifeDamage:
      return "Damage 10% Constitution";
      break;
    case EnchantmentType.LifeSteal:
      return "Leach 10% Constitution";
      break;
    case EnchantmentType.Vampirism:
      return "Leach 20% Constitution, Steal 20% Constitution";
      break;
    case EnchantmentType.BigMelee:
      return "+100% Strength, Steal 20% Dexterity";
      break;
    case EnchantmentType.BigCaster:
      return "+100% Intelligence, Steal 20% Wisdom";
      break;
    case EnchantmentType.WisDexWill:
      return "+40% Wisdom, Dexterity, Willpower";
      break;
    case EnchantmentType.StrengthSteal:
      return "Steal 20% Strength";
      break;
    case EnchantmentType.DexteritySteal:
      return "Steal 20% Dexterity";
      break;
    case EnchantmentType.ConstitutionSteal:
      return "Steal 20% Constitution";
      break;
    case EnchantmentType.IntelligenceSteal:
      return "Steal 20% Intelligence";
      break;
    case EnchantmentType.WisdomSteal:
      return "Steal 20% Wisdom";
      break;
    case EnchantmentType.WillpowerSteal:
      return "Steal 20% Willpower";
      break;
    case EnchantmentType.LuckSteal:
      return "Steal 20% Luck";
      break;
    case EnchantmentType.AllStatsSteal:
      return "Steal 20% All Stats";
    default:
      return "???";
      break;
  }
}
