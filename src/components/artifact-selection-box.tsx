import React from "react";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { ArtifactItem } from "src/generated/graphql";
import { ArtifactModifiers } from "./artifact-modifiers";

type ArtifactSelectionBoxProps = {
  artifact: ArtifactItem | null;
  isSelected: boolean;
  title: string;
  onSelect: () => void;
};

export function ArtifactSelectionBox({ 
  artifact, 
  isSelected, 
  title,
  onSelect 
}: ArtifactSelectionBoxProps): JSX.Element {
  return (
    <Paper 
      sx={{ 
        flex: 1,
        p: 2,
        cursor: 'pointer',
        transition: 'all 0.2s',
        border: '2px solid',
        borderColor: isSelected ? 'primary.main' : 'divider',
        bgcolor: isSelected ? 'action.selected' : 'background.paper',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
      elevation={isSelected ? 8 : 1}
      onClick={onSelect}
    >
      <Typography variant="h6" gutterBottom>{title}</Typography>
      {artifact ? (
        <React.Fragment>
          <Typography variant="subtitle1">{artifact.name}</Typography>
          <ArtifactModifiers artifact={artifact} title={`${title} Stats`} />
        </React.Fragment>
      ) : (
        <Typography color="text.secondary">No artifact equipped</Typography>
      )}
    </Paper>
  );
} 