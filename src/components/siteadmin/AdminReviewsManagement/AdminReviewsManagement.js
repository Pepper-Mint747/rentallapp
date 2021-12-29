import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';

import { deleteAdminReview } from '../../../actions/siteadmin/AdminReviews/deleteAdminReview';
import Link from '../../../components/Link';
import { graphql, gql, compose } from 'react-apollo';

// Toaster
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminReviewsManagement.css';

import { censorEmail, censorPhone } from '../../../helpers/secureEmail';

import StarRating from '../../StarRating';
import { FormControl } from 'react-bootstrap';
import CustomPagination from '../../CustomPagination';
import reviewsManagement from './reviewsManagement.graphql';

class AdminReviewsManagement extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    editUser: PropTypes.any,
    deleteAdminReview: PropTypes.any,
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      value: '',
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

    const { reviewsManagement: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);

  }

  handleClick(searchList) {
    const { reviewsManagement: { refetch } } = this.props;
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
      searchList: event.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.handleClick(self.state.searchList);
      }, 450)
    });
  }

  deleteReview(id) {
    const { deleteAdminReview } = this.props;
    const { reviewsManagement: { refetch } } = this.props;

    let variables = { currentPage: 1 };
    deleteAdminReview(id);
    this.setState({ currentPage: 1 });
    refetch(variables);
  }

  render() {
    const { editUser, deleteAdminReview, title } = this.props;
    const { currentPage } = this.state;
    const { reviewsManagement: { loading, reviewsManagement } } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}> <FormattedMessage {...messages.adminReviews} /></h1>
          <div className={s.exportSection}>
            <div>
              <FormControl
                type="text"
                placeholder={formatMessage(messages.search)}
                onChange={(e) => this.handleSearchChange(e)}
                className={cx('searchInputControl', 'searchInputControlWidth', 'searchInputControlAR')}
              />
            </div>
          </div>
          <div className={cx('table-responsive', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin')}>
            <Table
              className="table"
              noDataText={formatMessage(messages.noRecordFound)}
              sortable={true}
            >
              <Thead>
                <Th scope="col">{formatMessage(messages.listId)}</Th>
                <Th scope="col">{formatMessage(messages.adminListTitle)}</Th>
                <Th scope="col">{formatMessage(messages.reviewContentLabel)}</Th>
                <Th scope="col">{formatMessage(messages.ratingReviewLabel)}</Th>
                <Th scope="col">{formatMessage(messages.editLabel)}</Th>
                <Th scope="col">{formatMessage(messages.delete)}</Th>
              </Thead>
              {
                reviewsManagement && reviewsManagement.reviewsData.length > 0 && reviewsManagement.reviewsData.map((value, key) => {
                  return (
                    <Tr key={key}>
                      <Td data-label={formatMessage(messages.listId)} column={formatMessage(messages.listId)} data={value.listId} />
                      <Td data-label={formatMessage(messages.adminListTitle)} column={formatMessage(messages.adminListTitle)}>
                        <a
                          href={"/rooms/" + value.listId}
                          target="_blank"
                        >
                          {value.listData ? value.listData.title : 'List is missing'}
                        </a>
                      </Td>
                      <Td data-label={formatMessage(messages.reviewContentLabel)} column={formatMessage(messages.reviewContentLabel)} data={value.reviewContent} />
                      <Td data-label={formatMessage(messages.ratingReviewLabel)} column={formatMessage(messages.ratingReviewLabel)}>
                        <StarRating className={s.reviewStar} value={value.rating} name={'review'} />
                      </Td>
                      <Td data-label={formatMessage(messages.editLabel)} column={formatMessage(messages.editLabel)}>
                        <Link to={"/siteadmin/reviews/edit-review/" + value.id}>
                          <FormattedMessage {...messages.editLabel} />
                        </Link>
                      </Td>
                      <Td data-label={formatMessage(messages.delete)} column={formatMessage(messages.delete)}>
                        <div>
                          <Confirm
                            onConfirm={() => this.deleteReview(value.id)}
                            body={formatMessage(messages.areYouSureDeleteWishList)}
                            confirmText={formatMessage(messages.confirmDelete)}
                            cancelText={formatMessage(messages.cancel)}
                            title={formatMessage(messages.deleteReviewLabel)}
                          >
                            <a href="javascript:void(0)">
                              <FormattedMessage {...messages.delete} />
                            </a>
                          </Confirm>
                        </div>
                      </Td>
                    </Tr>
                  )
                })
              }
            </Table>
          </div>
          {
            reviewsManagement && reviewsManagement.reviewsData && reviewsManagement.reviewsData.length > 0
            && <div>
              <CustomPagination
                total={reviewsManagement.count}
                currentPage={currentPage}
                defaultCurrent={1}
                defaultPageSize={10}
                change={this.paginationData}
                paginationLabel={formatMessage(messages.reviews)}
              />
            </div>
          }
        </div>
      </div>
    );
  }

}

const mapState = (state) => ({
});

const mapDispatch = {
  deleteAdminReview,
};

export default compose(injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(reviewsManagement, {
    name: 'reviewsManagement',
    options: {
      variables: {
        currentPage: 1,
        searchList: ''
      },
      fetchPolicy: 'network-only',
    }
  })
)(AdminReviewsManagement);