// General
import React, { Component } from 'react';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './AdminUserForm.css';
import bt from '../../../components/commonStyle.css';
import {
  Button,
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import { getAllAdminPrivileges } from '../../../helpers/adminPrivileges';

class AdminUserForm extends Component {

  static defaultProps = {
    roles: []
  };

  constructor(props) {
    super(props);
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl {...input} type={type} className={className} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <FormControl componentClass="select" {...input} className={className} >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  render() {
    const { error, handleSubmit, submitting, id, roles } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.formMaxWidth, 'maxwidthcenter', 'empty')}>
        <form onSubmit={handleSubmit(submit)}>
          {error && <strong>{formatMessage(error)}</strong>}
          <FormGroup className={s.space2}>
            <label className={s.labelTextNew}><FormattedMessage {...messages.emailLabel} /></label>
            <Field
              name="email"
              type="text"
              component={this.renderFormControl}
              label={formatMessage(messages.emailLabel)}
              className={cx(bt.commonControlInput)}
            />
          </FormGroup>
          <FormGroup className={s.space2}>
            <label className={s.labelTextNew}><FormattedMessage {...messages.password} /></label>
            <Field
              name="password"
              type="password"
              component={this.renderFormControl}
              label={formatMessage(messages.password)}
              className={cx(bt.commonControlInput)}
            />
            <p className={cx(s.userText, s.spaceTop1)}><FormattedMessage {...messages.adminUserDesc} /></p>
          </FormGroup>
          <FormGroup className={s.space3}>
            <label className={s.labelTextNew}><FormattedMessage {...messages.roleLabel} /></label>
            <Field
              name="roleId"
              component={this.renderFormControlSelect}
              className={cx(bt.commonControlSelect, 'commonAdminSelect')}
            >
              <option value={''}>{formatMessage(messages.selectroleLabel)}</option>
              {
                roles && roles.length > 0 && roles.map((item, key) => {
                  return (
                    <option value={item.id} key={key}>{item.name}</option>
                  )
                })
              }
            </Field>
          </FormGroup>
          <FormGroup className={s.space1}>
            <div className={cx(bt.textAlignRight,  'modaltextAignRightRtl')}>
              <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting}>
                {id ? <FormattedMessage {...messages.update} /> : <FormattedMessage {...messages.addLabel} />}
              </Button>
            </div>
          </FormGroup>
        </form>
      </div>
    )
  }

}

AdminUserForm = reduxForm({
  form: "AdminUserForm", // a unique name for this form
  validate,
})(AdminUserForm);

const selector = formValueSelector('AdminUserForm');

const mapState = (state) => ({
  id: selector(state, 'id')
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AdminUserForm)));