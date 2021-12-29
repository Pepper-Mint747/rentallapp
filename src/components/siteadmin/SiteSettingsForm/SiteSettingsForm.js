import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm, formValueSelector } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Redux
import { connect } from 'react-redux';

// Style
import {
  Button,
  Row,
  FormGroup,
  Col,
  FormControl,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SiteSettingsForm.css';
import bt from '../../../components/commonStyle.css';
import Uploader from './Uploader';
import HomeUploader from './HomeUploader';
import EmailLogoUploader from './EmailLogoUploader';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class SiteSettingsForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      homePageType: null,
    }
  }

  componentWillMount() {
    const { homePageType } = this.props;

    if (homePageType) {
      this.setState({ hostTypeState: homePageType });
    }
  }

  componentDidMount() {
    const { homePageType } = this.props;

    if (homePageType) {
      this.setState({ hostTypeState: homePageType });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { homePageType } = nextProps;

    if (homePageType) {
      this.setState({ hostTypeState: homePageType });
    }
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, maxlength }) => {
    const { formatMessage } = this.props.intl; 
    return (
      <FormGroup className={s.formGroup}>
        <label className={s.labelTextNew} >{label}</label>
        <div>
          <FormControl {...input}  type={type} className={bt.commonControlInput} maxlength={maxlength} />
          {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </div>
      </FormGroup>
    );
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.formGroup}>
        <label className={s.labelTextNew} >{label}</label>
        <div>
          <FormControl
            {...input}
            className={className}
            componentClass="textarea"
          >
            {children}
          </FormControl>
        </div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    );
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    return (
      <FormGroup className={s.formGroup}>
        <label className={s.labelTextNew}>{label}</label>
        <div>
          <FormControl componentClass="select" {...input} className={className} >
            {children}
          </FormControl>
        </div>
      </FormGroup>
    )
  }


  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues, appAvailableStatus } = this.props;
    const { hostTypeState } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h1 className={s.headerTitle}><FormattedMessage {...messages.siteSettings} /></h1>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{error}</strong>}
                <Row>
                  <Col xs={12} sm={12} md={12} lg={4} className={s.space4}>
                    <FormGroup className={s.formGroup}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.logoLabel} /></label>
                      <Uploader />
                    </FormGroup>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={4} className={s.space4}>
                    <FormGroup className={s.formGroup}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.HomelogoLabel} /></label>
                      <HomeUploader />
                    </FormGroup>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={4} className={s.space4}>
                    <label className={s.labelTextNew} ><FormattedMessage {...messages.EmaillogoLabel} /></label>
                    <EmailLogoUploader />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={6} md={6} lg={6} className={s.noPadding}>
                    <Col xs={12} sm={12} md={12} lg={12} className={s.space2}>
                      <Field name="logoHeight" type="text" component={this.renderFormControl} label={formatMessage(messages.logoHeightLabel)} />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} className={s.space2}>
                      <Field name="logoWidth" type="text" component={this.renderFormControl} label={formatMessage(messages.logoWidthLabel)} />
                    </Col>
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={6} className={s.noPadding}>
                    <Col xs={12} sm={12} md={12} lg={12} className={s.space2}>
                      <Field name="homeLogoHeight" type="text" component={this.renderFormControl} label={formatMessage(messages.homelogoHeight)} />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} className={s.space2}>
                      <Field name="homeLogoWidth" type="text" component={this.renderFormControl} label={formatMessage(messages.homelogoWidth)} />
                    </Col>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6} className={s.space2}>
                    <Field name="siteName" type="text" component={this.renderFormControl} label={formatMessage(messages.siteName)} maxlength={15} />
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6} className={s.space2}>
                    <Field name="siteTitle" type="text" component={this.renderFormControl} label={formatMessage(messages.siteTitle)} />
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                    <Col xs={12} sm={12} md={12} lg={6} className={s.space2}>
                      <Field name="metaKeyword" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.metaKeywordLabel)} />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} className={s.space2}>
                      <Field name="metaDescription" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.metaKeywordLabelDesc)} />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4} className={s.space2}>
                      <Field name="facebookLink" type="text" component={this.renderFormControl} label={formatMessage(messages.facebookURL)} />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4} className={s.space2}>
                      <Field name="twitterLink" type="text" component={this.renderFormControl} label={formatMessage(messages.twitterURL)} />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4} className={s.space2}>
                      <Field name="instagramLink" type="text" component={this.renderFormControl} label={formatMessage(messages.instagramURL)} />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4} className={s.space2}>
                      <Field
                        name="homePageType"
                        type="text"
                        className={cx(bt.commonControlSelect, 'commonAdminSelect')}
                        component={this.renderFormControlSelect}
                        label={formatMessage(messages.homePageLayout)}
                      >
                        <option value={1}>{formatMessage(messages.homePageLayoutDesc)}</option>
                        <option value={2}>{formatMessage(messages.homePageLayoutDesc1)}</option>
                        <option value={3}>{formatMessage(messages.homePageLayoutDesc2)}</option>
                        <option value={4}>{formatMessage(messages.homePageLayoutDesc3)}</option>
                      </Field>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4} className={s.space2}>
                      <Field
                        name="phoneNumberStatus"
                        type="text"
                        className={cx(bt.commonControlSelect, 'commonAdminSelect')}
                        component={this.renderFormControlSelect}
                        label={formatMessage(messages.phoneNumberFormat)}
                      >
                        <option value={1}>{formatMessage(messages.twilioSMS)}</option>
                        <option value={2}>{formatMessage(messages.normalPhoneNumber)}</option>
                      </Field>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={4} className={s.space2}>
                      <Field
                        name="appAvailableStatus"
                        type='text'
                        className={cx(bt.commonControlSelect, 'commonAdminSelect')}
                        component={this.renderFormControlSelect}
                        label={formatMessage(messages.appAvailable)}
                      >
                        <option value={1}>{formatMessage(messages.enableLabel)}</option>
                        <option value={0}>{formatMessage(messages.disableLabel)}</option>
                      </Field>
                    </Col>

                    {
                      appAvailableStatus == 1 && <div>
                        <Col xs={12} sm={12} md={6} lg={6} className={s.space2}>
                          <Field name="playStoreUrl" type="text" component={this.renderFormControl} label={formatMessage(messages.playStoreUrl)} />
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} className={s.space2}>
                          <Field name="appStoreUrl" type="text" component={this.renderFormControl} label={formatMessage(messages.appStoreUrl)} />
                        </Col>

                      </div>
                    }
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} className={s.space2}>
                    <Field name="email" type="text" component={this.renderFormControl} label={formatMessage(messages.emailIdLabel)} />
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} className={s.space2}>
                    <Field name="phoneNumber" type="text" component={this.renderFormControl} label={formatMessage(messages.mobileNumberLabel)} />
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.space2}>
                    <Field name="address" type="text" component={this.renderFormControlTextArea} label={formatMessage(messages.address)} />
                  </Col>
                  <FormGroup className={s.formGroup}>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                      <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting} >
                        <FormattedMessage {...messages.save} />
                      </Button>
                    </Col>
                  </FormGroup>
                </Row>
              </form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

}


SiteSettingsForm = reduxForm({
  form: 'SiteSettingsForm', // a unique name for this form
  validate
})(SiteSettingsForm);

const selector = formValueSelector('SiteSettingsForm');

const mapState = (state) => ({
  homePageType: selector(state, 'homePageType'),
  appAvailableStatus: selector(state, 'appAvailableStatus')
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(SiteSettingsForm)));