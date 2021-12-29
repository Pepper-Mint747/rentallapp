import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Field, reduxForm } from 'redux-form';

import {
  Button,
  FormControl,
  Panel,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import bt from '../../../components/commonStyle.css';

// Helpers
import submit from './submit';
import validate from './validate';

// Component
import Avatar from '../../Avatar';

//Locale
import messages from '../../../locale/messages';

class SendMessage extends Component {
  static propTypes = {
    threadId: PropTypes.number.isRequired,
    profileId: PropTypes.number.isRequired,
    picture: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className, placeholder }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl
          {...input}
          className={className}
          componentClass="textarea"
          placeholder={placeholder}
        >
          {children}
        </FormControl>
        {touched && error && <span className={cx(s.errorMessage, 'errorMessageFieldRTL')}>{formatMessage(error)}</span>}
      </div>
    );
  }

  render() {
    const { profileId, picture, displayName } = this.props;
    const { error, handleSubmit, submitting, dispatch } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      // <Row className={cx(s.space6)}>
      //   <Col xs={12} sm={12} md={9} lg={10}>
      //     <Panel className={cx(s.panelBubble, s.panelBubbleRight, "messageTextArea")}>
      //       <form onSubmit={handleSubmit(submit)}>
      //         <div className={s.textBody}>
      //           <Field
      //             name="content"
      //             className={s.textBox}
      //             component={this.renderFormControlTextArea}
      //             placeholder={formatMessage(messages.writeMessage)}
      //           />
      //         </div>
      //         <div className={cx(s.panelDark)}>
      //           <div className={s.bottomButton}>
      //             <Button className={bt.btnPrimary} type="submit" disabled={submitting || error}>
      //               <FormattedMessage {...messages.sendMessage} />
      //             </Button>
      //           </div>
      //         </div>
      //       </form>
      //     </Panel>
      //   </Col>
      //   <Col md={3} lg={2} className={cx('text-right')}>
      //     <div className={cx(s.profileAvatarSection, s.hideSm)}>
      //       <Avatar
      //         source={picture}
      //         height={70}
      //         width={70}
      //         title={displayName}
      //         className={s.profileAvatar}
      //         withLink
      //         linkClassName={s.profileAvatarLink}
      //         profileId={profileId}
      //       />
      //     </div>
      //   </Col>
      // </Row>
      <div >
        <div className={cx(s.space6)}>
          <div className={s.displayTable}>
            <div className={s.displayTableRow}>
              <div className={cx(s.displayTableCell, s.displayTableWidth, s.radiusColor, 'sendMessageRadius')}>
                <Panel className={cx(s.panelBubble, s.panelBubbleRight, "messageTextArea", 'ViewBubbleRight')}>
                  <form onSubmit={handleSubmit(submit)}>
                    <div className={s.textBody}>
                      <Field
                        name="content"
                        className={s.textBox}
                        component={this.renderFormControlTextArea}
                        placeholder={formatMessage(messages.writeMessage)}
                      />
                    </div>
                    <div className={cx(s.panelDark)}>
                      <div className={cx(s.bottomButton, 'textAlignLeftRtl')}>
                        <Button className={cx(bt.btnPrimary)} type="submit" disabled={submitting || error}>
                          <FormattedMessage {...messages.sendMessage} />
                        </Button>
                      </div>
                    </div>
                  </form>
                </Panel>
              </div>
              <div className={cx(s.displayTableCellTop, s.displayTableWidthTwo)}>
                <div className={cx(s.profileAvatarSection, s.hideSm, 'profileAvatarRight')}>
                  <Avatar
                    source={picture}
                    height={70}
                    width={70}
                    title={displayName}
                    className={s.profileAvatar}
                    withLink
                    linkClassName={s.profileAvatarLink}
                    profileId={profileId}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    );
  }
}

SendMessage = reduxForm({
  form: 'SendMessage', // a unique name for this form
  validate
})(SendMessage);

export default injectIntl(withStyles(s, bt)(SendMessage));