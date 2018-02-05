import { GraphQLString, GraphQLNonNull } from 'graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from 'config';
import Promise from 'bluebird';

import AuthTokenType from 'api/graphql/types/authToken';

const getAuthToken = {
  type: AuthTokenType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (parentValue, { email, password }, { req, db }) => {
    Promise.promisifyAll(jwt);
    const { secret } = config.jwt;

    const user = await db.User.findOne({ email });

    if (!user) return { token: null, errorMsg: 'Invalid email' };

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return { token: null, errorMsg: 'Invalid password' };

    if (user && isValidPassword) {
      return { token: await jwt.signAsync({ id: user.id }, secret, { expiresIn: '7d' }) };
    }
    return { token: null, errorMsg: 'Unable to complete request' };
  }
};

export default getAuthToken;
