import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideMenu.css';
import bt from '../../../components/commonStyle.css';
import {
  Button,
  Col,
  FormGroup
} from 'react-bootstrap';
import cx from 'classnames';

// Locale
import messages from '../../../locale/messages';

// Component 
import Link from '../../Link';
import history from '../../../core/history';

class SideMenu extends React.Component {
  static propTypes = {};

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
          <li className={cx('sideMenuBorderBottom', 'sideMenuBorderPadding', { ['menuActive']: location === "/rooms" })}>
            <Link to={'/rooms'} className={cx(s.sideNavitem, 'sideNav')}>
              <FormattedMessage {...messages.yourListings} />
            </Link>
          </li>
          <li className={cx('sideMenuBorderBottom', 'sideMenuBorderPadding', { ['menuActive']: location === "/reservation/current" })}>
            <Link to={'/reservation/current'} className={cx(s.sideNavitem, 'sideNav')}>
              <FormattedMessage {...messages.upcomingReservations} />
            </Link>
          </li>
          <li className={cx('sideMenuBorderBottom', 'sideMenuNoBorder', 'sideMenuBorderPadding', { ['menuActive']: location === "/reservation/previous" })}>
            <Link to={'/reservation/previous'} className={cx(s.sideNavitem, 'sideNav')}>
              <FormattedMessage {...messages.previousReservations} />
            </Link>
          </li>
        </ul>
        <Col xs={12} sm={11} md={12} lg={7} className={cx(s.noPadding, s.space2, s.spaceTop2)} >
          <FormGroup className={s.formGroup}>
            <Button className={cx(s.button, bt.btnPrimary, s.sideMenuBtn)} onClick={this.handleClick}>
              <FormattedMessage {...messages.addListing} />
            </Button>
          </FormGroup>
        </Col>
      </Col>
    );
  }
}

export default withStyles(s, bt)(SideMenu);