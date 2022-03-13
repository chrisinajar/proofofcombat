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
    case "warriors-armlette":
      return "Upgrades Fighter and Berserker classes";
      break;
    case "tome-of-knowledge":
      return "Upgrades Wizard and Warlock classes";
      break;
    case "quiver-of-speed":
      return "Upgrades Ranger class";
      break;
    case "vampire-ring":
      return "Upgrades Blood Mage class";
      break;
    case "gambling-kit":
      return "Upgrades Gambler class";
      break;
    case "patrons-wisdom":
      return "Upgrades Battle Mage class";
      break;
    case "liturgical-censer":
      return "Upgrades Paladin class";
      break;
    case "dont-get-hit":
      return "Double dodge, double accuracy";
      break;
    case "aqua-lungs":
      return "Allows water travel";
      break;
    case "trophy-hellhound":
      return "2x All Stats, +1 Weapon Tier";
      break;
    case "trophy-hiddenstump":
      return "2x All Stats, 2x Dodge";
      break;
    case "trophy-steamgear":
      return "2x All Stats, Improved auto-battler";
      break;
    case "trophy-drowning":
      return "2x All Stats, +1 Armor Tier";
      break;

    case "archers-impatience":
      return "50% Double Shot";
      break;
    case "archers-determination":
      return "Ranged -20% Armor, 50% Double Shot";
      break;
    case "archers-balance":
      return "+1 Ranged Weapon Tier, Ranged -20% Armor, 50% Double Shot";
      break;
    case "attackers-precision":
      return "+30% Dexterity";
      break;
    case "attackers-honor":
      return "Melee -20% Armor, +30% Dexterity";
      break;
    case "attackers-warbanner":
      return "+1 Melee Weapon Tier, Melee -20% Armor, +30% Dexterity";
      break;
    case "casters-book":
      return "+30% Wisdom";
      break;
    case "casters-wisdom":
      return "Caster -20% Armor, +30% Wisdom";
      break;
    case "casters-destiny":
      return "+1 Spell Focus Tier, Caster -20% Armor, +30% Wisdom";
      break;
    case "smiters-inspiration":
      return "+30% Willpower";
      break;
    case "smiters-calling":
      return "Smite -20% Armor, +30% Willpower";
      break;
    case "smiters-light":
      return "+1 Shield Tier, Smite -20% Armor, +30% Willpower";
      break;
    case "vampires-blood":
      return "+30% Constitution";
      break;
    case "vampires-gaze":
      return "-50% Enemy Enchantment Resist, +30% Constitution";
      break;
    case "vampires-darkness":
      return "-75% Enemy Enchantment Resist, +30% Constitution";
      break;
    case "naga-scale":
      return "Cancels out 1 enemy enchantment";
      break;
    case "unimaginable-gearbox":
      return "Improved auto-battler";
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
      return "+30% Strength";
      break;
    case EnchantmentType.BonusDexterity:
      return "+30% Dexterity";
      break;
    case EnchantmentType.BonusConstitution:
      return "+30% Constitution";
      break;
    case EnchantmentType.BonusIntelligence:
      return "+30% Intelligence";
      break;
    case EnchantmentType.BonusWisdom:
      return "+30% Wisdom";
      break;
    case EnchantmentType.BonusWillpower:
      return "+30% Willpower";
      break;
    case EnchantmentType.BonusLuck:
      return "+30% Luck";
      break;
    case EnchantmentType.BonusPhysical:
      return "+20% Strength, Dexterity, Constitution";
      break;
    case EnchantmentType.BonusMental:
      return "+20% Intelligence, Wisdom, Willpower";
      break;
    case EnchantmentType.BonusAllStats:
      return "+20% All Stats";
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
      return "Leech 10% Constitution";
      break;
    case EnchantmentType.Vampirism:
      return "Leech 20% Constitution, Steal 30% Constitution";
      break;
    case EnchantmentType.BigMelee:
      return "+100% Strength, Steal 40% Dexterity";
      break;
    case EnchantmentType.BigCaster:
      return "+100% Intelligence, Steal 40% Wisdom";
      break;
    case EnchantmentType.WisDexWill:
      return "+40% Wisdom, Dexterity, Willpower";
      break;
    case EnchantmentType.StrengthSteal:
      return "Steal 30% Strength";
      break;
    case EnchantmentType.DexteritySteal:
      return "Steal 30% Dexterity";
      break;
    case EnchantmentType.ConstitutionSteal:
      return "Steal 30% Constitution";
      break;
    case EnchantmentType.IntelligenceSteal:
      return "Steal 30% Intelligence";
      break;
    case EnchantmentType.WisdomSteal:
      return "Steal 30% Wisdom";
      break;
    case EnchantmentType.WillpowerSteal:
      return "Steal 30% Willpower";
      break;
    case EnchantmentType.LuckSteal:
      return "Steal 30% Luck";
      break;
    case EnchantmentType.AllStatsSteal:
      return "Steal 30% All Stats";
      break;
    case EnchantmentType.CounterSpell:
      return "Cancels out 1 enemy enchantment";
      break;

    case EnchantmentType.SuperDexterity:
      return "+200% Dexterity, +50% Willpower/Wisdom, CounterSpell, Minus Armor, Bonus Armor";
      break;
    case EnchantmentType.SuperWillpower:
      return "+200% Willpower, +50% Dexterity/Wisdom, CounterSpell, Minus Armor, Bonus Armor";
      break;
    case EnchantmentType.SuperWisdom:
      return "+200% Wisdom, +50% Willpower/Dexterity, CounterSpell, Minus Armor, Bonus Armor";
      break;
    case EnchantmentType.SuperMelee:
      return "+250% Strength, Steal 80% Dexterity, CounterSpell, Minus Armor, Bonus Armor";
      break;
    case EnchantmentType.SuperCaster:
      return "+250% Intelligence, Steal 80% Wisdom, CounterSpell, Minus Armor, Bonus Armor";
      break;
    case EnchantmentType.SuperMeleeVamp:
      return "+200% Strength, Steal 50% Dexterity/Constitution, CounterSpell, Minus Armor, Bonus Armor";
      break;
    case EnchantmentType.SuperSorcVamp:
      return "+200% Intelligence, Steal 50% Wisdom/Constitution, CounterSpell, Minus Armor, Bonus Armor";
      break;
    case EnchantmentType.SuperVamp:
      return "Leech 50% Constitution, Steal 80% Constitution, CounterSpell, Minus Armor, Bonus Armor";
      break;
    case EnchantmentType.SuperVampMelee:
      return "+150% Strength, Steal 60% Dexterity/Constitution, CounterSpell, Minus Armor, Bonus Armor";
      break;
    case EnchantmentType.SuperVampSorc:
      return "+150% Intelligence, Steal 60% Wisdom/Constitution, CounterSpell, Minus Armor, Bonus Armor";
      break;
    case EnchantmentType.SuperBattleMage:
      return "+150% Strength/Intelligence, Steal 60% Dexterity/Wisdom, CounterSpell, Minus Armor, Bonus Armor";
      break;
    case EnchantmentType.SuperAllStats:
      return "+100% All Stats, Leech 20% Constitution, CounterSpell, Minus Armor, Bonus Armor";
      break;
    default:
      return "???";
      break;
  }
}
