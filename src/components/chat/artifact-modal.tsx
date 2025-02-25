import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {
  ArtifactItem,
  useAcceptArtifactMutation,
  useRejectArtifactMutation,
} from "src/generated/graphql";
import { ArtifactSelectionBox } from "../artifact-selection-box";
import { ConfirmationDialog } from "../confirmation-dialog";

type ArtifactModalProps = {
  currentArtifact: ArtifactItem | null;
  newArtifact: ArtifactItem;
};

export function ArtifactModal({
  currentArtifact,
  newArtifact,
}: ArtifactModalProps): JSX.Element {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState<"current" | "new" | null>(
    currentArtifact ? null : "new"
  );
  
  const [acceptArtifact] = useAcceptArtifactMutation();
  const [rejectArtifact] = useRejectArtifactMutation();

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
          {currentArtifact 
            ? "Select which artifact you want to keep. This choice cannot be undone."
            : "You have no artifact equipped. The new artifact will be automatically equipped."}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 4, mb: 4 }}>
        <ArtifactSelectionBox
          artifact={currentArtifact}
          isSelected={selectedArtifact === "current"}
          title="Current Artifact"
          onSelect={() => currentArtifact && setSelectedArtifact("current")}
          disabled={!currentArtifact}
        />

        <ArtifactSelectionBox
          artifact={newArtifact}
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
          {currentArtifact ? "Continue with Selected" : "Accept New Artifact"}
        </Button>
      </Box>

      <ConfirmationDialog
        open={showConfirm}
        title="Confirm Your Choice"
        message={currentArtifact 
          ? `Are you sure you want to keep the ${selectedArtifact === "new" ? "new" : "current"} artifact?`
          : "Are you sure you want to equip the new artifact?"}
        warningMessage={currentArtifact ? "This action cannot be undone." : undefined}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </React.Fragment>
  );
}
