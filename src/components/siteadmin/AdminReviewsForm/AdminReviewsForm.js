import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { graphql, compose } from 'react-apollo';

import { Field, reduxForm, reset } from 'redux-form';
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
import s from './AdminReviewsForm.css';
import bt from '../../../components/commonStyle.css';
import Link from '../../Link';

// Component
import AdminStarRating from '../AdminStarRating';
import { toastr } from 'react-redux-toastr';

// GraphQL
import WriteAdminReviewMutation from './WriteAdminReviewMutation.graphql';
import history from '../../../core/history';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';


class AdminReviewsForm extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, placeholder }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={3} md={3} lg={3}>
            <label className={s.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={9} md={9} lg={9}>
            <FormControl {...input} type={type} className={bt.commonControlInput} />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>

    );
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, className, children }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={3} md={3} lg={3}>
            <label className={s.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={9} md={9} lg={9}>
            <FormControl
              {...input}
              className={className}
              componentClass={"textarea"}
            />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>

    )
  }

  renderStarRating = ({ input, label, meta: { touched, error }, className, children }, value) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={3} md={3} lg={3}>
            <label className={s.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={9} md={9} lg={9}>
            <span className={s.starSize}>
              <AdminStarRating
                name={input.name}
                change={input.onChange}
                value={input.value}
                editing={true}
              />
              {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </span>
          </Col>
        </Row>
      </FormGroup>

    )
  }

  async submitForm(values, dispatch) {
    const { mutate } = this.props;
    const { data } = await mutate({ variables: values });
    if (data && data.writeAdminReview) {
      if (data.writeAdminReview.status === '200') {
        if (values.id) {
          toastr.success("Updated Successfully!", "Admin review details updated successfully!");
        } else {
          toastr.success("Submitted Successfully!", "Admin review details submitted successfully!");
          dispatch(reset('AdminReviewsForm'));
        }
      } else if (data.writeAdminReview.status === '404') {
        toastr.error("Failed to update!", "List ID is not available!");
      } else {
        toastr.error("Failed to update!", "Your changes to admin review is failed!");
      }
      history.push('/siteadmin/reviews')
    }
  }

  render() {
    const { error, handleSubmit, submitting, initialValues } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}> <FormattedMessage {...messages.adminReviews} /></h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            { initialValues &&
              <div className={cx(s.space4, bt.textAlignRight, 'textAlignLeftRtl')}>
                <Link to={'/siteadmin/reviews'} className={cx(bt.btnPrimaryBorder, bt.btnLarge, bt.noTextDecoration, bt.btnPrimaryLink)}>
                  <FormattedMessage {...messages.goBack} />
                </Link>
              </div>
            }

            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(this.submitForm)}>
                {error && <strong>{error}</strong>}
                <Field name="listId" type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.listId)}
                  placeholder={formatMessage(messages.listId)} />
                <Field name="reviewContent"
                  component={this.renderFormControlTextArea}
                  className={s.textareaInput}
                  label={formatMessage(messages.reviewContentLabel)}
                />
                <Field name="rating"
                  component={this.renderStarRating}
                  label={formatMessage(messages.reviewRating)} />
                <FormGroup className={s.formGroup}>
                  <div className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                    <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting} >
                      <FormattedMessage {...messages.submitLabel} />
                    </Button>
                  </div>
                </FormGroup>
              </form>
            </Panel>
          </Col>
        </div>
      </div>
    );
  }
}

AdminReviewsForm = reduxForm({
  form: 'AdminReviewsForm', // a unique name for this form
  validate
})(AdminReviewsForm);

export default compose(injectIntl,
  withStyles(s, bt),
  graphql(WriteAdminReviewMutation)
)(AdminReviewsForm);