import ListSettingsType from '../../types/siteadmin/AdminListSettingsType';
import { ListSettings } from '../../../data/models';

import {
  GraphQLString as StringType,
  GraphQLInt as IntType
} from 'graphql';

import checkListSettingsActivity from '../../../helpers/checkListSettingsActivity';

const updateListSettings = {

  type: ListSettingsType,

  args: {
    id: { type: IntType },
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
    id,
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
      let isListSettingsUpdated = false;

      if (Number(isEnable) === 0) { 
        const status = await checkListSettingsActivity(typeId, id);
        if (status) {
          return {
            status
          };
        }
      }

      const modifyListSettings = await ListSettings.update(
        {
          itemName,
          itemDescription,
          otherItemName,
          maximum,
          minimum,
          startValue,
          endValue,
          isEnable,
          image
        },
        {
          where: {
            id,
            typeId
          }
        }
      )
        .then(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isListSettingsUpdated = true;
          }
        });

      if (isListSettingsUpdated) {
        return {
          status: 'success'
        }
      } else {
        return {
          status: 'failed'
        }
      }
    } else {
      return {
        status: 'failed'
      }
    }
  },
};

export default updateListSettings;
