import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../locale/messages';

const reservationState = [
    { type: 'pending', key: 'messageStatus5' },
    { type: 'expired', key: 'messageStatus9' },
    { type: 'approved', key: 'messageStatus4' },
    { type: 'declined', key: 'messageStatus3' },
    { type: 'completed', key: 'completedLabel' },
    { type: 'cancelled', key: 'messageStatus11' }
];

export default function formatReservationState(type) {
    let state = reservationState.find(element => element.type === type);
    if (!state || !state.key) return type;
    else return (<FormattedMessage {...messages[state.key]} />);
}