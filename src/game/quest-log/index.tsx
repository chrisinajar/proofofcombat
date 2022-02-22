import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useHero } from "src/hooks/use-hero";

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
      {questLog.washedUp && <WashedUpQuestLog quest={questLog.washedUp} />}
    </Box>
  );
}
