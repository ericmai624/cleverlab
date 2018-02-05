import { GraphQLObjectType } from 'graphql';

import user from './user';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user
  }
});

export default query;
