// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Redux Form
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListSettingsForm.css';
import bt from '../../../components/commonStyle.css';
import {
  Button,
  FormGroup,
  FormControl,
  Col,
  Row,
} from 'react-bootstrap';
import DropZone from './DropZone'
import { url } from '../../../config'

// Asset
import defaultPic from '../../../../public/adminIcons/defaultAdmin.svg';
import DeleteIcon from '../../../../public/adminIcons/dlt.png';

class AddListSettingsForm extends Component {

  static propTypes = {
    fieldType: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      fieldType: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const { fieldType } = this.props;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fieldType } = nextProps;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <label className={s.labelTextNew}>{label}</label>
        <FormControl {...input} type={type} className={className} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup>
        <label className={s.labelTextNew}>{label}</label>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
        >
          {children}
        </FormControl>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </FormGroup>
    );
  }

  async handleChange(e){
    const { change } = this.props;   
    await change('image', null)     
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, typeId, initialValues, image } = this.props;
    const { formatMessage } = this.props.intl;
    const { fieldType } = this.state;

    return (
      <div className={cx(s.formMaxWidth, 'maxwidthcenter', 'empty')}>
        <form onSubmit={handleSubmit(submit)}>
          {error && <strong>{formatMessage(error)}</strong>}
          <FormGroup className={s.space3}>
            <Field
              name="itemName"
              type="text"
              component={this.renderFormControl}
              label={formatMessage(messages.addItemNew)}
              className={cx(bt.commonControlInput)}
            />
          </FormGroup>
          {
            (typeId === 11 || typeId === 10) &&
            <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
              <p className={s.labelTextNew}><FormattedMessage {...messages.IconLabel} /></p>
              <div className={bt.picContainerMain}>
                <div className={bt.picContainer}>
                  <p className={cx('hidden-md hidden-lg hidden-sm')}>&nbsp;</p>
                  {image && <div
                    style={{ backgroundImage: `url(/images/amenities/${image})` }}
                    className={s.bannerImageBg}
                  />}
                  {image == null && <div
                    style={{ backgroundImage: `url(${defaultPic})` }}
                    className={bt.profileImageBg}
                  />}
                  {
                  image && <a href="javascript:void(0);" onClick={() => this.handleChange()}
                    className={bt.trashIconNew}>
                    <img src={DeleteIcon} />
                  </a>
                }
                </div>
              </div>
              <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2, s.noPadding)}>
                <div className={cx(s.fullWidth, bt.btnPrimary, s.noPadding, 'photoUploadBtn')}>
                  <DropZone formName={'AddListSettingsForm'} defaultMessage={formatMessage(messages.UploadImage)} />
                </div>
              </Col>
            </Col>
          }
          {
            typeId === 1 && <FormGroup className={s.space3}>
              <Field
                name="itemDescription"
                component={this.renderFormControlTextArea}
                label={formatMessage(messages.addNewDescription)}
                className={cx(bt.commonControlInput, s.space3)}
              />
            </FormGroup>
          }
          {
            fieldType == "numberType" && <div>
              <FormGroup className={s.space3}>
                <Field
                  name="otherItemName"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.addOtherItem)}
                  className={bt.commonControlInput}
                />
              </FormGroup>
              <FormGroup className={s.space3}>
                <Field
                  name="startValue"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.startValue)}
                  className={bt.commonControlInput}
                />
              </FormGroup>
              <FormGroup className={s.space3}>
                <Field
                  name="endValue"
                  type="text"
                  component={this.renderFormControl}
                  label={formatMessage(messages.endValue)}
                  className={bt.commonControlInput}
                />
              </FormGroup>
            </div>
          }
          <FormGroup className={s.space1}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} className={cx(bt.textAlignRight, s.spaceTop3, 'textAlignLeftRtl')}>
                <Button className={cx(bt.btnPrimaryBorder, bt.btnLarge)} type="submit" disabled={submitting}>
                  {formatMessage(messages.add)}
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </form>
      </div>
    )
  }

}

AddListSettingsForm = reduxForm({
  form: "AddListSettingsForm", // a unique name for this form
  validate,
})(AddListSettingsForm);

// Decorate with connect to read form values
const selector = formValueSelector("AddListSettingsForm"); // <-- same as form name

const mapState = (state) => ({
  typeId: selector(state, 'typeId'),
  image: selector(state, 'image')
});

const mapDispatch = {
  change
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AddListSettingsForm)));