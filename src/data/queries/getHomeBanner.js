import HomeBannerType from '../types/HomeBannerType';
import { HomeBanner } from '../models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import sequelize from '../sequelize';

const getHomeBanner = {

  type: new List(HomeBannerType),
  
  args: {
    userType: { type: StringType }
  },

  async resolve({ request }, { userType }) {

    let data;
    if(userType == 'admin'){
      data = await HomeBanner.findAll({
        attributes: ['id', 'name', 'enable']
      });
    } else {
      data = await HomeBanner.findAll({
        attributes: ['id', 'name', 'enable'],
        order: [[sequelize.literal('RAND()')]],
        limit: 3
      });
    }
    return data;

  }
};

export default getHomeBanner;
