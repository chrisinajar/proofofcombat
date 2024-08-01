import React, { useState } from "react";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ButtonUnstyled from "@mui/core/ButtonUnstyled";

import {
  NpcShop as NpcShopType,
  NpcShopItems,
  NpcShopTrade,
  useExecuteNpcTradeMutation,
} from "src/generated/graphql";

import { pureEnchantmentDisplayName } from "src/helpers";

export function NpcShop({ shop }: { shop: NpcShopType }): JSX.Element {
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [executeNpcTradeMutation, { loading }] = useExecuteNpcTradeMutation();
  async function handleTrade(id: string) {
    console.log("attemptiong trade", id);
    setMessage("");
    try {
      const results = await executeNpcTradeMutation({
        variables: {
          trade: id,
        },
      });
      if (results?.data?.npcTrade) {
        setMessage(results.data.npcTrade.message);
        setSuccess(results.data.npcTrade.success);
      }
    } catch (e) {}
  }
  return (
    <React.Fragment>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Typography variant="h4" component="h5" color="info.main">
        {shop.name}
      </Typography>
      <Typography sx={{ mb: 2 }} variant="subtitle2" color="info.main">
        Hermit shop
      </Typography>
      {message.length > 0 && (
        <Typography
          sx={{ mb: 2 }}
          variant="body1"
          color={success ? "success.main" : "error.main"}
        >
          {message}
        </Typography>
      )}
      {shop.trades.map((trade, i) => (
        <React.Fragment key={`npc shop items ${i}`}>
          <Typography>
            <TradeOffer trade={trade} />
            <Button
              disabled={loading}
              onClick={() => handleTrade(trade.id)}
              sx={{ ml: 1 }}
            >
              Trade
            </Button>
          </Typography>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

function TradeOffer({ trade }: { trade: NpcShopTrade }): JSX.Element {
  return (
    <React.Fragment>
      For the price of <PriceStatement price={trade.price} />, I'll give you{" "}
      <PriceStatement price={trade.offer} />
    </React.Fragment>
  );
}

function PriceStatement({ price }: { price: NpcShopItems }): JSX.Element {
  return (
    <Tooltip title={getPriceString(price)} describeChild>
      <ButtonUnstyled
        style={{ background: "none", border: "none" }}
        aria-label={getPriceString(price)}
      >
        {price.description}
      </ButtonUnstyled>
    </Tooltip>
  );
}

function getPriceString(items: NpcShopItems): string {
  let prices = [];
  if (items.gold) {
    prices.push(`${items.gold.toLocaleString()} gold`);
  }
  if (items.dust) {
    prices.push(`${items.dust.toLocaleString()} dust`);
  }
  if (items.baseItems?.length) {
    items.baseItems.forEach((part) => {
      prices.push(`${part}`);
    });
  }
  if (items.enchantments?.length) {
    items.enchantments.forEach((part) => {
      prices.push(`${pureEnchantmentDisplayName(part)}`);
    });
  }
  if (items.questItems?.length) {
    items.questItems.forEach((part) => {
      prices.push(`${part}`);
    });
  }

  if (!prices.length) {
    return "???";
  }

  return prices.join(", ");
}
