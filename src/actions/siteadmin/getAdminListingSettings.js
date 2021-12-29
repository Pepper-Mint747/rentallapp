import { gql } from 'react-apollo';

import {
  ADMIN_LOAD_LIST_SETTINGS_START,
  ADMIN_LOAD_LIST_SETTINGS_SUCCESS,
  ADMIN_LOAD_LIST_SETTINGS_ERROR
} from '../../constants';

const query = gql`
query ($currentPage: Int,$typeId: Int) {
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
      image
  	}
	}  	
}
`;

export function getAdminListingSettings(typeId, page) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: ADMIN_LOAD_LIST_SETTINGS_START
    });

    try {
      let currentPage = page ? page : 1;
      // Send Request to get listing data for admin panel
      const { data } = await client.query({
        query,
        variables: { typeId, currentPage },
        fetchPolicy: 'network-only'
      });

      if (data && data.getAllAdminListSettings) {
        dispatch({
          type: ADMIN_LOAD_LIST_SETTINGS_SUCCESS,
          payload: {
            adminListSettingsData: data,
            currentPage
          }
        });
      } else {
        dispatch({
          type: ADMIN_LOAD_LIST_SETTINGS_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: ADMIN_LOAD_LIST_SETTINGS_ERROR,
        payload: {
          error
        }
      });
      return false;
    }
    return true;
  };
}
