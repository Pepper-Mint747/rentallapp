import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { injectIntl } from 'react-intl';

// Style
import cx from 'classnames';
import {
  Button,
  Row,
  FormGroup,
  Col,
  FormControl,
  Panel
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FooterBlockForm.css';
import bt from '../../../components/commonStyle.css';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

class FooterBlockForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
        >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl {...input} placeholder={label} type={type} className={bt.commonControlInput} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }


  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.footerBlockLabel} /></h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={3}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.titleAdminLabel} /> 1</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={9}>
                      <Field
                        name="title1"
                        type="text"
                        component={this.renderFormControl}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={3}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.contentLabel} /> 1</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={9}>
                      <Field
                        name="content1"
                        component={this.renderFormControlTextArea}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={3}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.titleAdminLabel} /> 2</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={9}>
                      <Field
                        name="title2"
                        type="text"
                        component={this.renderFormControl}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={3}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.contentLabel} /> 2</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={9}>
                      <Field
                        name="content2"
                        component={this.renderFormControlTextArea}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={3}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.titleAdminLabel} /> 3</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={9}>
                      <Field
                        name="title3"
                        type="text"
                        component={this.renderFormControl}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={3}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.contentLabel} /> 3</label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={9}>
                      <Field
                        name="content3"
                        component={this.renderFormControlTextArea}
                      />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup className={s.space1}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                      <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting}>
                        <FormattedMessage {...messages.save} />
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
              </form>
            </Panel>
          </Col>
        </div>
      </div>
    );
  }

}

FooterBlockForm = reduxForm({
  form: 'FooterBlockForm', // a unique name for this form
  validate
})(FooterBlockForm);

export default injectIntl(withStyles(s, bt)(FooterBlockForm));