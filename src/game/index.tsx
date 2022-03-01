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
import { addSpaces } from "src/helpers";

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
    pollInterval: 30000,
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
      <Box
        sx={{
          width: "100%",
          typography: "body1",
        }}
      >
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChangeTab}
              aria-label="navigation tabs"
              variant="scrollable"
            >
              <Tab label="Welcome" value="1" />
              <Tab label="Combat" value="2" />
              <Tab label="Shop" value="3" />
              <Tab label="Inventory" value="4" />
              <Tab label="Map" value="5" />
              <Tab label="Quests" value="6" />
              <Tab label="Stats" value="7" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container columns={12} spacing={4}>
              <Grid item xs={12} sm={7} md={8}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                  Welcome to <b>Proof of Combat</b>!
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                  This game is under very active development, so except things
                  to change often and for new features and content to appear on
                  a near daily basis.
                </Typography>

                <Typography sx={{ marginBottom: 2 }}>
                  If you'd like to discuss upcoming features, join the{" "}
                  <a
                    href="https://discord.gg/t7AZSxvfJG"
                    target="_blank"
                    rel="noreferrer"
                  >
                    discord
                  </a>
                  !
                </Typography>
              </Grid>
              {leaderboardData?.leaderboard && (
                <Grid item xs={12} sm={5} md={4}>
                  <Typography variant="h6">Top levels:</Typography>
                  <ul id="leaderboard-list">
                    {leaderboardData.leaderboard
                      .slice(0, 20)
                      .map((entry, i) => (
                        <li id={`leaderboard-list-${i}`} key={entry.id}>
                          <b id={`leaderboard-list-${i}-name`}>{entry.name}</b>{" "}
                          {entry.level.toLocaleString()} (
                          {addSpaces(entry.class)})
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
