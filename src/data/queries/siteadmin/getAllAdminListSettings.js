import GetAllListSettingsType from '../../types/siteadmin/GetAllListSettingsType';
import { ListSettingsTypes, ListSettings } from '../../../data/models';

import {
  GraphQLInt as IntType,
} from 'graphql';

const getAllAdminListSettings = {

  type: GetAllListSettingsType,

  args: {
    typeId: { type: IntType },
    currentPage: { type: IntType }
  },

  async resolve({ request }, { typeId, currentPage }) {
    try {
      if (request.user && request.user.admin == true) {
        let offset = 0, limit = 10;

        if (currentPage) {
          offset = (currentPage - 1) * limit;
        }

        const listSettingsTypeData = await ListSettingsTypes.findOne({
          attributes: ['id', 'typeName', 'fieldType', 'typeLabel', 'isMultiValue'],
          where: {
            id: typeId
          }
        });

        const listSettingsData = await ListSettings.findAll({
          where: {
            typeId
          },
          limit,
          offset,
          order: [['updatedAt', 'DESC']]
        });

        const count = await ListSettings.count({ where: { typeId } });

        if (!listSettingsData) {
          return {
            status: 400,
            errorMessage: "Oops! Unable to find the list settings. Please try again."
          }
        }

        return {
          listSettingsTypeData,
          listSettingsData,
          count,
          status: 200
        };
      } else {
        return {
          status: 500,
          errorMessage: "Oops! Please login as an admin user and try again."
        }
      }
    } catch (error) {
      return {
        status: 400,
        errorMessage: 'Oops! Something gone wrong! ' + error
      }
    }
  }
};

export default getAllAdminListSettings;

/*

query getAllAdminListSettings($currentPage: Int,$typeId: Int) {
	getAllAdminListSettings(currentPage: $currentPage,typeId: $typeId){
    status
    errorMessage
    listSettingsTypeData {
      id
      typeName
      typeLabel
      fieldType
    }
    count
    listSettingsData {
      id
      typeId
      itemName
      itemDescription
      otherItemName
      startValue
      endValue
      maximum
      minimum
      isEnable
  	}
	}  	
}

*/
