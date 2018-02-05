import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import jwt from 'jsonwebtoken';
import config from 'config';
import Promise from 'bluebird';

import UserType from 'api/graphql/types/user';

export default {
  type: UserType,
  args: {
    token: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (parentValue, { token }, { req, db }) => {
    Promise.promisifyAll(jwt);
    const { secret } = config.jwt;
    const { id } = await jwt.verifyAsync(token, secret);

    return db.User.findById(id);
  }
};
