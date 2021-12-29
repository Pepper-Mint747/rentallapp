import React from 'react';

import { Table, Tr, Td, Thead, Th} from 'reactable';
import { connect } from 'react-redux';
import {
  Button,
} from 'react-bootstrap';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminRolesManagement.css';
import bt from '../../../components/commonStyle.css';

// Redux Actions
import { openAdminRolesModal } from '../../../actions/siteadmin/modalActions';
import { deleteAdminRole } from '../../../actions/siteadmin/AdminRoles/manageAdminRoles';

// Components
import AdminRolesModal from '../AdminRolesModal';
import Link from '../../Link';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class AdminRolesManagement extends React.Component {

  static defaultProps = {
    data: []
  };

  render() {
    const { data, openAdminRolesModal, deleteAdminRole } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}> <FormattedMessage {...messages.manageAdminRoles} /></h1>
          <AdminRolesModal />
          <div className={s.space4}>
            <Button
              className={cx(bt.btnPrimary, bt.btnLarge)}
              onClick={() => openAdminRolesModal('add')}
            >
              <FormattedMessage {...messages.addNewLabel} />
            </Button>
          </div>
          <div className={cx('table-responsive', 'tableBorderRadiusAdmin', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin')}>
            <Table
              className="table"
              noDataText={formatMessage(messages.noRecordFound)}
            >
             <Thead>
              <Th scope="col">{formatMessage(messages.idLabel)}</Th>
              <Th scope="col">{formatMessage(messages.name)}</Th>
              <Th scope="col">{formatMessage(messages.descriptionAdminLabel)}</Th>
              <Th scope="col">{formatMessage(messages.editLabel)}</Th>
              <Th scope="col">{formatMessage(messages.delete)}</Th>
            </Thead>
              {
                data && data.length > 0 && data.map((value, key) => {
                  return (
                    <Tr key={key}>
                      <Td data-label={formatMessage(messages.idLabel)} column={formatMessage(messages.idLabel)} data={value.id} />
                      <Td data-label={formatMessage(messages.name)} column={formatMessage(messages.name)} data={value.name} />
                      <Td data-label={formatMessage(messages.descriptionAdminLabel)} column={formatMessage(messages.descriptionAdminLabel)} data={value.description} />
                      <Td data-label={formatMessage(messages.editLabel)} column={formatMessage(messages.editLabel)}>
                        <Link noLink onClick={() => openAdminRolesModal('edit', value)}><FormattedMessage {...messages.editLabel} /></Link>
                      </Td>
                      <Td data-label={formatMessage(messages.delete)} column={formatMessage(messages.delete)}>
                        <Link noLink onClick={() => deleteAdminRole(value.id)}><FormattedMessage {...messages.delete} /></Link>
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
  openAdminRolesModal,
  deleteAdminRole
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AdminRolesManagement)));