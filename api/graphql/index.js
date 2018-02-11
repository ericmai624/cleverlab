import Dataloader from 'dataloader';
import { GraphQLSchema } from 'graphql';
import { graphqlExpress } from 'apollo-server-express';

import query from './queries';
import mutation from './mutations';

const dev = process.env.NODE_ENV !== 'production';
const schema = new GraphQLSchema({ query, mutation });

const graphqlHandler = graphqlExpress(req => ({
  schema,
  context: {
    req,
    requestOptions: {
      resolveWithFullResponse: true,
      simple: false
    }
  }
}));

export default graphqlHandler;
