import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {
  ArtifactItem,
  useMeQuery,
  useAcceptArtifactMutation,
  useRejectArtifactMutation,
} from "src/generated/graphql";
import { ArtifactSelectionBox } from "../artifact-selection-box";
import { ConfirmationDialog } from "../confirmation-dialog";

export function ArtifactModal({
  artifact,
}: {
  artifact: ArtifactItem;
}): JSX.Element {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState<"current" | "new" | null>(null);
  const { data } = useMeQuery();
  const [acceptArtifact] = useAcceptArtifactMutation();
  const [rejectArtifact] = useRejectArtifactMutation();

  const currentArtifact = data?.me?.account?.hero?.equipment?.artifact;

  const handleConfirm = async () => {
    if (selectedArtifact === "new") {
      await acceptArtifact();
    } else {
      await rejectArtifact();
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" gutterBottom>Choose Your Artifact</Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Select which artifact you want to keep. This choice cannot be undone.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 4, mb: 4 }}>
        <ArtifactSelectionBox
          artifact={currentArtifact ?? null}
          isSelected={selectedArtifact === "current"}
          title="Current Artifact"
          onSelect={() => setSelectedArtifact("current")}
        />

        <ArtifactSelectionBox
          artifact={artifact}
          isSelected={selectedArtifact === "new"}
          title="New Artifact"
          onSelect={() => setSelectedArtifact("new")}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedArtifact}
          onClick={() => setShowConfirm(true)}
          sx={{ minWidth: 200 }}
        >
          Continue with Selected
        </Button>
      </Box>

      <ConfirmationDialog
        open={showConfirm}
        title="Confirm Your Choice"
        message={`Are you sure you want to keep the ${selectedArtifact === "new" ? "new" : "current"} artifact?`}
        warningMessage="This action cannot be undone."
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </React.Fragment>
  );
}
