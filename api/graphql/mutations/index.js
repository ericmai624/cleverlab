import { GraphQLObjectType } from 'graphql';

import login from './login';
import registerUser from './registerUser';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login,
    registerUser
  }
});

export default mutation;
