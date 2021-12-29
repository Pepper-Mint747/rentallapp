import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';

// Redux Action
import { removeListing } from '../../../actions/siteadmin/ListingManagement/removeListing';
import {
  addListToRecommended,
  removeListFromRecommended
} from '../../../actions/siteadmin/ListingManagement/manageRecommend';

// import messages from './messages';
import { graphql, gql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

//Images
import ExportImage from '../../../../public/adminIcons/export.png';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingManagement.css';
import CustomPagination from '../../CustomPagination';
import listingsQuery from './listingsQuery.graphql';
import { FormControl } from 'react-bootstrap';

class ListingManagement extends React.Component {

  static propTypes = {
    getAllListings: PropTypes.array,
    addListToRecommended: PropTypes.func.isRequired,
    removeListFromRecommended: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0
    }
    this.paginationData = this.paginationData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  paginationData(currentPage) {
    const { getAllListings: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }
  handleClick(searchList) {
    const { getAllListings: { refetch } } = this.props;
    const { currentPage } = this.state;
    let variables = {
      currentPage: 1,
      searchList: searchList
    };
    this.setState({ currentPage: 1 });
    refetch(variables);
  }
  handleSearchChange = (e) => {
    const self = this;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      searchList: e.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.handleClick(self.state.searchList);
      }, 450)
    });
  }

  async deleteListing(id, type) {
    const { removeListing } = this.props;
    const { getAllListings: { refetch } } = this.props;

    let variables = { currentPage: 1 };
    await removeListing(id, type);
    this.setState({ currentPage: 1 });
    await refetch(variables);
  }

  render() {
    const { intl, removeListing, addListToRecommended, removeListFromRecommended } = this.props;
    const { getAllListings: { loading, getAllListings } } = this.props;
    const { currentPage, searchList } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.listingsManagement} /></h1>
          <div className={cx(s.exportSection, s.exportSectionGridSub)}>
            <div>
              <FormControl
                type="text"
                placeholder={formatMessage(messages.search)}
                onChange={(e) => this.handleSearchChange(e)}
                className={cx('searchInputControl', 'searchInputControlWidth', 'searchInputControlAR')}
              />
            </div>
            <div>
              {
                getAllListings && getAllListings.usersData.length > 0 && <a
                  href="/export-admin-data?type=listings"
                  className={cx(s.exportText, 'commonFloatLeft')}
                >
                  <span className={s.vtrMiddle}><FormattedMessage {...messages.exportDataIntoCSV} /></span>
                  <span className={cx(s.exportLinkImg, 'exportLinkImgCommon')}>
                    <img src={ExportImage} className={s.exportImg} />
                  </span>
                </a>
              }
            </div>
          </div>
          <div className={cx('table-responsive', 'listing-table', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin')}>
            <Table className="table"
              // filterable={['id', 'Owner Name', 'Owner Email', 'City', 'State', 'Country']}
              noDataText={formatMessage(messages.noRecordFound)}
              sortable={true}
              defaultSort={{ column: 'Id', direction: 'desc' }}
            // itemsPerPage={20}
            >
             <Thead>
              <Th scope="col">{formatMessage(messages.idLabel)}</Th>
              <Th scope="col">{formatMessage(messages.adminTitleLabel)}</Th>
              <Th scope="col">{formatMessage(messages.hostNameLabel)}</Th>
              <Th scope="col">{formatMessage(messages.hostEMailLabel)}</Th>
              <Th scope="col">{formatMessage(messages.address)}</Th>
              <Th scope="col">{formatMessage(messages.city)}</Th>
              <Th scope="col">{formatMessage(messages.stateLabel)}</Th>
              <Th scope="col">{formatMessage(messages.country)}</Th>
              <Th scope="col">{formatMessage(messages.createdDate)}</Th>
              <Th scope="col">{formatMessage(messages.recommendLabel)}</Th>
              <Th scope="col">{formatMessage(messages.publishedLabel)}</Th>
              <Th scope="col">{formatMessage(messages.ready)}</Th>
              <Th scope="col">{formatMessage(messages.editLabel)}</Th>
              <Th scope="col">{formatMessage(messages.viewLabel)}</Th>
              <Th scope="col">{formatMessage(messages.delete)}</Th>
            </Thead>
              {
                getAllListings && getAllListings.usersData.length > 0 && getAllListings.usersData.map((value, key) => {
                  let viewListing = "/rooms/" + value.id;
                  let editListing = '/become-a-host/' + value.id + '/home';
                  let isPublished = value.isPublished ? 'Yes' : 'No';
                  let isReady = value.isReady ? 'Yes' : 'No';
                  return (
                    <Tr key={key}>
                      <Td data-label={formatMessage(messages.idLabel)} column={formatMessage(messages.idLabel)} data={value.id} />
                      <Td data-label={formatMessage(messages.adminTitleLabel)} column={formatMessage(messages.adminTitleLabel)} data={value.title} />
                      <Td data-label={formatMessage(messages.hostNameLabel)} column={formatMessage(messages.hostNameLabel)} data={value.user.profile.firstName} />
                      <Td data-label={formatMessage(messages.hostEMailLabel)} column={formatMessage(messages.hostEMailLabel)} data={value.user.email} />
                      {
                        !value.buildingName && value.street && value.city && value.state && value.country && value.zipcode && <Td data-label={formatMessage(messages.address)} column={formatMessage(messages.address)} data={value.street + ', ' + value.city + ', ' + value.state + ', ' + value.country + ', ' + value.zipcode} />
                      }
                      {
                        value.buildingName && value.street && value.city && value.state && value.country && value.zipcode && <Td data-label={formatMessage(messages.address)} column={formatMessage(messages.address)} data={value.street + ', ' + value.buildingName + ', ' + value.city + ', ' + value.state + ', ' + value.country + ', ' + value.zipcode} />
                      }
                      <Td data-label={formatMessage(messages.city)} column={formatMessage(messages.city)} data={value.city} />
                      <Td data-label={formatMessage(messages.stateLabel)} column={formatMessage(messages.stateLabel)} data={value.state} />
                      <Td data-label={formatMessage(messages.country)} column={formatMessage(messages.country)} data={value.country} />
                      <Td data-label={formatMessage(messages.createdDate)} column={formatMessage(messages.createdDate)} data={moment(value.createdAt).format('MM/DD/YYYY')} />

                      {
                        value.recommend != null && <Td data-label={formatMessage(messages.recommendLabel)} column={formatMessage(messages.recommendLabel)}>
                          <a href="javascript:void(0)" onClick={() => removeListFromRecommended(value.id, currentPage, searchList)} >
                            <FormattedMessage {...messages.remove} />
                          </a>
                        </Td>
                      }

                      {
                        value.recommend == null && <Td data-label={formatMessage(messages.recommendLabel)} column={formatMessage(messages.recommendLabel)}>
                          <a href="javascript:void(0)" onClick={() => addListToRecommended(value.id, currentPage, searchList)} >
                            <FormattedMessage {...messages.setLabel} />
                          </a>
                        </Td>
                      }

                      <Td data-label={formatMessage(messages.publishedLabel)} column={formatMessage(messages.publishedLabel)}>
                        {isPublished}
                      </Td>
                      <Td data-label={formatMessage(messages.ready)} column={formatMessage(messages.ready)}>
                        {isReady}
                      </Td>

                      <Td data-label={formatMessage(messages.editLabel)} column={formatMessage(messages.editLabel)}>
                        <a href={editListing} target="_blank" >
                          <FormattedMessage {...messages.editLabel} />
                        </a>
                      </Td>

                      <Td data-label={formatMessage(messages.viewLabel)} column={formatMessage(messages.viewLabel)}>
                        <a href={viewListing} target="_blank" >
                          <FormattedMessage {...messages.viewLabel} />
                        </a>
                      </Td>

                      <Td data-label={formatMessage(messages.delete)} column={formatMessage(messages.delete)}>
                        <Confirm
                          onConfirm={() => this.deleteListing(value.id, "admin")}
                          body={formatMessage(messages.areYouSureDeleteWishList)}
                          confirmText={formatMessage(messages.confirmDelete)}
                          cancelText={formatMessage(messages.cancel)}
                          title={formatMessage(messages.deletingListingTitle)}
                        >
                          <a href="javascript:void(0)"><FormattedMessage {...messages.delete} /></a>
                        </Confirm>
                      </Td>
                    </Tr>
                  )
                })
              }
            </Table>
          </div>
          <div>
            {
              getAllListings && getAllListings.usersData && getAllListings.usersData.length > 0
              && <div>
                <CustomPagination
                  total={getAllListings.count}
                  currentPage={currentPage}
                  defaultCurrent={1}
                  defaultPageSize={10}
                  change={this.paginationData}
                  paginationLabel={formatMessage(messages.lists)}
                />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }

}

const mapState = (state) => ({
});

const mapDispatch = {
  removeListing,
  addListToRecommended,
  removeListFromRecommended
};
export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(listingsQuery, {
    name: 'getAllListings',
    options: {
      variables: {
        currentPage: 1,
        searchList: ''
      },
      fetchPolicy: 'network-only',
    }
  })
)(ListingManagement);