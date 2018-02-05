import { GraphQLObjectType } from 'graphql';

import user from './user';
import viewer from './viewer';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user,
    viewer
  }
});

export default query;
