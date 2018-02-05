import { GraphQLString, GraphQLObjectType } from 'graphql';

const AuthTokenType = new GraphQLObjectType({
  name: 'AuthToken',
  fields: {
    token: { type: GraphQLString },
    errorMsg: { type: GraphQLString }
  }
});

export default AuthTokenType;
