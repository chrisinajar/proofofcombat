import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { QuestProgress } from "src/generated/graphql";

export function WashedUpQuestLog({
  quest,
}: {
  quest: QuestProgress;
}): JSX.Element {
  return (
    <Box>
      <Typography variant="h5">Washed Up</Typography>
      <Typography>
        Learning how to swim across the ocean is harder than you think...
      </Typography>
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
