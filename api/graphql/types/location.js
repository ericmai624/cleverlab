import { GraphQLObjectType } from 'graphql';
import { GraphQLString } from 'graphql/type/scalars';

import LocType from './loc';

const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: {
    country: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    province: { type: GraphQLString },
    zip: { type: GraphQLString },
    loc: {
      type: LocType,
      description: 'Geolocation of the user'
    }
  }
});

export default LocationType;