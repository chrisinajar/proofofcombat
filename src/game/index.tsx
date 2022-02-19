import React from "react";
import { useRouter } from "next/router";

import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";

import { Layout } from "src/components/layout";
import { Chat } from "src/components/chat";
import { Combat } from "src/components/combat";
import { useMeQuery } from "src/generated/graphql";
import { useToken } from "src/token";

export default function Home(): JSX.Element {
  const router = useRouter();
  const [token, setToken] = useToken();
  const { data, loading, error } = useMeQuery();

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
      <br />
      You are logged in!
      <br />
      I am actively adding new features to this kind of constantly.
      <br />
      <br />
      <Combat />
      <br />
      <Chat />
    </Layout>
  );
}
