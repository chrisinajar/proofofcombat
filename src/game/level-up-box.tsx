import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";

import { AttributeType, useLevelUpMutation } from "src/generated/graphql";
import { useDelay } from "src/hooks/use-delay";
import { useHero } from "src/hooks/use-hero";

export function LevelUpBox(): JSX.Element {
  const [currentDelay, setDelay] = useDelay();
  let [spendAmount, setSpendAmount] = useState<number>(1);
  const [levelUpMutation, { loading }] = useLevelUpMutation();
  const hero = useHero();

  if (hero?.attributePoints) {
    spendAmount = Math.min(spendAmount, hero.attributePoints);
  }

  const switchLabel = `Spending ${spendAmount.toLocaleString()} attribute points`;

  async function levelUp(attribute: keyof typeof AttributeType) {
    console.log("Leveling up...", attribute);
    try {
      await levelUpMutation({
        variables: { attribute: AttributeType[attribute], amount: spendAmount },
      });
    } catch (e: any) {
      if (e.graphQLErrors && e.graphQLErrors[0]?.extensions?.delay) {
        setDelay(e.graphQLErrors[0].extensions.remaining);
      }
    }
  }
  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: "secondary.light",
        }}
      >
        <br />
        <Typography variant="h5" align="center">
          You have leveled up!
        </Typography>
        <Container>
          <Typography align="center">
            Each of your attributes increases by 1 when you level up. You may
            also choose an attribute to further increase.
          </Typography>
          <Box sx={{ textAlign: "center", align: "center", ml: 1, mr: 1 }}>
            {hero && hero.attributePoints > 2 && (
              <React.Fragment>
                <Typography id="level-up-stat-slider-label">
                  {switchLabel}
                </Typography>
                <Slider
                  min={1}
                  max={hero.attributePoints}
                  value={spendAmount}
                  onChange={(e, value) =>
                    !Array.isArray(value) && setSpendAmount(value)
                  }
                  id="level-up-stat-slider"
                  aria-labelledby="level-up-stat-slider-label"
                  valueLabelDisplay="auto"
                />
              </React.Fragment>
            )}
          </Box>
        </Container>
        <br />
        <Grid container columns={14} spacing={2}>
          <Tooltip title="Strength determines your damage when attacking with melee weapons">
            <Grid item xs={14} sm={7} md={4} lg={2}>
              <Typography align="center">
                <Button
                  id="level-up-strength"
                  disabled={loading || currentDelay > 0}
                  onClick={() => levelUp("Strength")}
                  variant="contained"
                >
                  Strength
                </Button>
              </Typography>
            </Grid>
          </Tooltip>
          <Tooltip title="Dexterity determines the accuracy and dodge rate for melee and ranged weapons, it also determines ranged weapons damage">
            <Grid item xs={14} sm={7} md={4} lg={2}>
              <Typography align="center">
                <Button
                  id="level-up-dexterity"
                  disabled={loading || currentDelay > 0}
                  onClick={() => levelUp("Dexterity")}
                  variant="contained"
                >
                  Dexterity
                </Button>
              </Typography>
            </Grid>
          </Tooltip>
          <Tooltip title="Constitution determines your max health, and is used in both attacking and defending blood magic">
            <Grid item xs={14} sm={7} md={4} lg={2}>
              <Typography align="center">
                <Button
                  id="level-up-constitution"
                  disabled={loading || currentDelay > 0}
                  onClick={() => levelUp("Constitution")}
                  variant="contained"
                >
                  Constitution
                </Button>
              </Typography>
            </Grid>
          </Tooltip>
          <Tooltip title="Intelligence determines your spellcasting damage">
            <Grid item xs={14} sm={7} md={4} lg={2}>
              <Typography align="center">
                <Button
                  id="level-up-intelligence"
                  disabled={loading || currentDelay > 0}
                  onClick={() => levelUp("Intelligence")}
                  variant="contained"
                >
                  Intelligence
                </Button>
              </Typography>
            </Grid>
          </Tooltip>
          <Tooltip title="Wisdom is your accuracy and dodge stat for spellcasting and smiting">
            <Grid item xs={14} sm={7} md={4} lg={2}>
              <Typography align="center">
                <Button
                  id="level-up-wisdom"
                  disabled={loading || currentDelay > 0}
                  onClick={() => levelUp("Wisdom")}
                  variant="contained"
                >
                  Wisdom
                </Button>
              </Typography>
            </Grid>
          </Tooltip>
          <Tooltip title="Willpower helps you survive attacks by reducing damage, it also helps smiters deal deal more damage.">
            <Grid item xs={14} sm={7} md={4} lg={2}>
              <Typography align="center">
                <Button
                  id="level-up-willpower"
                  disabled={loading || currentDelay > 0}
                  onClick={() => levelUp("Willpower")}
                  variant="contained"
                >
                  Willpower
                </Button>
              </Typography>
            </Grid>
          </Tooltip>
          <Tooltip title="Luck helps you critically strike foes and also affects item drop rates">
            <Grid item xs={14} md={12} lg={2}>
              <Typography align="center">
                <Button
                  id="level-up-luck"
                  disabled={loading || currentDelay > 0}
                  onClick={() => levelUp("Luck")}
                  variant="contained"
                >
                  Luck
                </Button>
              </Typography>
            </Grid>
          </Tooltip>
          <Tooltip title="Places 1 in every stat for a more well rounded character">
            <Grid item xs={14} md={12} lg={2}>
              <Typography align="center">
                <Button
                  id="level-up-all"
                  disabled={loading || currentDelay > 0}
                  onClick={() => levelUp("All")}
                  variant="contained"
                >
                  All
                </Button>
              </Typography>
            </Grid>
          </Tooltip>
        </Grid>
        <br />
        <br />
        <br />
      </Box>
      <Divider />
    </React.Fragment>
  );
}
