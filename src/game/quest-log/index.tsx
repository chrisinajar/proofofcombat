import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Quest, QuestProgress } from "src/generated/graphql";

import { useHero } from "src/hooks/use-hero";

import { QuestEntry } from "./quest";
import { WashedUpQuestLog } from "./washed-up";

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
      {Object.values(questLog).map((quest) => {
        if (!quest || typeof quest === "string") {
          return null;
        }
        return <QuestEntry quest={quest} />;
      })}
    </Box>
  );
}
