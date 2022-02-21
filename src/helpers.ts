import { EnchantmentType, InventoryItem } from "src/generated/graphql";

export const EnchantmentNames = {
  [EnchantmentType.BonusStrength]: "Giant's Strength",
  [EnchantmentType.BonusDexterity]: "Incredible Speed",
  [EnchantmentType.BonusConstitution]: "Sturdiness",
  [EnchantmentType.BonusIntelligence]: "Intellect",
  [EnchantmentType.BonusWisdom]: "Incredible Will",
  [EnchantmentType.BonusCharisma]: "The Bard",
  [EnchantmentType.BonusLuck]: "The Gambler",
  [EnchantmentType.BonusPhysical]: "Physical Domination",
  [EnchantmentType.BonusMental]: "Mental Domination",
  [EnchantmentType.BonusAllStats]: "Absolute Power",
};

export function enchantmentDisplayName(
  itemName: string,
  enchantment: EnchantmentType
): string {
  return `${itemName} of ${EnchantmentNames[enchantment]}`;
}

export function itemDisplayName(item: InventoryItem) {
  if (item.enchantment) {
    return enchantmentDisplayName(item.name, item.enchantment);
  }
  return item.name;
}
