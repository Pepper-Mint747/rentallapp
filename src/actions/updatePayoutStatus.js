import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';

import {
    SET_PAYOUT_STATUS_START,
    SET_PAYOUT_STATUS_SUCCESS,
    SET_PAYOUT_STATUS_ERROR
} from '../constants';

export function updatePayoutStatus(id, isHold) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: SET_PAYOUT_STATUS_START
        });
        try {
            let mutation = gql`
            mutation updatePayoutStatus ($id: Int!, $isHold: Boolean!){
                updatePayoutStatus(id: $id, isHold: $isHold){
                    status
                    errorMessage
                }
              }
            `;

            const { data } = await client.mutate({
                mutation,
                variables: {
                    id,
                    isHold
                }
            });

            if(data && data.updatePayoutStatus && data.updatePayoutStatus.status == '200') {
                dispatch({
                    type: SET_PAYOUT_STATUS_SUCCESS
                });
                toastr.success("Success!", "Hold payout status has changed");
                return true;
            } else {
                dispatch({
                    type: SET_PAYOUT_STATUS_ERROR
                });
                toastr.error("Error", "Failed to change hold payout status");
            }
        } catch(error) {
            dispatch({
                type: SET_PAYOUT_STATUS_ERROR
            });
            toastr.error("Error", "Failed to change hold payout status");
        }
    }
}