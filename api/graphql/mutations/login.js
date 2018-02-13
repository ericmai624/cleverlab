import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from 'config';
import request from 'request-promise';
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
  resolve: async (parentValue, { input }, { req, requestOptions }) => {
    let { email, password } = input;

    if (!isEmail(email)) throw new Error('Invalid email address');
    if (!isLength(password, { min: 6 })) throw new Error('Password must have at least 6 characters');

    let sign = util.promisify(jwt.sign);
    let { cleverlab, profiledot } = config;

    let token = await sign({ data: { email, password } }, profiledot.secret, { expiresIn: 300 });
    let options = Object.assign({}, requestOptions);
    options.headers = { Authorization: `Bearer ${token}` };

    let response = await request.post(`${profiledot.uri}/login`, options);
    
    let errorCodes = [403, 404, 500];
    if (errorCodes.includes(response.statusCode)) return null;

    let viewer = JSON.parse(response.body);

    req.session.owner = { id: viewer._id };

    return viewer;
  }
};

export default login;
