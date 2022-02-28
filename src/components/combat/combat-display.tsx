import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import LinearProgress from "@mui/material/LinearProgress";

import ShieldIcon from "@mui/icons-material/Shield";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";

import {
  CombatEntry,
  AttackType,
  useFightMutation,
  EnchantmentType,
} from "src/generated/graphql";

import { itemDisplayName } from "src/helpers";

type CombatDisplayProps = {
  autoBattle: boolean;
  canAutoBattle: boolean;
  fight: {
    id: string;
    monster: {
      id: string;
      name: string;
      combat: {
        health: number;
        maxHealth: number;
      };
    };
  };
  onVictory?: () => void;
  onError?: (e: any) => void;
  onAutoBattle?: (monsterId: string, attackType: AttackType) => void;
  fightMutationRef: React.MutableRefObject<(attackType: AttackType) => void>;
};

export function CombatDisplay(props: CombatDisplayProps): JSX.Element | null {
  const {
    autoBattle,
    canAutoBattle,
    fight: { id: monsterId, monster },
    onVictory,
    onError,
    onAutoBattle,
    fightMutationRef,
  } = props;
  const [fightMutation, { data: fightData, loading: fightLoading }] =
    useFightMutation();
  const [enemyHealth, setEnemyHealth] = useState<number>(100);
  const [lastAttack, setLastAttack] = useState<AttackType>(AttackType.Melee);
  const fightResult = fightData?.fight;

  const showAutoBattle = !autoBattle && canAutoBattle;

  useEffect(() => {
    if (fightLoading) {
      return;
    }
    setEnemyHealth(
      (100 *
        (fightResult
          ? fightResult.monster.monster.combat.health
          : monster.combat.health)) /
        monster.combat.maxHealth
    );
  }, [
    fightResult?.monster.monster.combat.health,
    fightResult?.monster.monster.combat.maxHealth,
    monster.combat.maxHealth,
  ]);

  async function handleFight(attackType: AttackType) {
    setLastAttack(attackType);
    try {
      const data = await fightMutation({
        variables: {
          monster: monsterId,
          attackType,
        },
      });
      if (data.data?.fight.victory) {
        if (onVictory) {
          onVictory();
        }
      }
    } catch (e) {
      console.log(e);
      if (onError) {
        onError(e);
      }
    }
  }

  if (fightMutationRef) {
    fightMutationRef.current = handleFight;
  }

  useEffect(() => {
    return () => {
      if (fightMutationRef) {
        fightMutationRef.current = () => {};
      }
    };
  }, []);

  return (
    <React.Fragment>
      <Grid
        id="combat-display"
        style={{
          minHeight: "110px",
        }}
        item
        xs={6}
      >
        <Grid container sx={{ textAlign: "center" }} columns={6}>
          <Grid item xs={6}>
            <Typography variant="h4">
              {enemyHealth > 0 && (autoBattle ? "Auto-Battling" : "Battling")}
              {enemyHealth <= 0 && "Dead"} {monster.name}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={enemyHealth}
              color="error"
            />
          </Grid>
          {enemyHealth > 0 && (
            <React.Fragment>
              <Grid item xs={6} sm={3} md={2} xl={2}>
                <Tooltip title="Attack using your melee weapons, uses strength and dexterity">
                  <Button
                    sx={{ fontSize: "1rem", padding: 2 }}
                    size="large"
                    id="attack-with-melee"
                    onClick={() => handleFight(AttackType.Melee)}
                    aria-label="melee attack"
                    startIcon={<ShieldIcon />}
                  >
                    Melee attack
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={6} sm={3} md={2} xl={2}>
                <Tooltip title="Attack using your ranged weapons, uses dexterity">
                  <Button
                    sx={{ fontSize: "1rem", padding: 2 }}
                    size="large"
                    id="attack-with-ranged"
                    onClick={() => handleFight(AttackType.Ranged)}
                    aria-label="ranged attack"
                    startIcon={<DoubleArrowIcon />}
                  >
                    Ranged attack
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={6} sm={3} md={2} xl={2}>
                <Tooltip title="Cast spells using your wisdom and intelligence">
                  <Button
                    sx={{ fontSize: "1rem", padding: 2 }}
                    size="large"
                    id="attack-with-cast"
                    onClick={() => handleFight(AttackType.Cast)}
                    aria-label="cast spell"
                    startIcon={<SchoolIcon />}
                  >
                    Cast Spell
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={6} sm={3} md={3} xl={3}>
                <Tooltip title="Smite your foe using wisdom and willpower">
                  <Button
                    sx={{ fontSize: "1rem", padding: 2 }}
                    size="large"
                    id="attack-with-holy"
                    onClick={() => handleFight(AttackType.Smite)}
                    aria-label="holy attack"
                    startIcon={<MenuBookIcon />}
                  >
                    Smite
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={6} sm={6} md={3} xl={3}>
                <Tooltip title="Damage yourself to damage the enemy, uses constitution">
                  <Button
                    sx={{ fontSize: "1rem", padding: 2 }}
                    size="large"
                    id="attack-with-blood"
                    onClick={() => handleFight(AttackType.Blood)}
                    aria-label="blood magic"
                    startIcon={<BloodtypeIcon />}
                  >
                    Blood magic
                  </Button>
                </Tooltip>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
        {fightResult &&
          fightResult.log.map((entry, i) => (
            <React.Fragment key={`${entry.from}-${i}`}>
              <Typography>
                {entry.isEnchantment && (
                  <React.Fragment>
                    {entry.damage < 0 && (
                      <React.Fragment>
                        <b>{entry.from}</b> heals{" "}
                        {(0 - entry.damage).toLocaleString()} health from their
                        enchantments
                      </React.Fragment>
                    )}
                    {entry.damage > 0 && (
                      <React.Fragment>
                        <b>{entry.from}</b> dealt{" "}
                        {entry.damage.toLocaleString()} enchantment damage to{" "}
                        <b>{entry.to}</b>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}
                {!entry.isEnchantment && (
                  <React.Fragment>
                    <b>{entry.from}</b>
                    {` ${getCombatPhrase(
                      entry.attackType,
                      entry.success,
                      entry.critical
                    )} `}
                    <b>{entry.to}</b>
                    {entry.success
                      ? ` for ${entry.damage.toLocaleString()} damage!`
                      : "."}
                  </React.Fragment>
                )}
              </Typography>
            </React.Fragment>
          ))}

        {fightResult && fightResult.victory && (
          <React.Fragment>
            <Typography id="fight-did-win">
              {monster.name} has been killed!
              {(fightResult.experience || fightResult.gold) && " You gain "}
              {fightResult.gold && (
                <React.Fragment>
                  {" "}
                  <span id="fight-recap-gold">
                    {fightResult.gold.toLocaleString()}
                  </span>{" "}
                  gold
                </React.Fragment>
              )}
              {fightResult.gold && fightResult.experience && ` and`}
              {fightResult.experience && (
                <React.Fragment>
                  {" "}
                  <span id="fight-recap-experience">
                    {fightResult.experience.toLocaleString()}
                  </span>{" "}
                  experience
                </React.Fragment>
              )}
              {(fightResult.experience || fightResult.gold) && "!! "}
              {fightResult.didLevel && (
                <b id="fight-level-up">You leveled up!!</b>
              )}
            </Typography>
            {fightResult.drop && (
              <React.Fragment>
                <br />
                <Typography id="fight-got-drop" variant="h5">
                  You find an enchanted item on the monster&apos;s corpse!
                  <br />
                  {itemDisplayName(fightResult.drop)}
                </Typography>
              </React.Fragment>
            )}
            <br />
            {showAutoBattle && (
              <Button
                fullWidth
                color="secondary"
                variant="contained"
                onClick={() => {
                  if (onAutoBattle) {
                    onAutoBattle(monster.id, lastAttack);
                  }
                }}
              >
                Auto-Battle this enemy
              </Button>
            )}
          </React.Fragment>
        )}
      </Grid>
    </React.Fragment>
  );
}

function getCombatPhrase(
  attackType: AttackType,
  success: boolean,
  critical: boolean
): string {
  switch (attackType) {
    case AttackType.Blood:
      return success
        ? critical
          ? "surges with blood magic against"
          : "lets blood and casts forth towards"
        : "attempts to cast a spell against";
      break;
    case AttackType.Smite:
      return success
        ? critical
          ? "summons powers beyond this world against"
          : "smites"
        : "attempts to smite";
      break;
    // case AttackType.Elemental:
    //   return success
    //     ? critical
    //       ? "creates an elemental storm around"
    //       : "casts an elemental spell at"
    //     : "attempts to cast a spell against";
    //   break;
    case AttackType.Cast:
      return success
        ? critical
          ? "carefully casts a spell at"
          : "blasts a beam of necrotic energy into"
        : "attempts to cast a spell against";
      break;
    case AttackType.Ranged:
      return success
        ? critical
          ? "lands a sneak attack from the shadows, critically damaging"
          : "fires an arrow at"
        : "shoots an arrow but it misses";
      break;
    case AttackType.Melee:
    default:
      return success
        ? critical
          ? "lands a crippling blow against"
          : "struck"
        : "missed";
      break;
  }
}
