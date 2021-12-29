import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Row, FormGroup,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Rating.css';
import bt from '../../../components/commonStyle.css';

// Component
import ListingDetails from './ListingDetails';
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';

class RatingConfirmation extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      reviewsCount: PropTypes.number.isRequired,
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      coverPhoto: PropTypes.number,
      reviewsCount: PropTypes.number,
      reviewsStarRating: PropTypes.number,
      listPhotos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
      }))
    }),
    formatMessage: PropTypes.any,
  };

  render() {
    const { data } = this.props;
    return (
        <Row className={s.landingContainer}>
          <Col xs={12} sm={6} md={6} lg={6}>
            <h3 className={cx(s.textBold, s.landingContentTitle)}><FormattedMessage {...messages.reviewTitle} /></h3>
            <p className={s.reviewEndText}>
              <FormattedMessage {...messages.reviewTitle2} />
            </p>
            <FormGroup className={s.formGroup}>
              <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                <Link 
                  className={cx(s.button, bt.btnPrimary, bt.btnLarge, s.btn)}
                  to={"/user/reviews"}  
                >
                  <FormattedMessage {...messages.finish} />
                </Link>
              </Col>
            </FormGroup>
          </Col>
          <Col lg={6} md={6} sm={6} className={cx(s.showLg)}>
            <ListingDetails data={data} />
          </Col>
        </Row>
      );
  }
}


export default withStyles(s, bt)(RatingConfirmation);
