import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { graphql, compose } from 'react-apollo';

import { Field, reduxForm, reset } from 'redux-form';
import validate from './validate';

// Style
import {
    Button,
    FormGroup,
    Col,
    FormControl,
    Panel,
    Row
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserReviewsForm.css';
import bt from '../../../components/commonStyle.css';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

// Component
import AdminStarRating from '../AdminStarRating';
import { toastr } from 'react-redux-toastr';

// Redirection
import history from '../../../core/history';
import Link from '../../Link';


// GraphQL
import WriteUserReviewMutation from './WriteUserReviewMutation.graphql';

class UserReviewsForm extends Component {

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
                        <FormControl {...input} type={type} className={className} />
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
        return (
            <FormGroup className={s.space3}>
                <Row>
                    <Col xs={12} sm={3} md={3} lg={3}>
                        <label className={s.labelTextNew} >{label}</label>
                    </Col>
                    <Col xs={12} sm={9} md={9} lg={9} className="floatLeft">
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
        if (data && data.writeUserReview) {
            if (data.writeUserReview.status === '200') {
                if (values.id) {
                    toastr.success("Updated Successfully!", "User review details updated successfully!");
                    history.push('/siteadmin/user-reviews')
                } else {
                    toastr.success("Submitted Successfully!", "User review details submitted successfully!");
                    //dispatch(reset('UserReviewsForm'));
                    //history.push('/siteadmin/user-reviews')
                }
            } else if (data.writeUserReview.status === '404') {
                toastr.error("Failed to update!", "List ID is not available!");
            } else {
                toastr.error("Failed to update!", "Your changes to admin review is failed!");
            }
        }
    }
    render() {
        const { formatMessage } = this.props.intl;
        const { error, handleSubmit, submitting,  initialValues } = this.props;
        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <div>
                    <h1 className={s.headerTitle}><FormattedMessage {...messages.managementReviews} /></h1>
                    
                    <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
                    <div className={cx(s.space4, bt.textAlignRight, 'textAlignLeftRtl')}>
                        <Link to={"/siteadmin/user-reviews"} className={cx(bt.btnPrimaryBorder, bt.btnLarge, bt.noTextDecoration, bt.btnPrimaryLink)}>
                            <FormattedMessage {...messages.goBack} />
                        </Link>
                    </div>
                        <Panel className={s.panelHeader}>
                            <form onSubmit={handleSubmit(this.submitForm)}>
                                {error && <strong>{formatMessage(error)}</strong>}
                                <Field name="reviewContent"
                                    component={this.renderFormControlTextArea}
                                    className={s.textareaInput}
                                    label={formatMessage(messages.reviewContentLabel)}
                                />
                                <Field name="rating"
                                    component={this.renderStarRating}
                                    label={formatMessage(messages.reviewRating)} />
                                <FormGroup className={s.space3}>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12} className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                                            <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting} >
                                                <FormattedMessage {...messages.submit} />
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

UserReviewsForm = reduxForm({
    form: 'UserReviewsForm', // a unique name for this form
    validate
})(UserReviewsForm);

export default compose(injectIntl,
    withStyles(s, bt),
    graphql(WriteUserReviewMutation)
)(UserReviewsForm);