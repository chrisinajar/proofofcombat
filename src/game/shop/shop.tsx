import React, { useState, useEffect } from "react";

import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import {
  useShopItemsQuery,
  InventoryItemType,
  ShopItem,
  useBuyItemMutation,
  useSellItemMutation,
  InventoryItem,
} from "src/generated/graphql";

import { useHero } from "src/hooks/use-hero";
import { useDelay } from "src/hooks/use-delay";

import { itemDisplayName, addSpaces, isItemEquipped } from "src/helpers";

const friendlyNames = {
  [InventoryItemType.MeleeWeapon]: "Melee Weapon",
  [InventoryItemType.RangedWeapon]: "Ranged Weapon",
  [InventoryItemType.SpellFocus]: "Spell Focus",
  [InventoryItemType.Shield]: "Shield",
  [InventoryItemType.BodyArmor]: "Body Armor",
  [InventoryItemType.HandArmor]: "Gauntlets",
  [InventoryItemType.LegArmor]: "Leggings",
  [InventoryItemType.HeadArmor]: "Helmet",
  [InventoryItemType.FootArmor]: "Greaves",
};

function inventoryTypeDisplayName(name: InventoryItemType): string {
  return friendlyNames[name as keyof typeof friendlyNames] ?? addSpaces(name);
}

export function SellItemShop({
  value,
  onChange,
  sellables,
}: {
  value: string | null;
  sellables: ShopItem[];
  onChange?: (options: { id: string; name: string; cost: number }) => void;
}): JSX.Element | null {
  const hero = useHero();

  if (!hero) {
    return null;
  }

  function sellItemForItem(item: InventoryItem | string): ShopItem | null {
    const itemId = typeof item === "string" ? item : item.baseItem;
    const sellItem = sellables.find((shopItem) => shopItem.id === itemId);

    if (!sellItem || !sellItem.cost) {
      return null;
    }

    return { ...sellItem, cost: Math.round(sellItem.cost / 3) };
  }

  const items = hero.inventory
    .filter((item) => !item.enchantment)
    .filter((item) => item.type !== InventoryItemType.Quest)
    .sort((a, b) => a.level - b.level);

  const shopLabel = "Sell non-enchanted gear";

  return (
    <React.Fragment>
      <FormControl fullWidth>
        <InputLabel id="sell-shop-select-label">{shopLabel}</InputLabel>
        <Select
          id="sell-shop-select"
          labelId="sell-shop-select-label"
          value={value || ""}
          label={shopLabel}
          onChange={(e) => {
            const itemId = e.target.value;
            const inventoryItem = hero.inventory.find(
              (item) => item.id === itemId,
            );
            if (!inventoryItem) {
              return;
            }
            const sellItem = sellItemForItem(inventoryItem);
            if (sellItem && sellItem.cost && onChange) {
              onChange({
                id: itemId,
                name: itemDisplayName(inventoryItem),
                cost: sellItem.cost,
              });
            }
          }}
        >
          {items.map((item) => {
            const sellItem = sellItemForItem(item);
            return (
              <MenuItem
                key={item.id}
                value={item.id}
                disabled={
                  !sellItem || !!item.enchantment || isItemEquipped(hero, item)
                }
              >
                {sellItem?.cost && (
                  <>
                    <Typography display="inline-block">
                      {itemDisplayName(item)}
                    </Typography>
                    &nbsp;
                    <Typography variant="caption" display="inline-block">
                      Lvl. {item.level}
                    </Typography>
                    &nbsp;
                    <Typography
                      variant="subtitle2"
                      display="inline-block"
                      sx={{ color: "info.main" }}
                    >
                      {sellItem.cost.toLocaleString()} Gold
                    </Typography>
                  </>
                )}
                {!sellItem?.cost && item.name}{" "}
                {isItemEquipped(hero, item) && "*EQUIPPED*"}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </React.Fragment>
  );
}
export function ItemTypeShop({
  type,
  items,
  value,
  onChange,
}: {
  value: string | null;
  type: InventoryItemType;
  items: ShopItem[];
  onChange?: (options: { id: string; name: string; cost: number }) => void;
}): JSX.Element | null {
  const hero = useHero();
  const friendlyName = inventoryTypeDisplayName(type);
  const shopLabel = `${friendlyName} Shop`;

  if (!hero) {
    return null;
  }

  return (
    <FormControl fullWidth>
      <InputLabel id={`${type}-shop-select-label`}>{shopLabel}</InputLabel>
      <Select
        id={`${type}-shop-select`}
        labelId={`${type}-shop-select-label`}
        value={value || ""}
        label={shopLabel}
        onChange={(e) => {
          const itemId = e.target.value;
          const itemData = items.find((item) => item.id === itemId);
          if (onChange && itemData && itemData.cost) {
            onChange({ id: itemId, name: itemData.name, cost: itemData.cost });
          }
        }}
      >
        {items.map((shopItem) => {
          if (shopItem.id !== shopItem.alias) {
            return null;
          }
          return (
            <MenuItem
              key={shopItem.id}
              value={shopItem.id}
              disabled={!shopItem.cost || shopItem.cost > hero.gold}
            >
              {shopItem.cost && (
                <>
                  <Typography display="inline-block">
                    {shopItem.name}
                  </Typography>
                  &nbsp;
                  <Typography variant="caption" display="inline-block">
                    Lvl. {shopItem.level}
                  </Typography>
                  &nbsp;
                  <Typography
                    variant="subtitle2"
                    display="inline-block"
                    sx={{ color: "info.main" }}
                  >
                    {shopItem.cost.toLocaleString()} Gold
                  </Typography>
                </>
              )}
              {!shopItem.cost && shopItem.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
export function ItemShop(): JSX.Element {
  const [currentDelay] = useDelay();
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    id: string;
    cost: number;
  } | null>(null);
  const [shopType, setShopType] = useState<InventoryItemType | "" | "sell">("");
  const { data, loading, error } = useShopItemsQuery();
  const [buyItemMutation, { loading: currentlyBuying }] = useBuyItemMutation();
  const [sellItemMutation, { loading: currentlySelling }] =
    useSellItemMutation();

  const currentlyLoading =
    currentlySelling || currentlyBuying || currentDelay > 0;

  function itemsForCategory(type: InventoryItemType): ShopItem[] {
    if (!data?.shopItems?.length) {
      return [];
    }
    return data.shopItems.filter((item) => item.type === type);
  }

  async function handleBuyItem() {
    if (!selectedItem) {
      return;
    }
    try {
      setSelectedItem(null);
      await buyItemMutation({
        variables: {
          baseItem: selectedItem.id,
        },
      });
    } catch (e) {}
  }

  async function handleSellItem() {
    if (!selectedItem) {
      return;
    }

    try {
      setSelectedItem(null);
      await sellItemMutation({
        variables: {
          item: selectedItem.id,
        },
      });
    } catch (e) {}
  }

  const shopLabel = "Choose which shop to visit";

  return (
    <React.Fragment>
      <Typography align="center">
        Welcome to the shop! You can buy and sell any non-enchanted items here.
        <br />
        The items purchasable here have a level from 1 to 32 but no enchantments
        or direct attribute increases.
      </Typography>

      <br />
      <Divider />
      <br />
      <Grid container columns={6} spacing={2}>
        <Grid item xs={6} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="shop-type-select-label">{shopLabel}</InputLabel>
            <Select
              id="shop-type-select"
              labelId="shop-type-select-label"
              label={shopLabel}
              onChange={(e) => {
                setShopType(e.target.value as InventoryItemType);
                setSelectedItem(null);
              }}
            >
              <MenuItem value="sell">Sell Items</MenuItem>
              <Divider />
              <MenuItem value={InventoryItemType.MeleeWeapon}>
                {inventoryTypeDisplayName(InventoryItemType.MeleeWeapon)} Shop
              </MenuItem>
              <MenuItem value={InventoryItemType.RangedWeapon}>
                {inventoryTypeDisplayName(InventoryItemType.RangedWeapon)} Shop
              </MenuItem>
              <MenuItem value={InventoryItemType.SpellFocus}>
                {inventoryTypeDisplayName(InventoryItemType.SpellFocus)} Shop
              </MenuItem>
              <MenuItem value={InventoryItemType.Shield}>
                {inventoryTypeDisplayName(InventoryItemType.Shield)} Shop
              </MenuItem>
              <MenuItem value={InventoryItemType.BodyArmor}>
                {inventoryTypeDisplayName(InventoryItemType.BodyArmor)} Shop
              </MenuItem>
              <MenuItem value={InventoryItemType.HandArmor}>
                {inventoryTypeDisplayName(InventoryItemType.HandArmor)} Shop
              </MenuItem>
              <MenuItem value={InventoryItemType.LegArmor}>
                {inventoryTypeDisplayName(InventoryItemType.LegArmor)} Shop
              </MenuItem>
              <MenuItem value={InventoryItemType.HeadArmor}>
                {inventoryTypeDisplayName(InventoryItemType.HeadArmor)} Shop
              </MenuItem>
              <MenuItem value={InventoryItemType.FootArmor}>
                {inventoryTypeDisplayName(InventoryItemType.FootArmor)} Shop
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          {shopType !== "" && shopType !== "sell" && (
            <ItemTypeShop
              value={selectedItem ? selectedItem.id : ""}
              key={shopType}
              type={shopType}
              items={itemsForCategory(shopType)}
              onChange={(selectionData) => setSelectedItem(selectionData)}
            />
          )}
          {shopType === "sell" && (
            <SellItemShop
              value={selectedItem ? selectedItem.id : ""}
              sellables={data?.shopItems ?? []}
              onChange={(selectionData) => setSelectedItem(selectionData)}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {selectedItem && (
            <Button
              variant="contained"
              color={shopType === "sell" ? "error" : "success"}
              fullWidth
              disabled={currentlyLoading}
              onClick={shopType === "sell" ? handleSellItem : handleBuyItem}
            >
              {shopType === "sell" ? "Sell" : "Buy"} {selectedItem.name} for{" "}
              {selectedItem.cost.toLocaleString()} gold
            </Button>
          )}
        </Grid>
      </Grid>
      <br />
    </React.Fragment>
  );
}
