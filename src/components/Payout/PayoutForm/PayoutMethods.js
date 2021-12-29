import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import { graphql, compose } from 'react-apollo';

// Redux Form
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
// Redux
import { connect } from 'react-redux';

import {
  Button,
  Panel,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Payout.css';
import bt from '../../../components/commonStyle.css';


// Graphql
import getPaymentMethodsQuery from './getPaymentMethods.graphql';

// Locale
import messages from '../../../locale/messages';

class PayoutMethods extends Component {
  static propTypes = {
    handleSubmit: PropTypes.any.isRequired,
    previousPage: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
    PaymentMethodsData: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getPaymentMethods: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        processedIn: PropTypes.string.isRequired,
        fees: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired,
        details: PropTypes.string.isRequired,
        paymentType: PropTypes.string.isRequired,
      }))
    })
  };

  static defaultProps = {
    PaymentMethodsData: {
      loading: true,
      getPaymentMethods: []
    }
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { PaymentMethodsData: { loading, getPaymentMethods } } = nextProps;
    const { change, paymentMethodId } = this.props;
    if (getPaymentMethods != null && getPaymentMethods.length > 0 
        && (paymentMethodId === undefined || paymentMethodId === null)) {
      const activePayentMethods = getPaymentMethods && getPaymentMethods.find((o) => o && o.isEnable);
      if (activePayentMethods) {
        change('methodId', activePayentMethods.id);
        change('paymentType', activePayentMethods.paymentType);
        change('currency', activePayentMethods.currency);
        if (activePayentMethods.paymentType === 2) {
          change('businessType', 'individual');
        }
      }
    }
  }

  handleChange(methodId, paymentType, currency) {
    const { change } = this.props;
    change('methodId', methodId);
    change('paymentType', paymentType);
    change('currency', currency);
    if (paymentType === 2) {
      change('businessType', 'individual');
    }
  }

  render() {
    const { error, handleSubmit, previousPage } = this.props;
    const { PaymentMethodsData: { loading, getPaymentMethods } } = this.props;
    const { paymentMethodId } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx('inputFocusColor', 'commonListingBg')}>
        <form onSubmit={handleSubmit}>
          <Panel
            className={s.panelHeader}
            footer={
              <div>
                <Button className={cx(s.button, bt.btnLarge, bt.btnPrimaryBorder, s.btnRight, 'spaceRight2AR')} onClick={previousPage}>
                  <FormattedMessage {...messages.back} />
                </Button>
                <Button className={cx(s.button, bt.btnPrimary, bt.btnLarge)} type="submit">
                  <FormattedMessage {...messages.next} />
                </Button>
              </div>
            }>
            <div>
              <h3 className={s.titleText}>{formatMessage(messages.addPayout)}</h3>
            </div>
            <div className={s.panelBody}>
              <p className={s.payoutIntro}>
                <FormattedMessage {...messages.payoutIntro1} />
              </p>
              <p className={s.payoutIntro}>
                <FormattedMessage {...messages.payoutIntro2} />
              </p>
              {
                loading && <div><FormattedMessage {...messages.loadingLabel} /></div>
              }
              {
                !loading && getPaymentMethods != undefined && getPaymentMethods.length > 0 && <div className={'payoutTable'}>
                  <table className={cx('table', s.noBorder)}>
                    <thead>
                      <tr className={cx(s.rowBorder, s.sectionTitleLight, s.textTruncate)}>
                        <th className={s.noBorder} />
                        <th className={s.noBorder}><FormattedMessage {...messages.payoutTitle} /></th>
                        <th className={s.noBorder}><FormattedMessage {...messages.payoutTitle1} /></th>
                        <th className={s.noBorder}><FormattedMessage {...messages.payoutTitle2} /></th>
                        <th className={s.noBorder}><FormattedMessage {...messages.payoutTitle3} /></th>
                        <th className={s.noBorder}><FormattedMessage {...messages.payoutTitle4} /></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        getPaymentMethods.map((item, index) => {
                          let checked = false;
                          if (item.id === paymentMethodId) {
                            checked = true;
                          }
                          if (item.isEnable) {
                            return (
                              <tr className={cx(s.sectionTitleLight)} key={index}>
                                <td >
                                  <input name="methodId" type="radio" checked={checked} value={item.id} onChange={() => this.handleChange(item.id, item.paymentType, item.currency)} className={bt.curderPointer} />
                                </td>
                                <td><label className={s.radioText}>{item.name}</label></td>
                                <td>{item.processedIn}</td>
                                <td>{item.fees}</td>
                                <td>{item.currency}</td>
                                <td>{item.details}</td>
                              </tr>
                            );
                          }
                        })
                      }
                    </tbody>
                  </table>
                </div>
              }
              {
                !loading && getPaymentMethods != undefined && getPaymentMethods.length === 0 && <div> <FormattedMessage {...messages.noPaymentFound} /> </div>
              }
            </div>
          </Panel>
        </form>
      </div>
    );
  }
}

PayoutMethods = reduxForm({
  form: 'PayoutForm', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(PayoutMethods);

const selector = formValueSelector('PayoutForm');

const mapState = (state) => ({
  paymentMethodId: selector(state, 'methodId')
});

const mapDispatch = {
  change
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(getPaymentMethodsQuery, {
    name: 'PaymentMethodsData',
    options: {
      ssr: false,
    }
  }),
)(PayoutMethods);