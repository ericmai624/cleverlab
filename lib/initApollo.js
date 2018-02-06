import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

if (!process.browser) global.fetch = fetch;

const createApolloClient = (initState = {}) => new ApolloClient({
  connectToDevTools: process.browser,
  ssrMode: !process.browser,
  link: new HttpLink({
    uri: 'http://localhost:8080/graphql',
    credentials: 'same-origin'
  }),
  cache: new InMemoryCache().restore(initState)
});

const initApollo = initState => {
  if (!process.browser) return createApolloClient(initState);

  if (!apolloClient) apolloClient = createApolloClient(initState);
  
  return apolloClient;
};

export default initApollo;
