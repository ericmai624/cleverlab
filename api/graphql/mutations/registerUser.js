import { GraphQLString, GraphQLNonNull } from 'graphql';
import bcrypt from 'bcrypt';

import UserType from 'api/graphql/types/user';

const registerUser = {
  type: UserType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    userType: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (parentValue, args, { req, db }) => {
    const { firstName, lastName, email, password, userType } = args;
    const hashedPassword = await bcrypt.hash(password, 10);

    return db.User.create({ firstName, lastName, email, password: hashedPassword, userType });
  }
};

export default registerUser;
