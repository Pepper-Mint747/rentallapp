import { gql } from 'react-apollo';

import {
  SIDE_MENU_BLOCK_INFO_START,
  SIDE_MENU_BLOCK_INFO_SUCCESS,
  SIDE_MENU_BLOCK_INFO_ERROR
} from '../../constants';

const query = gql`
  query {
    getSideMenu {
          title
          description
          name
          page
          step
          isEnable
    }
  }
`;

export function getSideMenu() {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SIDE_MENU_BLOCK_INFO_START,
    });

    try {
      let settingsData = {};
      const { data } = await client.query({
        query,
        fetchPolicy: 'network-only'
      });
      if (data && data.getSideMenu) {
        // Successully logged out
        dispatch({
          type: SIDE_MENU_BLOCK_INFO_SUCCESS,
          payload: {
            sideMenu: data.getSideMenu
          }
        });

      } else {
        dispatch({
          type: SIDE_MENU_BLOCK_INFO_ERROR,
        });
      }
    } catch (error) {
      dispatch({
        type: SIDE_MENU_BLOCK_INFO_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
