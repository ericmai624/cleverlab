import { GraphQLSchema, GraphQLString, GraphQLObjectType, GraphQLID } from 'graphql';

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
  }
});

const student = {
  type: StudentType,
  args: {
    id: { type: GraphQLID }
  },
  resolve: (obj, args, context) => {
    return context.db.Student.findById(args.id);
  }
};

export default student;