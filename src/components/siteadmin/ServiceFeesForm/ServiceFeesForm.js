import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
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
import s from './ServiceFeesForm.css';
import bt from '../../../components/commonStyle.css';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class ServiceFeesForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
    base: PropTypes.string.isRequired,
    availableCurrencies: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired
    })).isRequired
  };

  renderFormControl = ({ input, label, type, meta: { touched, error }, className, placeholder }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={3}>
            <label className={s.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={9}>
            <FormControl {...input} placeholder={placeholder} type={type} className={bt.commonControlInput} />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>
    );
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={3}>
            <label className={s.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={9}>
            <div className={cx(s.select, s.currencyselect)}>
              <FormControl componentClass="select" {...input} className={cx(bt.commonControlSelect, 'commonAdminSelect')} >
                {children}
              </FormControl>
            </div>
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>
    )
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { error, handleSubmit, submitting, dispatch, initialValues } = this.props;
    const { base, availableCurrencies } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper, 'adminRadioBtn', 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.servicefeesSettings} /></h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={3}>
                      <label className={s.labelTextNew}><FormattedMessage {...messages.guestFeeType} /></label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={9}>
                      <label className={cx(s.labelTextNew, s.btnUPdate, bt.curderPointer)}>{' '}<Field name="guestType" component="input" type="radio" value="fixed" /> <span className={s.radioBtn}><FormattedMessage {...messages.fixedPrice} /></span> </label>
                      <label className={cx(s.labelTextNew, s.btnModalDelete, bt.curderPointer, 'adminDelete')}><Field name="guestType" component="input" type="radio" value="percentage" /> <span className={s.radioBtn}><FormattedMessage {...messages.percentage} /></span> </label>
                    </Col>
                  </Row>
                </FormGroup>
                <Field name="guestValue" type="text" component={this.renderFormControl} label={formatMessage(messages.guestServiceFee)}
                  placeholder={formatMessage(messages.guestServiceFeePlacehold)} />
                <FormGroup className={s.space3}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={3}>
                      <label className={s.labelTextNew}><FormattedMessage {...messages.hostFeeType} /></label>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={9}>
                      <label className={cx(s.labelTextNew, s.btnUPdate, bt.curderPointer)}><Field name="hostType" component="input" type="radio" value="fixed" /> <span className={s.radioBtn}><FormattedMessage {...messages.fixedPrice} /> </span></label>
                      <label className={cx(s.labelTextNew, s.btnModalDelete, bt.curderPointer, 'adminDelete')}><Field name="hostType" component="input" type="radio" value="percentage" /> <span className={s.radioBtn}><FormattedMessage {...messages.percentage} /></span> </label>
                    </Col>
                  </Row>
                </FormGroup>
                <Field name="hostValue" type="text" component={this.renderFormControl} label={formatMessage(messages.hostServiceFeeType)} placeholder={formatMessage(messages.guestServiceFeePlacehold)} />
                <Field name="currency" className={cx(bt.commonControlSelect, 'commonAdminSelect')} component={this.renderFormControlSelect} label={formatMessage(messages.currency)} >
                  <option value=""><FormattedMessage {...messages.chooseCurrency} /></option>
                  {
                    availableCurrencies.map((currency, key) => {
                      if (currency.isEnable === true) {
                        return <option key={key} value={currency.symbol}>{currency.symbol}</option>
                      }
                    })
                  }
                </Field>
                <FormGroup className={s.space3}>
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

ServiceFeesForm = reduxForm({
  form: 'ServiceFeesForm', // a unique name for this form
  validate
})(ServiceFeesForm);

const mapState = (state) => ({
  availableCurrencies: state.currency.availableCurrencies,
  base: state.currency.base,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ServiceFeesForm)));