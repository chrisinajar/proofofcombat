import React from "react";
import { useRouter } from "next/router";

import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";

import { Layout } from "src/components/layout";
import { Chat } from "src/components/chat";
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
      <br />
      <br />
      Hey, you're logged in!!
      <br />
      <br />
      <br />
      <br />
      <Chat />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  );
}
