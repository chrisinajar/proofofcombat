import React, { useEffect, useMemo, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { CombatEntry, AttackType } from "src/generated/graphql";

type CombatLogProps = {
  log: CombatEntry[];
};

/**
 * Visually reveals combat lines over time based on their `time` field.
 * The first line has the largest `time` (reverse-ordered); we schedule each
 * line to appear at `maxTime - entry.time` ms. We preserve layout by rendering
 * all lines immediately with `visibility: hidden` and fade them in when revealed.
 */
export function CombatLog({ log }: CombatLogProps): JSX.Element {
  const theme = useTheme();
  const maxTime = useMemo(() => log?.[0]?.time ?? 3000, [log]);
  const [visibleUntil, setVisibleUntil] = useState<number>(-1);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    // Reset any existing timers
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
    // Reveal any entries that should appear at t=0 (delay === 0)
    const initialVisible = log.reduce((lastIdx, entry, idx) => {
      return maxTime - entry.time === 0 ? idx : lastIdx;
    }, -1);
    setVisibleUntil(initialVisible);

    // Schedule reveal for each entry based on its relative delay
    log.forEach((entry, index) => {
      const delay = Math.max(0, maxTime - entry.time) / 6;
      if (delay === 0) return;
      const t = window.setTimeout(() => {
        setVisibleUntil((prev) => Math.max(prev, index));
      }, delay);
      timersRef.current.push(t);
    });

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, [log, maxTime]);

  return (
    <Box role="log" aria-live="polite" aria-relevant="additions">
      {log.map((entry, i) => {
        const revealed = i <= visibleUntil;
        return (
          <Typography
            key={`${entry.from}-${i}`}
            sx={{
              transition: "opacity 250ms ease-in",
              opacity: revealed ? 1 : 0,
              visibility: revealed ? "visible" : "hidden",
            }}
            aria-hidden={!revealed}
          >
            +{(maxTime - entry.time) / 1000}
            {"s "}
            {entry.isEnchantment ? (
              <React.Fragment>
                {entry.damage < 0 ? (
                  <React.Fragment>
                    <b>{entry.from}</b> heals{" "}
                    <span id={`fight-${entry.from}-enchantment-heal`}>
                      {(0 - entry.damage).toLocaleString()}
                    </span>{" "}
                    health from their enchantments
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <b>{entry.from}</b> dealt{" "}
                    <span id={`fight-${entry.from}-enchantment-damage`}>
                      {entry.damage.toLocaleString()}
                    </span>{" "}
                    enchantment damage to <b>{entry.to}</b>
                  </React.Fragment>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <b>{entry.from}</b>
                {` ${getCombatPhrase(
                  entry.attackType,
                  entry.success,
                  entry.critical,
                )} `}
                <b>{entry.to}</b>
                {entry.success
                  ? ` for ${entry.damage.toLocaleString()} ${
                      entry.damageType ? entry.damageType.toLowerCase() : ""
                    } damage!`
                  : "."}
              </React.Fragment>
            )}
          </Typography>
        );
      })}
    </Box>
  );
}

function getCombatPhrase(
  attackType: CombatEntry["attackType"],
  success: boolean,
  critical: boolean,
): string {
  switch (attackType) {
    case AttackType.Blood:
      return success
        ? critical
          ? "surges with blood magic against"
          : "lets blood and casts forth towards"
        : "attempts to cast a spell against";
    case AttackType.Smite:
      return success
        ? critical
          ? "summons powers beyond this world against"
          : "smites"
        : "attempts to smite";
    case AttackType.Cast:
      return success
        ? critical
          ? "carefully casts a powerful spell against"
          : "shoots a magical bolt at"
        : "attempts to cast a spell against";
    case AttackType.Ranged:
      return success
        ? critical
          ? "lands a sneak attack from the shadows, critically damaging"
          : "fires an arrow at"
        : "shoots an arrow but it misses";
    case AttackType.Melee:
    default:
      return success
        ? critical
          ? "lands a crippling blow against"
          : "struck"
        : "missed";
  }
}
