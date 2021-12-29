import { gql } from 'react-apollo';

import {
    SIDE_MENU_BLOCK_INFO_START,
    SIDE_MENU_BLOCK_INFO_SUCCESS,
    SIDE_MENU_BLOCK_INFO_ERROR
} from '../../constants';

// Redirection
import history from '../../core/history';

// Toaster
import { toastr } from 'react-redux-toastr';

const mutation = gql`
    mutation (
      $blockTitle1: String,
      $blockContent1: String,
      $blockTitle2: String,
      $blockContent2: String,
      $blockTitle3: String,
      $blockContent3: String,
      $isEnable: String
    ) {
        updateSideMenu (
        blockTitle1: $blockTitle1,
        blockContent1: $blockContent1,
        blockTitle2: $blockTitle2,
        blockContent2: $blockContent2,
        blockTitle3: $blockTitle3,
        blockContent3: $blockContent3,
        isEnable: $isEnable
      ) {
          status
      }
    }
  `;

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
  }`;

export function updateSideMenuInfo(values) {

    return async (dispatch, getState, { client }) => {

        await dispatch({ 
            type: SIDE_MENU_BLOCK_INFO_START,
        });

        let blockTitle1,
        blockContent1,
        blockTitle2,
        blockContent2,
        blockTitle3,
        blockContent3,
        isEnable;

        blockTitle1 =  values.blockTitle1,
        blockContent1 =  values.blockContent1,
        blockTitle2 = values.blockTitle2,
        blockContent2 =  values.blockContent2,
        blockTitle3 = values.blockTitle3,
        blockContent3 = values.blockContent3,
        isEnable = values.isEnable;

        try {
            
            const { data } = await client.mutate({
                mutation,
                variables: {
                    blockTitle1,
                    blockContent1,
                    blockTitle2,
                    blockContent2,
                    blockTitle3,
                    blockContent3,
                    isEnable,
                },
                refetchQueries: [{ query }]
            });
            
            if (data && data.updateSideMenu && data.updateSideMenu.status === "success") {
                toastr.success("Success!", "Changes are updated!");
                history.push('/siteadmin/static-block');
                dispatch({ 
                    type: SIDE_MENU_BLOCK_INFO_SUCCESS,
                    sideMenuInfo: data && data.updateSideMenu
                 });
            }
            else {
                toastr.error("Error", "Updating failed");
                dispatch({ type: SIDE_MENU_BLOCK_INFO_ERROR });
            }

        } catch (error) {
            dispatch({ type: SIDE_MENU_BLOCK_INFO_ERROR });
            return false;
        }
        return true;
    };
}