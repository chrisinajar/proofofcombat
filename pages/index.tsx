import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Layout } from "src/components/layout";
import { LoginOrSignup } from "src/components/login-or-signup";

const Home: NextPage = () => {
  return (
    <Layout>
      <br />
      <LoginOrSignup />
      <br />
      <br />
      <br />
      <Divider />
      <br />
      <Grid container columns={2}>
        <Grid item sm={1} xs={1}>
          <Typography>
            <a
              href="https://github.com/chrisinajar/proofofcombat"
              target="_blank"
              rel="noreferrer"
            >
              Client source code
            </a>
          </Typography>
        </Grid>
        <Grid item sm={1} xs={1}>
          <Typography align="right">
            <a
              href="https://github.com/chrisinajar/proofofcombat-server"
              target="_blank"
              rel="noreferrer"
            >
              Server source code
            </a>
          </Typography>
        </Grid>
      </Grid>
      <br />
    </Layout>
  );
};

export default Home;
