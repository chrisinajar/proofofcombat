import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Quest, QuestProgress } from "src/generated/graphql";

import { useHero } from "src/hooks/use-hero";

import { QuestEntry } from "./quest";

export function QuestLog(): JSX.Element | null {
  const hero = useHero();

  if (!hero) {
    return null;
  }

  const { questLog, currentQuest } = hero;
  const hasNoQuests = Object.values(questLog).filter((v) => !!v).length === 2;

  if (hasNoQuests) {
    return (
      <Box>
        You have not yet started any quests. Explore the world and grow
        stronger.
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4">Quest Log</Typography>
      <br />
      {Object.values(questLog)
        .filter(
          (entry): entry is QuestProgress =>
            !!entry && typeof entry !== "string"
        )
        .sort((a, b) => {
          if (a.finished) {
            if (b.finished) {
              return b.progress - a.progress;
            }
            return 1;
          }
          if (b.finished) {
            return -1;
          }
          return b.progress - a.progress;
        })
        .map((quest) => {
          if (!quest || typeof quest === "string") {
            return null;
          }
          return <QuestEntry key={quest.id} quest={quest} />;
        })}
    </Box>
  );
}
