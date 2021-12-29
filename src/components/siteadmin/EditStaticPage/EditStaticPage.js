import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditStaticPage.css';
import bt from '../../../components/commonStyle.css';
import { Field, reduxForm, change } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { injectIntl } from 'react-intl';

// Style
import {
  Button,
  FormGroup,
  FormControl,
  Col,
  Row,
  Panel,
} from 'react-bootstrap';
import Link from '../../Link';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';


class EditStaticPage extends React.Component {

  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill')
    }
    this.state = { editorHtml: '' } // You can also pass a Quill Delta here

  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
  };

  renderFormControl = ({ input, label, placeholder, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={3} lg={3}>
            <label className={s.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={9} lg={9}>
            <FormControl {...input} type={type} className={bt.commonControlInput} />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
          </Col>
        </Row>
      </FormGroup>
    );
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <FormGroup className={s.space3}>
        <Row>
          <Col xs={12} sm={12} md={3} lg={3}>
            <label className={s.labelTextNew} >{label}</label>
          </Col>
          <Col xs={12} sm={12} md={9} lg={9}>
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

  renderQuill = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    const ReactQuill = this.ReactQuill;
    let modules = {
      toolbar: [
        [{ 'header': '1' }, { 'header': '2' }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        // ['link', 'image'],
      ],
      clipboard: {
        matchVisual: false,
      }
    };

    let formats = [
      'header', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link'
      // 'link', 'image'
    ];
    return (
      <div>
        <ReactQuill
          {...input}
          onChange={(newValue, delta, source) => {
            if (source === 'user') {
              input.onChange(newValue);
            }
          }}
          onBlur={(range, source, quill) => {
            if (quill.getHTML() == '<p><br></p>') {
              input.onBlur('');
            }
            else {
              input.onBlur(quill.getHTML());
            }
          }}
          modules={modules}
          formats={formats}
          theme="snow"
        />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}

      </div>
    );
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues } = this.props;
    const { parentData } = this.props;
    const ReactQuill = this.ReactQuill;
    const gobackcss = { padding: '10px' };
    const { formatMessage } = this.props.intl;
    if (typeof window !== 'undefined' && ReactQuill) {
      return (
        <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <h1 className={s.headerTitle}> <FormattedMessage {...messages.editPageDetails} /></h1>
              <div className={cx(s.space4, bt.textAlignRight, 'textAlignLeftRtl')}>
                <Link to={"/siteadmin/staticpage/management"} className={cx(bt.btnPrimaryBorder, bt.btnLarge, bt.noTextDecoration, bt.btnPrimaryLink)}>
                  <FormattedMessage {...messages.goBack} />
                </Link>
              </div>
              <Panel className={s.panelHeader}>
                <form onSubmit={handleSubmit(submit)}>
                  {error && <strong>{formatMessage(error)}</strong>}
                  <Field name="metaTitle" type="text" component={this.renderFormControl} label={formatMessage(messages.metaTitleLabel)} placeholder={formatMessage(messages.metaTitleLabel)} />
                  <Field name="metaDescription" className={s.textareaInput} component={this.renderFormControlTextArea} label={formatMessage(messages.metaDescriptionLabel)}
                    placeholder={formatMessage(messages.metaDescriptionLabel)} />
                  <FormGroup className={s.space3}>
                    <Row>
                      <Col xs={12} sm={12} md={3} lg={3}>
                        <label className={s.labelTextNew} ><FormattedMessage {...messages.contentLabel} /></label>
                      </Col>
                      <Col xs={12} sm={12} md={9} lg={9}>
                        <Field name="content" component={this.renderQuill} />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className={s.space1}>
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
          </Row>
        </div>
      );
    } else {
      return <textarea />;
    }
  }

}

EditStaticPage = reduxForm({
  form: 'EditStaticPage', // a unique name for this form
  validate
})(EditStaticPage);



const mapState = (state) => ({});

const mapDispatch = {
  change
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(EditStaticPage)));