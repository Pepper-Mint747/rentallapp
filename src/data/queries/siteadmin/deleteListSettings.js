import {
  GraphQLInt as IntType,
} from 'graphql';

import {
  ListSettings,
  UserListingData,
  UserAmenities,
  UserHouseRules,
  UserSafetyAmenities,
  UserSpaces
} from '../../../data/models';

import ListSettingsType from '../../types/siteadmin/AdminListSettingsType';

import checkListSettingsActivity from '../../../helpers/checkListSettingsActivity';

const deleteListSettings = {

  type: ListSettingsType,

  args: {
    id: { type: IntType },
    typeId: { type: IntType }
  },

  async resolve({ request }, { id, typeId }) {
    if (request.user && request.user.admin == true) {
      let isListSettingsDeleted = false;

      const status = await checkListSettingsActivity(typeId, id);

      if (status) {
        return {
          status
        };
      }

      const removeListSettings = await ListSettings.destroy({
        where: {
          id
        }
      })
        .then(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isListSettingsDeleted = true;
          }
        });

      if (isListSettingsDeleted) {
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

export default deleteListSettings;
