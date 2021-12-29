import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';

// Style
import cx from 'classnames';
import {
  Button,
  Row,
  FormGroup,
  Col,
  FormControl,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StaticBlockForm.css';
import bt from '../../../components/commonStyle.css';

import BlockUploader from './BlockUploader';
import Uploader from './Uploader';
import submit from './submit';
import validate from './validate';

import messages from '../../../locale/messages';

class StaticBlockForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
        >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    )
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <FormControl {...input} type={type} className={bt.commonControlInput} maxLength={80} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    )
  }

  renderFormControlSelect = ({ input, meta: { touched, error }, children, className, disabled }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormGroup className={s.space3}>
          <FormControl disabled={disabled} componentClass="select" {...input} className={className} >
            {children}
          </FormControl>
          {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </FormGroup>
      </div>
    )
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { error, handleSubmit, submitting, dispatch, initialValues } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h1 className={s.headerTitle}><FormattedMessage {...messages.staticInfoBlock} /></h1>
              <form onSubmit={handleSubmit(submit)}>
                <Row>
                  {error && <strong>{formatMessage(error)}</strong>}
                  <Col lg={6} sm={12} md={6} xs={12} className={s.noPadding}>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.headerTitle} /></label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="headerTitle"
                        type="text"
                        component={this.renderFormControl}
                      />
                    </Col>
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} className={s.noPadding}>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.isActive} /></label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="isEnable"
                        className={cx(bt.commonControlSelect, 'commonAdminSelect')}
                        component={this.renderFormControlSelect}
                      >
                        <option value="1">{formatMessage(messages.enableLabel)}</option>
                        <option value="0">{formatMessage(messages.disableLabel)}</option>
                      </Field>
                    </Col>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <label className={s.labelTextNew} ><FormattedMessage {...messages.headerTitleContent} /></label>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Field
                      name="headerContent"
                      component={this.renderFormControlTextArea}
                    />
                  </Col>
                  <Col lg={6} md={6} sm={12} xs={12} className={s.noPadding}>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <h3><FormattedMessage {...messages.blockLabel} /> #1</h3>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.blockImageLabel} /> 1</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <BlockUploader />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.blockTitleLabel} /> 1</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="blockTitle1"
                        type="text"
                        component={this.renderFormControl}
                      />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.blockContentLabel} /> 1</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="blockContent1"
                        component={this.renderFormControlTextArea}
                      />
                    </Col>
                  </Col>
                  <Col lg={6} md={6} sm={12} xs={12} className={s.noPadding}>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <h3><FormattedMessage {...messages.blockLabel} /> #2</h3>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} >
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.blockImageLabel} /> 2</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Uploader />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.blockTitleLabel} /> 2</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="blockTitle2"
                        type="text"
                        component={this.renderFormControl}
                      />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} >
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.blockContentLabel} /> 2</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <Field
                        name="blockContent2"
                        component={this.renderFormControlTextArea}
                      />
                    </Col>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} className={cx(bt.textAlignRight, s.spaceTop3)}>
                    <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting}>
                      <FormattedMessage {...messages.save} />
                    </Button>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

StaticBlockForm = reduxForm({
  form: 'StaticBlockForm', // a unique name for this form
  validate
})(StaticBlockForm);

export default injectIntl((withStyles(s, bt)(StaticBlockForm)));