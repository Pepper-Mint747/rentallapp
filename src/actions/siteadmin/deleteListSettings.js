import { gql } from 'react-apollo';

import {
  DELETE_LIST_SETTINGS_START,
  DELETE_LIST_SETTINGS_SUCCESS,
  DELETE_LIST_SETTINGS_ERROR,
  CLOSE_LIST_SETTINGS_MODAL
} from '../../constants';
import { getAdminListingSettings } from './getAdminListingSettings';

// Toaster
import { toastr } from 'react-redux-toastr';

const query = gql`
  query($id:Int, $typeId: Int) {
    deleteListSettings(id: $id, typeId: $typeId){
      status
      }
    }
  `;

export function deleteListSettings(id, typeId) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: DELETE_LIST_SETTINGS_START,
    });

    try {

      const { data } = await client.query({
        query,
        variables: { id, typeId },
        fetchPolicy: 'network-only'
      });

      if (data.deleteListSettings) {
        if (data.deleteListSettings.status === "success") {
          dispatch({
            type: CLOSE_LIST_SETTINGS_MODAL,
          });
  
          dispatch({
            type: DELETE_LIST_SETTINGS_SUCCESS,
          });
  
          toastr.success('Delete Setting Success', "Setting is deleted successfully");
  
          dispatch(getAdminListingSettings(typeId));
        } else {
          if(data.deleteListSettings.status === "unableToDisable") {
            toastr.error("Update List Settings", "Unable to delete the list setting. At least, one list setting should be available for the properties.");
          } else if(data.deleteListSettings.status === "listingUsed") {
            toastr.error("Update List Settings", "Unable to delete the list setting. The list setting is using on the property. Please remove the list setting on the properties and try again.");
          } else {
            toastr.error("Update List Settings", "Oops! Something went wrong. Please try again.");
            dispatch({
              type: CLOSE_LIST_SETTINGS_MODAL,
            });
          }

          dispatch({
            type: DELETE_LIST_SETTINGS_ERROR,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: DELETE_LIST_SETTINGS_ERROR,
        payload: {
          error
        }
      });
    }
  };
}
