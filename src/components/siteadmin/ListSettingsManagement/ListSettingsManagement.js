import React from 'react';

import { Table, Tr, Td, Thead, Th} from 'reactable';
import { graphql, compose } from 'react-apollo';

// Redux
import { connect } from 'react-redux';
import { openListSettingsModal } from '../../../actions/siteadmin/modalActions';
import { getAdminListingSettings } from '../../../actions/siteadmin/getAdminListingSettings';

// Component
import ListSettingsModal from '../ListSettingsModal';
import EditListSettingsForm from '../ListSettingsForm/EditListSettingsForm';
import Loader from '../../Loader';

// Style
import cx from 'classnames';
import {
  Button,
  Col
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListSettingsManagement.css';
import bt from '../../../components/commonStyle.css';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
import CustomPagination from '../../CustomPagination';

class ListSettingsManagement extends React.Component {

  static defaultProps = {
    loading: true
  };

  constructor(props) {
    super(props);
    this.paginationData = this.paginationData.bind(this);
  }

  async paginationData(currentPage, typeId) {
    const { getAdminListingSettings } = this.props;
    await getAdminListingSettings(typeId, currentPage);
  }

  renderTable(listSettingsTypeData, listSettingsData, count) {
    const { openListSettingsModal, page } = this.props;
    const { formatMessage } = this.props.intl;
    let currentTypeId = listSettingsTypeData && listSettingsTypeData.id;

    return (
      <div>
        <ListSettingsModal />
        <div className={s.space4}>
          <Button
            className={cx(bt.btnPrimary, bt.btnLarge)}
            onClick={() => openListSettingsModal({ typeId: listSettingsTypeData.id }, "AddListSettingsForm")}>
            <FormattedMessage {...messages.addNewLabel} />
          </Button>
        </div>
        <div className={cx('table-responsive', 'tableBorderRadiusAdmin', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin')}>
          <Table className="table" noDataText={formatMessage(messages.noRecordFound)}>
          <Thead>
              <Th scope="col">{formatMessage(messages.settingsIDLabel)}</Th>
              <Th scope="col">{formatMessage(messages.addItemNew)}</Th>
              <Th scope="col">{formatMessage(messages.status)}</Th>
              <Th scope="col">{formatMessage(messages.operationLabel)}</Th>
            </Thead>
            {
              listSettingsData && listSettingsData.length > 0 && listSettingsData.map(function (item, key) {
                let status = item.isEnable == 1 ? formatMessage(messages.enabledLabel) : formatMessage(messages.disabledLabel);

                return (
                  <Tr key={key}>
                    <Td data-label={formatMessage(messages.settingsIDLabel)} column={formatMessage(messages.settingsIDLabel)} data={item.id} />
                    <Td data-label={formatMessage(messages.addItemNew)} column={formatMessage(messages.addItemNew)} data={item.itemName} />
                    <Td data-label={formatMessage(messages.status)} column={formatMessage(messages.status)} data={status} />
                    <Td data-label={formatMessage(messages.operationLabel)} column={formatMessage(messages.operationLabel)}>
                        <Button className={cx(bt.btnPrimaryBorder, 'textCenterAdmin')} onClick={() => openListSettingsModal(item, "EditListSettingsForm")}>
                          <FormattedMessage {...messages.manageLabel} />
                        </Button>
                    </Td>
                  </Tr>
                )
              })
            }
          </Table>
        </div>
        {
          listSettingsData && listSettingsData.length > 0 && <div>
            <CustomPagination
              total={count}
              currentPage={page}
              defaultCurrent={1}
              defaultPageSize={10}
              change={(e) => this.paginationData(e, currentTypeId)}
              paginationLabel={formatMessage(messages.listSettings)}
            />
          </div>
        }
      </div>
    );
  }

  renderForm(listSettingsTypeData, listSettingsData) {
    return (
      <div>
        <EditListSettingsForm 
          initialValues={listSettingsData && listSettingsData.length > 0 && listSettingsData[0]} 
          fieldType={listSettingsTypeData.fieldType} 
        />
      </div>
    );
  }

  render() {
    const { loading, adminListSettings } = this.props;
    let listSettingsTypeData, listSettingsData, count, errorMessage, status;

    if (!loading && adminListSettings) {
      status = adminListSettings.getAllAdminListSettings && adminListSettings.getAllAdminListSettings.status;
      if (status === 200) {
        listSettingsTypeData = adminListSettings.getAllAdminListSettings.listSettingsTypeData;
        listSettingsData = adminListSettings.getAllAdminListSettings.listSettingsData;
        count = adminListSettings.getAllAdminListSettings.count;
      } else {
        errorMessage = adminListSettings.getAllAdminListSettings.errorMessage;
      }
    }

    return (
      <div>
        {
          loading && <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
            <div><Loader type={"text"} /></div>
          </div>  
        }
        {
          !loading && status === 200 && <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
            <div>
              <h1 className={s.headerTitle}>{listSettingsTypeData.typeLabel}</h1>
              {
                listSettingsTypeData.fieldType === 'numberType' && this.renderForm(listSettingsTypeData, listSettingsData)
              }
              {
                listSettingsTypeData.fieldType !== 'numberType' && this.renderTable(listSettingsTypeData, listSettingsData, count)
              }
            </div>
          </div>
        }
        {
          !loading && status !== 200 && <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
            <div>{errorMessage}</div>
          </div>
        }
      </div>
    );
  }
}

const mapState = (state) => ({
  loading: state.adminListSettingsData.loading,
  adminListSettings: state.adminListSettingsData.data,
  page: state.adminListSettingsData.currentPage
});

const mapDispatch = {
  openListSettingsModal,
  getAdminListingSettings
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch)
)(ListSettingsManagement);