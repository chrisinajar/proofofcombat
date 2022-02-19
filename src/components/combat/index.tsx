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
} from "src/generated/graphql";

import { useHero } from "src/hooks/use-hero";

import { CombatDisplay } from "./combat-display";

const challengeLabel = "Select a monster to challenge";
const fightLabel = "Fight a monster!";

export function Combat(): JSX.Element {
  const [challenge, setChallenge] = useState<string>("");
  const [monster, setMonster] = useState<string>("");
  const { data, loading, error, refetch } = useMonstersQuery();
  const [fightMutation, { data: fightData }] = useFightMutation();
  const [challengeMutation] = useChallengeMutation();
  const [healMutation] = useHealMutation();
  const { data: challengesData, refetch: refetchChallenges } =
    useChallengesQuery();
  const challenges: Pick<Monster, "id" | "name" | "level">[] =
    challengesData?.challenges || [];
  const hero = useHero();

  useEffect(() => {
    refetchChallenges();
  }, [hero?.location.x, hero?.location.y, hero?.location.map]);

  async function handleHeal() {
    try {
      await healMutation();
    } catch (e) {}
  }

  async function handleFight() {
    try {
      const fightResult = await fightMutation({
        variables: {
          monster,
        },
      });
      if (fightResult.data?.fight.victory) {
        setMonster("");
        refetch();
      }
    } catch (e) {
      refetch();
    }
  }

  async function handleChallenge() {
    try {
      await challengeMutation({
        variables: {
          monster: challenge,
        },
      });
      refetch();
    } catch (e) {
      refetch();
    }
  }

  return (
    <React.Fragment>
      <Grid container columns={6} spacing={4}>
        {fightData && <CombatDisplay fight={fightData.fight} />}
        {hero && hero.combat.health > 0 && (
          <React.Fragment>
            <Grid item md={3} xs={6}>
              <FormControl fullWidth>
                <InputLabel id="challenge-monster-select-label">
                  {challengeLabel}
                </InputLabel>
                <Select
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
                  disabled={!challenge}
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
                  labelId="fight-monster-select-label"
                  value={monster}
                  label={fightLabel}
                  onChange={(e) => setMonster(e.target.value)}
                >
                  {data?.monsters &&
                    data?.monsters.map((monsterInstance) => (
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
                  disabled={!monster}
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
            <Typography>You are dead.</Typography>
          </Grid>
        )}
        <Grid item lg={3} xs={6}>
          <Button fullWidth onClick={handleHeal} variant="contained">
            Heal
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
