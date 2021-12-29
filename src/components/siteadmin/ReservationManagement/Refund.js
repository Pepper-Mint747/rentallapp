import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReservationManagement.css';
// Redux Action
import { openReservationModal } from '../../../actions/Reservation/payoutModal';
import { injectIntl } from 'react-intl';

// Translation
import messages from '../../../locale/messages';

class Refund extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    loading: PropTypes.bool,
    reservationId: PropTypes.number,
    reservationState: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    openReservationModal: PropTypes.any.isRequired,
    transactionData: PropTypes.shape({
      payerEmail: PropTypes.string.isRequired,
      paymentType: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      paymentMethodId: PropTypes.number,
      transactionId: PropTypes.string.isRequired
    }),
    refundData: PropTypes.shape({
      id: PropTypes.number.isRequired,
      receiverEmail: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired
    }),
    cancelData: PropTypes.shape({
      refundToGuest: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    transactionData: null,
    refundData: null,
    cancelData: null
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { id, transactionData, openReservationModal, reservationState, cancelData } = this.props;
    const formName = 'ReservationPaymentForm';
    let amount = transactionData.total;
    let currency = transactionData.currency;
    if (reservationState === 'cancelled' && cancelData) {
      amount = cancelData.refundToGuest;
      currency = cancelData.currency;
    }

    const initialData = {
      type: 'guest',
      reservationId: id,
      receiverEmail: transactionData.payerEmail,
      receiverId: transactionData.payerId,
      payerEmail: transactionData.receiverEmail,
      payerId: transactionData.receiverId,
      amount,
      currency,
      paymentMethodId: transactionData.paymentMethodId,
      transactionId: transactionData.transactionId
    };
    openReservationModal(formName, initialData);
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { id, transactionData, refundData, reservationState, cancelData } = this.props;
    const { openReservationModal, loading, reservationId, completed } = this.props;
    let amountPaytoGuest = 0;


    if (cancelData) {
      amountPaytoGuest = cancelData.refundToGuest;
    }
    if (transactionData === null || transactionData === undefined) {
      return <span>{formatMessage(messages.transactionNotfound)}</span>;
    }

    if (reservationState === 'expired' || reservationState === 'cancelled' || reservationState === 'declined') {

      if (reservationState === 'cancelled' && amountPaytoGuest === 0) {
        return <span>{formatMessage(messages.notEligible)}</span>;
      }

      if (loading && reservationId === id) {
        return <span className={s.processingtext}>{formatMessage(messages.processingLabel)}</span>;
      }

      if ((refundData != null && refundData.id != undefined) || (completed && reservationId === id)) {
        return <span>{formatMessage(messages.completedLabel)}</span>;
      }

      return (
        <div>
          <a onClick={this.handleClick}> {formatMessage(messages.proceedRefund)} </a>
        </div>
      );
    } else {
      return <span>{formatMessage(messages.notEligible)}</span>
    }

  }
}


const mapState = (state) => ({
  loading: state.reservation.refundLoading,
  reservationId: state.reservation.reservationId,
  completed: state.reservation.refundCompleted
});

const mapDispatch = {
  openReservationModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Refund)));