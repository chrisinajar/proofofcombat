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
  [EnchantmentType.Vampire]: "The Vampire",
  [EnchantmentType.MinusEnemyArmor]: "The MinusEnemyArmor",
  [EnchantmentType.BonusArmor]: "The BonusArmor",
  [EnchantmentType.MinusEnemyStrength]: "The MinusEnemyStrength",
  [EnchantmentType.MinusEnemyDexterity]: "The MinusEnemyDexterity",
  [EnchantmentType.MinusEnemyConstitution]: "The MinusEnemyConstitution",
  [EnchantmentType.MinusEnemyIntelligence]: "The MinusEnemyIntelligence",
  [EnchantmentType.MinusEnemyWisdom]: "The MinusEnemyWisdom",
  [EnchantmentType.MinusEnemyCharisma]: "The MinusEnemyCharisma",

  // quest rewards, here to make typescript happy and im lazy :D
  // not used anywhere
  [EnchantmentType.FishermansStrength]: "Quest Reward",
  [EnchantmentType.FishermansDexterity]: "Quest Reward",
  [EnchantmentType.FishermansConstitution]: "Quest Reward",
  [EnchantmentType.FishermansIntelligence]: "Quest Reward",
  [EnchantmentType.FishermansWisdom]: "Quest Reward",
  [EnchantmentType.FishermansCharisma]: "Quest Reward",
  [EnchantmentType.FishermansLuck]: "Quest Reward",
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

type DistanceableLocation = {
  x: number;
  y: number;
};

export function distance2d(a: DistanceableLocation, b: DistanceableLocation) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}
