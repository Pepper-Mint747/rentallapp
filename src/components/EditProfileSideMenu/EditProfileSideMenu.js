import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditProfileSideMenu.css';
import bt from '../../components/commonStyle.css';
import {
    Col
} from 'react-bootstrap';
import cx from 'classnames';

// Component
import Link from '../Link';

// Locale
import messages from '../../locale/messages';
import history from '../../core/history';

// Redux
import { connect } from 'react-redux';
class EditProfileSideMenu extends React.Component {

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
        const { userData } = this.props;
        let isVerified;
        if (userData) {
            isVerified = userData.profileId;
        }
        const { location } = this.state;

        return (
            <div>
                <ul className={cx(s.listContainer, 'sideMenuBorder', 'listLayoutArbic')}>
                    <li className={cx('sideMenuBorderBottom', 'sideMenuBorderPadding', { ['menuActive']: location === "/user/edit" })}>
                        <Link to={"/user/edit"} className={cx(s.sideNavitem, 'sideNav')}>
                            <FormattedMessage {...messages.editProfile} />
                        </Link>
                    </li>
                    <li className={cx('sideMenuBorderBottom', 'sideMenuBorderPadding', { ['menuActive']: location === "/user/photo" })}>
                        <Link to={"/user/photo"} className={cx(s.sideNavitem, 'sideNav')}>
                            <FormattedMessage {...messages.profilePhoto} />
                        </Link>
                    </li>
                    <li className={cx('sideMenuBorderBottom', 'sideMenuBorderPadding', { ['menuActive']: location === "/user/verification" })}>
                        <Link to={"/user/verification"} className={cx(s.sideNavitem, 'sideNav')}>
                            <FormattedMessage {...messages.trustAndVerification} />
                        </Link>
                    </li>
                    <li className={cx('sideMenuBorderBottom', 'sideMenuNoBorder', 'sideMenuBorderPadding', { ['menuActive']: location === "/user/reviews" })}>
                        <Link to={"/user/reviews"} className={cx(s.sideNavitem, 'sideNav')}>
                            <FormattedMessage {...messages.reviews} />
                        </Link>
                    </li>
                </ul>
                <Col xs={12} sm={12} md={12} lg={12} className={cx(s.noPadding, s.space3, s.spaceTop2)}>
                    <Link to={"/users/show/" + isVerified} className={cx(bt.noTextDecration, bt.btnPrimary, bt.btnLarge, s.displayInlineBlock)}>
                        <FormattedMessage {...messages.viewProfile} />
                    </Link>
                </Col>
            </div>
        );
    }
}

const mapState = (state) => ({
    userData: state.account.data,
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(EditProfileSideMenu)));