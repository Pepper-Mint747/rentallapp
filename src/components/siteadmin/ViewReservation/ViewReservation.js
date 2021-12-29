import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import {
    Table
} from 'react-bootstrap';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewReservation.css';
import bt from '../../../components/commonStyle.css';

// Components
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import ModalForm from '../ReservationManagement/ModalForm';
// Redux Action
import { viewReceiptAdmin } from '../../../actions/Reservation/viewReceiptAdmin';
import HostServiceFee from './HostServiceFee';
import { decode } from '../../../helpers/queryEncryption';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

class ViewReservation extends React.Component {
    static propTypes = {
        data: PropTypes.shape({
            id: PropTypes.number.isRequired,
            listId: PropTypes.number.isRequired,
            hostId: PropTypes.string.isRequired,
            guestId: PropTypes.string.isRequired,
            checkIn: PropTypes.string.isRequired,
            checkOut: PropTypes.string.isRequired,
            guestServiceFee: PropTypes.number.isRequired,
            hostServiceFee: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            reservationState: PropTypes.string.isRequired,
            listData: PropTypes.shape({
                title: PropTypes.string.isRequired
            }),
            hostData: PropTypes.shape({
                profileId: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired
            }),
            hostPayout: PropTypes.shape({
                id: PropTypes.number.isRequired,
                payEmail: PropTypes.string.isRequired
            }),
            hostTransaction: PropTypes.shape({
                id: PropTypes.number.isRequired,
            }),
            guestData: PropTypes.shape({
                profileId: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired
            }),
            transaction: PropTypes.shape({
                payerEmail: PropTypes.string.isRequired,
                paymentType: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }),
            refundStatus: PropTypes.shape({
                id: PropTypes.number.isRequired,
                receiverEmail: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }),
            cancellationDetails: PropTypes.shape({
                refundToGuest: PropTypes.number.isRequired,
                payoutToHost: PropTypes.number.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired,
                guestServiceFee: PropTypes.number.isRequired,
                hostServiceFee: PropTypes.number.isRequired,
                cancellationPolicy: PropTypes.string,
                cancelledBy: PropTypes.string,
            }),
        }),
        viewReceiptAdmin: PropTypes.any.isRequired,
    };
    static defaultProps = {
        data: []
    };
    componentWillReceiveProps(nextProps) {
        const { completed, loading } = nextProps;
        const { refetch } = this.props;
        if (completed && !loading) {
            refetch();
        }
    }
    render() {
        const { type, data, data: { listData, cancellationDetails, transaction } } = this.props;
        let subTotal;
        if (data) {
            subTotal = data.total + data.guestServiceFee;
        }
        let amountPaytoGuest = 0;
        let amountPaytoHost = 0;
        let guestFee = 0;
        if (cancellationDetails) {
            amountPaytoGuest = cancellationDetails.refundToGuest;
            amountPaytoHost = cancellationDetails.payoutToHost;
            guestFee = cancellationDetails.guestServiceFee;
        } else if (data) {
            amountPaytoHost = Number(data.total) - Number(data.hostServiceFee);
            guestFee = data.guestServiceFee;
        }

        if (data && (data.reservationState == 'expired' || data.reservationState == 'declined')) {
            guestFee = 0;
        }
        let nextDay = moment(data.checkIn).add(1, 'days');
        let today = moment();
        let dayDifference = nextDay.diff(today, 'days');

        let booktype, reservestate;
        if (data) {
            reservestate = data.reservationState;
        }
        if (listData) {
            booktype = data.bookingType;
        }
        let Guestname, Hostname, reservationStatus, bookingType;
        if (data && data.guestData) {
            Guestname = data.guestData.firstName + " " + data.guestData.lastName;
        }
        if (data && data.hostData) {
            Hostname = data.hostData.firstName + " " + data.hostData.lastName;

        }
        if (reservestate) {
            reservationStatus = reservestate.charAt(0).toUpperCase() + reservestate.slice(1);
        }
        if (booktype) {
            bookingType = booktype.charAt(0).toUpperCase() + booktype.slice(1);
        }
        const gobackcss = { padding: '10px' };

        let taxRate = data && data.taxRate && data.taxRate > 0 ? data.taxRate : 0

        let url = type === 'reservation' ? '/siteadmin/reservations' : '/siteadmin/payout';
        let titleMessageKey = type === 'reservation' ? 'reservationDetails' : 'payoutDetails';
        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <ModalForm />
                <div>
                    <h1 className={s.headerTitle}><FormattedMessage {...messages[titleMessageKey]} /></h1>
                    <div className={cx(s.space4, bt.textAlignRight, 'textAlignLeftRtl')}>
                        <Link to={url} className={cx(bt.btnPrimaryBorder, bt.btnLarge, bt.noTextDecoration, bt.btnPrimaryLink)}>
                            <FormattedMessage {...messages.goBack} />
                        </Link>
                    </div>
                    <div className={s.profileViewMain}>
                        {
                            data && data.id && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.reservationId} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  {data.id}  </span>
                            </div>
                        }
                        {
                            data && data.confirmationCode && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}> <FormattedMessage {...messages.confirmationCode} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  {data.confirmationCode}  </span>
                            </div>
                        }
                        {
                            reservationStatus && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.reservationStatus} />   </span>
                                <span className={cx(s.profileViewMainContent)}> {reservationStatus}  </span>
                            </div>
                        }
                        {
                            data && data.cancellationDetails && data.cancellationDetails.cancellationPolicy && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.cancellationPolicy} />   </span>
                                <span className={cx(s.profileViewMainContent)}> {data.cancellationDetails.cancellationPolicy}  </span>
                            </div>
                        }
                        {
                            data && data.cancellationDetails && data.cancellationDetails.cancelledBy && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.cancelledLabel} />   </span>
                                <span className={cx(s.profileViewMainContent, s.capitalize)}> {data.cancellationDetails.cancelledBy}  </span>
                            </div>
                        }
                        {
                            data && data.listData && data.listData.id && data.listData.title && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.titleLabel} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <a href={"/rooms/" + data.listData.id} target="_blank"> {data.listData.title}  </a>  </span>
                            </div>
                        }
                        {
                            data && data.checkIn && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.checkIn} />   </span>
                                <span className={cx(s.profileViewMainContent)}> {moment(data.checkIn).format("Do MMMM YYYY")}  </span>
                            </div>
                        }
                        {
                            data && data.checkOut && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.checkOut} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  {moment(data.checkOut).format("Do MMMM YYYY")}  </span>
                            </div>
                        }
                        {
                            bookingType && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.bookingType} />  </span>
                                <span className={cx(s.profileViewMainContent)}>  {bookingType}  </span>
                            </div>
                        }
                        {
                            data && (subTotal == 0 || subTotal > 0) && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.amountPaid} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <CurrencyConverter amount={subTotal} from={data.currency} />  </span>
                            </div>
                        }
                        {/* {
                                    data && (data.guestServiceFee == 0 || data.guestServiceFee > 0) && !cancellationDetails && <tr>
                                        <td>  Guest Service Fee   </span>
                                        <td>  <CurrencyConverter amount={data.guestServiceFee} from={data.currency} />  </span>
                                    </tr>
                                } */}
                        {/* { taxRate > 0 &&
                                <tr>
                                    <td>  Tax Rate   </span>
                                    <td>  <CurrencyConverter amount={taxRate} from={data.currency} />  </span>
                                 </tr>
                               } */}
                        <div className={s.profileViewInner}>
                            <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.guestServiceFee} />   </span>
                            <span className={cx(s.profileViewMainContent)}>  <CurrencyConverter amount={guestFee} from={data.currency} />  </span>
                        </div>
                        {
                            data && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.hostServiceFeeType} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <HostServiceFee
                                    hostId={data.hostId}
                                    checkIn={data.checkIn}
                                    id={data.id}
                                    hostPayout={data.hostPayout}
                                    amount={data.total}
                                    currency={data.currency}
                                    hostTransaction={data.hostTransaction}
                                    reservationState={data.reservationState}
                                    cancelData={data.cancellationDetails}
                                    hostServiceFee={data.hostServiceFee}
                                /> </span>
                            </div>
                        }
                        {
                            data && data.guestData && data.guestData.profileId && Guestname && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.guestName} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <a href={"/users/show/" + data.guestData.profileId} target="_blank"> {Guestname}   </a>  </span>
                            </div>
                        }
                        {
                            data && data.guestData && data.guestData.phoneNumber && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.guestPhoneNumber} />    </span>
                                <span className={cx(s.profileViewMainContent)}> {decode(data.guestData.phoneNumber)}  </span>
                            </div>
                        }
                        {
                            data && data.guestUser && data.guestUser.email && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}> <FormattedMessage {...messages.guestEmail} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  {data.guestUser.email}  </span>
                            </div>
                        }
                        {
                            data && data.hostData && data.hostData.profileId && Hostname && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.hostName} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <a href={"/users/show/" + data.hostData.profileId} target="_blank"> {Hostname}   </a> </span>
                            </div>
                        }
                        {
                            data && data.hostData && data.hostData.phoneNumber && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}> <FormattedMessage {...messages.hostPhoneNumber} />   </span>
                                <span className={cx(s.profileViewMainContent)}> {decode(data.hostData.phoneNumber)} </span>
                            </div>
                        }
                        {
                            data && data.hostUser && data.hostUser.email && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.hostEmail} /> </span>
                                <span className={cx(s.profileViewMainContent)}> {data.hostUser.email} </span>
                            </div>
                        }
                        {
                            data && data.cancellationDetails && data.cancellationDetails.createdAt && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.cancelDate} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  {moment(data.cancellationDetails.createdAt).format("Do MMMM YYYY")}  </span>
                            </div>
                        }
                        {
                            data && cancellationDetails && (cancellationDetails.refundToGuest == 0 || cancellationDetails.refundToGuest > 0) && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.refundAmount} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <CurrencyConverter amount={cancellationDetails.refundToGuest}
                                    from={data.currency} />  </span>
                            </div>
                        }
                        {
                            data && !cancellationDetails && (data.reservationState == 'expired' || data.reservationState == 'declined') && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.refundAmount} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <CurrencyConverter amount={subTotal}
                                    from={data.currency} />  </span>
                            </div>
                        }
                        {
                            data && (data.reservationState == 'approved' || data.reservationState == 'completed' || data.reservationState == 'cancelled') && <div className={s.lastviewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.payoutLabel} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <CurrencyConverter amount={amountPaytoHost}
                                    from={data.currency} />
                                </span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

}
const mapState = (state) => ({
    completed: state.reservation.completed,
    loading: state.reservation.loading,
});
const mapDispatch = {
    viewReceiptAdmin,
};
export default withStyles(s, bt)(connect(mapState, mapDispatch)(ViewReservation));