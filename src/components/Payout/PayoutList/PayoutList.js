import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

import {
  Button,
  Panel,
  Label,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import cx from 'classnames';
import * as FaInfoCircle from 'react-icons/lib/fa/info-circle';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Payout.css';
import bt from '../../../components/commonStyle.css';

// Redirection
import history from '../../../core/history';

// Locale
import messages from '../../../locale/messages';

// Redux actions
import { removePayout } from '../../../actions/Payout/removePayoutAction';
import { setDefaultPayout } from '../../../actions/Payout/setDefaultPayout';
import { verifyPayout } from '../../../actions/Payout/verifyPayout';

class PayoutList extends Component {

  static defaultProps = {
    payoutRemoveLoader: false,
    payoutDefaultLoader: false,
    payoutVerifyLoader: false,
    data: []
  };

  handleClick() {
    history.push('/user/addpayout');
  }

  render() {
    const { data, removePayout, setDefaultPayout, currentAccountId, verifyPayout, userId } = this.props;
    const { formatMessage } = this.props.intl;
    const { payoutRemoveLoader, payoutDefaultLoader, payoutVerifyLoader } = this.props;


    return (
      <div className={'commonListingBg'}>
        <Panel className={s.panelHeader}>
          <div>
            <h3 className={s.titleText}>{formatMessage(messages.payoutMethod)}</h3>
          </div>
          <div className={cx(s.panelBody)}>
            <p className={s.payoutIntro}>
              <FormattedMessage {...messages.payoutTitleBlock1} />
            </p>
            <div className={cx('payoutTable', 'NewResponsiveTable')}>
              <table className={cx('table', s.noBorder)}>
                <thead>
                  <tr className={cx(s.rowBorder, s.sectionTitleLight, s.textTruncate)}>
                    <th scope="col" className={s.noBorder}><FormattedMessage {...messages.payoutTitle} /></th>
                    <th scope="col" className={s.noBorder}><FormattedMessage {...messages.payoutTitle4} /></th>
                    <th scope="col" className={s.noBorder}><FormattedMessage {...messages.status} /></th>
                    <th scope="col" className={s.noBorder}><FormattedMessage {...messages.options} /></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.length > 0 && data.map((item, index) => {
                      return (
                        <tr className={cx(s.rowBorder, s.sectionTitleLight)} key={index}>
                          <td data-label={formatMessage(messages.payoutTitle)}>{item.paymentMethod.name} {item.default && <Label bsStyle="success"><FormattedMessage {...messages.default} /></Label>}</td>
                          <td data-label={formatMessage(messages.payoutTitle4)}>
                            {
                              item.methodId == 1 && <span>
                                {item.payEmail}
                              </span>
                            }
                            {
                              item.methodId == 2 && <span className={'rtlPayoutEmail'}>
                                ******{item.last4Digits}
                              </span>
                            }
                            <span className={'rtlPayoutEmail'}>({item.currency})</span>
                          </td>
                          <td data-label={formatMessage(messages.status)}>
                            {
                              item.isVerified === true && <FormattedMessage {...messages.ready} />
                            }
                            {
                              item.isVerified !== true && <FormattedMessage {...messages.notReady} />
                            }
                          </td>
                          <td data-label={formatMessage(messages.options)} className={s.textTruncate}>
                            {
                              !item.default && item.isVerified === true && <a
                                href="javascript:void(0)"
                                className={cx({ [s.transparentText]: payoutDefaultLoader })}
                                onClick={() => {
                                  if (!payoutDefaultLoader) {
                                    setDefaultPayout(item.id)
                                  }
                                }}
                              >
                                <FormattedMessage {...messages.setDefault} />
                              </a>
                            }
                            {
                              !item.default && item.isVerified !== true && <a
                                href="javascript:void(0)"
                                onClick={() => {
                                  if (!payoutVerifyLoader) {
                                    verifyPayout(item.payEmail, userId);
                                  }
                                }}
                              >
                                <FormattedMessage {...messages.payoutVerify} />
                                <OverlayTrigger
                                  overlay={<Tooltip id={'tooltip' + index}><FormattedMessage {...messages.payoutVerifyStripeInfo} /></Tooltip>}
                                  placement="top"
                                >
                                  <span>&nbsp;<FaInfoCircle style={{ color: '#484848' }} /></span>
                                </OverlayTrigger>
                              </a>
                            }
                            {
                              !item.default && <a
                                className={cx(s.textSpace, 'payOutSpace', { [s.transparentText]: payoutRemoveLoader })}
                                href="javascript:void(0)"
                                onClick={() => {
                                  if (!payoutRemoveLoader) {
                                    removePayout(item.id);
                                  }
                                }}
                              >
                                <FormattedMessage {...messages.remove} />
                              </a>
                            }
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
            <div className={cx(s.sectionTitleLight)}>
              <Button className={cx(bt.btnLarge, bt.btnPrimary)} onClick={this.handleClick}>
                <FormattedMessage {...messages.addPayout} />
              </Button>
              <span className={s.textMuted}>&nbsp;<FormattedMessage {...messages.directDeposit} /></span>
            </div>
          </div>
        </Panel>
      </div>
    );
  }
}

const mapState = (state) => ({
  payoutRemoveLoader: state.loader.payoutRemove,
  payoutDefaultLoader: state.loader.payoutDefault,
  payoutVerifyLoader: state.loader.payoutVerify,
  userId: state.account.data.userId
});

const mapDispatch = {
  removePayout,
  setDefaultPayout,
  verifyPayout
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(PayoutList)));