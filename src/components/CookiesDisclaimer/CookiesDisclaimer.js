// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies'
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

// Bootstrap
import {
  Button,
  Grid
} from 'react-bootstrap';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CookiesDisclaimer.css';
import bt from '../../components/commonStyle.css';

// Locale
import messages from '../../locale/messages';
import { url } from '../../config';
class CookiesDisclaimer extends Component {

  static propTypes = {
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isCookiesSet: false,
      isPageLoad: false,
    }
    this.disclamierForm = this.disclamierForm.bind(this);
  }

  componentWillMount() {
    let cookiesValue = cookie.load('cookiesDisclaimer');
    this.setState({
      isCookiesSet: (cookiesValue) ? true : false
    });
  }

  componentDidMount() {
    let cookiesValue = cookie.load('cookiesDisclaimer');
    this.setState({
      isCookiesSet: (cookiesValue) ? true : false,
      isPageLoad: true
    });
  }

  disclamierForm() {
    let maxAge = 3650 * 24 * 365;
    cookie.save('cookiesDisclaimer', 'RentallDisclaimer', {
      path: '/',
      maxAge
    })
    this.setState({ isCookiesSet: true })
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { isCookiesSet, isPageLoad } = this.state;
    const { siteName } = this.props;

    if (isCookiesSet) {
      return <span />;
    } else {
      return (
        <Grid fluid>
          {
            isPageLoad && <div
              className={cx(s.root, s.container, s.fixedPosition)}
            >
              <div className={cx(s.cookiesBackground)}>
                <div>
                  <div className={cx(s.displayTable, s.displayTableSection)}>
                    <div className={s.displayRow}>
                      <div className={s.displayText}>
                        <span className={cx(s.labelText)}>
                          {siteName}{' '}
                          {formatMessage(messages.cookiesDisclaimer)}
                          {' '}
                          <a
                            href={url + '/cookie-policy'}
                            className={cx(s.labelText, s.linkStyle)}
                          >
                            {formatMessage(messages.cookiePolicy)}
                          </a>
                        </span>
                      </div>

                      <div className={cx(s.displayBtn)}>
                        <Button
                          type="button"
                          className={cx(s.button, bt.btnPrimary, bt.btnLarge, 'cookiBtn')}
                          onClick={this.disclamierForm}
                        >
                          {formatMessage(messages.gotIt)}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          }
        </Grid>
      )
    }
  }
}

const mapState = state => ({
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};
export default injectIntl(
  withStyles(s, bt)
      (
          connect(mapState, mapDispatch)
              (CookiesDisclaimer)
      )
);
// export default injectIntl(withStyles(s, bt)(CookiesDisclaimer));


