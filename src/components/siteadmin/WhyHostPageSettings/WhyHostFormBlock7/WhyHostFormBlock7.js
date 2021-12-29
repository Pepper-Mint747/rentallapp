import React, { Component } from 'react';
import { Field, reduxForm, change, initialize, reset } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
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
import s from './WhyHostFormBlock7.css';
import bt from '../../../../components/commonStyle.css';
import { object } from 'twilio/lib/base/serialize';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

class WhyHostFormBlock7 extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);

    this.state = {
      addMore: ['1'],
      addMoreCount: 1
    };
    this.handleAddMore = this.handleAddMore.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    const { initialValues } = this.props
    const { addMore, addMoreCount } = this.state

    let list = []
    let num = 0
    const values = Object.keys(initialValues).map((item) => {
      if (item.startsWith('faqTitle') && initialValues[item] != '') {
        num = num + 1
        return list.push(`${num}`)
      }
    })
    if (list.length < 1) {
      this.setState({
        addMore: ["1"],
        addMoreCount: 1
      })
    } else {
      this.setState({
        addMore: list,
        addMoreCount: num
      })
    }

  }

  handleAddMore() {
    const { addMore, addMoreCount } = this.state

    let count = addMoreCount + 1
    let addMoreUpdate = addMore.concat(`${count}`)
    if (count < 9) {
      this.setState({
        addMore: addMoreUpdate,
        addMoreCount: count
      })
    }
  }

  async handleRemove() {
    const { addMore, addMoreCount } = this.state
    const { change } = this.props

    let addMoreUpdate = addMore.filter((item) => item != addMoreCount)
    let count = addMoreCount - 1
    if (count >= 1) {
      this.setState({
        addMore: addMoreUpdate,
        addMoreCount: count
      })

      await change(`faqTitle${addMoreCount}`, '')
      await change(`faqContent${addMoreCount}`, '')
    }
  }

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
    const { addMore } = this.state

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.whyBecomeHostBlock7} /></h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}

                {
                  addMore.includes('1') && <div>
                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={3}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.faqBlockTitle} /> 1</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                          <Field
                            name="faqTitle1"
                            type="text"
                            component={this.renderFormControl}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={3}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.faqBlockContent} /> 1</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                          <Field
                            name="faqContent1"
                            component={this.renderFormControlTextArea}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </div>
                }

                {
                  addMore.includes('2') && <div>
                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={3}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.faqBlockTitle} /> 2</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                          <Field
                            name="faqTitle2"
                            type="text"
                            component={this.renderFormControl}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={22} sm={12} md={12} lg={3}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.faqBlockContent} /> 2</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                          <Field
                            name="faqContent2"
                            component={this.renderFormControlTextArea}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                  </div>
                }
                {
                  addMore.includes('3') && <div>
                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={3}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.faqBlockTitle} /> 3</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                          <Field
                            name="faqTitle3"
                            type="text"
                            component={this.renderFormControl}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={22} sm={12} md={12} lg={3}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.faqBlockContent} /> 3</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                          <Field
                            name="faqContent3"
                            component={this.renderFormControlTextArea}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                  </div>
                }
                {
                  addMore.includes('4') && <div>
                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={3}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.faqBlockTitle} /> 4</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                          <Field
                            name="faqTitle4"
                            type="text"
                            component={this.renderFormControl}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={22} sm={12} md={12} lg={3}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.faqBlockContent} /> 4</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                          <Field
                            name="faqContent4"
                            component={this.renderFormControlTextArea}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                  </div>
                }
                {
                  addMore.includes('5') && <div>
                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={3}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.faqBlockTitle} /> 5</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                          <Field
                            name="faqTitle5"
                            type="text"
                            component={this.renderFormControl}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={22} sm={12} md={12} lg={3}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.faqBlockContent} /> 5</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                          <Field
                            name="faqContent5"
                            component={this.renderFormControlTextArea}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                  </div>
                }
                {
                  addMore.includes('6') && <div>
                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={3}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.faqBlockTitle} /> 6</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                          <Field
                            name="faqTitle6"
                            type="text"
                            component={this.renderFormControl}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={22} sm={12} md={12} lg={3}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.faqBlockContent} /> 6</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                          <Field
                            name="faqContent6"
                            component={this.renderFormControlTextArea}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                  </div>
                }
                {
                  addMore.includes('7') && <div>
                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={3}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.faqBlockTitle} /> 7</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                          <Field
                            name="faqTitle7"
                            type="text"
                            component={this.renderFormControl}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={22} sm={12} md={12} lg={3}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.faqBlockContent} /> 7</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                          <Field
                            name="faqContent7"
                            component={this.renderFormControlTextArea}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                  </div>
                }
                {
                  addMore.includes('8') && <div>
                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={12} sm={12} md={12} lg={3}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.faqBlockTitle} /> 8</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                          <Field
                            name="faqTitle8"
                            type="text"
                            component={this.renderFormControl}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                    <FormGroup className={s.space3}>
                      <Row>
                        <Col xs={22} sm={12} md={12} lg={3}>
                          <label className={s.labelTextNew} ><FormattedMessage {...messages.faqBlockContent} /> 8</label>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9}>
                          <Field
                            name="faqContent8"
                            component={this.renderFormControlTextArea}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                  </div>
                }
                <FormGroup className={s.noMargin}>
                  <Row>
                    <Col xs={12} sm={12} md={4} lg={4} className={s.space2}>
                      <Button className={cx(bt.btnPrimary, bt.btnLarge, s.btnWidth)} type="button" disabled={submitting} onClick={() => this.handleAddMore()}>
                        <FormattedMessage {...messages.addLabel} />
                      </Button>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} className={s.space2}>
                      <Button className={cx(bt.btnPrimary, bt.btnLarge, s.btnWidth)} type="submit" disabled={submitting}>
                        <FormattedMessage {...messages.save} />
                      </Button>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} className={s.space2}>
                      <Button className={cx(bt.btnPrimaryBorder, bt.btnLarge, s.btnWidth, bt.nofocus)} type="button" disabled={submitting} onClick={() => this.handleRemove()}>
                        <FormattedMessage {...messages.remove} />
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
WhyHostFormBlock7 = reduxForm({
  form: 'WhyHostForm',
  validate
})(WhyHostFormBlock7);

let mapState = (state) => ({})

let mapDispatch = {
  change,
  // reset
}

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(WhyHostFormBlock7)))