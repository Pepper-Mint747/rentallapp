import messages from '../../../locale/messages';

export function getPayoutStatus(item) {
    let status;
    if (item.hostTransaction && item.hostTransaction.id) {
        status = messages.completedLabel;
    } else if (item.hostFailedTransaction && item.hostFailedTransaction.id) {
        status = messages.failed;
    } else if (item.hostPayout == null && item.hostTransaction == null && item.hostFailedTransaction == null) {
        status = messages.noPayoutMethod;
    } else if (item.hostTransaction == null && item.hostFailedTransaction == null && item.reservationState == 'completed') {
        status = messages.messageStatus5;
    } else if (item.reservationState == 'cancelled' && (item.cancellationDetails.payoutToHost == 0 || item.cancellationDetails.payoutToHost < 0)) {
        status = messages.closedLabel;
    } else if (item.reservationState == 'cancelled' && item.cancellationDetails.payoutToHost > 0 && item.hostTransaction == null && item.hostFailedTransaction == null) {
        status = messages.messageStatus5;
    } else if ((item.paymentState == 'pending' || item.paymentState == 'completed') && (item.reservationState == 'approved' || item.reservationState == 'pending')) {
        status = messages.messageStatus5;
    } else if (item.reservationState === 'expired' || item.reservationState === 'declined') {
        status = messages.closedLabel;
    }

    return status;
}