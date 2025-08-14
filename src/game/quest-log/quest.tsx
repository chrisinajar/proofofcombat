import React, { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RuleIcon from "@mui/icons-material/Rule";

import { useQuestDescriptionQuery, QuestProgress } from "src/generated/graphql";

import { addSpaces } from "src/helpers";

export function QuestEntry({ quest }: { quest: QuestProgress }): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [showPrevious, setShowPrevious] = useState<boolean>(false);
  const questId =
    quest?.eventHistory && quest.eventHistory.length
      ? quest.eventHistory[quest.eventHistory.length - 1]?.quest
      : quest?.lastEvent?.quest;

  const { data, loading } = useQuestDescriptionQuery({
    variables: questId ? { quest: questId } : undefined,
    skip: !questId,
  });

  if (!questId || loading || !data) {
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

        {/* Most recent event prominently displayed */}
        {(() => {
          const events = quest.eventHistory ?? (quest.lastEvent ? [quest.lastEvent] : []);
          if (!events.length) return null;
          const latest = events[events.length - 1];
          const previous = events.slice(0, -1);
          const regionId = `previous-events-${quest.id}`;
          return (
            <Box sx={{ marginTop: 2 }}>
              <Box
                role="region"
                aria-label="Most recent quest event"
                sx={{
                  bgcolor: quest.finished ? "success.light" : "info.light",
                  color: quest.finished ? "success.contrastText" : "info.contrastText",
                  margin: 2,
                  padding: 2,
                  borderLeft: 6,
                  borderLeftStyle: "solid",
                  borderLeftColor: quest.finished ? "success.main" : "info.main",
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6">Most recent event</Typography>
                {latest.message?.map((str, i) => (
                  <Typography key={`${latest.id}-${i}`} sx={{ fontStyle: "italic" }}>
                    {str}
                  </Typography>
                ))}
              </Box>

              {previous.length > 0 && (
                <>
                  <Button
                    onClick={() => setShowPrevious(!showPrevious)}
                    aria-expanded={showPrevious}
                    aria-controls={regionId}
                    size="small"
                  >
                    {showPrevious
                      ? "Hide previous events"
                      : `Show previous events (${previous.length})`}
                  </Button>
                  <Box
                    id={regionId}
                    aria-hidden={!showPrevious}
                    sx={{ display: showPrevious ? "block" : "none", marginTop: 1 }}
                  >
                    {[...previous].reverse().map((evt) => (
                      <Box
                        key={evt.id}
                        sx={{
                          bgcolor: "warning.light",
                          color: "warning.contrastText",
                          margin: 2,
                          padding: 2,
                          borderRadius: 1,
                        }}
                      >
                        {evt.message?.map((str, i) => (
                          <Typography key={`${evt.id}-${i}`} sx={{ fontStyle: "italic" }}>
                            {str}
                          </Typography>
                        ))}
                      </Box>
                    ))}
                  </Box>
                </>
              )}
            </Box>
          );
        })()}
      </AccordionDetails>
    </Accordion>
  );
}
