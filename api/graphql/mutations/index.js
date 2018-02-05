import { GraphQLObjectType } from 'graphql';

import getAuthToken from './getAuthToken';
import registerUser from './registerUser';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    getAuthToken,
    registerUser
  }
});

export default mutation;
