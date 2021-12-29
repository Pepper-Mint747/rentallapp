import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux form
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';

import submit from './submit';
import validate from './validate';

// Locale
import messages from '../../locale/messages';

// Style
import {
  Button,
  Row, FormGroup,
  Col,
  FormControl,
  Panel,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChangePasswordForm.css';
import bt from '../../components/commonStyle.css';

class ChangePasswordForm extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    initialValues: PropTypes.shape({
      registeredType: PropTypes.string.isRequired,
    }).isRequired
  };

  static defaultProps = {
    initialValues: {
      registeredType: 'email'
    }
  };

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.formGroup}>
        <Row>
          <Col xs={12} sm={4} md={3} lg={3} className={s.textRight}>
            <label className={s.labelText} >{label}</label>
          </Col>
          <Col xs={12} sm={8} md={9} lg={9} className={s.space2}>
            <FormControl {...input} type={type} className={cx(s.formControlInput, bt.commonControlInput)} />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>
    );
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx('inputFocusColor', 'commonListingBg')}>
        <Panel className={cx(s.panelHeader)}>
          <div>
            <h1 className={bt.listingTitleText}>{formatMessage(messages.changePassword)}</h1>
          </div>
          <Col xs={12} sm={12} md={12} lg={12}>
            <form onSubmit={handleSubmit(submit)}>
              <Row>
                {error && <strong>{error}</strong>}
                {
                  initialValues && initialValues.registeredType === 'email' && <Field
                    name="oldPassword"
                    type="password"
                    component={this.renderFormControl}
                    label={formatMessage(messages.oldPassword)}
                    className={cx(s.formControlInput, bt.commonControlInput)}
                  />
                }
                <Field name="newPassword" type="password" component={this.renderFormControl} label={formatMessage(messages.newPassword)} className={cx(s.formControlInput, bt.commonControlInput)} />
                <Field name="confirmPassword" type="password" component={this.renderFormControl} label={formatMessage(messages.confirmPassword)} className={cx(s.formControlInput, bt.commonControlInput)} />
                <FormGroup className={s.noMargin}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.textAlignRight)}>
                      <Button className={cx(s.button, bt.btnPrimary)} type="submit" disabled={submitting}>
                        <FormattedMessage {...messages.updatePassword} />
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
              </Row>
            </form>
          </Col>
        </Panel>
      </div>
    );
  }
}

ChangePasswordForm = reduxForm({
  form: 'ChangePasswordForm', // a unique name for this form
  validate
})(ChangePasswordForm);

export default injectIntl(withStyles(s, bt)(ChangePasswordForm));