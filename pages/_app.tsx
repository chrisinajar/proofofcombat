import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";

import CssBaseline from "@mui/material/CssBaseline";

import { createClient } from "../src/apollo";

const apolloClient = createClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Proof of Combat</title>
        <meta
          name="description"
          content="A game about pressing buttons and watching numbers go up."
        />
        <meta name="robots" content="index, follow" />
        <meta charSet="utf-8" />
        <meta httpEquiv="cache-control" content="no-cache" />

        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </React.Fragment>
  );
}

export default MyApp;
