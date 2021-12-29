import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import Link from '../../../components/Link';
import Confirm from 'react-confirm-bootstrap';
import {
  Button
} from 'react-bootstrap';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BlogManagement.css';
import bt from '../../../components/commonStyle.css';
import { deleteBlogDetails, updateBlogStatus } from '../../../actions/siteadmin/deleteBlogDetails';
import history from '../../../core/history';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class BlogManagement extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      location: PropTypes.string,
      locationAddress: PropTypes.string,
      isEnable: PropTypes.bool,
      images: PropTypes.string,
    })),
    deleteBlogDetails: PropTypes.any,
    updateBlogStatus: PropTypes.any,
  };

  static defaultProps = {
    data: []
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    history.push('/siteadmin/page/add')
  }

  render() {
    const { data, deleteBlogDetails, updateBlogStatus } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.contentManagementSystem} /></h1>
          <div className={s.space4}>
            <Button onClick={this.handleClick} className={cx(bt.btnPrimary, bt.btnLarge)}>
              <FormattedMessage {...messages.addPageLabel} />
            </Button>
          </div>
          <div className={cx('table-responsive', 'tableBorderRadiusAdmin', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin')}>
            <Table className="table"
              noDataText={formatMessage(messages.noRecordFound)}
            >
              <Thead>
                <Th scope="col">{formatMessage(messages.idLabel)}</Th>
                <Th scope="col">{formatMessage(messages.metaTitleLabel)}</Th>
                <Th scope="col">{formatMessage(messages.metaDescriptionLabel)}</Th>
                <Th scope="col">{formatMessage(messages.pageTitleLabel)}</Th>
                <Th scope="col">{formatMessage(messages.pageUrl)}</Th>
                <Th scope="col">{formatMessage(messages.footerCategoryLabel)}</Th>
                <Th scope="col">{formatMessage(messages.status)}</Th>
                <Th scope="col">{formatMessage(messages.preview)}</Th>
                <Th scope="col">{formatMessage(messages.editLabel)}</Th>
                <Th scope="col">{formatMessage(messages.delete)}</Th>
              </Thead>
              {
                data && data.map(function (value, key) {
                  return (
                    <Tr key={key}>
                      <Td data-label={formatMessage(messages.sNoLabel)} column={formatMessage(messages.idLabel)} data={value.id} />
                      <Td data-label={formatMessage(messages.metaTitleLabel)} column={formatMessage(messages.metaTitleLabel)} data={value.metaTitle} />
                      <Td data-label={formatMessage(messages.metaDescriptionLabel)} column={formatMessage(messages.metaDescriptionLabel)} data={value.metaDescription} />
                      <Td data-label={formatMessage(messages.pageTitleLabel)} column={formatMessage(messages.pageTitleLabel)} data={value.pageTitle} />
                      <Td data-label={formatMessage(messages.pageUrl)} column={formatMessage(messages.pageUrl)} data={value.pageUrl} />
                      <Td data-label={formatMessage(messages.footerCategoryLabel)} column={formatMessage(messages.footerCategoryLabel)} data={value.footerCategory} />
                      <Td data-label={formatMessage(messages.status)} column={formatMessage(messages.status)}>
                        <a href="javascript:void(0)" onClick={() => updateBlogStatus(value.id, value.isEnable)} >
                          {value.isEnable == 1 ? formatMessage(messages.disableLabel) : formatMessage(messages.enableLabel)}
                        </a>
                      </Td>
                      <Td data-label={formatMessage(messages.preview)} column={formatMessage(messages.preview)}>
                        <a href={"/page/" + value.pageUrl} target={'_blank'}>
                          <FormattedMessage {...messages.preview} />
                        </a>
                      </Td>
                      <Td data-label={formatMessage(messages.editLabel)} column={formatMessage(messages.editLabel)}>
                        <Link to={"/siteadmin/edit/page/" + value.id}>
                          <FormattedMessage {...messages.editLabel} />
                        </Link>
                      </Td>
                      <Td data-label={formatMessage(messages.delete)} column={formatMessage(messages.delete)}>
                        <div>
                          <Confirm
                            onConfirm={() => deleteBlogDetails(value.id)}
                            body={formatMessage(messages.areYouSureDeleteWishList)}
                            confirmText={formatMessage(messages.confirmDelete)}
                            cancelText={formatMessage(messages.cancel)}
                            title={formatMessage(messages.deletingPageDetails)}
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
  deleteBlogDetails,
  updateBlogStatus
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(BlogManagement)));