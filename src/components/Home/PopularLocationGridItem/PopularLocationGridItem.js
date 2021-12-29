import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PopularLocationGridItem.css';
import {  Col } from 'react-bootstrap';
import cx from 'classnames';
import { injectIntl } from 'react-intl';

// Component
import Link from '../../Link';

class PopularLocationGridItem extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.func,
    id: PropTypes.number,
    location: PropTypes.string,
    locationAddress: PropTypes.string,
    image: PropTypes.string,
  };

  render() {
    const { id, key, location, locationAddress, image, path } = this.props;

    // let path = key == 2 ? '/images/popularLocation/medium_' + image : '/images/popularLocation/large_' + image;
    return (
      <Col sm={12} className={cx(s.GridCol, 'GridColAr')}>
        <Link className={s.GridColZoom} to={'/s?&address=' + locationAddress + '&chosen=1'}>
          <div className={cx(s.GridWrap)} style={{ backgroundImage: `url(${path})` }}></div>
          <div className={s.placeWrap}>{location}</div>
        </Link>
      </Col>

    );
  }
}

export default injectIntl(withStyles(s)(PopularLocationGridItem));
