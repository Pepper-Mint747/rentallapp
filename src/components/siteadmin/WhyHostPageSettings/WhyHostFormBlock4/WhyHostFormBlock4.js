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
import s from './WhyHostFormBlock4.css';
import bt from '../../../../components/commonStyle.css';
import Image from './Image'

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

class WhyHostFormBlock4 extends Component {

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
                    <h1 className={s.headerTitle}><FormattedMessage {...messages.whyBecomeHostBlock4} /></h1>
                    <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
                        <Panel className={s.panelHeader}>
                            <form onSubmit={handleSubmit(submit)}>
                                {error && <strong>{formatMessage(error)}</strong>}
                                <FormGroup className={s.space3}>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={3}>
                                            <label className={s.labelTextNew} ><FormattedMessage {...messages.coverSectionBannerLabel} /></label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={9}>
                                            <Image />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup className={s.space3}>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={3}>
                                            <label className={s.labelTextNew} ><FormattedMessage {...messages.coverSectionTitleLabel} /> 1</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={9}>
                                            <Field
                                                name="coverSectionTitle1"
                                                type="text"
                                                component={this.renderFormControl}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup className={s.space3}>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={6} className={s.noPadding}>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <label className={s.labelTextNew} ><FormattedMessage {...messages.coverSectionContentLabel} /> 1</label>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <Field
                                                    name="coverSectionContent1"
                                                    component={this.renderFormControlTextArea}
                                                />
                                            </Col>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={6} className={s.noPadding}>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <label className={s.labelTextNew} ><FormattedMessage {...messages.coverSectionContentLabel} /> 2</label>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <Field
                                                    name="coverSectionContent2"
                                                    component={this.renderFormControlTextArea}
                                                />
                                            </Col>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup className={s.space3}>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={3}>
                                            <label className={s.labelTextNew} ><FormattedMessage {...messages.coverSectionFeatureLabel} /> 1</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={9}>
                                            <Field
                                                name="coverSectionFeature1"
                                                component={this.renderFormControlTextArea}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup className={s.space3}>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={3}>
                                            <label className={s.labelTextNew} ><FormattedMessage {...messages.coverSectionFeatureLabel} /> 2</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={9}>
                                            <Field
                                                name="coverSectionFeature2"
                                                component={this.renderFormControlTextArea}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup className={s.space3}>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={3}>
                                            <label className={s.labelTextNew} ><FormattedMessage {...messages.coverSectionFeatureLabel} /> 3</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={9}>
                                            <Field
                                                name="coverSectionFeature3"
                                                component={this.renderFormControlTextArea}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup className={s.space3}>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={3}>
                                            <label className={s.labelTextNew} ><FormattedMessage {...messages.coverSectionFeatureLabel} /> 4</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={9}>
                                            <Field
                                                name="coverSectionFeature4"
                                                component={this.renderFormControlTextArea}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup className={s.space3}>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={3}>
                                            <label className={s.labelTextNew} ><FormattedMessage {...messages.coverSectionFeatureLabel} /> 5</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={9}>
                                            <Field
                                                name="coverSectionFeature5"
                                                component={this.renderFormControlTextArea}
                                            />
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup className={s.space3}>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={3}>
                                            <label className={s.labelTextNew} ><FormattedMessage {...messages.coverSectionFeatureLabel} /> 6</label>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={9}>
                                            <Field
                                                name="coverSectionFeature6"
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

WhyHostFormBlock4 = reduxForm({
    form: 'WhyHostForm',
    validate
})(WhyHostFormBlock4);

export default injectIntl(withStyles(s, bt)(WhyHostFormBlock4));