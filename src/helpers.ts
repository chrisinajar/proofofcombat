import {
  EnchantmentType,
  InventoryItem,
  Hero,
  ArtifactItem,
  ArtifactAttributeType,
  ArtifactAttribute,
} from "src/generated/graphql";

function assertUnreachable(x: never): never {
  throw new Error(`Unhandled case: ${String(x)}`);
}

export function getArtifactModifier(
  artifact: ArtifactItem,
  type: ArtifactAttributeType,
): ArtifactAttribute | undefined {
  const modifiers = modifiersForArtifact(artifact);
  const modifier = modifiers.find((mod) => mod.type === type);
  return modifier;
}

export function modifiersForArtifact(
  artifact: ArtifactItem,
): ArtifactAttribute[] {
  const artifactBuffs: ArtifactAttribute[] = [
    artifact.attributes.namePrefix,
    artifact.attributes.namePostfix,
    ...artifact.attributes.bonusAffixes,
  ];

  if (artifact.attributes.titlePrefix) {
    artifactBuffs.push(artifact.attributes.titlePrefix);
  }

  if (artifact.attributes.titlePostfix) {
    artifactBuffs.push(artifact.attributes.titlePostfix);
  }

  return artifactBuffs;
}

export function modifierText(modifier: ArtifactAttribute): string {
  const percentage =
    modifier.magnitude > 1
      ? `${Math.round((modifier.magnitude - 1) * 1000) / 10}%`
      : `${Math.round(modifier.magnitude * 1000) / 10}%`;

  switch (modifier.type) {
    case ArtifactAttributeType.BonusStrength:
      return `${percentage} increased strength`;
      break;

    case ArtifactAttributeType.BonusDexterity:
      return `${percentage} increased dexterity`;
      break;

    case ArtifactAttributeType.BonusConstitution:
      return `${percentage} increased constitution`;
      break;

    case ArtifactAttributeType.BonusIntelligence:
      return `${percentage} increased intelligence`;
      break;

    case ArtifactAttributeType.BonusWisdom:
      return `${percentage} increased wisdom`;
      break;

    case ArtifactAttributeType.BonusWillpower:
      return `${percentage} increased willpower`;
      break;

    case ArtifactAttributeType.BonusLuck:
      return `${percentage} increased luck`;
      break;

    case ArtifactAttributeType.DamageReduction:
      return `${percentage} reduced damage taken`;
      break;

    case ArtifactAttributeType.EnhancedDamage:
      return `${percentage} enhanced damage`;
      break;

    case ArtifactAttributeType.BonusHealth:
      return `${percentage} bonus max health`;
      break;

    case ArtifactAttributeType.ReducedDelay:
      return `${percentage} reduced delay on actions`;
      break;

    case ArtifactAttributeType.BonusExperience:
      return `${percentage} more experience from all sources`;
      break;

    case ArtifactAttributeType.BonusSkillChance:
      return `${percentage} bonus chance to increase skills`;
      break;

    case ArtifactAttributeType.Lifesteal:
      return `${percentage} damage dealt gained as health`;
      break;

    case ArtifactAttributeType.Mesmerize:
      return `${percentage} chance to mesmerize opponents`;
      break;

    case ArtifactAttributeType.Focus:
      return `${percentage} chance to resist mesmerizing`;
      break;

    case ArtifactAttributeType.AllResistances:
      return `${percentage} to all resistances`;
      break;
    case ArtifactAttributeType.DamageAsPhysical:
      return `${percentage} damage converted to physical`;
      break;
    case ArtifactAttributeType.DamageAsMagical:
      return `${percentage} damage converted to magical`;
      break;
    case ArtifactAttributeType.DamageAsFire:
      return `${percentage} damage converted to fire`;
      break;
    case ArtifactAttributeType.DamageAsIce:
      return `${percentage} damage converted to ice`;
      break;
    case ArtifactAttributeType.DamageAsLightning:
      return `${percentage} damage converted to lightning`;
      break;
    case ArtifactAttributeType.DamageAsHoly:
      return `${percentage} damage converted to holy`;
      break;
    case ArtifactAttributeType.DamageAsBlight:
      return `${percentage} damage converted to blight`;
      break;
    case ArtifactAttributeType.PhysicalResistance:
      return `${percentage} to physical resistance`;
      break;
    case ArtifactAttributeType.MagicalResistance:
      return `${percentage} to magical resistance`;
      break;
    case ArtifactAttributeType.FireResistance:
      return `${percentage} to fire resistance`;
      break;
    case ArtifactAttributeType.IceResistance:
      return `${percentage} to ice resistance`;
      break;
    case ArtifactAttributeType.LightningResistance:
      return `${percentage} to lightning resistance`;
      break;
    case ArtifactAttributeType.HolyResistance:
      return `${percentage} to holy resistance`;
      break;
    case ArtifactAttributeType.BlightResistance:
      return `${percentage} to blight resistance`;
      break;
    case ArtifactAttributeType.BonusPhysicalDamage:
      return `${percentage} bonuus physical damage`;
      break;
    case ArtifactAttributeType.BonusMagicalDamage:
      return `${percentage} bonuus magical damage`;
      break;
    case ArtifactAttributeType.BonusFireDamage:
      return `${percentage} bonuus fire damage`;
      break;
    case ArtifactAttributeType.BonusIceDamage:
      return `${percentage} bonuus ice damage`;
      break;
    case ArtifactAttributeType.BonusLightningDamage:
      return `${percentage} bonuus lightning damage`;
      break;
    case ArtifactAttributeType.BonusHolyDamage:
      return `${percentage} bonuus holy damage`;
      break;
    case ArtifactAttributeType.BonusBlightDamage:
      return `${percentage} bonuus blight damage`;
      break;
    case ArtifactAttributeType.EnemyPhysicalResistance:
      return `-${percentage} to enemy physical resistance`;
      break;
    case ArtifactAttributeType.EnemyMagicalResistance:
      return `-${percentage} to enemy magical resistance`;
      break;
    case ArtifactAttributeType.EnemyFireResistance:
      return `-${percentage} to enemy fire resistance`;
      break;
    case ArtifactAttributeType.EnemyIceResistance:
      return `-${percentage} to enemy ice resistance`;
      break;
    case ArtifactAttributeType.EnemyLightningResistance:
      return `-${percentage} to enemy lightning resistance`;
      break;
    case ArtifactAttributeType.EnemyHolyResistance:
      return `-${percentage} to enemy holy resistance`;
      break;
    case ArtifactAttributeType.EnemyBlightResistance:
      return `-${percentage} to enemy blight resistance`;
      break;
  }
  // Ensure exhaustive handling; fail build when a new type is added but not handled above
  return assertUnreachable(modifier.type as never);
}

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
  [EnchantmentType.SuperVampMelee]: "Flesh Consumption",
  [EnchantmentType.SuperVampSorc]: "Necrotic Consumption",
  [EnchantmentType.SuperBattleMage]: "Demon Hunting",
  [EnchantmentType.SuperAllStats]: "Overwhelming Power",

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

export function getEnchantmentDisplay(enchantment: string): string {
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
      return "+1 Ranged Weapon Tier, Ranged -20% Armor, +50% Second Attack";
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
    case "circle-of-protection":
      return "Counter Spell";
      break;
    case "circle-of-hexing":
      return "3x Counter Spell";
      break;
    case "ashen-circle-of-hexing":
      return "+1 Weapon Tier, 3x Counter Spell";
      break;
    case "shadow-circle-of-hexing":
      return "5x Counter Spell";
      break;
    case "thorny-circle-of-hexing":
      return "+1 Armor Tier, 3x Counter Spell";
      break;
    // menus
    case "totem-of-champion-rebirth":
    case "totem-of-hero-rebirth":
    case "totem-of-rebirth":
      return "Select to show rebirth menu";
      break;
    case "orb-of-forbidden-power":
      return "A combination of all you've worked for";
      break;
    case "crafting-hammer":
      return "Select to show crafting menu";
      break;
    case "void-vessel":
      return "Select to show void travel";
      break;
    case "crafting-goggles":
      return "Allows sorting and bulk crafting";
      break;
    case "heros-guidance":
      return "+44% All Stats, -75% Enemy Enchantment Resist, -50% Enemy Armor, +1 Weapon Tier, +50% Ranged Second Attack, +Max gold";
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
    case EnchantmentType.RubyBlessing:
      return "+20% Physical Resistance";
      break;
    case EnchantmentType.EmeraldBlessing:
      return "+20% Magical Resistance";
      break;
    case EnchantmentType.SapphireBlessing:
      return "+20% Elemental Resistance";
      break;
    case EnchantmentType.DiamondBlessing:
      return "+10% All Resistances";
      break;
    default:
      return "???";
      break;
  }
}

export function pureEnchantmentDisplayName(
  enchantment: EnchantmentType,
): string {
  return EnchantmentNames[enchantment] ?? addSpaces(enchantment);
}

export function enchantmentDisplayName(
  itemName: string,
  enchantment: EnchantmentType,
): string {
  return `${itemName} of ${EnchantmentNames[enchantment] ?? "The Unknown"}`;
}

// I always search for getItemName when trying to find this
export function itemDisplayName(
  item: InventoryItem,
  enchantmentOverride: EnchantmentType | undefined | null = item.enchantment,
): string {
  if (item.imbue) {
    if (enchantmentOverride) {
      return `${item.imbue.artifact.name} ${
        item.name
      } *${pureEnchantmentDisplayName(enchantmentOverride)}*`;
    }
    return `${item.imbue.artifact.name} ${item.name}`;
  }
  if (enchantmentOverride) {
    return enchantmentDisplayName(item.name, enchantmentOverride);
  }
  return item.name;
}

type DistanceableLocation = {
  x: number;
  y: number;
};

export function distance2d(
  a: DistanceableLocation,
  b: DistanceableLocation,
): number {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export function addSpaces(str: string): string {
  return str
    .split(/(?=[A-Z])/g)
    .filter((i) => i.length)
    .join(" ");
}

export function itemAllowsVoidTravel(item: string): boolean {
  if (item === "void-vessel") {
    return true;
  }
  return false;
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
  if (item === "orb-of-forbidden-power") {
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
  if (item === "cracked-orb-of-forbidden-power") {
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
export function itemImprovesCrafting(item: string): boolean {
  if (item === "crafting-goggles") {
    return true;
  }
  return false;
}

export function itemImprovesAutoBattle(item: string): boolean {
  if (item === "orb-of-forbidden-power") {
    return true;
  }
  if (item === "cracked-orb-of-forbidden-power") {
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
  if (item === "cracked-orb-of-forbidden-power") {
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
