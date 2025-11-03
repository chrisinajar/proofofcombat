import React, { useMemo } from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { onError as makeErrorLink } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client";

import { useSnackbar } from "notistack";

import { useDelay } from "src/hooks/use-delay";
import { API_URL } from "src/config";

const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext((req, { headers }) => {
  // get the authentication token from session storage if it exists
  const token = sessionStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export function createClient({
  onDelay,
  onError,
}: {
  onDelay?: (delay: number) => void;
  onError?: (message: string) => void;
}) {
  const errorLink = makeErrorLink(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach((error) => {
        const { message, locations, path, extensions } = error;
        onError?.(message);
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        );
        if (extensions.delay && onDelay) {
          onDelay(extensions.remaining as number);
        }
      });

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const client = new ApolloClient({
    name: "Proof of Combat",
    version: "Browser",
    link: from([errorLink, authLink.concat(httpLink)]),

    cache: new InMemoryCache({
      typePolicies: {
        Location: { merge: true },
        CampResources: { merge: true },
      },
    }),
  });

  return client;
}

// im so funny
export function ProofOfApolloProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [currentDelay, setCurrentDelay] = useDelay();
  const { enqueueSnackbar } = useSnackbar();
  function showError(e: string) {
    enqueueSnackbar(e, {
      variant: "error",
    });
    console.log(e);
  }

  const apolloClient = useMemo(() => {
    return createClient({
      onDelay: setCurrentDelay,
      onError: showError,
    });
  }, []);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
