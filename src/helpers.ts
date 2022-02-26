import { EnchantmentType, InventoryItem } from "src/generated/graphql";

export const EnchantmentNames: { [x in EnchantmentType]?: string } = {
  [EnchantmentType.BonusStrength]: "Giant's Strength",
  [EnchantmentType.BonusDexterity]: "Incredible Speed",
  [EnchantmentType.BonusConstitution]: "Sturdiness",
  [EnchantmentType.BonusIntelligence]: "Intellect",
  [EnchantmentType.BonusWisdom]: "Incredible Will",
  [EnchantmentType.BonusWillpower]: "The Bard",
  [EnchantmentType.BonusLuck]: "The Gambler",
  [EnchantmentType.BonusPhysical]: "Physical Superiority",
  [EnchantmentType.BonusMental]: "Mental Superiority",
  [EnchantmentType.BonusAllStats]: "Absolute Power",
  [EnchantmentType.MinusEnemyArmor]: "Armor Piercing",
  [EnchantmentType.BonusArmor]: "Deflection",
  [EnchantmentType.MinusEnemyStrength]: "Crippling Strength",
  [EnchantmentType.MinusEnemyDexterity]: "Frost",
  [EnchantmentType.MinusEnemyConstitution]: "Mortality",
  [EnchantmentType.MinusEnemyIntelligence]: "Stupification",
  [EnchantmentType.MinusEnemyWisdom]: "The Feeble Minded",
  [EnchantmentType.MinusEnemyWillpower]: "Truth",
  [EnchantmentType.MinusEnemyPhysical]: "Physical Destruction",
  [EnchantmentType.MinusEnemyMental]: "Mental Destruction",
  [EnchantmentType.MinusEnemyAllStats]: "Complete Oppression",
  [EnchantmentType.LifeHeal]: "Healing",
  [EnchantmentType.LifeDamage]: "Harming",
  [EnchantmentType.LifeSteal]: "Vampirism",

  // quest rewards, here to make typescript happy and im lazy :D
  // not used anywhere
  // [EnchantmentType.FishermansStrength]: "Quest Reward",
  // [EnchantmentType.FishermansDexterity]: "Quest Reward",
  // [EnchantmentType.FishermansConstitution]: "Quest Reward",
  // [EnchantmentType.FishermansIntelligence]: "Quest Reward",
  // [EnchantmentType.FishermansWisdom]: "Quest Reward",
  // [EnchantmentType.FishermansWillpower]: "Quest Reward",
  // [EnchantmentType.FishermansLuck]: "Quest Reward",
  // [EnchantmentType.CanRebirth]: "Quest Reward",
};

export function enchantmentDisplayName(
  itemName: string,
  enchantment: EnchantmentType
): string {
  return `${itemName} of ${EnchantmentNames[enchantment] ?? "The Unknown"}`;
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

export function addSpaces(str: string): string {
  return str
    .split(/(?=[A-Z])/g)
    .filter((i) => i.length)
    .join(" ");
}
