import { GraphQLString, GraphQLObjectType, GraphQLList } from 'graphql';
import { GraphQLInt } from 'graphql/type/scalars';

const LocType = new GraphQLObjectType({
  name: 'Loc',
  description: 'Geolocation of the user to show their location on map',
  fields: {
    type: {
      type: GraphQLString,
      description: 'type of loc such as Point, Polygon, etc.'
    },
    coordinates: { type: new GraphQLList(GraphQLInt) }
  }
});

export default LocType;
