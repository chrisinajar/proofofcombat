import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { CombatEntry, AttackType } from "src/generated/graphql";

type CombatDisplayProps = {
  fight: {
    victory: boolean | null;
    didLevel?: boolean | null;
    experience?: number | null;
    log: CombatEntry[];
    monster: {
      monster: {
        name: string;
      };
    };
  };
};

function getCombatPhrase(attackType: AttackType, success: boolean): string {
  switch (attackType) {
    case AttackType.Melee:
      return success ? "struck" : "missed";
  }
}

export function CombatDisplay(props: CombatDisplayProps): JSX.Element | null {
  const { fight } = props;

  const {
    monster: { monster },
  } = fight;

  return (
    <React.Fragment>
      <Grid
        style={{
          minHeight: "110px",
        }}
        item
        xs={6}
      >
        {fight.log.map((entry) => (
          <React.Fragment key={entry.from}>
            <Typography>
              <b>{entry.from}</b>
              {` ${getCombatPhrase(entry.attackType, entry.success)} `}
              <b>{entry.to}</b>
              {entry.success ? ` for ${entry.damage} damage!` : "."}
            </Typography>
          </React.Fragment>
        ))}

        {fight.victory && (
          <Typography>
            {monster.name} has been killed!
            {fight.experience && ` You gain ${fight.experience} experience! `}
            {fight.didLevel && <b>You leveled up!!</b>}
          </Typography>
        )}
      </Grid>
    </React.Fragment>
  );
}
