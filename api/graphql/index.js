import Dataloader from 'dataloader';
import { GraphQLSchema } from 'graphql';
import { graphqlExpress } from 'apollo-server-express';

import query from './queries';
import mutation from './mutations';
import db from 'database';

const dev = process.env.NODE_ENV !== 'production';
const schema = new GraphQLSchema({ query, mutation });

const graphqlHandler = graphqlExpress((req, res) => ({
  schema,
  context: { req, db }
}));

export default graphqlHandler;
