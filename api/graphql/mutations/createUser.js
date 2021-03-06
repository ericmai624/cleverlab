import config from 'config';
import request from 'request-promise';
import jwt from 'jsonwebtoken';
import util from 'util';
import { isEmail, isLength } from 'validator';
import { GraphQLString, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';

import UserType from 'api/graphql/types/user';

const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  description: 'input from user to create new account',
  fields: {
    firstName: { type: GraphQLString },
    familyName: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    userType: { type: new GraphQLNonNull(GraphQLString) }
  }
});

const createUser = {
  type: UserType,
  args: {
    input: { type: CreateUserInputType }
  },
  resolve: async (_, { input }, { req }) => {
    console.log('Creating user with input: ', input);
    
    let { email, password, userType } = input;

    if (!isEmail(email)) throw new Error('Invalid email address');
    if (!isLength(password, { min: 6 })) throw new Error('Password must be 6 characters or more');
    if (!userType) throw new Error('userType must be specified');

    let { profiledot } = config;
    let sign = util.promisify(jwt.sign);

    let token = await sign({ data: input }, profiledot.secret, { expiresIn: 300 });
    
    let response = await request.post(profiledot.uri, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return JSON.parse(response);
  }
};

export default createUser;
