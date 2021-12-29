import React, { Component } from 'react'
import PropTypes from 'prop-types';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SubnavBar.css';
import history from '../../core/history';
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// Component
import Link from '../Link';

class MenuComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }
  }

  componentDidMount() {
    if (history.location) {
      this.setState({
        location: history.location.pathname
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (history.location) {
      this.setState({
        location: history.location.pathname
      });
    }
  }

  render() {
    const { location } = this.state;
    
    return (
      <div className={cx(s.progressContainer, "hidden-xs", "hidden-print")}>
        <ul className={cx(s.navList)}>
          <li className={cx({ [s.active]: location === "/dashboard" })}>
            <Link to={"/dashboard"} className={cx(s.navItem, 'navRtl')}>
              <FormattedMessage {...messages.dashboard} />
            </Link>
          </li>

          <li className={cx({ [s.active]: location === "/inbox" })}>
            <Link to={"/inbox"} className={cx(s.navItem, 'navRtl')}>
              <FormattedMessage {...messages.inbox} />
            </Link>
          </li>
          <li className={cx({
            [s.active]: location === "/rooms" || location === "/reservation/current"
              || location === "/reservation/previous"
          })}>
            <Link to={"/rooms"} className={cx(s.navItem, 'navRtl')}>
              <FormattedMessage {...messages.yourListings} />
            </Link>
          </li>

          <li className={cx({ [s.active]: location === "/trips/current" || location === "/trips/previous" })}>
            <Link to={"/trips/current"} className={cx(s.navItem, 'navRtl')} >
              <FormattedMessage {...messages.yourTrips} />
            </Link>
          </li>
          <li className={cx({
            [s.active]: location === "/user/edit" || location === "/user/photo"
              || location === "/user/verification" || location === "/user/reviews"
          })}>
            <Link to={"/user/edit"} className={cx(s.navItem, 'navRtl')}>
              <FormattedMessage {...messages.profile} />
            </Link>
          </li>
          <li className={cx({
            [s.active]: location === "/user/payout" || location === "/user/transaction"
              || location === "/users/security"
          })}>
            <Link to={"/user/payout"} className={cx(s.navItem, 'navRtl')}>
              <FormattedMessage {...messages.account} />
            </Link>
          </li>

        </ul>
      </div>
    )
  }
}


export default withStyles(s)(MenuComponent);
