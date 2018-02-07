import { GraphQLObjectType } from 'graphql';

import login from './login';
import createUser from './createUser';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login,
    createUser
  }
});

export default mutation;
