import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

import UserType from 'api/graphql/types/user';

export default {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (parentValue, { email }, { req, db }) => await db.User.findOne({ email })
};
