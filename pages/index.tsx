import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { Layout } from "src/components/layout";
import { LoginOrSignup } from "src/components/login-or-signup";

const Home: NextPage = () => {
  return (
    <Layout>
      <Box sx={{ py: 4 }}>
        <Stack spacing={3}>
          <LoginOrSignup />
        </Stack>
      </Box>
    </Layout>
  );
};

export default Home;
