import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';

// Redux
import { connect } from 'react-redux';

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
import s from './SearchSettingsForm.css';
import bt from '../../../components/commonStyle.css';
import submit from './submit';
import validate from './validate';

// Translation
import messages from '../../../locale/messages';

class SearchSettingsForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };

  componentWillMount() {
    const { initialize, initialValues } = this.props;
    if (initialValues != undefined) {
      initialize(initialValues);
    }
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={3}>
            <label className={s.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={9}>
            <FormControl {...input}  type={type} className={bt.commonControlInput} />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>
    );
  }

  renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={3}>
            <label className={s.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={12} lg={9}>
            <div className={cx(s.select, s.currencyselect, 'searchSelectRTL')}>
              <FormControl componentClass="select" {...input} className={cx(bt.commonControlSelect, 'commonAdminSelect')} >
                {children}
              </FormControl>
            </div>
          </Col>
        </Row>
      </FormGroup>
    )
  }


  render() {
    const { formatMessage } = this.props.intl;
    const { error, handleSubmit, submitting, dispatch } = this.props;
    const { base, availableCurrencies } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}> <FormattedMessage {...messages.searchSettings} /></h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={s.panelHeader}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{formatMessage(error)}</strong>}
                <Field name="minPrice" type="text" component={this.renderFormControl} label={formatMessage(messages.minimumPrice)} />
                <Field name="maxPrice" type="text" component={this.renderFormControl} label={formatMessage(messages.maximumPrice)} />
                <Field name="priceRangeCurrency" component={this.renderFormControlSelect} label={formatMessage(messages.priceRangeCurrency)} >
                  {
                    availableCurrencies != null && availableCurrencies.length > 0 && availableCurrencies.map((currency, key) => {
                      if (currency.isEnable === true) {
                        return <option key={key} value={currency.symbol}>{currency.symbol}</option>
                      }
                    })
                  }
                </Field>
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                      <Button bsSize="small" className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting} >
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

SearchSettingsForm = reduxForm({
  form: 'SearchSettingsForm', // a unique name for this form
  validate
})(SearchSettingsForm);

const mapState = (state) => ({
  availableCurrencies: state.currency.availableCurrencies,
  base: state.currency.base,
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(SearchSettingsForm)));