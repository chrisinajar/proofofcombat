import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

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
} from "src/generated/graphql";

type CombatDisplayProps = {
  fight: {
    id: string;
    monster: {
      name: string;
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

  const fightResult = fightData?.fight;

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

  console.log({ fightResult });

  return (
    <React.Fragment>
      <Grid
        style={{
          minHeight: "110px",
        }}
        item
        xs={6}
      >
        <Grid container columns={6}>
          <Grid item xs={6} sm={3} md={2} lg={1}>
            <Tooltip title="Attack using your strength">
              <Button
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
                {` ${getCombatPhrase(entry.attackType, entry.success)} `}
                <b>{entry.to}</b>
                {entry.success ? ` for ${entry.damage} damage!` : "."}
              </Typography>
            </React.Fragment>
          ))}

        {fightResult && fightResult.victory && (
          <Typography>
            {monster.name} has been killed!
            {fightResult.experience &&
              ` You gain ${fightResult.experience} experience! `}
            {fightResult.didLevel && <b>You leveled up!!</b>}
          </Typography>
        )}
      </Grid>
    </React.Fragment>
  );
}

function getCombatPhrase(attackType: AttackType, success: boolean): string {
  switch (attackType) {
    case AttackType.Blood:
      return success
        ? "lets blood and casts forth towards"
        : "attempts to cast a spell against";
      break;
    case AttackType.Holy:
      return success
        ? "summons powers beyond this world against"
        : "attempts to cast a spell against";
      break;
    case AttackType.Elemental:
      return success
        ? "creates an elemental storm around"
        : "attempts to cast a spell against";
      break;
    case AttackType.Wizard:
      return success
        ? "carefully casts a spell at"
        : "attempts to cast a spell against";
      break;
    case AttackType.Ranged:
      return success ? "fires an arrow at" : "shoots an arrow but it misses";
      break;
    case AttackType.Melee:
    default:
      return success ? "struck" : "missed";
      break;
  }
}
