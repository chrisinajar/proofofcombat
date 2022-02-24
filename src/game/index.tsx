import React, { useState } from "react";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { Layout } from "src/components/layout";
import { Chat } from "src/components/chat";
import { Combat } from "src/components/combat";
import { useToken } from "src/token";

import { useMeQuery, useLeaderboardQuery } from "src/generated/graphql";

import { Locations } from "./locations";
import { LevelUpBox } from "./level-up-box";
import { Shop } from "./shop";
import { Inventory } from "./inventory";
import { QuestEventDisplay } from "./quest-event-display";
import { QuestLog } from "./quest-log";
import { CombatStats } from "./combat-stats";

export default function Home(): JSX.Element {
  const router = useRouter();
  const [token, setToken] = useToken();
  const { data, loading, error } = useMeQuery();
  const [selectedTab, setSelectedTab] = useState("1");
  const { data: leaderboardData } = useLeaderboardQuery({
    pollInterval: 10000,
  });

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const hero = data?.me?.account?.hero ?? null;

  if (error || !token) {
    router.push(`/?auth=${router.asPath}`);
    return (
      <Layout>
        <br />
        Redirecting...
      </Layout>
    );
  }

  if (loading) {
    return <Layout>{loading && <LinearProgress />}</Layout>;
  }

  return (
    <Layout showHero>
      <React.Fragment>
        {hero && hero.attributePoints > 0 && <LevelUpBox />}
        {hero && hero.currentQuest && (
          <QuestEventDisplay event={hero.currentQuest} />
        )}
      </React.Fragment>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTab}
              aria-label="navigation tabs"
              variant="scrollable"
            >
              <Tab label="Welcome / News" value="1" />
              <Tab label="Combat" value="2" />
              <Tab label="Shop" value="3" />
              <Tab label="Inventory" value="4" />
              <Tab label="Map" value="5" />
              <Tab label="Quest Log" value="6" />
              <Tab label="Character Stats" value="7" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container columns={12} spacing={4}>
              <Grid item xs={12} sm={7} md={8} lg={9}>
                <Typography>
                  Welcome to the game! I'm updating things extremely regularly,
                  so check back often and refresh often. Use the tabs above to
                  navigate around.
                </Typography>
                <br />
                <Typography>
                  Combat has been heavily overhauled in order to accomidate the
                  new equipment!
                </Typography>
                <br />
                <Typography>
                  There are 6 different types of combat available, each uses a
                  different primary attribute, as well as an item shop to buy
                  and equip the new items.
                </Typography>
                <br />
                <Typography>
                  The map is fully functional! Be sure to travel around before
                  travel gets harder...
                </Typography>
              </Grid>
              {leaderboardData?.leaderboard && (
                <Grid item xs={12} sm={5} md={4} lg={3}>
                  <Typography variant="h6">Top levels:</Typography>
                  <ul id="leaderboard-list">
                    {leaderboardData.leaderboard.map((entry, i) => (
                      <li id={`leaderboard-list-${i}`} key={entry.id}>
                        <b id={`leaderboard-list-${i}-name`}>{entry.name}</b>{" "}
                        {entry.level.toLocaleString()} (
                        {entry.class.replace(/(?<=[a-z])(?=[A-Z])/g, " ")})
                      </li>
                    ))}
                  </ul>
                </Grid>
              )}
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Typography>
              Challenge a monster from the list, then fight it to the death.
              Note that other players in the same location see the same monster
              lists, so they may get to it first!
            </Typography>
            <br />
            <Combat />
          </TabPanel>
          <TabPanel value="3">
            <Shop />
          </TabPanel>
          <TabPanel value="4">
            <Inventory />
          </TabPanel>
          <TabPanel value="5">
            <Locations />
          </TabPanel>
          <TabPanel value="6">
            <QuestLog />
          </TabPanel>
          <TabPanel value="7">
            {hero?.combatStats && <CombatStats stats={hero.combatStats} />}
          </TabPanel>
        </TabContext>
        <br />
        <Divider />
        <br />
        <Chat />
      </Box>
    </Layout>
  );
}
