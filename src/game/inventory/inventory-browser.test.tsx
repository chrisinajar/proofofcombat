import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InventoryBrowser } from "./inventory-browser";
import { InventoryItemType } from "src/generated/graphql";

describe("InventoryBrowser", () => {
  function makeItem(id: string, name: string, type: InventoryItemType, level = 1) {
    return {
      __typename: "InventoryItem" as const,
      id,
      owner: "hero-1",
      name,
      type,
      level,
      baseItem: "base-1",
      enchantment: null,
      builtIns: [],
      imbue: null,
    };
  }

  it("marks and highlights equipped items in the table", () => {
    const sword = makeItem("i-1", "Training Sword", InventoryItemType.MeleeWeapon, 3);
    const boots = makeItem("i-2", "Worn Boots", InventoryItemType.FootArmor, 1);

    const hero: any = {
      __typename: "Hero",
      id: "hero-1",
      name: "Test Hero",
      level: 3,
      levelCap: 100,
      equipment: {
        __typename: "EquipmentSlots",
        leftHand: sword,
        rightHand: null,
        bodyArmor: null,
        handArmor: null,
        legArmor: null,
        headArmor: null,
        footArmor: null,
        accessories: [],
        artifact: null,
      },
      inventory: [sword, boots],
      buffs: { __typename: "HeroBuffs", blessing: null },
      stats: { __typename: "HeroStats" },
      skills: { __typename: "HeroSkills" },
      class: "Adventurer",
      activeStance: "Normal",
      activeSkill: "vitality",
      enchantingDust: 0,
      enchantments: [],
      experience: 0,
      gold: 0,
      location: { __typename: "Location", map: "m", x: 0, y: 0 },
      monsterKills: [],
      needed: 0,
      outgoingTrades: [],
      incomingTrades: [],
      questLog: { __typename: "QuestLog", active: [], completed: [] },
      settings: { __typename: "HeroSettings", autoDust: 0, minimumStats: { __typename: "HeroStats" } },
      version: 1,
      availableAttacks: [],
      availableStances: ["Normal"],
      attackSpeedRemainder: 0,
      combat: { __typename: "HeroCombatStats", health: 10, maxHealth: 10 },
    };

    render(
      <InventoryBrowser hero={hero} onEquip={() => {}} disabled={false} />
    );

    // Equipped item row shows EQUIPPED marker
    expect(screen.getByText(/\*equipped\*/i)).toBeInTheDocument();

    // Verify the sword row is marked selected
    const swordCell = screen.getByText("Training Sword");
    const row = swordCell.closest("tr");
    expect(row).toHaveAttribute("aria-selected", "true");

    // Non-equipped item should not be marked
    const bootsRow = screen.getByText("Worn Boots").closest("tr");
    expect(bootsRow).not.toHaveAttribute("aria-selected", "true");
  });
});

