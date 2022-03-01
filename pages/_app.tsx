import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import { createClient } from "../src/apollo";

const apolloClient = createClient();

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#9c27b0",
          },
          info: {
            main: "#339cef",
          },
          background: prefersDarkMode
            ? {
                default: "#303030",
                paper: "#696969",
              }
            : {
                default: "#ededed",
                paper: "#ddd",
              },
        },
        shape: {
          borderRadius: 2,
        },
      }),
    [prefersDarkMode]
  );

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
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />

          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  );
}

export default MyApp;
