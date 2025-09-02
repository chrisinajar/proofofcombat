import React, { useState, useEffect, useRef } from "react";
import { setInterval, clearInterval } from "worker-timers";

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
  PublicHero,
  HeroStance,
  DungeonSelectionMode,
} from "src/generated/graphql";

import { useHero } from "src/hooks/use-hero";
import { useDelay } from "src/hooks/use-delay";
import { useLocation } from "src/hooks/use-location";

import { CombatDisplay } from "./combat-display";
import { itemAllowsAutoBattle, itemImprovesAutoBattle } from "src/helpers";
import { DungeonStatus } from "src/components/dungeon-status";

type PartialMonsterInstance = Pick<MonsterInstance, "monster" | "id">;

const autoBattleSkipCount = 4;

declare global {
  interface Window {
    setChallengeMonster?: (mob: string) => void;
  }
}

export function Combat(): JSX.Element | null {
  const [autoBattleAttackType, setAutoBattleAttackType] = useState<AttackType>(
    AttackType.Melee,
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
  let [duelPlayer, setDuelPlayer] = useState<string>("");
  const [activeDuel, setActiveDuel] = useState<string>("");
  const { data: monstersData, loading, error, refetch } = useMonstersQuery();
  const [challengeMutation] = useChallengeMutation();
  const [healMutation, { loading: healLoading }] = useHealMutation();
  const { data: challengesData, refetch: refetchChallenges } =
    useChallengesQuery();
  let challenges: Pick<Monster, "id" | "name" | "level">[] =
    challengesData?.challenges || [];
  const hero = useHero();
  const [fightMutation, { data: fightData, loading: fightLoading }] =
    useFightMutation();
  const fightMutationRef = useRef<(attackType: AttackType) => void>((a) => {});
  const locationDetails = useLocation();

  let playerList: PublicHero[] = locationDetails?.players ?? [];

  const fightingMonster = monstersData?.monsters?.find(
    (m) => m.id === currentFight,
  );
  const dungeon = hero?.dungeon ?? null;
  const isLockedOrder = dungeon?.selection === DungeonSelectionMode.LockedOrder;
  const isAnyOrder = dungeon?.selection === DungeonSelectionMode.AnyOrder;
  const expectedNextId = isLockedOrder && dungeon?.remaining?.length
    ? dungeon.remaining[Math.max(0, Math.min(dungeon.index, dungeon.remaining.length - 1))]
    : null;
  let canAutoBattle = false;
  let improvedAutoBattleCount = 0;

  if (hero) {
    canAutoBattle = !!hero.inventory.find((item) =>
      itemAllowsAutoBattle(item.baseItem),
    );
    improvedAutoBattleCount = hero.inventory.filter((item) =>
      itemImprovesAutoBattle(item.baseItem),
    ).length;
  }

  const anyLoading = healLoading || loading || fightLoading;

  useEffect(() => {
    window.setChallengeMonster = setChallenge;
    return () => {
      delete window.setChallengeMonster;
    };
  }, [setChallenge]);

  useEffect(() => {
    refetchChallenges();
    refetch();
  }, [hero?.location.x, hero?.location.y, hero?.location.map]);

  autoBattleRef.current = async () => {
    setAutoBattleCount(
      (autoBattleCount + 1) %
        (autoBattleSkipCount / Math.pow(2, improvedAutoBattleCount)),
    );
    setAutoBattleBars([
      Math.random() > 0.5 ? Math.random() * 100 : autoBattleBars[0],
      Math.random() > 0.5 ? Math.random() * 100 : autoBattleBars[1],
      Math.random() > 0.5 ? Math.random() * 100 : autoBattleBars[2],
    ]);
    if (autoBattleCount !== 0) {
      return;
    }
    if (anyLoading || currentDelay > 0) {
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
    const intervalTime = 2000;
    const timerId = setInterval(() => {
      autoBattleRef.current();
    }, intervalTime / autoBattleSkipCount);

    return () => {
      clearInterval(timerId);
    };
  }, [autoBattle, improvedAutoBattleCount]);

  useEffect(() => {
    if (monstersData?.monsters?.length) {
      let list = monstersData.monsters
        .concat()
        .sort((a, b) => a.monster.level - b.monster.level);
      if (isAnyOrder && dungeon?.remaining?.length) {
        list = list.filter((mi) => dungeon.remaining.includes(mi.monster.id));
      }

      if (monster === "") {
        setMonster(list[0]?.id ?? "");
      } else {
        const existingMonster = list.find((m) => m.id === monster);
        if (!existingMonster) {
          setMonster(list[0]?.id ?? "");
        }
      }
    }
  }, [monster, monstersData?.monsters?.length, isAnyOrder, dungeon?.remaining?.join("|")]);

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
      (m) => m.id === monster,
    );
    setCurrentFight(monster);
    setActiveDuel("");
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
      setActiveDuel("");
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

  async function handleDuel() {
    setActiveDuel(duelPlayer);
    setCurrentFight("");
  }

  const existingMonster = monstersData?.monsters?.find((m) => m.id === monster);

  if (!existingMonster) {
    monster = "";
  }

  const activeDuelPlayer = playerList.find((p) => p.id === activeDuel);

  const existingDuelPlayer = playerList.find((p) => p.id === duelPlayer);
  if (!existingDuelPlayer) {
    duelPlayer = "";
  }

  if (!hero) {
    return null;
  }

  const showAll = hero.levelCap > 100;
  if (!showAll) {
    challenges = challenges.slice(0, hero.level);
  }
  if (isAnyOrder && dungeon?.remaining?.length) {
    challenges = challenges.filter((c) => dungeon.remaining.includes(c.id));
  }

  playerList = playerList.filter((p) => p.combat.health > 0);

  const challengeLabel = "Select a new monster to challenge";
  const fightLabel = "Fight an existing monster!";
  const duelLabel = "Duel with a nearby player!";

  const isMonsterInChallengeList = !!(
    fightingMonster &&
    challenges.some((c) => c.id === fightingMonster.monster.id)
  );
  const isChallengableFinal = isLockedOrder ? !!expectedNextId : isMonsterInChallengeList;
  const fightingCorrectLocked = !!(
    isLockedOrder &&
    expectedNextId &&
    fightingMonster &&
    fightingMonster.monster.id === expectedNextId
  );
  const canChallengeNext = !!(isLockedOrder && expectedNextId && !fightingCorrectLocked);

  return (
    <React.Fragment>
      <DungeonStatus />
      <Grid container columns={6} spacing={4}>
        {!autoBattle && hero && hero.combat.health > 0 && (
          <React.Fragment>
            {!isLockedOrder && (
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
                      &nbsp;
                      <Typography variant="caption" display="inline-block">
                        Tier {challengeOption.level}
                      </Typography>
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
            )}
            {!isLockedOrder && (
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
                      .filter((mi) => !isAnyOrder || !dungeon?.remaining?.length || dungeon.remaining.includes(mi.monster.id))
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
            )}
            {isLockedOrder && canChallengeNext && (
              <Grid item md={6} xs={6}>
                <Button
                  fullWidth
                  id="challenge-next-monster"
                  variant="contained"
                  disabled={currentDelay > 0 || healLoading || autoBattle}
                  onClick={() => expectedNextId && challengeTarget(expectedNextId)}
                >
                  Challenge Next Monster
                </Button>
              </Grid>
            )}
            {!dungeon && playerList.length > 1 && (
              <Grid item md={3} xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="duel-select-label">{duelLabel}</InputLabel>
                  <Select
                    id="duel-select"
                    labelId="duel-select-label"
                    value={duelPlayer}
                    label={duelLabel}
                    disabled={autoBattle}
                    onChange={(e) => setDuelPlayer(e.target.value)}
                  >
                    {playerList
                      .filter((other) => other.id !== hero.id)
                      .sort((a, b) => a.level - b.level)
                      .map((publicHero) => (
                        <MenuItem key={publicHero.id} value={publicHero.id}>
                          {publicHero.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <Button
                    id="duel-button"
                    disabled={
                      !duelPlayer.length ||
                      currentDelay > 0 ||
                      healLoading ||
                      autoBattle
                    }
                    onClick={handleDuel}
                    variant="contained"
                  >
                    Duel Player!
                  </Button>
                </FormControl>
              </Grid>
            )}
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
        {fightingMonster && (
          <React.Fragment>
            <CombatDisplay
              key={`${fightingMonster.id}-${currentFightId}`}
              hero={hero}
              fight={fightingMonster}
              onError={() => {
                refetch();
                setCurrentFight(null);
              }}
              autoBattle={autoBattle}
              canAutoBattle={canAutoBattle}
              onAutoBattle={handleAutoBattle}
              onRematch={(id) => {
                if (isLockedOrder && expectedNextId) {
                  challengeTarget(expectedNextId);
                } else {
                  challengeTarget(id);
                }
              }}
              rematchLabel={isLockedOrder ? "Challenge Next Monster" : undefined}
              fightMutationRef={fightMutationRef}
              onVictory={() => setMobKillCount(mobKillCount + 1)}
              isChallengable={isChallengableFinal}
            />
          </React.Fragment>
        )}
        {activeDuelPlayer && (
          <React.Fragment>
            <CombatDisplay
              key={`${activeDuelPlayer.id}-${currentFightId}`}
              hero={hero}
              fight={{
                id: activeDuelPlayer.id,
                monster: activeDuelPlayer,
              }}
              onError={() => {
                refetch();
                setCurrentFight(null);
              }}
              duel
              autoBattle={false}
              canAutoBattle={false}
              isChallengable={isMonsterInChallengeList}
            />
          </React.Fragment>
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
