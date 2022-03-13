import { EnchantmentType, InventoryItem, Hero } from "src/generated/graphql";

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
  [EnchantmentType.LifeSteal]: "The Leech",

  [EnchantmentType.StrengthSteal]: "Stolen Strength",
  [EnchantmentType.DexteritySteal]: "Thieves Hands",
  [EnchantmentType.ConstitutionSteal]: "Siphoning",
  [EnchantmentType.IntelligenceSteal]: "Revealed Thoughts",
  [EnchantmentType.WisdomSteal]: "Swindling",
  [EnchantmentType.WillpowerSteal]: "Persuasion",
  [EnchantmentType.LuckSteal]: "The Trickster",

  [EnchantmentType.AllStatsSteal]: "Soul Absorption",
  [EnchantmentType.Vampirism]: "Vampirism",

  [EnchantmentType.BigMelee]: "The Warrior",
  [EnchantmentType.BigCaster]: "The Sorcerer",
  [EnchantmentType.WisDexWill]: "The Monk",

  [EnchantmentType.CounterSpell]: "Countering",

  // tier 4's
  [EnchantmentType.SuperDexterity]: "Putrid Speed",
  [EnchantmentType.SuperWillpower]: "Unallowable Willpower",
  [EnchantmentType.SuperWisdom]: "Impermissible Wisdom",
  [EnchantmentType.SuperMelee]: "Vicious Slaughtering",
  [EnchantmentType.SuperCaster]: "Godly Magic",
  [EnchantmentType.SuperMeleeVamp]: "Bloodletting",
  [EnchantmentType.SuperSorcVamp]: "Bookburning",
  [EnchantmentType.SuperVamp]: "Nosferatu's Breath",
  [EnchantmentType.SuperVampMelee]: "Putrid ",
  [EnchantmentType.SuperVampSorc]: "Necrotic Consumption",
  [EnchantmentType.SuperBattleMage]: "Putrid ",
  [EnchantmentType.SuperAllStats]: "Putrid ",

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

export function pureEnchantmentDisplayName(
  enchantment: EnchantmentType
): string {
  return EnchantmentNames[enchantment] ?? addSpaces(enchantment);
}

export function enchantmentDisplayName(
  itemName: string,
  enchantment: EnchantmentType
): string {
  return `${itemName} of ${EnchantmentNames[enchantment] ?? "The Unknown"}`;
}

export function itemDisplayName(item: InventoryItem): string {
  if (item.enchantment) {
    return enchantmentDisplayName(item.name, item.enchantment);
  }
  return item.name;
}

type DistanceableLocation = {
  x: number;
  y: number;
};

export function distance2d(
  a: DistanceableLocation,
  b: DistanceableLocation
): number {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export function addSpaces(str: string): string {
  return str
    .split(/(?=[A-Z])/g)
    .filter((i) => i.length)
    .join(" ");
}

export function itemAllowsRebirth(item: string): boolean {
  if (item === "totem-of-rebirth") {
    return true;
  }
  if (item === "totem-of-hero-rebirth") {
    return true;
  }
  if (item === "totem-of-champion-rebirth") {
    return true;
  }
  return false;
}

export function itemUpgradesAutomation(item: string): boolean {
  if (item === "unimaginable-gearbox") {
    return true;
  }
  if (item === "orb-of-forbidden-power") {
    return true;
  }
  return false;
}

export function itemAllowsCrafting(item: string): boolean {
  if (item === "crafting-hammer") {
    return true;
  }
  return false;
}

export function itemImprovesAutoBattle(item: string): boolean {
  if (item === "orb-of-forbidden-power") {
    return true;
  }
  return false;
}
export function itemAllowsAutoBattle(item: string): boolean {
  if (item === "totem-of-hero") {
    return true;
  }
  if (item === "totem-of-hero-rebirth") {
    return true;
  }
  if (item === "totem-of-champion") {
    return true;
  }
  if (item === "totem-of-champion-rebirth") {
    return true;
  }
  if (item === "orb-of-forbidden-power") {
    return true;
  }
  return false;
}

export function itemSorter(a: InventoryItem, b: InventoryItem): number {
  if (a.level !== b.level) {
    return a.level - b.level;
  }

  if (a.name > b.name) {
    return 1;
  }
  if (b.name > a.name) {
    return -1;
  }

  if (!a.enchantment || !b.enchantment) {
    return 0;
  }
  if (a.enchantment > b.enchantment) {
    return 1;
  }
  if (b.enchantment > a.enchantment) {
    return -1;
  }
  return 0;
}

export function isItemEquipped(hero: Hero, item: InventoryItem): boolean {
  if (hero.equipment.leftHand?.id && hero.equipment.leftHand.id === item.id) {
    return true;
  }
  if (hero.equipment.rightHand?.id && hero.equipment.rightHand.id === item.id) {
    return true;
  }
  if (hero.equipment.bodyArmor?.id && hero.equipment.bodyArmor.id === item.id) {
    return true;
  }
  if (hero.equipment.handArmor?.id && hero.equipment.handArmor.id === item.id) {
    return true;
  }
  if (hero.equipment.legArmor?.id && hero.equipment.legArmor.id === item.id) {
    return true;
  }
  if (hero.equipment.headArmor?.id && hero.equipment.headArmor.id === item.id) {
    return true;
  }
  if (hero.equipment.footArmor?.id && hero.equipment.footArmor.id === item.id) {
    return true;
  }

  return false;
}
