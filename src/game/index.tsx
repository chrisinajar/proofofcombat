import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import NoSsr from "@mui/material/NoSsr";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { Layout } from "src/components/layout";
import { Chat } from "src/components/chat";
import { Combat } from "src/components/combat";
import { useToken } from "src/token";
import { addSpaces, itemUpgradesAutomation } from "src/helpers";

import {
  useMeQuery,
  useLeaderboardQuery,
  AccessRole,
} from "src/generated/graphql";

import { Locations } from "./locations";
import { LevelUpBox } from "./level-up-box";
import { Shop } from "./shop";
import { Inventory } from "./inventory";
import { QuestEventDisplay } from "./quest-event-display";
import { QuestLog } from "./quest-log";
import { CombatStats } from "./combat-stats";
import { Settings } from "./settings";
const DynamicAdmin = dynamic(() => import("../admin/"));

export default function Home(): JSX.Element {
  const router = useRouter();
  const routeParts = router.route.split("/");
  const terminalRoute = routeParts.pop();
  const [token, setToken] = useToken();
  const { data, loading, error } = useMeQuery();
  const [selectedTab, setSelectedTab] = useState<string>(
    terminalRoute ?? "play"
  );
  const { data: leaderboardData } = useLeaderboardQuery({
    pollInterval: 30000,
  });

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === "play") {
      router.push("/play", "/play", { scroll: false });
    } else {
      router.push(`/play/${newValue}`, `/play/${newValue}`, { scroll: false });
    }
    setSelectedTab(newValue);
  };

  const hero = data?.me?.account?.hero ?? null;
  const access = data?.me?.account?.access ?? null;

  useEffect(() => {
    if (error || !token) {
      router.push(`/?auth=${router.asPath}`);
      return;
    }
  }, [error, token]);

  if (error || !token) {
    return (
      <Layout>
        <NoSsr>
          <br />
          Redirecting...
        </NoSsr>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <NoSsr>{loading && <LinearProgress />}</NoSsr>
      </Layout>
    );
  }

  const hasUpgradedAutomation = !!hero?.inventory.find((item) =>
    itemUpgradesAutomation(item.baseItem)
  );

  return (
    <Layout showHero>
      <NoSsr>
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
                <Tab label="Welcome" value="play" />
                <Tab label="Combat" value="combat" />
                <Tab label="Shop" value="shop" />
                <Tab label="Inventory" value="inventory" />
                <Tab label="Map" value="map" />
                <Tab label="Quests" value="quests" />
                {hasUpgradedAutomation && (
                  <Tab label="Settings" value="settings" />
                )}
                {access === AccessRole.Admin && (
                  <Tab label="Admin" value="admin" />
                )}
              </TabList>
            </Box>
            <TabPanel value="play">
              <Grid container columns={12} spacing={4}>
                <Grid item xs={12} sm={7} md={8}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Welcome to <b>Proof of Combat</b>!
                  </Typography>
                  <Typography sx={{ mb: 2 }}>
                    This game is under very active development, so except things
                    to change often and for new features and content to appear
                    on a near daily basis.
                  </Typography>

                  <Typography sx={{ mb: 2 }}>
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
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Combat Stats
                  </Typography>
                  {hero?.combatStats && (
                    <CombatStats stats={hero.combatStats} />
                  )}
                </Grid>
                {leaderboardData?.leaderboard && (
                  <Grid item xs={12} sm={5} md={4}>
                    <Typography variant="h6">Top levels:</Typography>
                    <ul id="leaderboard-list">
                      {leaderboardData.leaderboard
                        .slice(0, 20)
                        .map((entry, i) => (
                          <li id={`leaderboard-list-${i}`} key={entry.id}>
                            <b id={`leaderboard-list-${i}-name`}>
                              {entry.name}
                            </b>{" "}
                            {entry.level.toLocaleString()} (
                            {addSpaces(entry.class)})
                          </li>
                        ))}
                    </ul>
                  </Grid>
                )}
              </Grid>
            </TabPanel>
            <TabPanel value="combat">
              <Typography>
                Challenge a monster from the list, then fight it to the death.
                Note that other players in the same location see the same
                monster lists, so they may get to it first!
              </Typography>
              <br />
              <Combat />
            </TabPanel>
            <TabPanel value="shop">
              <Shop />
            </TabPanel>
            <TabPanel value="inventory">
              <Inventory />
            </TabPanel>
            <TabPanel value="map">
              <Locations />
            </TabPanel>
            <TabPanel value="quests">
              <QuestLog />
            </TabPanel>
            <TabPanel value="settings">
              <Settings />
            </TabPanel>
            <TabPanel value="admin">
              <DynamicAdmin />
            </TabPanel>
          </TabContext>
          <br />
          <Divider />
          <br />
          <Chat />
        </Box>
      </NoSsr>
    </Layout>
  );
}
