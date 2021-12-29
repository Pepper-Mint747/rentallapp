// General
import React, { Component } from 'react';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './AdminRolesModal.css';
import {
  Modal
} from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { closeAdminRolesModal } from '../../../actions/siteadmin/modalActions';

// Component
import AdminRolesForm from '../AdminRolesForm';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';


class AdminRolesModal extends Component {
  static defaultProps = {
    adminRolesModalType: 'add'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { closeAdminRolesModal, adminRolesModal, adminRolesModalType } = this.props;

    return (
      <div>
        <Modal show={adminRolesModal} onHide={closeAdminRolesModal} className={'adminModal'}>
          <Modal.Header closeButton>
            <Modal.Title>{adminRolesModalType == 'add' ? <FormattedMessage {...messages.addLabel} /> : <FormattedMessage {...messages.editLabel} />} <FormattedMessage {...messages.adminRoleLabel} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={cx(s.modalRoot, s.modalBorderBottom)}>
                <AdminRolesForm />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}


const mapState = (state) => ({
  adminRolesModal: state.adminModalStatus.adminRolesModal,
  adminRolesModalType: state.adminModalStatus.adminRolesModalType
});

const mapDispatch = {
  closeAdminRolesModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(AdminRolesModal));