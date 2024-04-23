import React from "react";

import Typography from "@mui/material/Typography";

import {
  ArtifactItem,
  ArtifactAttributeType,
  ArtifactAttribute,
} from "src/generated/graphql";

import {
  modifierText,
  modifiersForArtifact,
  getArtifactModifier,
} from "src/helpers";

export function ArtifactModifiers({
  artifact,
  title,
  affixes,
  sx,
  children,
}: {
  artifact?: ArtifactItem | null;
  title?: string | null;
  affixes?: ArtifactAttributeType[];
  sx?: any;
  children?: JSX.Element;
}): JSX.Element | null {
  if (!artifact || !title) {
    return null;
  }

  const modifiers = modifiersForArtifact(artifact);
  let decorator = (text: string, key: string) => (
    <Typography variant="body1" key={key} sx={sx}>
      <b>{text}</b>
    </Typography>
  );

  if (typeof children === "function") {
    decorator = children;
  }

  return (
    <React.Fragment>
      <Typography>{title}</Typography>
      {modifiers.map((modifier) => {
        if (affixes && !affixes.includes(modifier.type)) {
          return null;
        }
        return decorator(modifierText(modifier), modifier.type);
      })}
    </React.Fragment>
  );
}
