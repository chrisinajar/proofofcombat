import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const httpLink = createHttpLink({
  uri: baseUrl,
});

const authLink = setContext((req, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
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
}: {
  onDelay?: (delay: number) => void;
}) {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach((error) => {
        const { message, locations, path, extensions } = error;
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
        if (extensions.delay && onDelay) {
          onDelay(extensions.remaining as number);
        }
      });

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const client = new ApolloClient({
    link: from([errorLink, authLink.concat(httpLink)]),

    cache: new InMemoryCache(),
  });

  return client;
}
