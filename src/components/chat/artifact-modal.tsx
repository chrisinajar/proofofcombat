import React from "react";

import Typography from "@mui/material/Typography";

import {
  ArtifactItem,
  ArtifactAttributeType,
  ArtifactAttribute,
} from "src/generated/graphql";
import { ArtifactModifiers } from "src/components/artifact-modifiers";

export function ArtifactModal({
  artifact,
}: {
  artifact: ArtifactItem;
}): JSX.Element {
  return (
    <React.Fragment>
      <Typography variant="h4">{artifact.name}</Typography>A mysterious magical
      item with the following properties:
      <ArtifactModifiers artifact={artifact} />
    </React.Fragment>
  );
}
