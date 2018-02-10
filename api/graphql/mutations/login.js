import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from 'config';
import util from 'util';
import { isEmail, isLength } from 'validator';
import { GraphQLString, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';

import UserType from 'api/graphql/types/user';

const LoginInputType = new GraphQLInputObjectType({
  name: 'LoginInput',
  description: 'email and password of the user trying to login',
  fields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  }
});

const login = {
  type: UserType,
  args: {
    input: { type: new GraphQLNonNull(LoginInputType) }
  },
  resolve: async (parentValue, { input }, { req, db }) => {
    const { email, password } = input;

    if (!isEmail(email)) throw new Error('Invalid email address');
    if (!isLength(password, { min: 6 })) throw new Error('Password must have at least 6 characters');

    const sign = util.promisify(jwt.sign);
    const user = await db.User.findOne({ email });
    const { secret } = config.jwt;

    if (!user) throw new Error('Invalid email or user does not exist with email');

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) throw new Error('Incorrect password');

    user.lastLogin = Date.now();
    user.loginCounts++;

    req.session.jwtToken = await sign({ viewerId: user.id }, secret);

    return await user.save();
  }
};

export default login;
