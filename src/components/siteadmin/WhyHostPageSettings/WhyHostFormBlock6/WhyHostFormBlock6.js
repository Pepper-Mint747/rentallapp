import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import cx from 'classnames';
import {
    Button,
    Form,
    Row,
    FormGroup,
    Col,
    ControlLabel,
    FormControl,
    Panel
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHostFormBlock6.css';
import bt from '../../../../components/commonStyle.css';
import Image from './Image'
import Image2 from './Image2'

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

class WhyHostFormBlock6 extends Component {

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
                <FormControl {...input} placeholder={label} type={type} className={bt.commonControlInput} />
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </FormGroup>
        )
    }


    render() {

        const { error, handleSubmit, submitting, dispatch, initialValues } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <div>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <h1 className={s.headerTitle}><FormattedMessage {...messages.whyBecomeHostBlock6} /></h1>
                            <form onSubmit={handleSubmit(submit)}>
                                {error && <strong>{formatMessage(error)}</strong>}
                                <Row>
                                    <Col xs={12} sm={12} md={6} lg={6} className={cx(s.space3, s.noPadding)}>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <label className={s.labelTextNew} ><FormattedMessage {...messages.quoteSectionBanner} /> 1</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <Image />
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <label className={s.labelTextNew} ><FormattedMessage {...messages.quoteSectionTitle} /> 1</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <Field
                                                name="quoteSectionTitle1"
                                                type="text"
                                                component={this.renderFormControl}
                                            />
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <label className={s.labelTextNew} ><FormattedMessage {...messages.quoteSectionContent} /> 1</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <Field
                                                name="quoteSectionContent1"
                                                component={this.renderFormControlTextArea}
                                            />
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <label className={s.labelTextNew} ><FormattedMessage {...messages.quoteSectionButton} /> 1</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <Field
                                                name="quoteSectionButton1"
                                                type="text"
                                                component={this.renderFormControl}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} sm={12} md={6} lg={6} className={cx(s.space3, s.noPadding)}>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <label className={s.labelTextNew} ><FormattedMessage {...messages.quoteSectionBanner} /> 2</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <Image2 />
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <label className={s.labelTextNew} ><FormattedMessage {...messages.quoteSectionTitle} /> 2</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <Field
                                                name="quoteSectionTitle2"
                                                type="text"
                                                component={this.renderFormControl}
                                            />
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <label className={s.labelTextNew} ><FormattedMessage {...messages.quoteSectionContent} /> 2</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <Field
                                                name="quoteSectionContent2"
                                                component={this.renderFormControlTextArea}
                                            />
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <label className={s.labelTextNew} ><FormattedMessage {...messages.quoteSectionButton} /> 2</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <Field
                                                name="quoteSectionButton2"
                                                type="text"
                                                component={this.renderFormControl}
                                            />
                                        </Col>
                                    </Col>
                                </Row>
                                <FormGroup className={s.space3}>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12} className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                                            <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting}>
                                                <FormattedMessage {...messages.save} />
                                            </Button>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </form>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

}

WhyHostFormBlock6 = reduxForm({
    form: 'WhyHostForm',
    validate
})(WhyHostFormBlock6);

export default injectIntl(withStyles(s, bt)(WhyHostFormBlock6));