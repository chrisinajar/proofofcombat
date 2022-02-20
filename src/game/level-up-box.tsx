import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import { AttributeType, useLevelUpMutation } from "src/generated/graphql";
import { useDelay } from "src/hooks/use-delay";

export function LevelUpBox(): JSX.Element {
  const [currentDelay] = useDelay();
  const [levelUpMutation, { loading }] = useLevelUpMutation();
  async function levelUp(attribute: keyof typeof AttributeType) {
    console.log("Leveling up...", attribute);
    await levelUpMutation({
      variables: { attribute: AttributeType[attribute] },
    });
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
            Each of your attributes has a chance to increase by 1 when you level
            up, this chance is increased by Luck. You may also choose one
            attribute to increase.
          </Typography>
        </Container>
        <br />
        <Grid container columns={7} spacing={2}>
          <Tooltip title="Strength helps you with melee attacks">
            <Grid item xs={7} sm={3} md={2} lg={1}>
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
          <Tooltip title="Dexterity helps you with ranged attacks and with defending against both ranged attacks and elemental spells">
            <Grid item xs={7} sm={3} md={2} lg={1}>
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
          <Tooltip title="Constitution determines your max health, is used in both attack and defending blood magic, and also helps defend against melee attacks">
            <Grid item xs={7} sm={3} md={2} lg={1}>
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
          <Tooltip title="Intelligence is used to conjure wizard spells as well as to defend against holy sells">
            <Grid item xs={7} sm={3} md={2} lg={1}>
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
          <Tooltip title="Wisdom helps you cast elemental spells, as well as defending against wizard spells">
            <Grid item xs={7} sm={3} md={2} lg={1}>
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
          <Tooltip title="Charisma is used by holy warriors to attack">
            <Grid item xs={7} sm={3} md={2} lg={1}>
              <Typography align="center">
                <Button
                  id="level-up-charisma"
                  disabled={loading || currentDelay > 0}
                  onClick={() => levelUp("Charisma")}
                  variant="contained"
                >
                  Charisma
                </Button>
              </Typography>
            </Grid>
          </Tooltip>
          <Tooltip title="Luck helps your odds in most random rolls the game makes">
            <Grid item xs={7} sm={3} md={2} lg={1}>
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
        </Grid>
        <br />
        <br />
        <br />
      </Box>
      <Divider />
    </React.Fragment>
  );
}
