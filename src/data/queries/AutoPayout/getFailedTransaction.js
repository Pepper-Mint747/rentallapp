import ReservationType from '../../types/ReservationType';
import { Reservation } from '../../models';

import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const getFailedTransaction = {

  type: ReservationType,
  args: {
    id: { type: new NonNull(IntType) }

  },
  async resolve({ request }, { id }) {
    if (request.user.admin) {
      const getData = await Reservation.findOne({
        where: {
          id: id,
          $or: [
            {
              reservationState: 'completed'
            },
            {
              reservationState: 'cancelled'
            }
          ]
        },
        raw: true
      });
       return getData;
    } else {
      return {
        status: "notLoggedIn",
      };
    }
  }
};

export default getFailedTransaction;

/**

query getAllReservationAdmin{
  getAllReservationAdmin{
    id
    listId
    checkIn
    checkOut
    guestServiceFee
    hostServiceFee
    reservationState
        total
    messageData {
      id
    }
    listData {
      id
      title
      street
      city
      state
      country
    }
    hostData {
      profileId
      displayName
      picture
    }
    guestData {
      profileId
      displayName
      picture
    }
    status
  }
}

**/