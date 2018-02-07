import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

if (!process.browser) global.fetch = fetch;

const createApolloClient = (initState = {}, { getCookie, baseUrl }) => {
  const cookie = getCookie();

  const httpLink = new HttpLink({ uri: `${baseUrl}/graphql` });

  const cookieLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: { ...headers, cookie }
    }));
    return forward(operation);
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: ApolloLink.from([cookieLink, httpLink]), // use ApolloLink's concat method to join 2 links together
    cache: new InMemoryCache().restore(initState)
  });
};

const initApollo = (initState, options) => {
  // always create a new client when ssr
  if (!process.browser) return createApolloClient(initState, options);

  if (!apolloClient) apolloClient = createApolloClient(initState, options);
  
  return apolloClient;
};

export default initApollo;
