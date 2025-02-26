import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import NoSsr from "@mui/material/NoSsr";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import { useDismissQuestMutation, Maybe } from "src/generated/graphql";

export function QuestEventDisplay({
  event,
}: {
  event: { message?: Maybe<string[]> };
}): JSX.Element {
  const { message } = event;
  const [dismissQuest, { loading }] = useDismissQuestMutation();

  function handleDismissQuest() {
    dismissQuest();
  }

  return (
    <NoSsr>
      <Dialog
        open
        onClose={handleDismissQuest}
        aria-labelledby="quest-event-title"
        aria-describedby="quest-event-description"
        role="dialog"
      >
        <DialogTitle id="quest-event-title" tabIndex={0}>Quest Event</DialogTitle>

        <DialogContent>
          <Box id="quest-event-description" tabIndex={0}>
            {message &&
              message.map((str, i) => (
                <DialogContentText key={`${i}`}>{str}</DialogContentText>
              ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleDismissQuest}
            disabled={loading}
            data-testid="quest-continue-button"
            aria-label="Continue and dismiss quest dialog"
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </NoSsr>
  );
}
