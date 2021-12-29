import React, { Component } from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';
import { formValueSelector, initialize, submit } from 'redux-form';

import {
  Row,
  Col,
  Panel,
  FormGroup,
  Button
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cancellation.css';
import bt from '../../components/commonStyle.css';

// Components
import Link from '../Link';
import Avatar from '../Avatar';
import CurrencyConverter from '../CurrencyConverter';

// Locale
import messages from '../../locale/messages';

// Images
import defaultPic from './large_no_image.jpeg';
import { cancellationGuestData } from '../../helpers/cancellationData';
class DetailsForGuest extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    reservationId: PropTypes.number.isRequired,
    confirmationCode: PropTypes.number.isRequired,
    threadId: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    listId: PropTypes.number.isRequired,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    guests: PropTypes.number.isRequired,
    profileId: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    hostEmail: PropTypes.string.isRequired,
    guestName: PropTypes.string.isRequired,
    picture: PropTypes.string,
    basePrice: PropTypes.number.isRequired,
    cleaningPrice: PropTypes.number.isRequired,
    guestServiceFee: PropTypes.number.isRequired,
    hostServiceFee: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    cancelData: PropTypes.shape({
      policyName: PropTypes.string.isRequired,
      accomodation: PropTypes.number.isRequired,
      guestFees: PropTypes.number.isRequired,
      remainingNights: PropTypes.number,
      interval: PropTypes.number.isRequired,
      nights: PropTypes.number.isRequired,
    }).isRequired,
    message: PropTypes.string,
    initialize: PropTypes.any,
    submit: PropTypes.any
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }

  async handleCancel(cancellationData) {
    const { initialize, submit } = this.props;
    await initialize('CancellationForm', cancellationData, true);
    await submit('CancellationForm');
  }

  render() {
    const { reservationId, userType, firstName, hostEmail, checkIn, checkOut, guests, title, listId, picture, profileId, guestName } = this.props;
    const { basePrice, cleaningPrice, guestServiceFee, hostServiceFee, total, currency, threadId, hostId, confirmationCode, taxRate, isSpecialPriceAverage } = this.props;
    const { cancelData, cancelData: { cancellationRuleObj: { policyName, accomodation, guestFees, remainingNights, interval, nights, priorDays, nonRefundableNights }}} = this.props;
    const { message, discount, holdeData, hostServiceFeeType, hostServiceFeeValue, base, rates, serviceFees } = this.props;

    let coverImage = holdeData && holdeData.listData && holdeData.listData.listPhotos.find(o => o.id == holdeData.listData.coverPhoto);

    let path = '/images/upload/x_medium_';
    let showImage;
    if (coverImage) {
      showImage = path + coverImage.name;
    } else if (!coverImage && holdeData.listData && holdeData.listData.listPhotos.length > 0) {
      showImage = path + (holdeData.listData && holdeData.listData.listPhotos[0].name);
    } else {
      showImage = defaultPic;
    }



    let isDisabled = true, cancellationData = {};
    let checkInDate = checkIn != null ? moment(checkIn).format('Do MMM YYYY') : '';
    let checkOutDate = checkOut != null ? moment(checkOut).format('Do MMM YYYY') : '';

    let refundableNightPrice = 0, nonRefundableNightPrice = 0, refundWithoutGuestFee = 0;
    let updatedGuestFee = 0, updatedHostFee = 0, payoutToHost = 0, subtotal = 0;

    let isCleaingPrice = 0
    if (cleaningPrice) {
      isCleaingPrice = cleaningPrice;
    } else {
      isCleaingPrice = 0;
    }

    let bookingSpecialPricing = [], isSpecialPriceAssigned = false;
    let priceForDays = 0, cancellationGuestObj = {}, finalPrice = 0;

    holdeData.bookingSpecialPricing && holdeData.bookingSpecialPricing.map((item, key) => {
      let pricingRow, currentPrice;
      if (item.blockedDates) {
        isSpecialPriceAssigned = true;
        currentPrice = Number(item.isSpecialPrice);
      } else {
        currentPrice = Number(basePrice);
      }
      pricingRow = {
        blockedDates: item,
        isSpecialPrice: currentPrice,
      };
      bookingSpecialPricing.push(pricingRow);
    })

    if (isSpecialPriceAssigned) {
      bookingSpecialPricing.map((item, index) => {
        priceForDays = Number(priceForDays) + Number(item.isSpecialPrice);
      });
    } else {
      if (interval <= 1) {
        priceForDays = Number(basePrice) * Number(nights - nonRefundableNights)
      } else {
        priceForDays = Number(basePrice) * Number(nights)
      }
    }
    finalPrice = isSpecialPriceAverage ? isSpecialPriceAverage : basePrice;    
    
    cancellationGuestObj = cancellationGuestData(remainingNights,
      nights,
      priceForDays,
      accomodation,
      isCleaingPrice,
      taxRate,
      guestServiceFee,
      guestFees,
      discount,
      hostServiceFee,
      finalPrice,
      total,
      policyName,
      interval,
      priorDays,
      nonRefundableNights,
      hostServiceFeeType, 
      hostServiceFeeValue,
      currency,
      base,
      rates,
      serviceFees
      );

    refundableNightPrice = cancellationGuestObj.refundableNightPrice;
    refundWithoutGuestFee = cancellationGuestObj.refundWithoutGuestFee;
    nonRefundableNightPrice = cancellationGuestObj.nonRefundableNightPrice;
    updatedGuestFee = cancellationGuestObj.updatedGuestFee;
    payoutToHost = cancellationGuestObj.payoutToHost;
    updatedHostFee = cancellationGuestObj.updatedHostFee;
    updatedGuestFee = cancellationGuestObj.updatedGuestFee;

    subtotal = total + guestServiceFee;


    cancellationData = {
      reservationId,
      cancellationPolicy: policyName,
      refundToGuest: refundableNightPrice,
      payoutToHost: payoutToHost,
      guestServiceFee: updatedGuestFee,
      hostServiceFee: updatedHostFee,
      total: subtotal,
      currency,
      threadId,
      cancelledBy: 'guest',
      checkIn,
      checkOut,
      guests,
      guestName,
      hostName: firstName,
      listTitle: title,
      confirmationCode,
      hostEmail,
      userType
    };
    if (message) {
      isDisabled = false;
    }

    return (
      <div>
        <Col xs={12} sm={5} md={5} lg={5} >
          <div className={s.bgCover}>
            <a href={"/rooms/" + listId} target="_blank">
              <div className={s.cancelBg} style={{ backgroundImage: `url(${showImage})` }}>
              </div>
            </a>
          </div>
          <Panel className={s.panelHeader}>
            <Row>
              <Col xs={8} sm={8} md={8} lg={8} >
                <div className={s.textTruncate}>
                  <span className={cx(s.textHigh, s.textBold)}>{firstName}</span><br />
                  <a href={"/rooms/" + listId} target="_blank">
                    {title}
                  </a>
                </div>
                <br />
                <div>
                  <span>{checkInDate} - {checkOutDate}</span>
                </div>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} className={s.textRight}>
                <div className={s.profileAvatarSection}>
                  <Avatar
                    source={picture}
                    height={65}
                    width={65}
                    title={firstName}
                    className={s.profileAvatar}
                    withLink
                    linkClassName={s.profileAvatarLink}
                    profileId={profileId}
                  />
                </div>
              </Col>
            </Row>
            <hr />
            {
              nonRefundableNightPrice > 0 && <Row>
                <Col xs={6} sm={6} md={6} lg={6} className={cx(s.textLeft, 'textAlignRightRtl')}>
                  <span className={cx(s.textHigh, s.textBold)}>
                    <FormattedMessage {...messages.nonRefundable} />
                  </span><br />
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} className={s.textRight}>
                  <span className={cx(s.textHigh, s.textBold, s.textLine)}>
                    <CurrencyConverter
                      amount={nonRefundableNightPrice}
                      from={currency}
                    />
                  </span>
                </Col>
              </Row>
            }

            {
              refundableNightPrice > 0 && <Row>
                <Col xs={6} sm={6} md={6} lg={6} className={cx(s.textLeft, 'textAlignRightRtl')}>
                  <span className={cx(s.textHigh, s.textBold)}>
                    <FormattedMessage {...messages.refundable} />
                  </span><br />
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} className={s.textRight}>
                  <span className={cx(s.textHigh, s.textBold)}>
                    <CurrencyConverter
                      amount={refundableNightPrice}
                      from={currency}
                    />
                  </span>
                </Col>
              </Row>
            }

            {refundableNightPrice > 0 && <div className={cx(s.spaceTop3)}>
              <p className={cx(s.landingStep)}><span><FormattedMessage {...messages.refundCost} /></span></p>
            </div>}
            <div className={s.cancellation}>
              <a href={'/cancellation-policies/' + policyName} target="_blank"><FormattedMessage {...messages.cancellationPolicy} />: <span className={s.greenColor}>{policyName}</span></a>
            </div>
          </Panel>
        </Col>
        <Col xs={12} sm={12} lg={12} md={12}>
          <hr className={cx(s.horizontalLineThrough, s.spaceTop4)} />
        </Col>
        <FormGroup className={s.formGroup}>
          <Col xs={12} sm={12} md={7} lg={7}>
            <Link
              className={cx(s.button, bt.btnPrimaryBorder, bt.btnLarge, s.pullLeft, s.btnWidth)}
              to={"/trips/current"}
            >
              <FormattedMessage {...messages.keepReservation} />
            </Link>
            <Button
              className={cx(s.button, bt.btnPrimary, bt.btnLarge, s.pullRight, s.btnWidth)}
              onClick={() => this.handleCancel(cancellationData)}
              disabled={isDisabled}
            >
              <FormattedMessage {...messages.cancelYourReservation} />
            </Button>
          </Col>
        </FormGroup>
      </div >
    );
  }
}

const selector = formValueSelector('CancellationForm'); // <-- same as form name

const mapState = (state) => ({
  message: selector(state, 'message'),
  serviceFees: state.book.serviceFees,
  base: state && state.currency && state.currency.base,
  rates: state && state.currency && state.currency.rates
});

const mapDispatch = {
  initialize,
  submit
};

export default withStyles(s, bt)(connect(mapState, mapDispatch)(DetailsForGuest));
