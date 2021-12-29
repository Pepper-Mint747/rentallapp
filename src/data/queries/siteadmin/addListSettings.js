import ListSettingsType from '../../types/siteadmin/AdminListSettingsType';
import { ListSettings } from '../../../data/models';

import {
  GraphQLString as StringType,
  GraphQLInt as IntType
} from 'graphql';

const addListSettings = {

  type: ListSettingsType,

  args: {
    typeId: { type: IntType },
    itemName: { type: StringType },
    itemDescription: { type: StringType },
    otherItemName: { type: StringType },
    maximum: { type: IntType },
    minimum: { type: IntType },
    startValue: { type: IntType },
    endValue: { type: IntType },
    isEnable: { type: StringType },
    image: { type: StringType }
  },

  async resolve({ request }, {
    typeId,
    itemName,
    itemDescription,
    otherItemName,
    maximum,
    minimum,
    startValue,
    endValue,
    isEnable,
    image
  }) {

    if (request.user && request.user.admin == true) {

      const insertListSettings = await ListSettings.create({
        typeId,
        itemName,
        itemDescription,
        otherItemName,
        maximum,
        minimum,
        startValue,
        endValue,
        isEnable,
        image
      });

      return {
        status: 'success'
      }
    } else {
      return {
        status: 'failed'
      }
    }
  },
};

export default addListSettings;
