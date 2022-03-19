import React, { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RuleIcon from "@mui/icons-material/Rule";

import { useQuestDescriptionQuery, QuestProgress } from "src/generated/graphql";

import { addSpaces } from "src/helpers";

export function QuestEntry({ quest }: { quest: QuestProgress }): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { data, loading } = useQuestDescriptionQuery({
    variables: quest?.lastEvent?.quest
      ? {
          quest: quest?.lastEvent?.quest,
        }
      : undefined,
    skip: !quest?.lastEvent?.quest,
  });

  if (!quest?.lastEvent?.quest || loading || !data) {
    return <div />;
  }

  const questDescription = data.quest;
  let progress = quest.progress || 1;

  progress = Math.log2(progress);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" sx={{ width: "100%" }} spacing={1}>
          {quest.finished && <CheckCircleIcon />}
          {!quest.finished && <RuleIcon />}

          <Stack sx={{ width: "100%" }}>
            <Typography sx={{ lineHeight: 3 }}>
              {addSpaces(questDescription.id)}
            </Typography>
            <LinearProgress
              variant="determinate"
              color={quest.finished ? "success" : "secondary"}
              value={quest.finished ? 100 : (100 * progress) / (progress + 1)}
            />
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{questDescription.description}</Typography>
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
      </AccordionDetails>
    </Accordion>
  );
}
