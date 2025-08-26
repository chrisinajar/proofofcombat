import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { CombatLog } from "./combat-log";
import { AttackType, CombatEntry, DamageType } from "src/generated/graphql";

describe("CombatLog timed reveal", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  function makeEntry(partial: Partial<CombatEntry>): CombatEntry {
    return {
      __typename: "CombatEntry",
      attackType: AttackType.Melee,
      critical: false,
      damage: 10,
      damageType: DamageType.Physical,
      from: "Hero",
      isEnchantment: false,
      isMesmerize: false,
      success: true,
      time: 0,
      to: "Enemy",
      ...partial,
    } as CombatEntry;
  }

  it("reveals lines based on their timing without layout shift (visibility hidden)", () => {
    const log: CombatEntry[] = [
      makeEntry({ time: 3000, damage: 11, from: "A" }), // t=0
      makeEntry({ time: 2000, damage: 22, from: "B" }), // t=1000ms
      makeEntry({ time: 0, damage: 33, from: "C" }), // t=3000ms
    ];

    render(<CombatLog log={log} />);

    const lineA = screen.getByText(/\+0s/i).closest("p");
    const lineB = screen.getByText(/\+1s/i).closest("p");
    const lineC = screen.getByText(/\+3s/i).closest("p");

    // First line should be visible immediately (delay 0)
    expect(lineA).toHaveStyle({ visibility: "visible", opacity: "1" });
    expect(lineB).toHaveStyle({ visibility: "hidden", opacity: "0" });
    expect(lineC).toHaveStyle({ visibility: "hidden", opacity: "0" });
    expect(lineB).toHaveStyle({ visibility: "hidden", opacity: "0" });

    // Advance to ~1000ms/6 (~167ms) to reveal second line
    act(() => {
      jest.advanceTimersByTime(170);
    });
    expect(lineB).toHaveStyle({ visibility: "visible", opacity: "1" });
    expect(lineC).toHaveStyle({ visibility: "hidden", opacity: "0" });

    // Advance to total ~500ms to reveal third line
    act(() => {
      jest.advanceTimersByTime(330);
    });
    expect(lineC).toHaveStyle({ visibility: "visible", opacity: "1" });
  });
});
