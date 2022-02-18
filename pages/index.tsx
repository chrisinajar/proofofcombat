import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Divider from "@mui/material/Divider";

import { Layout } from "src/components/layout";
import { LoginOrSignup } from "src/components/login-or-signup";

const Home: NextPage = () => {
  return (
    <Layout>
      <br />
      <LoginOrSignup />
    </Layout>
  );
};

export default Home;
