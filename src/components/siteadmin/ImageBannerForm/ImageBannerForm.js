import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Style
import {
  Button,
  Row,
  FormGroup,
  Col,
  FormControl,
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImageBannerForm.css';
import bt from '../../../components/commonStyle.css';

// Component
import DropZone from './DropZone';
import Loader from '../../Loader';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class ImageBannerForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
    bannerUploaderLoading: PropTypes.bool
  };

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={3}>
            <label className={s.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={9}>
            <FormControl {...input} type={type} className={bt.commonControlInput} />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>
    );
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { error, handleSubmit, submitting, dispatch, initialValues, image, bannerUploaderLoading } = this.props;
    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.homepageBannererSettings} /></h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={3}>
                      <label className={s.labelTextNew} ><FormattedMessage {...messages.bannerImage} /></label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={9}>
                      <div>
                        <DropZone data={image} placeholder={formatMessage(messages.photosPlaceholder)} />
                      </div>
                      <Loader
                        show={bannerUploaderLoading}
                        type={"page"}
                      >
                        {
                          image != null &&
                          <Col xs={12} sm={6} md={6} lg={4} className={s.noPadding}>
                            <div
                              style={{ backgroundImage: `url(/images/banner/${image})` }}
                              className={s.bannerImageBg}
                            />
                          </Col>
                        }
                      </Loader>
                    </Col>
                  </Row>
                </FormGroup>
                <Field name="title" type="text" component={this.renderFormControl} label={formatMessage(messages.titleAdminLabel)} />
                <Field name="description" type="text" component={this.renderFormControl} label={formatMessage(messages.descriptionAdminLabel)} />
                <Field name="buttonLabel" type="text" component={this.renderFormControl} label={formatMessage(messages.buttonLabel)} />
                <FormGroup className={s.space1}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                      <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting} >
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

ImageBannerForm = reduxForm({
  form: 'ImageBannerForm', // a unique name for this form
  validate
})(ImageBannerForm);

const mapState = (state) => ({
  bannerUploaderLoading: state.siteSettings.bannerUploaderLoading
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ImageBannerForm)));