import graphHttp from 'express-graphql';
import { GraphQLSchema } from 'graphql';

import query from './queries';
import mutation from './mutations';
import db from '../../database';

const dev = process.env.NODE_ENV !== 'production';
const schema = new GraphQLSchema({ query, mutation });

const graphqlHandler = graphHttp((req, res) => ({
  schema,
  graphiql: dev,
  pretty: dev,
  context: { req, db }
}));

export default graphqlHandler;
