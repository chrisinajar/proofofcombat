import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";

import { useGenerateArtifactMutation, AdminAccountQuery } from "src/generated/graphql";

type GenerateArtifactProps = {
  account: AdminAccountQuery["account"];
};

export function GenerateArtifact({ account }: GenerateArtifactProps): JSX.Element {
  const [level, setLevel] = useState("1");
  const { enqueueSnackbar } = useSnackbar();
  const [generateArtifact] = useGenerateArtifactMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await generateArtifact({
        variables: {
          id: account.id,
          level: parseFloat(level),
        },
      });
      enqueueSnackbar("Artifact generated successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error instanceof Error ? error.message : "Failed to generate artifact", { variant: "error" });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Generate Test Artifact</Typography>
      
      <TextField
        fullWidth
        label="Artifact Level"
        type="number"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        margin="normal"
        required
        inputProps={{ min: "1", step: "1" }}
        helperText="The level of the artifact to generate"
      />

      <Button 
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Generate Artifact
      </Button>
    </Box>
  );
} 