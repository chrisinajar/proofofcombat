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

export default function Home(): JSX.Element {
  const router = useRouter();
  const [token, setToken] = useToken();
  const { data, loading, error } = useMeQuery();
  const [selectedTab, setSelectedTab] = useState("1");
  const { data: leaderboardData } = useLeaderboardQuery();

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
      </React.Fragment>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChangeTab} aria-label="navigation tabs">
              <Tab label="Welcome / News" value="1" />
              <Tab label="Combat" value="2" />
              <Tab label="Shop" value="3" />
              <Tab label="Inventory" value="4" />
              <Tab label="Map" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container columns={6}>
              <Grid item xs={6} sm={3}>
                <Typography>
                  Welcome to the game! I'm updating things extremely regularly,
                  so check back often and refresh often. Use the tabs above to
                  navigate around.
                </Typography>
                <br />
                <Typography>
                  There are now 6 different types of combat available, each uses
                  a different primary attribute to determine hit chance and
                  damage. Additionally, each type of attack has its own unique
                  benefits!
                </Typography>
                <br />
                <Typography>
                  The map is fully functional! Be sure to travel around before
                  travel gets harder...
                </Typography>
              </Grid>
              {leaderboardData?.leaderboard && (
                <Grid item xs={6} sm={3}>
                  Top levels:
                  <ul id="leaderboard-list">
                    {leaderboardData.leaderboard.map((entry, i) => (
                      <li id={`leaderboard-list-${i}`} key={entry.id}>
                        <b id={`leaderboard-list-${i}-name`}>{entry.name}</b>{" "}
                        {entry.level.toLocaleString()}
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
        </TabContext>
        <br />
        <Divider />
        <br />
        <Chat />
      </Box>
    </Layout>
  );
}
