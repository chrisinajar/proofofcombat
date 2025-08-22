import React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import { useTalkMutation } from "src/generated/graphql";
import { useDelay } from "src/hooks/use-delay";

export function TavernGossip(): JSX.Element {
  const [message, setMessage] = React.useState<string>("");
  const [currentDelay, setDelay] = useDelay();
  const [talk, { loading }] = useTalkMutation();

  const shouldDisable = loading || currentDelay > 0;
  const disableReason = (() => {
    if (currentDelay > 0)
      return `In delay: available in ${(currentDelay / 1000).toFixed(1)}s`;
    if (loading) return "Asking...";
    return "";
  })();

  async function handleTalk() {
    try {
      const res = await talk();
      const msg = res.data?.talk?.message ?? "";
      setMessage(msg);
    } catch (e: any) {
      if (e.graphQLErrors && e.graphQLErrors[0]?.extensions?.delay) {
        setDelay(e.graphQLErrors[0].extensions.remaining);
      }
    }
  }

  return (
    <div>
      <Tooltip
        title={
          currentDelay > 0
            ? `In delay: available in ${(currentDelay / 1000).toFixed(1)}s`
            : loading
            ? "Talking to the bartender..."
            : "Ask the bartender for advice"
        }
        disableHoverListener={!(currentDelay > 0 || loading)}
      >
        <span>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleTalk}
            disabled={shouldDisable}
          >
            Ask Bartender about Gossip
          </Button>
        </span>
      </Tooltip>

      {disableReason && (
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ mt: 1 }}
        >
          {disableReason}
        </Typography>
      )}

      {message && (
        <Typography
          component="div"
          variant="body1"
          sx={{ mt: 2, whiteSpace: "pre-line" }}
        >
          {message}
        </Typography>
      )}
    </div>
  );
}
