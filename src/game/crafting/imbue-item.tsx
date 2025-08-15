import React, { useState } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import LoadingButton from "@mui/lab/LoadingButton";

import {
  Hero,
  InventoryItemType,
  ArtifactAttributeType,
  useImbueItemMutation,
} from "src/generated/graphql";

import {
  addSpaces,
  itemSorter,
  modifierText,
  isItemEquipped,
  itemDisplayName,
  modifiersForArtifact,
} from "src/helpers";
import { visuallyHidden } from "@mui/utils";

export function ImbueItem({
  hero,
  disabled,
}: {
  hero: Hero;
  disabled: boolean;
}): JSX.Element {
  let [value, setValue] = useState<string>("");
  const [lockedModifiers, setLockedModifiers] = useState<
    ArtifactAttributeType[]
  >([]);
  const [imbueItemMutation, { loading }] = useImbueItemMutation();

  const enchantableItems = hero.inventory
    .filter((item) => {
      if (item.type === InventoryItemType.Quest) {
        return false;
      }

      return !item.enchantment && item.level > 31;
    })
    .sort(itemSorter);

  let selectedItem = enchantableItems.find((item) => item.id === value);

  if (!selectedItem && value.length) {
    if (enchantableItems.length) {
      selectedItem = enchantableItems[0];
      value = selectedItem.id;
    } else {
      value = "";
    }
  }
  const baseItemLabel = "Select base item";
  const artifact = hero.equipment.artifact;

  if (!artifact) {
    return (
      <>
        <Typography>You must have an artifact to imbue items with.</Typography>
      </>
    );
  }

  const modifiers = modifiersForArtifact(artifact);

  return (
    <>
      <Typography>
        Imbueing an item adds parts of an artifact onto a base item. Items can
        only be imbued once, and there is no way to remove the imbue. You may
        enchant an imbued item, however only unenchanted items can receive an
        imbue.
      </Typography>
      <br />
      <FormControl fullWidth sx={{ margin: 1 }}>
        <InputLabel id="enchant-baseItem-select-label">
          {baseItemLabel}
        </InputLabel>
        <Select
          id="enchant-baseItem-select"
          labelId="enchant-baseItem-select-label"
          value={value || ""}
          label={baseItemLabel}
          onChange={(e) => {
            const itemId = e.target.value;
            const inventoryItem = hero.inventory.find(
              (item) => item.id === itemId,
            );
            if (!inventoryItem) {
              return;
            }
            setValue(itemId);
          }}
        >
          {enchantableItems.map((item) => {
            const isSuperior = (item.builtIns || []).length > 0;
            return (
              <MenuItem key={item.id} value={item.id}>
                {isSuperior && (
                  <span style={visuallyHidden as any}>(Superior base) </span>
                )}
                {itemDisplayName(item)}
                {isItemEquipped(hero, item) && "*EQUIPPED*"}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {selectedItem && (
        <>
          <Typography variant="h5">
            {selectedItem.name} to be imbued with{" "}
            <strong>{artifact.name}</strong>
          </Typography>
          <Typography variant="subtitle1">
            Select up to three affixes to activate on the item, each affix
            increases dust cost dramatically. The remaining affixes will be
            selected randomly from the remaining affixes.
          </Typography>
          <FormGroup>
            {modifiers.map((modifier) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={
                        lockedModifiers.length >= 3 &&
                        !lockedModifiers.includes(modifier.type)
                      }
                      onChange={(e) => {
                        const newLockedModifers = lockedModifiers.filter(
                          (m) => m !== modifier.type,
                        );
                        if (e.target.checked) {
                          newLockedModifers.push(modifier.type);
                        }
                        setLockedModifiers(newLockedModifers);
                      }}
                    />
                  }
                  label={modifierText(modifier)}
                  key={modifier.type}
                />
              );
            })}
          </FormGroup>
        </>
      )}
      <LoadingButton
        variant="contained"
        disabled={disabled || !selectedItem || lockedModifiers.length === 0}
        loading={disabled}
        onClick={async () => {
          if (disabled || !selectedItem || lockedModifiers.length === 0) {
            return;
          }
          await imbueItemMutation({
            variables: {
              item: selectedItem.id,
              artifact: artifact.id,
              affixes: lockedModifiers,
            },
          });
        }}
      >
        Imbue item
      </LoadingButton>
    </>
  );
}
