import { GraphQLString, GraphQLObjectType, GraphQLID } from 'graphql';

const ClassType = new GraphQLObjectType({
  name: 'Class',
  fields: {
    id: {
      type: GraphQLID,
      description: 'id of a class'
    },
    name: {
      type: GraphQLString,
      description: 'name of a class'
    }
  }
});

export default ClassType;
