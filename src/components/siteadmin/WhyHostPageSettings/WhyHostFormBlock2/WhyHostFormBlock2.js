import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
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
import s from './WhyHostFormBlock2.css';
import bt from '../../../../components/commonStyle.css';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

class WhyHostFormBlock2 extends Component {

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
          <h1 className={s.headerTitle}><FormattedMessage {...messages.whyBecomeHostBlock2} /></h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <Row>
                  <Col xs={12} sm={12} md={12} lg={6}>
                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.whyBlockTitleLabel} /> 1</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <Field
                            name="whyBlockTitle1"
                            type="text"
                            component={this.renderFormControl}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.whyBlockContentLabel} /> 1</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <Field
                            name="whyBlockContent1"
                            component={this.renderFormControlTextArea}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6}>
                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.whyBlockTitleLabel} /> 2</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <Field
                            name="whyBlockTitle2"
                            type="text"
                            component={this.renderFormControl}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.whyBlockContentLabel} /> 2</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                          <Field
                            name="whyBlockContent2"
                            component={this.renderFormControlTextArea}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup className={s.spaceTop2}>
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

WhyHostFormBlock2 = reduxForm({
  form: 'WhyHostForm',
  validate
})(WhyHostFormBlock2);

export default injectIntl(withStyles(s, bt)(WhyHostFormBlock2));