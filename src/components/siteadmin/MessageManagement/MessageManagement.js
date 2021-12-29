import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, gql, compose } from 'react-apollo';
import { FormControl } from 'react-bootstrap';

// Redux Action
import { viewReceiptAdmin } from '../../../actions/Reservation/viewReceiptAdmin';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MessageManagement.css';

// Locale
import messages from '../../../locale/messages';
import messageManagementQuery from './messageManagement.graphql';
import CustomPagination from '../../CustomPagination';

class MessageManagement extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            listId: PropTypes.number.isRequired,
            hostId: PropTypes.string.isRequired,
            guestId: PropTypes.string.isRequired,
            checkIn: PropTypes.string.isRequired,
            checkOut: PropTypes.string.isRequired,
            guestServiceFee: PropTypes.number.isRequired,
            hostServiceFee: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            reservationState: PropTypes.string.isRequired,
            listData: PropTypes.shape({
                title: PropTypes.string.isRequired
            }),
            hostData: PropTypes.shape({
                profileId: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired
            }),
            hostPayout: PropTypes.shape({
                id: PropTypes.number.isRequired,
                payEmail: PropTypes.string.isRequired
            }),
            hostTransaction: PropTypes.shape({
                id: PropTypes.number.isRequired,
            }),
            guestData: PropTypes.shape({
                profileId: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired
            }),
            transaction: PropTypes.shape({
                payerEmail: PropTypes.string.isRequired,
                paymentType: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }),
            refundStatus: PropTypes.shape({
                id: PropTypes.number.isRequired,
                receiverEmail: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }),
        })),
        viewReceiptAdmin: PropTypes.any.isRequired,
    };

    static defaultProps = {
        data: []
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
        const { messageManagement: { refetch } } = this.props;
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }
    handleClick(searchList) {
        const { messageManagement: { refetch } } = this.props;
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



    render() {
        const { data, viewReceiptAdmin } = this.props;
        const { messageManagement: { loading, messageManagement } } = this.props;
        const { currentPage } = this.state;
        const { formatMessage } = this.props.intl;
        let userType = 'host';

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <div>
                    <h1 className={s.headerTitle}><FormattedMessage {...messages.messages} /></h1>
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
                        <Table className="table"
                            noDataText={formatMessage(messages.noRecordFound)}
                            // filterable={['Host Email Id', 'Guest  Email Id', 'Host', 'Guest']}
                            sortable={true}>
                            <Thead>
                                <Th scope="col">{formatMessage(messages.adminListTitle)}</Th>
                                <Th scope="col">{formatMessage(messages.host)}</Th>
                                <Th scope="col">{formatMessage(messages.hostEmailIdLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.guest)}</Th>
                                <Th scope="col">{formatMessage(messages.guestEmailIdLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.messageHistroy)}</Th>
                            </Thead>
                            {
                                messageManagement && messageManagement.usersData && messageManagement.usersData.length > 0 && messageManagement.usersData.map(function (value, index) {
                                    return (
                                        <Tr key={index}>
                                            <Td  data-label={formatMessage(messages.adminListTitle)} column={formatMessage(messages.adminListTitle)}>
                                                <a
                                                    target="_blank"
                                                    href={"/rooms/" + value.listId}
                                                    className={cx(s.previewLink)}
                                                >
                                                    {
                                                        value.listData ? value.listData.title : 'List is missing'
                                                    }
                                                </a>
                                            </Td>
                                            {
                                                value.hostProfile && value.hostProfile.displayName &&
                                                <Td data-label={formatMessage(messages.host)} column={formatMessage(messages.host)}>
                                                    {value.hostProfile.displayName}
                                                </Td>
                                            }
                                            {
                                                value.hostUserData && value.hostUserData.email && <Td 
                                                    data-label={formatMessage(messages.hostEmailIdLabel)}
                                                    column={formatMessage(messages.hostEmailIdLabel)}>
                                                    <a href={"/users/show/" + value.hostProfile.profileId} target="_blank" >
                                                        {value.hostUserData.email}
                                                    </a>
                                                </Td>
                                            }

                                            {
                                                value.guestProfile && value.guestProfile.displayName &&
                                                <Td
                                                    data-label={formatMessage(messages.guest)}
                                                    column={formatMessage(messages.guest)}
                                                    data={value.guestProfile.displayName}
                                                >
                                                </Td>
                                            }


                                            {
                                                value.guestUserData && value.guestUserData.email &&
                                                <Td
                                                  data-label={formatMessage(messages.guestEmailIdLabel)} 
                                                  column={formatMessage(messages.guestEmailIdLabel)}
                                                >
                                                    <a href={"/users/show/" + value.guestProfile.profileId} target="_blank" >
                                                        {value.guestUserData.email}
                                                    </a>
                                                </Td>
                                            }

                                            {
                                                value.id && value.id && <Td data-label={formatMessage(messages.messageHistroy)} column={formatMessage(messages.messageHistroy)}>
                                                    <a
                                                        target="_blank"
                                                        href={"/message/" + value.id + "/" + userType}
                                                        className={cx(s.previewLink)}
                                                    >
                                                        <FormattedMessage {...messages.messageHistroyLabel} />
                                                    </a>
                                                </Td>
                                            }
                                        </Tr>
                                    )
                                })
                            }
                        </Table>
                    </div>
                    {
                        messageManagement && messageManagement.usersData && messageManagement.usersData.length > 0
                        && <div>
                            <CustomPagination
                                total={messageManagement.count}
                                currentPage={currentPage}
                                defaultCurrent={1}
                                defaultPageSize={10}
                                change={this.paginationData}
                                paginationLabel={formatMessage(messages.messagesLabel)}
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }

}

const mapState = (state) => ({
    completed: state.reservation.completed,
    loading: state.reservation.loading,
});

const mapDispatch = {
    viewReceiptAdmin,
};

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(messageManagementQuery, {
        name: 'messageManagement',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only',
        }
    })
)(MessageManagement);