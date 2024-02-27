import React, { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import LoadingButton from "@mui/lab/LoadingButton";

import {
  Hero,
  PlayerLocation,
  PlayerLocationUpgrades,
  useBuyResourceMutation,
  useSellResourceMutation,
} from "src/generated/graphql";

export function CampResourceShop({
  hero,
  camp,
  onBuyResource,
}: {
  hero: Hero;
  camp: PlayerLocation;
  onBuyResource?: () => void;
}): JSX.Element {
  const [sellMode, setSellMode] = useState<boolean>(false);
  const [sellResourceMutation, { loading: sellLoading }] =
    useSellResourceMutation();
  const [buyResourceMutation, { loading: buyLoading }] =
    useBuyResourceMutation();
  useSellResourceMutation;
  const [resourceType, setResourceType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const loading = buyLoading || sellLoading;

  async function handleBuyResource() {
    try {
      const mutation = sellMode ? sellResourceMutation : buyResourceMutation;

      await mutation({
        variables: {
          amount: Number(amount),
          resource: resourceType,
        },
      });
      setAmount("");
      setResourceType("");
      // i hate this syntax: onBuyResource?.();
      if (onBuyResource) {
        onBuyResource();
      }
    } catch (e) {}
  }

  const hasTradingPost = !!camp.upgrades.find(
    (up) => up === PlayerLocationUpgrades.TradingPost,
  );

  const isInvalid =
    !resourceType.length ||
    !amount.length ||
    Number(amount) < 1 ||
    isNaN(Number(amount)) ||
    !Number.isFinite(Number(amount));

  return (
    <Box>
      <Grid container columns={6} spacing={1}>
        {hasTradingPost && (
          <Grid item xs={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Buy</Typography>
              <Switch
                color="success"
                checked={sellMode}
                onChange={(e) => setSellMode(e.target.checked)}
              />

              <Typography>Sell</Typography>
            </Stack>
          </Grid>
        )}
        <Grid item xs={6} sm={3}>
          <FormControl fullWidth sx={{ mt: 1, minWidth: 200 }}>
            <InputLabel>
              Select resource to {sellMode ? "sell" : "buy"}
            </InputLabel>
            <Select
              label={`Select resource to ${sellMode ? "sell" : "buy"}`}
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
            >
              <MenuItem value="wood">Wood</MenuItem>
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="water">Water</MenuItem>
              <MenuItem value="stone">Stone</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl fullWidth sx={{ mt: 1, minWidth: 200 }}>
            <TextField
              label={`Amount to ${sellMode ? "sell" : "buy"}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <LoadingButton
              color={sellMode ? "success" : "error"}
              loading={loading}
              variant="contained"
              disabled={isInvalid}
              onClick={handleBuyResource}
            >
              {sellMode && "Sell "}
              {!sellMode && "Buy "}
              {isInvalid && "Resources"}
              {!isInvalid &&
                `${resourceType} for ${(
                  Number(amount) * 10000
                ).toLocaleString()} Gold`}
            </LoadingButton>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
