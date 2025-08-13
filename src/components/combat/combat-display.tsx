import React, { useState, useEffect } from "react";

import { useTheme } from "@mui/material/styles";

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
import ReplayIcon from "@mui/icons-material/Replay";

import {
  CombatEntry,
  AttackType,
  useFightMutation,
  useAttackHeroMutation,
  EnchantmentType,
  InventoryItem,
  HeroStance,
  Hero,
} from "src/generated/graphql";

import { itemDisplayName } from "src/helpers";

import { StanceSelector } from "./stance-selector";

type CombatDisplayProps = {
  autoBattle: boolean;
  canAutoBattle: boolean;
  duel?: true;
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
  onRematch?: (monsterName: string) => void;
  onError?: (e: any) => void;
  onAutoBattle?: (monsterId: string, attackType: AttackType) => void;
  fightMutationRef?: React.MutableRefObject<(attackType: AttackType) => void>;
  hero: Hero;
  isChallengable: boolean;
};

export function CombatDisplay(props: CombatDisplayProps): JSX.Element | null {
  const {
    autoBattle,
    canAutoBattle,
    fight: { id: monsterId, monster },
    onVictory,
    onRematch,
    onError,
    onAutoBattle,
    fightMutationRef,
    duel,
    hero,
    isChallengable,
  } = props;
  const [killedByAnother, setKilledByAnother] = useState<boolean>(false);
  const [fightMutation, { data: fightData, loading: fightLoading }] =
    useFightMutation();
  const [duelPlayerMutation, { data: duelData, loading: duelLoading }] =
    useAttackHeroMutation();
  const [enemyHealth, setEnemyHealth] = useState<number>(100);
  const [lastAttack, setLastAttack] = useState<AttackType>(
    hero.availableAttacks?.[0] ?? AttackType.Melee,
  );
  const fightResult: {
    victory: boolean;
    gold?: number | null;
    experience?: number | null;
    didLevel?: boolean | null;
    log: CombatEntry[];
    drop?: InventoryItem | null;
  } | null = fightData?.fight || duelData?.attackHero || null;
  const monsterOrPlayer =
    fightData?.fight?.monster?.monster ||
    duelData?.attackHero?.otherHero ||
    null;
  const theme = useTheme();

  const [desiredStance, setDesiredStance] = useState<HeroStance>(
    hero.activeStance || HeroStance.Normal,
  );

  const showAutoBattle = !autoBattle && canAutoBattle;

  // Ensure lastAttack remains valid if equipment changes
  useEffect(() => {
    if (!hero.availableAttacks.includes(lastAttack)) {
      setLastAttack(hero.availableAttacks?.[0] ?? AttackType.Melee);
    }
  }, [hero.availableAttacks.join("|")]);

  useEffect(() => {
    if (killedByAnother) {
      setKilledByAnother(false);
    }
    if (fightLoading || duelLoading) {
      return;
    }
    setEnemyHealth(
      (100 *
        (monsterOrPlayer
          ? monsterOrPlayer.combat.health
          : monster.combat.health)) /
        monster.combat.maxHealth,
    );
  }, [
    monsterOrPlayer?.combat.health,
    monsterOrPlayer?.combat.maxHealth,
    monster.combat.maxHealth,
  ]);

  async function handleFight(attackType: AttackType) {
    setLastAttack(attackType);

    try {
      if (duel) {
        const data = await duelPlayerMutation({
          variables: {
            id: monsterId,
            attackType,
            stance: desiredStance,
          },
        });
        if (data.data?.attackHero.victory) {
          if (onVictory) {
            onVictory();
          }
        }
      } else {
        const data = await fightMutation({
          variables: {
            monster: monsterId,
            attackType,
            stance: desiredStance,
          },
        });
        if (data.data?.fight.victory) {
          if (onVictory) {
            onVictory();
          }
        }
      }
    } catch (e: any) {
      if (e.graphQLErrors && e.graphQLErrors[0]) {
        const [gqlError] = e.graphQLErrors;
        if (gqlError.extensions?.delay) {
          return;
        }
        if (gqlError.message.startsWith("Key not found in database")) {
          setKilledByAnother(true);
          setEnemyHealth(0);
          return;
        }
      }
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

  const maxTime = fightResult?.log?.[0]?.time ?? 3000;

  return (
    <React.Fragment>
      {!autoBattle && <StanceSelector onChange={setDesiredStance} />}
      <Grid
        id="combat-display"
        sx={{
          position: "relative",
          minHeight: "320px",
          [theme.breakpoints.down("md")]: {
            minHeight: "450px",
          },
          [theme.breakpoints.down("sm")]: {
            minHeight: "580px",
          },
          [theme.breakpoints.down("xs")]: {
            minHeight: "660px",
          },
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
              {hero.availableAttacks.includes(AttackType.Melee) && (
                <Grid item xs={6} sm={3} md={2} xl={2}>
                <Tooltip
                  title="Attack using your melee weapons, uses strength and dexterity"
                  describeChild
                >
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
              )}
              {hero.availableAttacks.includes(AttackType.Ranged) && (
                <Grid item xs={6} sm={3} md={2} xl={2}>
                <Tooltip
                  title="Attack using your ranged weapons, uses dexterity"
                  describeChild
                >
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
              )}
              {hero.availableAttacks.includes(AttackType.Cast) && (
                <Grid item xs={6} sm={3} md={2} xl={2}>
                <Tooltip
                  title="Cast spells using your wisdom and intelligence"
                  describeChild
                >
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
              )}
              {hero.availableAttacks.includes(AttackType.Smite) && (
                <Grid item xs={6} sm={3} md={3} xl={3}>
                <Tooltip
                  title="Smite your foe using wisdom and willpower"
                  describeChild
                >
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
              )}
              {hero.availableAttacks.includes(AttackType.Blood) && (
                <Grid item xs={6} sm={6} md={3} xl={3}>
                <Tooltip
                  title="Damage yourself to damage the enemy, uses constitution"
                  describeChild
                >
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
              )}
            </React.Fragment>
          )}
          {enemyHealth <= 0 && !!onRematch && isChallengable && (
            <Tooltip
              title="Summon a new instance of this monster and fight it"
              describeChild
            >
              <Button
                fullWidth
                sx={{ fontSize: "1rem", padding: 2 }}
                size="large"
                id="respawn-monster"
                onClick={() => onRematch?.(monster.id)}
                aria-label="respawn monster"
                startIcon={<ReplayIcon />}
              >
                Spawn new {monster.name}
              </Button>
            </Tooltip>
          )}
        </Grid>
        {killedByAnother && "This enemy was killed by another player"}
        {fightResult &&
          fightResult.log.map((entry, i) => (
            <React.Fragment key={`${entry.from}-${i}`}>
              <Typography>
                +{(maxTime - entry.time) / 1000}
                {"s "}
                {entry.isEnchantment && (
                  <React.Fragment>
                    {entry.damage < 0 && (
                      <React.Fragment>
                        <b>{entry.from}</b> heals{" "}
                        <span id={`fight-${entry.from}-enchantment-heal`}>
                          {(0 - entry.damage).toLocaleString()}
                        </span>{" "}
                        health from their enchantments
                      </React.Fragment>
                    )}
                    {entry.damage > 0 && (
                      <React.Fragment>
                        <b>{entry.from}</b> dealt{" "}
                        <span id={`fight-${entry.from}-enchantment-damage`}>
                          {entry.damage.toLocaleString()}
                        </span>{" "}
                        enchantment damage to <b>{entry.to}</b>
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
      </Grid>
    </React.Fragment>
  );
}

function getCombatPhrase(
  attackType: AttackType,
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
          ? "carefully casts a powerful spell against"
          : "shoots a magical bolt at"
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
