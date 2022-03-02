import React from "react";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import { NpcShop as NpcShopType, NpcShopItems } from "src/generated/graphql";

import { pureEnchantmentDisplayName } from "src/helpers";

export function NpcShop({ shop }: { shop: NpcShopType }): JSX.Element {
  return (
    <React.Fragment>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Typography variant="h4" color="info.main">
        {shop.name}
      </Typography>
      <Typography sx={{ mb: 2 }} variant="subtitle2" color="info.main">
        Hermit shop
      </Typography>
      <Typography>
        {shop.trades.map((trade, i) => (
          <React.Fragment key={`npc shop items ${i}`}>
            For the price of{" "}
            <Tooltip title={getPriceString(trade.price)}>
              <b>{trade.price.description}</b>
            </Tooltip>
            , I'll give you{" "}
            <Tooltip title={getPriceString(trade.offer)}>
              <b>{trade.offer.description}</b>
            </Tooltip>
          </React.Fragment>
        ))}
      </Typography>
    </React.Fragment>
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
