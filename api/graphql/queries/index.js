import student from './student';
import { GraphQLObjectType } from 'graphql';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    student
  }
});

export default query;