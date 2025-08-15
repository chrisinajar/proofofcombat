import React from "react";

import Typography from "@mui/material/Typography";

import { ArtifactAttribute } from "src/generated/graphql";
import { modifierText } from "src/helpers";

export function BuiltInModifiers({
  title,
  builtIns,
  sx,
}: {
  title?: string | null;
  builtIns?: ArtifactAttribute[] | null;
  sx?: any;
}): JSX.Element | null {
  if (!builtIns || !builtIns.length || !title) {
    return null;
  }

  return (
    <React.Fragment>
      <Typography>{title}</Typography>
      {builtIns.map((modifier) => (
        <Typography variant="body1" key={modifier.type} sx={sx}>
          <b>{modifierText(modifier)}</b>
        </Typography>
      ))}
    </React.Fragment>
  );
}

