import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

import {
  Hero,
  InventoryItemType,
  useOfferTradeMutation,
  useGetTradesQuery,
  useDismissTradeMutation,
  useAcceptTradeMutation,
} from "src/generated/graphql";
import { itemDisplayName, isItemEquipped, itemSorter } from "src/helpers";

export function Trade({
  hero,
  to,
}: {
  hero: Hero;
  to: string;
}): JSX.Element | null {
  const [dismissTradeMutation, { loading: dismissLoading }] =
    useDismissTradeMutation();
  const [acceptTradeMutation, { loading: acceptLoading }] =
    useAcceptTradeMutation();
  const { data, refetch } = useGetTradesQuery({
    pollInterval: 5000,
  });
  const [gold, setGold] = useState<number>(0);
  const [offerItem, setOfferItem] = useState<string>("");
  const [offerTradeMutation, { loading: offerLoading }] =
    useOfferTradeMutation();

  const loading = offerLoading || dismissLoading;

  if (!data?.me?.account?.hero) {
    return null;
  }

  const { incomingTrades, outgoingTrades } = data.me.account.hero;

  const itemSelectLabel = "Select an item to offer";
  const items = hero.inventory
    .filter((item) => {
      if (item.type === InventoryItemType.Quest) {
        return false;
      }
      return true;
    })
    .sort(itemSorter);

  function handleGoldChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value);
    if (isNaN(value) || !Number.isFinite(value)) {
      return;
    }
    value = Math.round(Math.max(0, Math.min(2000000000, value)));
    console.log(value);
    setGold(value);
  }

  async function handleOfferTrade() {
    try {
      const item = offerItem;
      const result = await offerTradeMutation({
        variables: { offer: { to, item, gold } },
      });
      refetch();
    } catch (e) {}
  }

  async function handleDismissTrade(id: string) {
    try {
      await dismissTradeMutation({
        variables: {
          offer: id,
        },
      });
    } catch (e) {}
  }

  async function handleAcceptTrade(id: string) {
    try {
      await acceptTradeMutation({
        variables: {
          offer: id,
        },
      });
    } catch (e) {}
  }

  const selectedItem = items.find((item) => item.id === offerItem);

  return (
    <Box
      sx={{
        p: 2,
        m: 1,
        bgcolor: "background.paper",
      }}
    >
      <Typography color="error" variant="h4">
        Offer trade
      </Typography>
      <Typography>
        You can offer one of your items for gold, and then the other player must
        accept.
      </Typography>
      <Grid sx={{ mt: 1 }} container columns={6} spacing={3}>
        <Grid item xs={6} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="trade-item-select-label">
              {itemSelectLabel}
            </InputLabel>
            <Select
              id="trade-item-select"
              labelId="trade-item-select-label"
              label={itemSelectLabel}
              value={offerItem}
              onChange={(e) => setOfferItem(e.target.value)}
            >
              {items.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.id}
                  disabled={isItemEquipped(hero, item)}
                >
                  {itemDisplayName(item)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            label="Gold value"
            value={gold === 0 ? "" : gold}
            onChange={handleGoldChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            disabled={gold <= 0 || !offerItem.length || loading}
            onClick={handleOfferTrade}
          >
            {selectedItem &&
              `Offer ${itemDisplayName(
                selectedItem
              )} for ${gold.toLocaleString()} gold`}
            {!selectedItem && `Select an item to offer`}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Divider />
        </Grid>
        {incomingTrades.length > 0 && (
          <Grid item xs={6}>
            Received offers:
            <Box>
              {incomingTrades.map((offer) => (
                <React.Fragment key={offer.id}>
                  <Box sx={{ mt: 1, bgcolor: "info.main", p: 2 }}>
                    From: <b>{offer.fromName}</b>
                    <br />
                    Item: <b>{itemDisplayName(offer.item)}</b>
                    <br />
                    Gold: <b>{offer.gold.toLocaleString()}</b>
                    <br />
                    <Button
                      sx={{ m: 1 }}
                      variant="contained"
                      color="success"
                      disabled={loading || offer.gold > hero.gold}
                      onClick={() => handleAcceptTrade(offer.id)}
                    >
                      Accept Trade
                    </Button>
                    <Button
                      sx={{ m: 1 }}
                      variant="contained"
                      color="error"
                      disabled={loading}
                      onClick={() => handleDismissTrade(offer.id)}
                    >
                      Reject Trade
                    </Button>
                  </Box>
                </React.Fragment>
              ))}
            </Box>
          </Grid>
        )}
        {outgoingTrades.length > 0 && (
          <Grid item xs={6}>
            Sent offers:
            <Box>
              {outgoingTrades.map((offer) => (
                <React.Fragment key={offer.id}>
                  <Box sx={{ mt: 1, bgcolor: "info.main", p: 2 }}>
                    To: <b>{offer.toName}</b>
                    <br />
                    Item: <b>{itemDisplayName(offer.item)}</b>
                    <br />
                    Gold: <b>{offer.gold.toLocaleString()}</b>
                    <br />
                    <br />
                    <Button
                      variant="contained"
                      color="error"
                      disabled={loading}
                      onClick={() => handleDismissTrade(offer.id)}
                    >
                      Cancel Trade
                    </Button>
                  </Box>
                </React.Fragment>
              ))}
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
