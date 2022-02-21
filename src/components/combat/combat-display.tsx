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
  fight: {
    id: string;
    monster: {
      name: string;
      combat: {
        health: number;
        maxHealth: number;
      };
    };
  };
  onVictory?: () => void;
  onError?: (e: any) => void;
};

export function CombatDisplay(props: CombatDisplayProps): JSX.Element | null {
  const {
    fight: { id: monsterId, monster },
    onVictory,
    onError,
  } = props;
  const [fightMutation, { data: fightData, loading: fightLoading }] =
    useFightMutation();
  const [enemyHealth, setEnemyHealth] = useState<number>(100);
  // fightResult
  //   ? (fightResult.monster.monster.combat.health /
  //       fightResult.monster.monster.combat.maxHealth) *
  //     100
  //   : 100
  const fightResult = fightData?.fight;

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
    console.log("Trying to fight", attackType);
    try {
      const data = await fightMutation({
        variables: {
          monster: monsterId,
          attackType,
        },
      });
      if (onVictory) {
        onVictory();
      }
    } catch (e) {
      console.log(e);
      if (onError) {
        onError(e);
      }
    }
  }

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
        <Grid container columns={6}>
          <Grid item xs={6}>
            <Typography variant="h4">Battling {monster.name}</Typography>
            <LinearProgress
              variant="determinate"
              value={enemyHealth}
              color="error"
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2} lg={1}>
            <Tooltip title="Attack using your strength">
              <Button
                id="attack-with-melee"
                onClick={() => handleFight(AttackType.Melee)}
                aria-label="melee attack"
                startIcon={<ShieldIcon />}
              >
                Melee attack
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={6} sm={3} md={2} lg={1}>
            <Tooltip title="Attack using your dexterity">
              <Button
                id="attack-with-ranged"
                onClick={() => handleFight(AttackType.Ranged)}
                aria-label="ranged attack"
                startIcon={<DoubleArrowIcon />}
              >
                Ranged attack
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={6} sm={3} md={2} lg={1}>
            <Tooltip title="Attack using your intelligence">
              <Button
                id="attack-with-wizard"
                onClick={() => handleFight(AttackType.Wizard)}
                aria-label="conjuration spell"
                startIcon={<SchoolIcon />}
              >
                Conjuration Spell
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={6} sm={3} md={2} lg={1}>
            <Tooltip title="Attack using your wisdon">
              <Button
                id="attack-with-elemental"
                onClick={() => handleFight(AttackType.Elemental)}
                aria-label="elemental spell"
                startIcon={<LocalFireDepartmentIcon />}
              >
                Elemental Spell
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={6} sm={3} md={2} lg={1}>
            <Tooltip title="Attack using your charisma">
              <Button
                id="attack-with-holy"
                onClick={() => handleFight(AttackType.Holy)}
                aria-label="holy attack"
                startIcon={<MenuBookIcon />}
              >
                Holy attack
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={6} sm={3} md={2} lg={1}>
            <Tooltip title="Attack using your constitution">
              <Button
                id="attack-with-blood"
                onClick={() => handleFight(AttackType.Blood)}
                aria-label="blood magic"
                startIcon={<BloodtypeIcon />}
              >
                Blood magic
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
        {fightResult &&
          fightResult.log.map((entry) => (
            <React.Fragment key={entry.from}>
              <Typography>
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
    case AttackType.Holy:
      return success
        ? critical
          ? "summons powers beyond this world against"
          : "smites"
        : "attempts to smite";
      break;
    case AttackType.Elemental:
      return success
        ? critical
          ? "creates an elemental storm around"
          : "casts an elemental spell at"
        : "attempts to cast a spell against";
      break;
    case AttackType.Wizard:
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
