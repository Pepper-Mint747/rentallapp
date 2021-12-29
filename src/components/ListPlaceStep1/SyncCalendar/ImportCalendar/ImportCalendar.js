import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImportCalendar.css';
import bt from '../../../../components/commonStyle.css';
import cx from 'classnames';
import {
  Button,
  FormGroup,
  FormControl,
  Modal,
  Panel
} from 'react-bootstrap';
import validate from './validate';

// Locale
import messages from '../../../../locale/messages';

// Redux Action
import { importiCal } from '../../../../actions/Listing/ImportCalendar';

class ImportCalendar extends React.Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    close: PropTypes.any.isRequired,
    reset: PropTypes.any.isRequired,
    importiCal: PropTypes.any.isRequired,
    listId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      name: ''
    }
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { showModal, dispatch, reset } = this.props;
    if (prevProps.showModal !== showModal) {
      dispatch(reset('ImportCalendar'));
    }
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    return (
      <FormGroup className={s.formGroup}>
        <FormControl {...input} placeholder={label} type={type} className={className} />
        {touched && error && <span className={s.errorMessage}>{this.props.intl.formatMessage(error)}</span>}
      </FormGroup>
    )
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  async submitForm() {
    const { reset, close, importiCal, listId, dispatch } = this.props;
    const { url, name } = this.state;
    close();
    importiCal(listId, name, url)
    dispatch(reset('ImportCalendar'));
  }

  render() {
    const { showModal, close, error, handleSubmit, submitting } = this.props;
    const { url, name } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <Modal show={showModal} onHide={close} animation={false} className={cx(s.modalContainer, 'ContactHost')}>
          <div className={cx(s.modalTable)}>
            <div className={cx(s.modalCell)}>
              <Modal.Header className={s.modalHeading} closeButton>
                <Modal.Title><FormattedMessage {...messages.importCalendar} /></Modal.Title>
              </Modal.Header>
              <Modal.Body bsClass={s.logInModalBody}>
                <Panel className={s.panelHeader}>
                  <form>
                    <div className={s.panelBody}>
                      <p className={s.introText}>
                        <FormattedMessage {...messages.importCalendarDesc} />
                      </p>
                      <div className={s.space3}>
                        <label className={s.labelText}><FormattedMessage {...messages.importCalendarDesc1} /></label>
                        <Field
                          name="url"
                          type="text"
                          component={this.renderFormControl}
                          label={formatMessage(messages.calendarAddress)}
                          className={cx(s.formControlInput, bt.commonControlInput)}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className={s.space3}>
                        <label className={s.labelText}><FormattedMessage {...messages.name} /></label>
                        <Field
                          name="name"
                          type="text"
                          component={this.renderFormControl}
                          label={formatMessage(messages.calendarAddress)}
                          className={cx(s.formControlInput, bt.commonControlInput)}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className={cx(s.space3, bt.textAlignRight)}>
                        <Button
                          className={cx(s.button, bt.btnLarge, bt.btnPrimary)}
                          type="button"
                          disabled={submitting}
                          onClick={handleSubmit(this.submitForm)}
                        >
                          <FormattedMessage {...messages.importCalendarBtn} />
                        </Button>
                      </div>
                    </div>
                  </form>
                </Panel>
              </Modal.Body>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

ImportCalendar = reduxForm({
  form: 'ImportCalendar', // a unique name for this form
  validate,
  shouldValidate: () => true
})(ImportCalendar);

const mapState = (state) => ({
});

const mapDispatch = {
  importiCal
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ImportCalendar)));
