import { gql } from 'react-apollo';
import {
    CHECK_LISTING_START,
    CHECK_LISTING_SUCCESS,
    CHECK_LISTING_ERROR
} from '../../constants';

const query = gql`
    query($id: Int!, $type: String) {
        checkListing(id: $id, type: $type) {
            status
        }
    }
`;

export function checkListing(id, type) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: CHECK_LISTING_START,
        });

        try {

            const { data } = await client.query({
                query,
                variables: { id, type },
                fetchPolicy: 'network-only'
            })

            if (data.checkListing.status === '200') {
                dispatch({
                    type: CHECK_LISTING_SUCCESS,
                });
                return await true;
            } else {
                dispatch({
                    type: CHECK_LISTING_ERROR,
                });
                return await false;
            }

        } catch (error) {
            dispatch({
                type: CHECK_LISTING_ERROR,
            });
            return await false;
        }
    }
}