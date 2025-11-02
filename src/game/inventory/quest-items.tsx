import React, { useState, useEffect } from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { Hero, InventoryItem, InventoryItemType } from "src/generated/graphql";
import { itemDisplayName, getEnchantmentDisplay } from "src/helpers";

export function QuestItems({
  hero,
  disabled,
  onChange,
  onSelectItemId,
}: {
  hero: Hero;
  disabled: boolean;
  onChange?: (val: string) => void;
  onSelectItemId?: (id: string) => void;
}): JSX.Element {
  const [value, setValue] = useState<string>("");
  const items = hero.inventory
    .filter((item) => item.type === InventoryItemType.Quest)
    // higher level quest items first!
    .sort((a, b) => b.level - a.level);

  const label = "Quest items (passive, always active)";

  const existingItem = hero.inventory.find((item) => item.id === value);

  useEffect(() => {
    if (value.length && !existingItem) {
      setValue("");
    }
  }, [existingItem, value]);

  const quantityMap: { [x in string]: number } = {};
  items.forEach((item) => {
    const displayName = itemDisplayName(item);
    if (quantityMap[displayName]) {
      quantityMap[displayName] += 1;
    } else {
      quantityMap[displayName] = 1;
    }
  });

  const uniqueItems: InventoryItem[] = Object.keys(quantityMap).map(
    (displayName) => {
      const item = items.find((i) => itemDisplayName(i) === displayName);
      return item;
    },
  ) as InventoryItem[];

  return (
    <React.Fragment>
      <div>
        <FormControl fullWidth>
          <InputLabel id={`quest-item-label`}>{label}</InputLabel>
          <Select
            id={`quest-item`}
            labelId={`quest-item-label`}
            value={value}
            label={label}
            disabled={disabled}
            onChange={(e) => {
              setValue(e.target.value);
              if (onSelectItemId) {
                onSelectItemId(e.target.value as string);
              }
              if (onChange) {
                const actualItem = items.find((i) => i.id === e.target.value);
                if (actualItem) {
                  onChange(actualItem.baseItem);
                }
              }
            }}
          >
            {uniqueItems.map((inventoryItem) => (
              <MenuItem 
                key={inventoryItem.id} 
                value={inventoryItem.id}
                data-testid={inventoryItem.baseItem}
              >
                <>
                  {itemDisplayName(inventoryItem)}
                  {quantityMap[itemDisplayName(inventoryItem)] > 1
                    ? ` x${quantityMap[itemDisplayName(inventoryItem)]}`
                    : ""}
                </>
                {getEnchantmentDisplay(inventoryItem.baseItem) !== "???" && (
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "primary.main" }}
                  >
                    &nbsp;{getEnchantmentDisplay(inventoryItem.baseItem)}
                  </Typography>
                )}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </React.Fragment>
  );
}
