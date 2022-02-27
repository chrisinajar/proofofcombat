import React, { useState, useEffect, useRef } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

import {
  useMonstersQuery,
  useChallengesQuery,
  useFightMutation,
  useHealMutation,
  useChallengeMutation,
  Monster,
  MonsterInstance,
  AttackType,
} from "src/generated/graphql";

import { useHero } from "src/hooks/use-hero";
import { useDelay } from "src/hooks/use-delay";

import { CombatDisplay } from "./combat-display";
import { itemAllowsAutoBattle } from "src/helpers";

const challengeLabel = "Select a new monster to challenge";
const fightLabel = "Fight an existing monster!";

type PartialMonsterInstance = Pick<MonsterInstance, "monster" | "id">;

const autoBattleSkipCount = 4;

export function Combat(): JSX.Element {
  const [autoBattleAttackType, setAutoBattleAttackType] = useState<AttackType>(
    AttackType.Melee
  );
  const [mobKillCount, setMobKillCount] = useState<number>(0);
  const [autoBattleCount, setAutoBattleCount] = useState<number>(0);
  const [autoBattleBars, setAutoBattleBars] = useState([0, 50, 100]);
  const autoBattleRef = useRef<() => void>(() => {});
  const [autoBattle, setAutoBattle] = useState<boolean>(false);
  const [autoBattleTarget, setAutoBattleTarget] = useState<string>("");
  const [currentFightId, setCurrentFightId] = useState<number>(0);
  const [currentFight, setCurrentFight] = useState<string | null>(null);
  const [currentDelay, setDelay] = useDelay();
  const [challenge, setChallenge] = useState<string>("");
  let [monster, setMonster] = useState<string>("");
  const { data: monstersData, loading, error, refetch } = useMonstersQuery();
  const [challengeMutation] = useChallengeMutation();
  const [healMutation, { loading: healLoading }] = useHealMutation();
  const { data: challengesData, refetch: refetchChallenges } =
    useChallengesQuery();
  const challenges: Pick<Monster, "id" | "name" | "level">[] =
    challengesData?.challenges || [];
  const hero = useHero();
  const [fightMutation, { data: fightData, loading: fightLoading }] =
    useFightMutation();
  const fightMutationRef = useRef<(attackType: AttackType) => void>((a) => {});

  const fightingMonster = monstersData?.monsters?.find(
    (m) => m.id === currentFight
  );
  let canAutoBattle = false;

  if (hero) {
    canAutoBattle = !!hero.inventory.find((item) =>
      itemAllowsAutoBattle(item.baseItem)
    );
  }

  useEffect(() => {
    refetchChallenges();
  }, [hero?.location.x, hero?.location.y, hero?.location.map]);

  autoBattleRef.current = async () => {
    setAutoBattleCount((autoBattleCount + 1) % autoBattleSkipCount);
    setAutoBattleBars([
      Math.random() > 0.5 ? Math.random() * 100 : autoBattleBars[0],
      Math.random() > 0.5 ? Math.random() * 100 : autoBattleBars[1],
      Math.random() > 0.5 ? Math.random() * 100 : autoBattleBars[2],
    ]);
    if (autoBattleCount !== 0) {
      return;
    }
    if (hero?.combat.health === 0) {
      console.log("[AutoBattler] Healing!");
      return handleHeal();
    }
    if (
      !fightingMonster ||
      fightingMonster.monster.combat.health === 0 ||
      fightingMonster.monster.id !== autoBattleTarget
    ) {
      console.log("[AutoBattler] Challenging new mob!");
      challengeTarget(autoBattleTarget);
      return;
    }
    if (fightingMonster && fightMutationRef.current) {
      console.log(`[AutoBattler] Fighting ${autoBattleAttackType}!`);
      fightMutationRef.current(autoBattleAttackType);
      return;
    }
    console.log("[AutoBattler] Doing nothing...");
  };

  useEffect(() => {
    if (!autoBattle || !autoBattleTarget.length) {
      return;
    }
    const timerId = setInterval(() => {
      autoBattleRef.current();
    }, 2000 / autoBattleSkipCount);

    return () => {
      clearInterval(timerId);
    };
  }, [autoBattle]);

  useEffect(() => {
    if (monstersData?.monsters?.length) {
      const monsterList = monstersData.monsters
        .concat()
        .sort((a, b) => a.monster.level - b.monster.level);

      if (monster === "") {
        setMonster(monsterList[0].id);
      } else {
        const existingMonster = monstersData.monsters.find(
          (m) => m.id === monster
        );
        if (!existingMonster) {
          setMonster(monsterList[0].id);
        }
      }
    }
  }, [monster, monstersData?.monsters?.length]);

  async function handleHeal() {
    try {
      await healMutation();
    } catch (e: any) {
      if (e.graphQLErrors && e.graphQLErrors[0]?.extensions?.delay) {
        setDelay(e.graphQLErrors[0].extensions.remaining);
      }
    }
  }

  async function handleFight() {
    const existingMonster = monstersData?.monsters.find(
      (m) => m.id === monster
    );
    setCurrentFight(monster);
  }

  async function handleChallenge() {
    return challengeTarget(challenge);
  }

  async function challengeTarget(mob: string) {
    try {
      const { data } = await challengeMutation({
        variables: {
          monster: mob,
        },
      });
      await refetch();
      if (data?.challenge) {
        setCurrentFight(data.challenge.id);
      }
      if (data?.challenge?.id) {
        setMonster(data?.challenge?.id);
      }
      setCurrentFightId(currentFightId + 1);
    } catch (e) {
      refetch();
    }
  }

  async function handleAutoBattle(mob: string, attackType: AttackType) {
    console.log("Enabling auto battler! weee!");
    setAutoBattle(true);
    setAutoBattleAttackType(attackType);
    setMobKillCount(0);
    setAutoBattleTarget(mob);
  }

  const existingMonster = monstersData?.monsters?.find((m) => m.id === monster);

  if (!existingMonster) {
    monster = "";
  }

  return (
    <React.Fragment>
      <Grid container columns={6} spacing={4}>
        {!autoBattle && hero && hero.combat.health > 0 && (
          <React.Fragment>
            <Grid item md={3} xs={6}>
              <FormControl fullWidth>
                <InputLabel id="challenge-monster-select-label">
                  {challengeLabel}
                </InputLabel>
                <Select
                  id="challenge-select"
                  labelId="challenge-monster-select-label"
                  value={challenge}
                  label={challengeLabel}
                  disabled={autoBattle}
                  onChange={(e) => setChallenge(e.target.value)}
                >
                  {challenges.map((challengeOption) => (
                    <MenuItem
                      key={challengeOption.id}
                      value={challengeOption.id}
                    >
                      {challengeOption.name}
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  id="challenge-button"
                  disabled={
                    !challenge || currentDelay > 0 || healLoading || autoBattle
                  }
                  onClick={handleChallenge}
                  variant="contained"
                >
                  Challenge!
                </Button>
              </FormControl>
            </Grid>
            <Grid item md={3} xs={6}>
              <FormControl fullWidth>
                <InputLabel id="fight-monster-select-label">
                  {fightLabel}
                </InputLabel>
                <Select
                  id="fight-select"
                  labelId="fight-monster-select-label"
                  value={monster}
                  label={fightLabel}
                  disabled={autoBattle}
                  onChange={(e) => setMonster(e.target.value)}
                >
                  {monstersData?.monsters &&
                    [...monstersData?.monsters]
                      .sort((a, b) => a.monster.level - b.monster.level)
                      .map((monsterInstance) => (
                        <MenuItem
                          key={monsterInstance.id}
                          value={monsterInstance.id}
                          disabled={monsterInstance.monster.combat.health === 0}
                        >
                          {monsterInstance.monster.combat.health === 0 &&
                            "Dead "}
                          {monsterInstance.monster.name}
                        </MenuItem>
                      ))}
                </Select>
                <Button
                  id="fight-button"
                  disabled={
                    !monster ||
                    currentDelay > 0 ||
                    healLoading ||
                    (existingMonster &&
                      existingMonster.monster.combat.health === 0) ||
                    autoBattle
                  }
                  onClick={handleFight}
                  variant="contained"
                >
                  Fight!
                </Button>
              </FormControl>
            </Grid>
          </React.Fragment>
        )}
        {autoBattle && (
          <Grid item xs={6}>
            <LinearProgress
              sx={{ margin: 1, color: "#f00" }}
              variant="determinate"
              value={autoBattleBars[0]}
              color="inherit"
            />
            <LinearProgress
              color="inherit"
              sx={{ margin: 1, color: "#0f0" }}
              variant="determinate"
              value={autoBattleBars[1]}
            />
            <LinearProgress
              color="inherit"
              sx={{ margin: 1, color: "#00f" }}
              variant="determinate"
              value={autoBattleBars[2]}
            />
            <Button
              fullWidth
              variant="contained"
              color="error"
              size="large"
              onClick={() => setAutoBattle(false)}
            >
              Disable Auto-Battle
            </Button>
          </Grid>
        )}
        {hero && hero.combat.health <= 0 && (
          <Grid item lg={3} xs={6}>
            <Typography id="you-are-dead">You are dead.</Typography>
          </Grid>
        )}
        {hero && hero.combat.health > 0 && fightingMonster && (
          <CombatDisplay
            key={`${fightingMonster.id}-${currentFightId}`}
            fight={fightingMonster}
            onError={() => {
              refetch();
              setCurrentFight(null);
            }}
            autoBattle={autoBattle}
            canAutoBattle={canAutoBattle}
            onAutoBattle={handleAutoBattle}
            fightMutationRef={fightMutationRef}
            onVictory={() => setMobKillCount(mobKillCount + 1)}
          />
        )}
        <Grid item lg={3} xs={6}>
          <Button
            id="heal-button"
            fullWidth
            onClick={handleHeal}
            variant="contained"
            disabled={
              currentDelay > 0 ||
              healLoading ||
              (hero && hero.combat.health === hero.combat.maxHealth)
            }
          >
            Heal
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
