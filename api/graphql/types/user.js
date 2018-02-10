import { GraphQLString, GraphQLObjectType, GraphQLID, GraphQLBoolean, GraphQLInt } from 'graphql';
import LocationType from './location';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { 
      type: GraphQLID,
      resolve: user => user._id
    },
    firstName: { type: GraphQLString },
    familyName: { type: GraphQLString },
    email: { type: GraphQLString },
    emailVerified: { type: GraphQLBoolean },
    location: { 
      type: LocationType,
      description: 'where the user is located'
    },
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
