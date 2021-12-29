import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import { Col } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './VerifiedInfo.css';
import cx from 'classnames';

//Images
import DoneIcon from '../../../public/SiteIcons/done-icon.png'

class AccountItem extends Component {

  static propTypes = {
    itemName: PropTypes.string.isRequired
  };

  render() {
    const { itemName } = this.props;

    return (
      <Col lg={12} md={12} sm={12} xs={12}>
        <li className={s.space2}>
          <span className={cx(s.colMiddle, s.doneIcon, 'doneIcon')}>
            <img src={DoneIcon} />
          </span>
          <span className={s.colMiddle}>
            <span>{itemName}</span>
          </span>
        </li>
      </Col>
    );
  }
}

export default withStyles(s)(AccountItem);