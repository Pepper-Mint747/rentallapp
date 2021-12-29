// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Style
import { ProgressBar } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TabBarStep1.css';

// Locale
import messages from '../../locale/messages';

class TabBarStep1 extends Component {

  static propTypes = {
    nextPage: PropTypes.any,
    formatMessage: PropTypes.any,
  };

  render() {
    const { nextPage, formPage } = this.props;
    const { formatMessage } = this.props.intl;
    let pathname = formPage;

    return (
      <div className={cx(s.progressContainer, 'hidden-xs')}>
        <div
          className={cx(s.textTrunck, s.progressSection, s.progressStyle,
            { [s.active]: pathname === "room" })}
          title={formatMessage(messages.tabPlaceType)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("room")} href="javascript:void(0);">
            <FormattedMessage {...messages.tabPlaceType} />
          </a>
        </div>
        <div
          className={cx(s.textTrunck, s.progressSection,
            s.progressStyle, { [s.active]: pathname === "bedrooms" })}
          title={formatMessage(messages.bedrooms)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("bedrooms")} href="javascript:void(0);">
            <FormattedMessage {...messages.bedrooms} />
          </a>
        </div>
        <div
          className={cx(s.textTrunck, s.progressSection, s.progressStyle,
            { [s.active]: pathname === "bathrooms" })}
          title={formatMessage(messages.baths)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("bathrooms")} href="javascript:void(0);">
            <FormattedMessage {...messages.baths} />
          </a>
        </div>
        <div
          className={cx(s.textTrunck, s.progressSection, s.progressStyle,
            { [s.active]: pathname === "map" })}
          title={formatMessage(messages.location)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("map")} href="javascript:void(0);">
            <FormattedMessage {...messages.location} />
          </a>
        </div>
        <div
          className={cx(s.textTrunck, s.progressSection, s.progressStyle,
            { [s.active]: pathname === "amenities" })}
          title={formatMessage(messages.aminities)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("amenities")} href="javascript:void(0);">
            <FormattedMessage {...messages.aminities} />
          </a>
        </div>

        <div
          className={cx(s.textTrunck, s.progressSection, s.progressStyle,
            { [s.active]: pathname === "spaces" })}
          title={formatMessage(messages.sharedSpaces)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("spaces")} href="javascript:void(0);">
            <FormattedMessage {...messages.sharedSpaces} />
          </a>
        </div>
        <div>
          <ProgressBar className={s.leanProgress} />
        </div>
      </div>
    );
  }

}

export default injectIntl(withStyles(s)(TabBarStep1));

