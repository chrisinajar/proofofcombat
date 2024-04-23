import React, { useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import MergeTypeIcon from "@mui/icons-material/MergeType";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import DeleteIcon from "@mui/icons-material/Delete";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { visuallyHidden } from "@mui/utils";

import { Hero } from "src/generated/graphql";

import { DestroyItems } from "./destroy-items";
import { EnchantItems } from "./enchant-items";
import { DisenchantItems } from "./disenchant-items";
import { ImbueItem } from "./imbue-item";

export function CreaftingMenu({
  hero,
  disabled,
}: {
  hero: Hero;
  disabled: boolean;
}): JSX.Element {
  const [selectedTab, setSelectedTab] = useState("1");

  // can imbue if they have a pure and void essence
  const hasPureEssence = hero.inventory.some(
    (item) => item.baseItem === "pure-essence",
  );
  const hasVoidEssence = hero.inventory.some(
    (item) => item.baseItem === "essence-of-void",
  );
  const canImbue =
    hasPureEssence && hasVoidEssence && hero.equipment.artifact !== null;

  return (
    <React.Fragment>
      <Divider sx={{ margin: 2 }} />
      <Typography variant="h2" component="h4" color="secondary">
        Crafting
      </Typography>
      <Typography variant="subtitle1" color="secondary">
        Enchanting Dust:{" "}
        <span id="hero-stats-enchanting-dust">
          {hero.enchantingDust.toLocaleString()}
        </span>
      </Typography>
      <Typography variant="subtitle1" color="secondary">
        Enchantments:{" "}
        <span id="hero-stats-enchantments">
          {hero.enchantments.length.toLocaleString()}
        </span>
      </Typography>
      <br />
      <TabContext value={selectedTab}>
        <Box
          sx={{
            flexGrow: 1,
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
          }}
        >
          <TabList
            orientation="vertical"
            onChange={(e, val) => setSelectedTab(val)}
            aria-label="navigation tabs"
            variant="scrollable"
            textColor="secondary"
            indicatorColor="secondary"
            sx={{
              flexShrink: 0,
              flexGrow: 0,
              width: "100px",
            }}
          >
            <Tab icon={<DeleteIcon />} label="Destroy" value="1" />
            <Tab icon={<CallSplitIcon />} label="Disenchant" value="2" />
            <Tab icon={<MergeTypeIcon />} label="Enchant" value="3" />
            {canImbue && (
              <Tab icon={<MergeTypeIcon />} label="Imbue" value="4" />
            )}
          </TabList>
          <TabPanel value="1">
            <Typography variant="h5" sx={visuallyHidden}>
              Destroy Items
            </Typography>
            <DestroyItems hero={hero} disabled={disabled} />
          </TabPanel>
          <TabPanel value="2">
            <Typography variant="h5" sx={visuallyHidden}>
              Disenchant Items
            </Typography>
            <DisenchantItems hero={hero} disabled={disabled} />
          </TabPanel>
          <TabPanel value="3">
            <Typography variant="h5" sx={visuallyHidden}>
              Enchant Items
            </Typography>
            <EnchantItems hero={hero} disabled={disabled} />
          </TabPanel>
          {canImbue && (
            <TabPanel value="4">
              <Typography variant="h5" sx={visuallyHidden}>
                Imbue Items
              </Typography>
              <ImbueItem hero={hero} disabled={disabled} />
            </TabPanel>
          )}
        </Box>
      </TabContext>
    </React.Fragment>
  );
}
