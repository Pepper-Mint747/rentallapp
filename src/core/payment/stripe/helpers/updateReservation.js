import { Reservation } from '../../../../data/models';

export async function updateReservation(id, confirmPaymentIntentId) {
    const reservation = await Reservation.update({
        paymentState: 'completed',
        paymentIntentId: confirmPaymentIntentId
    },
        {
            where: {
                id
            }
        });

    if (reservation) {
        return {
            status: 'updated'
        };
    } else {
        return {
            status: 'failed to update the reservation'
        }
    }
}

export async function updateRemainingPaymentStatus(id) {
    const reservation = await Reservation.update({
        remainingPaymentStatus: 'completed',
    },
        {
            where: {
                id
            }
        });

    if (reservation) {
        return {
            status: 'updated'
        };
    } else {
        return {
            status: 'failed to update the reservation'
        }
    }
}