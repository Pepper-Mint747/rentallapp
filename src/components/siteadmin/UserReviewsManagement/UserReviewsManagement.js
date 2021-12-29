import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';

import Link from '../../../components/Link';

import {
    updateReviewStatus
} from '../../../actions/siteadmin/UserReview/manageReviews';

import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserReviewsManagement.css';

import { censorEmail, censorPhone } from '../../../helpers/secureEmail';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

import StarRating from '../../StarRating';
import { FormControl } from 'react-bootstrap';

class UserReviewsManagement extends React.Component {

    static propTypes = {
        data: PropTypes.array,
        editUser: PropTypes.func,
        title: PropTypes.string.isRequired,
        updateReviewStatus: PropTypes.func.isRequired,
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
    }

    render() {
        const { data, editUser } = this.props;
        const { updateReviewStatus } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <div>
                    <h1 className={s.headerTitle}><FormattedMessage {...messages.usersReviews} /></h1>
                    <div className={cx('table-responsive', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin')}>
                        <Table
                            className="table"
                            noDataText={formatMessage(messages.noRecordFound)}
                            sortable={true}

                        >
                            <Thead>
                                <Th scope="col">{formatMessage(messages.listId)}</Th>
                                <Th scope="col">{formatMessage(messages.reviewContentLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.adminListTitle)}</Th>
                                <Th scope="col">{formatMessage(messages.reservationConfirmCode)}</Th>
                                <Th scope="col">{formatMessage(messages.CheckInDate)}</Th>
                                <Th scope="col">{formatMessage(messages.CheckOutDate)}</Th>
                                <Th scope="col">{formatMessage(messages.SenderLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.receiverLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.ratingReviewLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.reviewStatusLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.reviewActionLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.actionLabel)}</Th>
                            </Thead>
                            {
                                data && data.map(function (value, key) {
                                    let content = value.reviewContent;
                                    let reviewContent = content.slice(0, 10);
                                    let dots = '...'
                                    let isContent = false;
                                    if (content.length > 10) {
                                        isContent = true;
                                    } else {
                                        isContent = false;
                                    }
                                    let hostName = value.userData && value.userData.firstName;
                                    let guestName = value.authorData && value.authorData.firstName;
                                    let hostProfileId = value.userData && value.userData.profileId;
                                    let guestProfileId = value.authorData && value.authorData.profileId;
                                    let title = value.listData && value.listData.title ? value.listData.title : 'List is missing';
                                    let confirmationCode = value.singleReservationData && value.singleReservationData.confirmationCode ? value.singleReservationData.confirmationCode : '';
                                    let checkInDate = value.singleReservationData && value.singleReservationData.checkIn ? moment(value.singleReservationData.checkIn).format('DD-MM-YYYY') : '';
                                    let checkOutDate = value.singleReservationData && value.singleReservationData.checkOut ? moment(value.singleReservationData.checkOut).format('DD-MM-YYYY') : '';

                                    return (
                                        <Tr key={key}>
                                            <Td data-label={formatMessage(messages.listId)} column={formatMessage(messages.listId)} data={value.listId} />
                                            {
                                                isContent && <Td data-label={formatMessage(messages.reviewContentLabel)} column={formatMessage(messages.reviewContentLabel)}>
                                                    {reviewContent.concat(dots)}
                                                </Td>
                                            }
                                            {
                                                title && <Td data-label={formatMessage(messages.adminListTitle)} column={formatMessage(messages.adminListTitle)}>
                                                    <a
                                                        href={"/rooms/" + value.listId}
                                                        target="_blank">
                                                        {title}
                                                    </a>
                                                </Td>
                                            }
                                            {
                                                confirmationCode && <Td data-label={formatMessage(messages.reservationConfirmCode)} column={formatMessage(messages.reservationConfirmCode)}>
                                                    {confirmationCode}
                                                </Td>
                                            }
                                            {
                                                checkInDate && <Td data-label={formatMessage(messages.CheckInDate)} column={formatMessage(messages.CheckInDate)}>
                                                    {checkInDate}
                                                </Td>
                                            }
                                            {
                                                checkOutDate && <Td data-label={formatMessage(messages.CheckOutDate)} column={formatMessage(messages.CheckOutDate)}>
                                                    {checkOutDate}
                                                </Td>
                                            }
                                            {
                                                !isContent && <Td data-label={formatMessage(messages.reviewContentLabel)} column={formatMessage(messages.reviewContentLabel)}>
                                                    {reviewContent}
                                                </Td>
                                            }

                                            {
                                                guestName && <Td data-label={formatMessage(messages.SenderLabel)} column={formatMessage(messages.SenderLabel)}>
                                                    <a
                                                        href={"/users/show/" + guestProfileId}
                                                        target="_blank">
                                                        {guestName}
                                                    </a>
                                                    {/* <Link to={"/users/show/" + guestProfileId}>
                                                        {guestName}
                                                    </Link> */}
                                                </Td>
                                            }

                                            {
                                                hostName && <Td data-label={formatMessage(messages.receiverLabel)} column={formatMessage(messages.receiverLabel)}>
                                                    <a
                                                        href={"/users/show/" + hostProfileId}
                                                        target="_blank">
                                                        {hostName}
                                                    </a>
                                                    {/* <Link to={"/users/show/" + hostProfileId}>
                                                        {hostName}
                                                    </Link> */}
                                                </Td>
                                            }

                                            <Td data-label={formatMessage(messages.ratingReviewLabel)} column={formatMessage(messages.ratingReviewLabel)}>
                                                <StarRating
                                                    className={s.reviewStar}
                                                    value={value.rating}
                                                    name={'review'}
                                                />
                                            </Td>

                                            {
                                                !value.isAdminEnable && <Td data-label={formatMessage(messages.reviewStatusLabel)} column={formatMessage(messages.reviewStatusLabel)}>
                                                    <FormattedMessage {...messages.disabledLabel} />
                                                </Td>
                                            }

                                            {
                                                value.isAdminEnable && <Td data-label={formatMessage(messages.reviewStatusLabel)} column={formatMessage(messages.reviewStatusLabel)}>
                                                    <FormattedMessage {...messages.enabledLabel} />
                                                </Td>
                                            }

                                            {
                                                !value.isAdminEnable && <Td data-label={formatMessage(messages.reviewActionLabel)} column={formatMessage(messages.reviewActionLabel)}>
                                                    <a
                                                        href="javascript:void(0)"
                                                        onClick={() => updateReviewStatus(value.id, 'enable')}>
                                                        <FormattedMessage {...messages.setToEnable} />
                                                    </a>
                                                </Td>
                                            }

                                            {
                                                value.isAdminEnable && <Td data-label={formatMessage(messages.reviewActionLabel)} column={formatMessage(messages.reviewActionLabel)}>
                                                    <a
                                                        href="javascript:void(0)"
                                                        onClick={() => updateReviewStatus(value.id, 'disable')}>
                                                        <FormattedMessage {...messages.setToDisable} />
                                                    </a>
                                                </Td>
                                            }
                                            <Td data-label={formatMessage(messages.actionLabel)} column={formatMessage(messages.actionLabel)}>
                                                <Link to={"/siteadmin/management-reviews/" + value.id}>
                                                    <FormattedMessage {...messages.editLabel} />
                                                </Link>
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
    updateReviewStatus
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(UserReviewsManagement)));