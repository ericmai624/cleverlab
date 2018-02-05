import { GraphQLString, GraphQLNonNull } from 'graphql';
import bcrypt from 'bcrypt';

import UserType from 'api/graphql/types/user';

const login = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  resolve: async (parentValue, args, { req, db }) => {
    const { email, password } = args;

    const student = await db.User.findOne({ email });
    const isValidPassword = await bcrypt.compare(password, student.password);
  }
};
