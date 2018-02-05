import { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLBoolean, GraphQLInt } from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { 
      type: GraphQLID,
      resolve: user => user._id
    },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    location: { type: GraphQLString },
    emailVerified: { type: GraphQLBoolean },
    userType: { 
      type: GraphQLString,
      description: 'defines whether a user is student or teacher' 
    },
    lastLogin: { type: GraphQLString },
    loginCounts: { type: GraphQLInt },
    /*
    activeClasses: Array,
    archievedClasses: Array,
    resetPasswordExpires: Date,
    resetPasswordToken: String
    */
  }
});

export default UserType;
