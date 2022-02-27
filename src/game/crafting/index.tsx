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

import { useHero } from "src/hooks/use-hero";

import { DestroyItems } from "./destroy-items";
import { EnchantItems } from "./enchant-items";
import { DisenchantItems } from "./disenchant-items";

export function CreaftingMenu(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState("1");
  const hero = useHero();

  if (!hero) {
    return <CircularProgress />;
  }
  return (
    <React.Fragment>
      <Divider sx={{ margin: 2 }} />
      <Typography variant="h2" color="secondary">
        Crafting
      </Typography>
      <Typography variant="subtitle1" color="secondary">
        Enchanting Dust:{" "}
        <span id="hero-stats-enchanting-dust">
          {hero.enchantingDust.toLocaleString()}
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
            <Tab icon={<MergeTypeIcon />} label="Enchant" value="2" />
            <Tab icon={<CallSplitIcon />} label="Disenchant" value="3" />
          </TabList>
          <TabPanel value="1">
            <DestroyItems hero={hero} />
          </TabPanel>
          <TabPanel value="2">
            <EnchantItems hero={hero} />
          </TabPanel>
          <TabPanel value="3">
            <DisenchantItems hero={hero} />
          </TabPanel>
        </Box>
      </TabContext>
    </React.Fragment>
  );
}
