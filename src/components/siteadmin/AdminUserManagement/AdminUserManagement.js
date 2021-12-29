import React from 'react';

import { Table, Tr, Td, Thead, Th} from 'reactable';
import { connect } from 'react-redux';
import {
  Button,
} from 'react-bootstrap';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminUserManagement.css';
import bt from '../../../components/commonStyle.css';

// Redux Actions
import { openAdminUserModal } from '../../../actions/siteadmin/modalActions';
import { deleteAdminUser } from '../../../actions/siteadmin/AdminUser/manageAdminUser';

// Components
import AdminUserModal from '../AdminUserModal';
import Link from '../../Link';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class AdminUserManagement extends React.Component {

  static defaultProps = {
    data: [],
    roles: []
  };

  render() {
    const { data, openAdminUserModal, deleteAdminUser, roles } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.manageAdminUsers} /></h1>
          <AdminUserModal roles={roles} />
          <div className={s.space4}>
            <Button
              className={cx(bt.btnPrimary, bt.btnLarge)}
              onClick={() => openAdminUserModal('add')}>
              <FormattedMessage {...messages.addNewLabel} />
            </Button>
          </div>
          <div className={cx('table-responsive', 'tableBorderRadiusAdmin', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin')}>
            <Table  className={'table'} noDataText={formatMessage(messages.noRecordFound)}>
            <Thead>
              <Th scope="col">{formatMessage(messages.sNoLabel)}</Th>
              <Th scope="col">{formatMessage(messages.emailLabel)}</Th>
              <Th scope="col">{formatMessage(messages.adminRoleLabel)}</Th>
              <Th scope="col">{formatMessage(messages.editLabel)}</Th>
              <Th scope="col">{formatMessage(messages.delete)}</Th>
            </Thead>
              {
                data && data.length > 0 && data.map((value, key) => {
                  return (
                    <Tr key={key}>
                      <Td data-label={formatMessage(messages.sNoLabel)}  column={formatMessage(messages.sNoLabel)} data={key + 1} />
                      <Td data-label={formatMessage(messages.emailLabel)} column={formatMessage(messages.emailLabel)} data={value.email} />
                      <Td data-label={formatMessage(messages.adminRoleLabel)} column={formatMessage(messages.adminRoleLabel)} data={value.adminRole && value.adminRole.name} />
                      <Td data-label={formatMessage(messages.editLabel)} column={formatMessage(messages.editLabel)}>
                        <Link noLink onClick={() => openAdminUserModal('edit', value)}><FormattedMessage {...messages.editLabel} /></Link>
                      </Td>
                      <Td data-label={formatMessage(messages.delete)} column={formatMessage(messages.delete)}>
                        <Link noLink onClick={() => deleteAdminUser(value.id)}><FormattedMessage {...messages.delete} /></Link>
                      </Td>
                    </Tr>
                  )
                })
              }
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  openAdminUserModal,
  deleteAdminUser
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AdminUserManagement)));