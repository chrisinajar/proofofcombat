import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import {
  useMonstersQuery,
  useChallengesQuery,
  useFightMutation,
  useHealMutation,
  useChallengeMutation,
  Monster,
  MonsterInstance,
} from "src/generated/graphql";

import { useHero } from "src/hooks/use-hero";
import { useDelay } from "src/hooks/use-delay";

import { CombatDisplay } from "./combat-display";

const challengeLabel = "Select a monster to challenge";
const fightLabel = "Fight a monster!";

type PartialMonsterInstance = Pick<MonsterInstance, "monster" | "id">;

export function Combat(): JSX.Element {
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

  useEffect(() => {
    refetchChallenges();
  }, [hero?.location.x, hero?.location.y, hero?.location.map]);

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
    try {
      const { data } = await challengeMutation({
        variables: {
          monster: challenge,
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

  const existingMonster = monstersData?.monsters?.find((m) => m.id === monster);

  if (!existingMonster) {
    monster = "";
  }

  const fightingMonster = monstersData?.monsters?.find(
    (m) => m.id === currentFight
  );

  return (
    <React.Fragment>
      <Grid container columns={6} spacing={4}>
        {fightingMonster && (
          <CombatDisplay
            key={`${fightingMonster.id}-${currentFightId}`}
            fight={fightingMonster}
            onError={() => {
              refetch();
              setCurrentFight(null);
            }}
          />
        )}
        {hero && hero.combat.health > 0 && (
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
                  disabled={!challenge || currentDelay > 0 || healLoading}
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
                  onChange={(e) => setMonster(e.target.value)}
                >
                  {monstersData?.monsters &&
                    [...monstersData?.monsters]
                      .sort((a, b) => a.monster.level - b.monster.level)
                      .map((monsterInstance) => (
                        <MenuItem
                          key={monsterInstance.id}
                          value={monsterInstance.id}
                        >
                          {monsterInstance.monster.name}
                        </MenuItem>
                      ))}
                </Select>
                {loading && <CircularProgress />}
                <Button
                  id="fight-button"
                  disabled={!monster || currentDelay > 0 || healLoading}
                  onClick={handleFight}
                  variant="contained"
                >
                  Fight!
                </Button>
              </FormControl>
            </Grid>
          </React.Fragment>
        )}
        {hero && hero.combat.health <= 0 && (
          <Grid item lg={3} xs={6}>
            <Typography id="you-are-dead">You are dead.</Typography>
          </Grid>
        )}
        <Grid item lg={3} xs={6}>
          <Button
            id="heal-button"
            fullWidth
            onClick={handleHeal}
            variant="contained"
            disabled={currentDelay > 0 || healLoading}
          >
            Heal
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
