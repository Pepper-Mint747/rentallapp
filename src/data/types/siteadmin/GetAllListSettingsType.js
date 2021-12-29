import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
  GraphQLList as List,
  GraphQLString as StringType
} from 'graphql';

import ListSettingsType from '../../types/siteadmin/ListSettingsType';
import ListingSettingsType from '../../types/ListingSettingsType';


const GetAllListSettingsType = new ObjectType({
  name: 'GetAllListSettings',
  description: "This represent list data for admin management",
  fields: {
    listSettingsTypeData: {
      type: ListingSettingsType
    },
    listSettingsData: {
      type: new List(ListSettingsType),
    },
    count: {
      type: IntType
    },
    status: {
      type: IntType
    },
    errorMessage: {
      type: StringType
    }
  }
});

export default GetAllListSettingsType;
