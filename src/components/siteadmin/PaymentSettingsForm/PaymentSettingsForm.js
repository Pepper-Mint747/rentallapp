import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

import submit from './submit';

class PaymentSettingsForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
  };

  componentDidMount() {
    const { initialize, initialValues } = this.props;
    initialize(initialValues);
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched && error && <span>{formatMessage(error)}</span>}
        </div>
      </div>
    )
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <form onSubmit={handleSubmit(submit)}>
        {error && <strong>{formatMessage(error)}</strong>}
        <Field name="paymentName" type="text" component={this.renderField} label={formatMessage(messages.paymentName)} />
        <div>
          <span><FormattedMessage {...messages.paymentStatus} /> </span>
          <Field name="paymentStatus" type="radio" component={"input"} value={"true"} /> <FormattedMessage {...messages.enableLabel} />
          <Field name="paymentStatus" type="radio" component={"input"} value={"false"} /> <FormattedMessage {...messages.disableLabel} />
        </div>
        <div>
          <span> <FormattedMessage {...messages.paymentMode} /> </span>
          <Field name="paymentMode" type="radio" component={"input"} value={"live"} /> <FormattedMessage {...messages.live} />
          <Field name="paymentMode" type="radio" component={"input"} value={"sandbox"} /> <FormattedMessage {...messages.sandbox} />
        </div>
        <Field name="email" type="text" component={this.renderField} label={formatMessage(messages.email)} />
        <Field name="APIUserId" type="text" component={this.renderField} label={formatMessage(messages.apiUserId)} />
        <Field name="APIPassword" type="text" component={this.renderField} label={formatMessage(messages.apiPassword)} />
        <Field name="APISecret" type="text" component={this.renderField} label={formatMessage(messages.apiSecret)} />
        <Field name="AppId" type="text" component={this.renderField} label={formatMessage(messages.addId)} />
        <div>
          <button type="submit" disabled={submitting}><FormattedMessage {...messages.save} /></button>
        </div>
      </form>
    )
  }

}

PaymentSettingsForm = reduxForm({
  form: 'PaymentSettingsForm', // a unique name for this form
  //validate
})(PaymentSettingsForm);

export default injectIntl(PaymentSettingsForm);