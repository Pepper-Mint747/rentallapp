import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux Form
import { Field, reduxForm } from 'redux-form';

import {
  Button,
  FormGroup,
  Col,
  FormControl,
  Panel,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Payout.css';
import bt from '../../../components/commonStyle.css';

// Component
import CountryList from '../../CountryList';

// Helpers
import validate from './validate';

// Locale
import messages from '../../../locale/messages';

class PayoutBillingDetails extends Component {
  static propTypes = {
    handleSubmit: PropTypes.any.isRequired,
    formatMessage: PropTypes.any,
  };

  renderField = ({ input, label, type, meta: { touched, error, dirty } }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.space1, s.displayFlex)}>
        <Col lg="3" md="3" sm="12" xs="12" className={cx(s.responsiveTextAlign, s.responsivePadding, 'responsiveTextAlignRtl')}>
          <label className={s.labelText}>{label}</label>
        </Col>
        <Col lg="9" md="9" sm="12" xs="12" className={s.responsivePadding}>
          <FormGroup className={s.formGroup}>
            <FormControl {...input} componentClass="input" className={cx(bt.commonControlInput, s.formControlInput)} />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </FormGroup>
        </Col>
      </div>
    );
  }

  renderCountryList = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.space1, s.displayFlex)}>
        <Col lg="3" md="3" sm="12" xs="12" className={cx(s.responsiveTextAlign, s.responsivePadding, 'responsiveTextAlignRtl')}>
          <label className={s.labelText}><FormattedMessage {...messages.country} /></label>
        </Col>

        <Col lg="9" md="9" sm="12" xs="12" className={s.responsivePadding}>
          <FormGroup className={s.formGroup}>
            <CountryList input={input} className={cx(className, s.selectFormControl, bt.commonControlSelect, 'selectFormControlRTL')} isEmptyFirst />
          </FormGroup>
          {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </Col>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx('inputFocusColor', 'commonListingBg', 'payoutMethodList')}>
        <form onSubmit={handleSubmit}>
          <Panel
            className={s.panelHeader}
            footer={
              <div>
                <Button
                  className={cx(s.button, bt.btnLarge, bt.btnPrimary)}
                  type="submit"
                ><FormattedMessage {...messages.next} />
                </Button>
              </div>
            }
          >
            <div>
              <h3 className={s.titleText}>{formatMessage(messages.addPayout)}</h3>
            </div>
            <div className={s.panelBody}>
              <Field name="country" component={this.renderCountryList} className={cx(s.formControlSelect, bt.commonControlSelect)} />
              <Field name="address1" component={this.renderField} label={formatMessage(messages.address1)} />
              <Field name="address2" component={this.renderField} label={formatMessage(messages.address2)} />
              <Field name="city" component={this.renderField} label={formatMessage(messages.city)} />
              <Field name="state" component={this.renderField} label={formatMessage(messages.state)} />
              <Field name="zipcode" component={this.renderField} label={formatMessage(messages.zipCode)} />
            </div>
          </Panel>
        </form>
      </div>
    );
  }
}

PayoutBillingDetails = reduxForm({
  form: 'PayoutForm', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(PayoutBillingDetails);

export default injectIntl(withStyles(s, bt)(PayoutBillingDetails));