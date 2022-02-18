import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
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

export function createClient() {
  const client = new ApolloClient({
    link: authLink.concat(httpLink),

    cache: new InMemoryCache(),
  });

  return client;
}
