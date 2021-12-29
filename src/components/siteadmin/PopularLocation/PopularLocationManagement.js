import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import moment from 'moment';
import Link from '../../../components/Link';
import Confirm from 'react-confirm-bootstrap';
import {
  Button
} from 'react-bootstrap';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PopularLocationManagement.css';
import bt from '../../../components/commonStyle.css';
import { deletePopularLocation, updateLocationStatus } from '../../../actions/siteadmin/deletePopularLocation';
import history from '../../../core/history';

// Translation
import { FormattedMessage, InjectedIntl, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class PopularLocationManagement extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      location: PropTypes.string,
      locationAddress: PropTypes.string,
      isEnable: PropTypes.string,
      images: PropTypes.string,
    })),
    deletePopularLocation: PropTypes.any,
    updateLocationStatus: PropTypes.any,
  };

  static defaultProps = {
    data: []
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    history.push('/siteadmin/popularlocation/add')
  }

  render() {
    const { data, deletePopularLocation, updateLocationStatus } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.popularLocation} /></h1>
          <div className={s.space4}>
            <Button onClick={this.handleClick} className={cx(bt.btnPrimary, bt.btnLarge)}>
              <FormattedMessage {...messages.addPopularLocation} />
            </Button>
          </div>
          <div className={cx('table-responsive', 'popularlocationlist', 'tableBorderRadiusAdmin', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin')}>
            <Table className="table"
              noDataText={formatMessage(messages.noRecordFound)}
            >
              <Thead>
                <Th scope="col">{formatMessage(messages.idLabel)}</Th>
                <Th scope="col">{formatMessage(messages.location)}</Th>
                <Th scope="col">{formatMessage(messages.locationAddress)}</Th>
                <Th scope="col">{formatMessage(messages.status)}</Th>
                <Th scope="col">{formatMessage(messages.setEnableDisable)}</Th>
                <Th scope="col">{formatMessage(messages.editLabel)}</Th>
                <Th scope="col">{formatMessage(messages.delete)}</Th>
              </Thead>
              {
                data && data.map(function (value, key) {
                  let isStatus;
                  return (
                    <Tr key={key}>
                      <Td data-label={formatMessage(messages.idLabel)} column={formatMessage(messages.idLabel)} data={value.id} />
                      <Td data-label={formatMessage(messages.location)} column={formatMessage(messages.location)} data={value.location} />
                      <Td data-label={formatMessage(messages.locationAddress)} column={formatMessage(messages.locationAddress)} className={s.imageurl} data={value.locationAddress} />
                      <Td data-label={formatMessage(messages.status)} column={formatMessage(messages.status)}>
                        {value.isEnable == 'true' ? formatMessage(messages.enabledLabel) : formatMessage(messages.disabledLabel)}
                      </Td>
                      <Td data-label={formatMessage(messages.setEnableDisable)} column={formatMessage(messages.setEnableDisable)}>
                        <a href="javascript:void(0)" onClick={() => updateLocationStatus(value.id, value.isEnable)} >
                          {value.isEnable == 'true' ? formatMessage(messages.disableLabel) : formatMessage(messages.enableLabel)}
                        </a>
                      </Td>
                      <Td data-label={formatMessage(messages.editLabel)} column={formatMessage(messages.editLabel)}>
                        <Link to={"/siteadmin/edit/popularlocation/" + value.id}>
                          <FormattedMessage {...messages.editLabel} />
                        </Link>
                      </Td>
                      <Td data-label={formatMessage(messages.delete)} column={formatMessage(messages.delete)}>
                        <div>
                          <Confirm
                            onConfirm={() => deletePopularLocation(value.id)}
                            body={formatMessage(messages.areYouSureDeleteWishList)}
                            confirmText={formatMessage(messages.confirmDelete)}
                            cancelText={formatMessage(messages.cancel)}
                            title={formatMessage(messages.deletePopularLocationLabel)}
                          >
                            <a href="javascript:void(0)"><FormattedMessage {...messages.delete} /></a>
                          </Confirm>
                        </div>
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

const mapState = (state) => ({
});

const mapDispatch = {
  deletePopularLocation,
  updateLocationStatus
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(PopularLocationManagement)));