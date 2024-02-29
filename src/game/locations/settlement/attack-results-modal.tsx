import React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import {
  Hero,
  AttackLocationMutation,
  AttackCasualties,
} from "src/generated/graphql";

export function AttackResultsModal({
  open,
  onClose,
  loading,
  attackResults,
  hero,
}: {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  attackResults?: AttackLocationMutation["attackLocation"];
  hero: Hero;
}): JSX.Element {
  // console.log(attackResults);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          padding: [2, 4],
          minWidth: "320px",
          maxWidth: "580px",
          width: "80%",
          textAlign: "center",
        }}
        aria-labelledby="attack-results-modal-title"
        aria-describedby="modal-modal-description"
      >
        {loading && <CircularProgress />}
        {attackResults && (
          <>
            {attackResults.target.owner === hero.id && (
              <Typography
                id="attack-results-modal-title"
                variant="h5"
                component="h2"
              >
                Your troops have claimed this location in your name, it now
                belongs to your settlement.
              </Typography>
            )}
            {attackResults.target.owner !== hero.id && (
              <>
                <Typography
                  id="attack-results-modal-title"
                  variant="h5"
                  component="h2"
                >
                  Attack results for {attackResults.target.location.x},{" "}
                  {attackResults.target.location.y}
                </Typography>
                <Typography variant="subtitle1">
                  Owner:{" "}
                  <strong>
                    {attackResults?.target?.publicOwner?.name ?? "Unknown"}
                  </strong>
                </Typography>
              </>
            )}
            <br />
            <Typography>
              You lost {casualtiesToString(attackResults.attackerCasualties)}
            </Typography>
            <Typography>
              Your opponent lost{" "}
              {casualtiesToString(attackResults.targetCasualties)}
            </Typography>
            {attackResults.totalDamage > 0 && (
              <Typography>
                Your troops dealt {attackResults.totalDamage.toLocaleString()}{" "}
                damage
              </Typography>
            )}
            {attackResults.damage > 0 && (
              <Typography>
                The target location received{" "}
                {attackResults.damage.toLocaleString()} damage
                {attackResults.totalDamage > attackResults.damage &&
                  ", the rest was absorbed by garrisons."}
              </Typography>
            )}
            {attackResults.damage === 0 && (
              <Typography>All damage was absorbed by garrisons.</Typography>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
}

function casualtiesToString(casualties: AttackCasualties) {
  const results = Object.keys(casualties)
    .map((name) => {
      const value = casualties[name as keyof AttackCasualties];

      if (value && value > 0) {
        return `${value.toLocaleString()} ${name}`;
      }
      return false;
    })
    .filter((val): val is string => !!val);
  if (results.length) {
    return results.join(", ");
  }
  return "nothing";
}
