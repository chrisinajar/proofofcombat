import React, { useState, useMemo } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";

import { DelayContext } from "src/hooks/use-delay";
import { createClient } from "../src/apollo";

import "styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [currentDelay, setCurrentDelay] = useState<number>(0);
  const apolloClient = useMemo(() => {
    return createClient({
      onDelay: setCurrentDelay,
    });
  }, []);

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
      <DelayContext.Provider value={[currentDelay, setCurrentDelay]}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </DelayContext.Provider>
    </React.Fragment>
  );
}

export default MyApp;
