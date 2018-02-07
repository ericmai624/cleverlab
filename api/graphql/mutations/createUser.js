import bcrypt from 'bcrypt';
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
  resolve: async (parentValue, { input }, { req, db }) => {
    console.log('Creating user with input: ', input);
    
    const { firstName, familyName, email, password, userType } = input;

    if (!isEmail(email)) throw new Error('Invalid email address');
    if (!isLength(password, { min: 6 })) throw new Error('Password must be 6 characters or more');

    const hashedPassword = await bcrypt.hash(password, 10);

    return db.User.create({ firstName, familyName, email, password: hashedPassword, userType });
  }
};

export default createUser;
