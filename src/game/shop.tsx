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
} from "src/generated/graphql";

import { useHero } from "src/hooks/use-hero";
import { useDelay } from "src/hooks/use-delay";

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
  return (
    friendlyNames[name as keyof typeof friendlyNames] ??
    name.replace(/(?=[A-Z])(?<=[a-z])/g, " ")
  );
}

export function ItemTypeShop({
  type,
  items,
  onChange,
}: {
  type: InventoryItemType;
  items: ShopItem[];
  onChange?: (id: string) => void;
}): JSX.Element | null {
  const hero = useHero();
  const [value, setValue] = useState<string>("");
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
        value={value}
        label={shopLabel}
        onChange={(e) => {
          setValue(e.target.value);
          if (onChange) {
            onChange(e.target.value);
          }
        }}
      >
        {items.map((shopItem) => (
          <MenuItem
            key={shopItem.id}
            value={shopItem.id}
            disabled={!shopItem.cost || shopItem.cost > hero.gold}
          >
            {shopItem.cost &&
              `${shopItem.name}: ${shopItem.cost.toLocaleString()} Gold`}
            {!shopItem.cost && shopItem.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export function Shop(): JSX.Element {
  const [currentDelay] = useDelay();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [shopType, setShopType] = useState<InventoryItemType | "">("");
  const { data, loading, error } = useShopItemsQuery();
  const [buyItemMutation, { loading: currentlyBuying }] = useBuyItemMutation();

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
      await buyItemMutation({
        variables: {
          baseItem: selectedItem,
        },
      });
    } catch (e) {}
  }

  const shopLabel = "Choose which shop to visit";

  const selectedBaseItem = data?.shopItems?.find(
    (item) => item.id === selectedItem
  );

  return (
    <React.Fragment>
      <Typography align="center">
        Welcome to the shop! You can buy and sell* any non-enchanted items here.
        <br />
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
              value={shopType}
              label={shopLabel}
              onChange={(e) => {
                setShopType(e.target.value as InventoryItemType);
                setSelectedItem(null);
              }}
            >
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
          {shopType !== "" && (
            <ItemTypeShop
              key={shopType}
              type={shopType}
              items={itemsForCategory(shopType)}
              onChange={(item) => setSelectedItem(item)}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {selectedBaseItem && (
            <Button
              variant="contained"
              color="success"
              fullWidth
              disabled={currentlyBuying || currentDelay > 0}
              onClick={handleBuyItem}
            >
              Buy {selectedBaseItem.name} for {selectedBaseItem.cost} gold
            </Button>
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography align="center">
            * coming soon!...
            <br />
          </Typography>
        </Grid>
      </Grid>
      <br />
    </React.Fragment>
  );
}
