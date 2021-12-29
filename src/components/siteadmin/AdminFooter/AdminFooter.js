import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminFooter.css';
import cx from 'classnames';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

class AdminFooter extends Component {

    static propTypes = {
        siteName: PropTypes.string.isRequired,
    };

    render() {
        const { siteName } = this.props;
        return (
            <div className={cx(s.footerContainer, 'adminFooterAR')}>
                <FormattedMessage {...messages.copyRightLabel} /> &copy; <b>{siteName}.</b> <FormattedMessage {...messages.copyRightLabelDesc} />
            </div>
        )
    }
}

const mapState = (state) => ({
    siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(AdminFooter));