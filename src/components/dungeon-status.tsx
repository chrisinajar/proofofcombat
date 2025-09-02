import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useMeQuery, useChallengesQuery } from "src/generated/graphql";

export function DungeonStatus(): JSX.Element | null {
  const { data } = useMeQuery({ fetchPolicy: "cache-only" });
  const { data: challengesData } = useChallengesQuery();

  const hero = (data?.me?.account?.hero as any) ?? null;
  const dungeon = hero?.dungeon ?? null;

  if (!dungeon) return null;

  const total = dungeon.remaining.length;
  const completed = Math.max(0, Math.min(dungeon.index, total));
  const remainingIds = dungeon.remaining;

  // Helper to map monster ID -> name using current challenges list (best-effort)
  const nameFor = (id: string): string => {
    const entry = challengesData?.challenges?.find((c) => c.id === id);
    return entry ? entry.name : id;
  };

  let details: React.ReactNode = null;
  if (dungeon.selection === "LockedOrder") {
    const nextId = remainingIds[Math.max(0, Math.min(dungeon.index, total - 1))];
    const nextName = nextId ? nameFor(nextId) : undefined;
    details = (
      <Typography variant="body2">
        Step {Math.min(completed + 1, total)} of {total}
        {nextName ? ` — Next: ${nextName}` : null}
      </Typography>
    );
  } else {
    const allowedNames = remainingIds.map(nameFor).slice(0, 5);
    const more = remainingIds.length - allowedNames.length;
    details = (
      <Typography variant="body2">
        Remaining {remainingIds.length}
        {allowedNames.length > 0 ? ` — Allowed: ${allowedNames.join(", ")}${more > 0 ? `, +${more} more` : ""}` : null}
      </Typography>
    );
  }

  return (
    <Stack sx={{ mb: 2 }}>
      <Alert severity="info" variant="outlined">
        <AlertTitle>Dungeon Active</AlertTitle>
        {details}
      </Alert>
    </Stack>
  );
}
