import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useHero } from "src/hooks/use-hero";
import { useDelay } from "src/hooks/use-delay";
import { useEquipItemMutation } from "src/generated/graphql";

import {
  itemDisplayName,
  itemAllowsRebirth,
  itemAllowsCrafting,
  itemAllowsVoidTravel,
  getEnchantmentDisplay,
  pureEnchantmentDisplayName,
} from "src/helpers";
import { ArtifactModifiers } from "src/components/artifact-modifiers";

import { RebirthMenu } from "../rebirth";
import { CreaftingMenu } from "../crafting";
import { VoidTravelMenu } from "../void-travel";
import { EquipmentSlot } from "./equipment-slot";
import { Slots } from "./types";
import { QuestItems } from "./quest-items";

export function Inventory(): JSX.Element | null {
  const [currentDelay] = useDelay();
  const [equipItemMutation, { loading }] = useEquipItemMutation();
  const [selectedQuestItem, setSelectedQuestItem] = useState<string>("");
  const hero = useHero();

  const shouldDisable = loading || currentDelay > 0;

  if (!hero) {
    return null;
  }

  async function handleEquip(slot: Slots, item: string) {
    try {
      await equipItemMutation({
        variables: {
          item,
          slot,
        },
      });
    } catch (e) {}
  }

  return (
    <React.Fragment>
      <Grid container columns={6} spacing={1}>
        <Grid item xs={6}>
          <Typography variant="h3" sx={{ fontSize: "1.2rem" }}>
            Equipped items
          </Typography>
        </Grid>

        <Grid item xs={6} sm={3}>
          <EquipmentSlot
            hero={hero}
            slot="leftHand"
            label="Left Hand"
            onEquip={handleEquip}
            disabled={shouldDisable}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <EquipmentSlot
            hero={hero}
            slot="rightHand"
            label="Right Hand"
            onEquip={handleEquip}
            disabled={shouldDisable}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <EquipmentSlot
            hero={hero}
            slot="bodyArmor"
            label="Body Armor"
            onEquip={handleEquip}
            disabled={shouldDisable}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <EquipmentSlot
            hero={hero}
            slot="handArmor"
            label="Gauntlets"
            onEquip={handleEquip}
            disabled={shouldDisable}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <EquipmentSlot
            hero={hero}
            slot="legArmor"
            label="Leggings"
            onEquip={handleEquip}
            disabled={shouldDisable}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <EquipmentSlot
            hero={hero}
            slot="headArmor"
            label="Helmets"
            onEquip={handleEquip}
            disabled={shouldDisable}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <EquipmentSlot
            hero={hero}
            slot="footArmor"
            label="Greaves"
            onEquip={handleEquip}
            disabled={shouldDisable}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <QuestItems
            hero={hero}
            disabled={shouldDisable}
            onChange={setSelectedQuestItem}
          />
        </Grid>

        <Grid item xs={6}>
          <Grid container columns={6} spacing={1}>
            <Grid item xs={6} sm={3}>
              {!!hero.buffs.blessing && (
                <React.Fragment>
                  <Typography>
                    {pureEnchantmentDisplayName(hero.buffs.blessing)}
                  </Typography>
                  <Typography variant="body1">
                    <b>{getEnchantmentDisplay(hero.buffs.blessing)}</b>
                  </Typography>
                </React.Fragment>
              )}
            </Grid>
            <Grid item xs={6} md={3}>
              <ArtifactModifiers
                title={hero.equipment.artifact?.name}
                artifact={hero.equipment.artifact}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <ArtifactModifiers
                title={
                  hero.equipment.leftHand
                    ? itemDisplayName(hero.equipment.leftHand, null)
                    : null
                }
                artifact={hero.equipment.leftHand?.imbue?.artifact}
                affixes={hero.equipment.leftHand?.imbue?.affixes}
              />
              <ArtifactModifiers
                title={
                  hero.equipment.rightHand
                    ? itemDisplayName(hero.equipment.rightHand, null)
                    : null
                }
                artifact={hero.equipment.rightHand?.imbue?.artifact}
                affixes={hero.equipment.rightHand?.imbue?.affixes}
              />
              <ArtifactModifiers
                title={
                  hero.equipment.bodyArmor
                    ? itemDisplayName(hero.equipment.bodyArmor, null)
                    : null
                }
                artifact={hero.equipment.bodyArmor?.imbue?.artifact}
                affixes={hero.equipment.bodyArmor?.imbue?.affixes}
              />
              <ArtifactModifiers
                title={
                  hero.equipment.handArmor
                    ? itemDisplayName(hero.equipment.handArmor, null)
                    : null
                }
                artifact={hero.equipment.handArmor?.imbue?.artifact}
                affixes={hero.equipment.handArmor?.imbue?.affixes}
              />
              <ArtifactModifiers
                title={
                  hero.equipment.legArmor
                    ? itemDisplayName(hero.equipment.legArmor, null)
                    : null
                }
                artifact={hero.equipment.legArmor?.imbue?.artifact}
                affixes={hero.equipment.legArmor?.imbue?.affixes}
              />
              <ArtifactModifiers
                title={
                  hero.equipment.headArmor
                    ? itemDisplayName(hero.equipment.headArmor, null)
                    : null
                }
                artifact={hero.equipment.headArmor?.imbue?.artifact}
                affixes={hero.equipment.headArmor?.imbue?.affixes}
              />
              <ArtifactModifiers
                title={
                  hero.equipment.footArmor
                    ? itemDisplayName(hero.equipment.footArmor, null)
                    : null
                }
                artifact={hero.equipment.footArmor?.imbue?.artifact}
                affixes={hero.equipment.footArmor?.imbue?.affixes}
              />
            </Grid>
          </Grid>
        </Grid>

        {hero.level === hero.levelCap &&
          itemAllowsRebirth(selectedQuestItem) && (
            <Grid item xs={6}>
              <RebirthMenu hero={hero} disabled={shouldDisable} />
            </Grid>
          )}
        {itemAllowsCrafting(selectedQuestItem) && (
          <Grid item xs={6}>
            <CreaftingMenu hero={hero} disabled={shouldDisable} />
          </Grid>
        )}
        {itemAllowsVoidTravel(selectedQuestItem) && (
          <Grid item xs={6}>
            <VoidTravelMenu hero={hero} disabled={shouldDisable} />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
