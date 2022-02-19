import React, { useState } from "react";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { Layout } from "src/components/layout";
import { Chat } from "src/components/chat";
import { Combat } from "src/components/combat";
import { useMeQuery } from "src/generated/graphql";
import { useToken } from "src/token";

import { Locations } from "./locations";

export default function Home(): JSX.Element {
  const router = useRouter();
  const [token, setToken] = useToken();
  const { data, loading, error } = useMeQuery();
  const [selectedTab, setSelectedTab] = useState("1");

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

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
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChangeTab} aria-label="navigation tabs">
              <Tab label="Welcome / News" value="1" />
              <Tab label="Combat" value="2" />
              <Tab label="Map" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Typography>
              Welcome to the game! I'm updating things extremely regularly, so
              check back often and refresh often. Use the tabs above to navigate
              around.
            </Typography>
            <br />
            <Typography>
              You can find chat below, it keeps the last 50 messages, or since
              the server last restarted. Emoji's are fully supported and
              encouraged.
            </Typography>
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
