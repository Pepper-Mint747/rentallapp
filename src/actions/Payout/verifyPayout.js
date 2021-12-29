import {
  VERIFY_PAYOUT_START,
  VERIFY_PAYOUT_SUCCESS,
  VERIFY_PAYOUT_ERROR, 
} from '../../constants';

// Stripe
import { processStripePayment } from '../../core/payment/stripe/processStripePayment';

import { setLoaderStart, setLoaderComplete } from '../loader/loader';

import {toastr} from 'react-redux-toastr';

export function verifyPayout(currentAccountId, userId) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: VERIFY_PAYOUT_START,
    });

    await dispatch(setLoaderStart('payoutVerify'));

    try {
      let userDetails = {
        currentAccountId,
        userId
      };
      
      const { status, errorMessage } = await processStripePayment(
        'verifyPayout',
        userDetails
      );
      

      if(status && status === 200) {
        await dispatch({
          type: VERIFY_PAYOUT_SUCCESS,
          payload: {
            status
          }
        });
      } else {
        toastr.error('Error', errorMessage);
        
        dispatch({
          type: VERIFY_PAYOUT_ERROR,
          payload: {
            error: errorMessage
          }
        });
        
        
      }
    } catch (error) {
        dispatch({
          type: VERIFY_PAYOUT_ERROR,
          payload: {
            error
          }
        });

        await dispatch(setLoaderComplete('payoutVerify'));
      return false;
    }

    return true;
  };
}
