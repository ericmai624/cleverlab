import bcrypt from 'bcrypt';
import { isEmail, isLength } from 'validator';
import { GraphQLString, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';

import UserType from 'api/graphql/types/user';

const registerInput = new GraphQLInputObjectType({
  name: 'registerInput',
  description: 'input of user trying to register as a new user',
  fields: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    location: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    userType: { type: new GraphQLNonNull(GraphQLString) }
  }
});

const registerUser = {
  type: UserType,
  args: {
    input: { type: registerInput }
  },
  resolve: async (parentValue, { input }, { req, db }) => {
    const { firstName, lastName, email, password, userType } = input;

    if (!isEmail(email)) throw new Error('Invalid email address');
    if (!isLength(password, { min: 6 })) throw new Error('Password must be 6 characters or more');

    const hashedPassword = await bcrypt.hash(password, 10);

    return db.User.create({ firstName, lastName, email, password: hashedPassword, userType });
  }
};

export default registerUser;
