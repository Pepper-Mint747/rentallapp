import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th} from 'reactable';
import { connect } from 'react-redux';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CurrencyManagement.css';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

// Redux Actions
import { updateCurrencyStatus, setBaseCurrency } from '../../../actions/siteadmin/CurrencyManagement/currencyManagement';
import { managePaymentCurrency } from '../../../actions/siteadmin/CurrencyManagement/managePaymentCurrency';

class CurrencyManagement extends React.Component {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      isEnable: PropTypes.bool.isRequired,
      isPayment: PropTypes.bool.isRequired,
      isBaseCurrency: PropTypes.bool.isRequired
    })),
    updateCurrencyStatus: PropTypes.any.isRequired,
    setBaseCurrency: PropTypes.any.isRequired,
    managePaymentCurrency: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    data: []
  };

  handleUpdateStatus(id, status) {
    const { updateCurrencyStatus } = this.props;
    updateCurrencyStatus(id, status);
  }

  handleBaseCurrency(id) {
    const { setBaseCurrency } = this.props;
    setBaseCurrency(id);
  }

  render() {
    const { data, managePaymentCurrency } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
       <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.currencyManagement} /></h1>
          <div className={cx('table-responsive', 'tableBorderRadiusAdmin', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin')}>
            <Table  className="table"  noDataText={formatMessage(messages.noRecordFound)}>
            <Thead>
              <Th scope="col">{formatMessage(messages.idLabel)}</Th>
              <Th scope="col">{formatMessage(messages.symbolLabel)}</Th>
              <Th scope="col">{formatMessage(messages.baseCurrencyLabel)}</Th>
              <Th scope="col">{formatMessage(messages.status)}</Th>
              <Th scope="col">{formatMessage(messages.setEnableDisable)}</Th>
              <Th scope="col">{formatMessage(messages.setCurrencyLabel)}</Th>
              <Th scope="col">{formatMessage(messages.allowedPaymentCurrency)}</Th>
            </Thead>
              {
                data && data.length > 0 && data.map((value, key) => {
                  return (
                    <Tr key={key}>
                      <Td data-label={formatMessage(messages.idLabel)} column={formatMessage(messages.idLabel)} data={value.id} />
                      <Td data-label={formatMessage(messages.symbolLabel)} column={formatMessage(messages.symbolLabel)} data={value.symbol} />
                      <Td data-label={formatMessage(messages.baseCurrencyLabel)} column={formatMessage(messages.baseCurrencyLabel)} data={value.isBaseCurrency === true ? formatMessage(messages.active) : ""} />
                      <Td data-label={formatMessage(messages.status)} column={formatMessage(messages.status)}>
                        <span>
                          {
                            value.isEnable && <span> <FormattedMessage {...messages.enabledLabel} /> </span>
                          }
                          {
                            !value.isEnable && <span> <FormattedMessage {...messages.disabledLabel} /> </span>
                          }
                        </span>
                      </Td>

                      <Td data-label={formatMessage(messages.setEnableDisable)} column={formatMessage(messages.setEnableDisable)}>
                        <a href="javascript:void(0)" onClick={() => this.handleUpdateStatus(value.id, value.isEnable)} >
                          {
                            value.isEnable && <span> <FormattedMessage {...messages.disableLabel} /> </span>
                          }

                          {
                            !value.isEnable && <span> <FormattedMessage {...messages.enableLabel} /> </span>
                          }
                        </a>
                      </Td>
                      <Td data-label={formatMessage(messages.setCurrencyLabel)} column={formatMessage(messages.setCurrencyLabel)}>
                        <span>
                          {
                            !value.isBaseCurrency && value.isEnable && <a href="javascript:void(0)" onClick={() => this.handleBaseCurrency(value.id)}>
                              <FormattedMessage {...messages.setBaseCurrency} />
                            </a>
                          }
                        </span>
                      </Td>

                      <Td data-label={formatMessage(messages.allowedPaymentCurrency)} column={formatMessage(messages.allowedPaymentCurrency)}>
                        <span>
                          {
                            !value.isPayment && value.isEnable && <a href="javascript:void(0)" onClick={() => managePaymentCurrency(value.id, "add")}>
                              <FormattedMessage {...messages.addLabel} />
                            </a>
                          }
                          {
                            value.isPayment && value.isEnable && <a href="javascript:void(0)" onClick={() => managePaymentCurrency(value.id, "remove")}>
                              <FormattedMessage {...messages.remove} />
                            </a>
                          }
                        </span>
                      </Td>
                    </Tr>
                  )
                })
              }
            </Table>
          </div>
        </div>
      </div>
    );
  }

}

const mapState = (state) => ({});

const mapDispatch = {
  updateCurrencyStatus,
  setBaseCurrency,
  managePaymentCurrency
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(CurrencyManagement)));