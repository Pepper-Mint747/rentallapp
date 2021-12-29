import React from 'react';
import PropTypes from 'prop-types';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminNavigation.css';
import {
  Nav
} from 'react-bootstrap';
// Redux
import { connect } from 'react-redux';
import { openHeaderModal } from '../../../actions/modalActions';
import { formatLocale } from '../../../helpers/formatLocale';

// Internal Components
import NavLink from '../../NavLink';
import Logout from '../../Logout';
import HeaderModal from '../../HeaderModal';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

//local
import languageIcon from '../../../../public/languageIcon.svg'
class AdminNavigation extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { openHeaderModal, currentLocale } = this.props;
    return (
      <Nav pullRight className='pullLeftHeaderAR'>
        <NavLink
          noLink
          onClick={(e) => openHeaderModal('languageModal')}
          className={s.mozCss}
        >
          <span><img src={languageIcon} className={cx(s.languageIcon, 'languageIconRTL')}/></span>
          <span>{formatLocale(currentLocale)}</span>
        </NavLink>
        <NavLink to="/" >
          <FormattedMessage {...messages.goToMainSite} />
        </NavLink>
        <Logout />
        <HeaderModal modalType={'languageModal'} />
      </Nav>
    );
  }

}
const mapState = state => ({
  currentLocale: state.intl.locale
});
const mapDispatch = {
  openHeaderModal
};
export default withStyles(s)(connect(mapState, mapDispatch)(AdminNavigation));
