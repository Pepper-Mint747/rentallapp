// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListSettingsModal.css';
import {
  Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeListSettingsModal } from '../../../actions/siteadmin/modalActions';


// Translation
import messages from '../../../locale/messages';
import { defineMessages, FormattedMessage } from 'react-intl';
// const messages = defineMessages({
// });

// Component
import ListSettingsForm from '../ListSettingsForm';


class ListSettingsModal extends Component {
  static propTypes = {
    closeListSettingsModal: PropTypes.any,
    listSettingsModal: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      listSettingsModalStatus: false
    }
  }

  componentDidMount() {
    const { listSettingsModal } = this.props;
    if (listSettingsModal === true) {
      this.setState({ listSettingsModalStatus: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { listSettingsModal } = nextProps;

    if (listSettingsModal === true) {
      this.setState({ listSettingsModalStatus: true });
    } else {
      this.setState({ listSettingsModalStatus: false });
    }
  }

  render() {
    const { closeListSettingsModal } = this.props;
    const { listSettingsModalStatus } = this.state;

    return (
      <div>
        <Modal show={listSettingsModalStatus} onHide={closeListSettingsModal} className={'adminModal'} >
          <Modal.Header closeButton>
            <Modal.Title><FormattedMessage {...messages.listSettings} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={cx(s.modalRoot, s.modalBorderBottom)}>
              <ListSettingsForm />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}


const mapState = (state) => ({
  listSettingsModal: state.adminModalStatus.listSettingsModal,
});

const mapDispatch = {
  closeListSettingsModal,
};

export default withStyles(s)(connect(mapState, mapDispatch)(ListSettingsModal));
