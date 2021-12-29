import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

//Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideMenuTrips.css';
import cx from 'classnames';

import {
  Col
} from 'react-bootstrap';

// Locale
import messages from '../../../locale/messages';

// Component
import Link from '../../Link';
import history from '../../../core/history';

class SideMenuTrips extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }
  }

  handleClick() {
    history.push('/become-a-host');
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
      <Col xs={12} sm={3} md={3} lg={3}>
        <ul className={cx(s.listContainer, 'sideMenuBorder', 'listLayoutArbic')}>
          <li className={cx('sideMenuBorderBottom', 'sideMenuBorderPadding', { ['menuActive']: location === "/trips/current" })}>
            <Link to={'/trips/current'} className={cx(s.sideNavitem, 'sideNav')}>
              <FormattedMessage {...messages.upcomingTrips} />
            </Link>
          </li>
          <li className={cx('sideMenuBorderBottom', 'sideMenuNoBorder', 'sideMenuBorderPadding', { ['menuActive']: location === "/trips/previous" })}>
            <Link to={'/trips/previous'} className={cx(s.sideNavitem, 'sideNav')}>
              <FormattedMessage {...messages.previousTrips} />
            </Link>
          </li>
        </ul>
      </Col>
    );
  }
}

export default withStyles(s)(SideMenuTrips);