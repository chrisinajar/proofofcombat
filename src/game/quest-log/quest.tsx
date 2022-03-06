import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useQuestDescriptionQuery, QuestProgress } from "src/generated/graphql";

import { addSpaces } from "src/helpers";

export function QuestEntry({
  quest,
}: {
  quest?: QuestProgress | null;
}): JSX.Element {
  const { data, loading } = useQuestDescriptionQuery({
    variables: {
      quest: quest?.lastEvent?.quest,
    },
    skip: !quest?.lastEvent?.quest,
  });

  if (!quest?.lastEvent?.quest || loading || !data) {
    return <div />;
  }

  const questProgress = data.quest;

  return (
    <Box>
      <Typography variant="h5">{addSpaces(questProgress.id)}</Typography>
      <Typography>{questProgress.description}</Typography>
      {quest.lastEvent?.message && (
        <Box
          sx={{
            bgcolor: "warning.light",
            color: "warning.contrast",
            margin: 2,
            padding: 2,
          }}
        >
          <Typography variant="h6">Last event:</Typography>
          {quest.lastEvent.message.map((str, i) => (
            <Typography key={`${i}`} sx={{ fontStyle: "italic" }}>
              {str}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
