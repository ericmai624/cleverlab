import { GraphQLObjectType } from 'graphql';

import registerUser from './registerUser';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    registerUser
  }
});

export default mutation;
