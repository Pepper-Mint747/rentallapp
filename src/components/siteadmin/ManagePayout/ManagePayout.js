import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import { graphql, gql, compose } from 'react-apollo';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ManagePayout.css';

import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';

import CustomPagination from '../../CustomPagination';

//graphql
import reservationsQuery from './reservationsQuery.graphql';
import { updatePayoutStatus } from '../../../actions/updatePayoutStatus';
import { getPayoutStatus } from './getPayoutStatus';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
//Helper
import formatReservationState from '../../../helpers/formatReservationState';
class ManagePayout extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        getAllPayouts: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
            refetch: PropTypes.any.isRequired,
            getTransactionHistory: PropTypes.shape({
                count: PropTypes.number.isRequired,
                reservationData: PropTypes.arrayOf(PropTypes.shape({
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
                        payEmail: PropTypes.string.isRequired,
                        methodId: PropTypes.number.isRequired,
                        currency: PropTypes.string.isRequired,
                        last4Digits: PropTypes.number
                    }),
                    hostTransaction: PropTypes.shape({
                        id: PropTypes.number.isRequired,
                    }),
                    hostFailedTransaction: PropTypes.shape({
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
                        currency: PropTypes.string.isRequired,
                        paymentMethodId: PropTypes.number
                    }),
                    refundStatus: PropTypes.shape({
                        id: PropTypes.number.isRequired,
                        receiverEmail: PropTypes.string.isRequired,
                        total: PropTypes.number.isRequired,
                        currency: PropTypes.string.isRequired
                    }),
                    cancellationDetails: PropTypes.shape({
                        refundToGuest: PropTypes.number.isRequired,
                        payoutToHost: PropTypes.number.isRequired,
                        total: PropTypes.number.isRequired,
                        currency: PropTypes.string.isRequired,
                        guestServiceFee: PropTypes.number.isRequired,
                        hostServiceFee: PropTypes.number.isRequired,
                    }),
                })),
            }),
        }).isRequired,
    }

    static defaultProps = {
        getAllPayouts: {
            loading: true,
            getAllPayoutReservation: {
                count: null,
                reservationData: []
            }
        }
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
        this.handleHoldPayout = this.handleHoldPayout.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { getAllPayouts: { completed, loading } } = nextProps;
        const { searchList, currentPage } = this.state;
        const { getAllPayouts: { refetch } } = this.props;
        let variables = { currentPage, searchList };
        if (completed && !loading) {
            refetch(variables);
        }
    }

    paginationData(currentPage) {
        const { getAllPayouts: { refetch } } = this.props;
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }

    handleClick(searchList) {
        const { getAllPayouts: { refetch } } = this.props;
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

    handleHoldPayout(e, id, currentPage) {
        const { updatePayoutStatus, getAllPayouts: { refetch } } = this.props;
        let isHold = e.target.value;
        isHold = isHold == "true" ? true : false;
        updatePayoutStatus(id, isHold);
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }

    render() {
        const { getAllPayouts: { loading, getAllPayoutReservation, refetch } } = this.props;
        const { currentPage } = this.state;
        const { formatMessage } = this.props.intl;

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <div>
                    <h1 className={s.headerTitle}><FormattedMessage {...messages.payoutManagement} /></h1>
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
                                <Th scope="col" column={formatMessage(messages.reservationId)} />
                                <Th scope="col" column={formatMessage(messages.codeLabel)} />
                                <Th scope="col" column={formatMessage(messages.adminListTitle)} />
                                <Th scope="col" column={formatMessage(messages.hostNameLabel)} />
                                <Th scope="col" column={formatMessage(messages.payoutLabel)} />
                                <Th scope="col" column={formatMessage(messages.reservationStatus)} />
                                <Th scope="col" column={formatMessage(messages.payoutStatus)} />
                                <Th scope="col" column={formatMessage(messages.holdPayout)} />
                                <Th scope="col" column={formatMessage(messages.details)} />
                            </Thead>
                            {
                                getAllPayoutReservation && getAllPayoutReservation.reservationData && getAllPayoutReservation.reservationData.length > 0 && getAllPayoutReservation.reservationData.map((item, index) => {
                                    let payoutAmount;
                                    let status = getPayoutStatus(item);

                                    if (item.reservationState == 'cancelled') {
                                        payoutAmount = item.cancellationDetails.payoutToHost;
                                    } else {
                                        payoutAmount = item.total - item.hostServiceFee;
                                    }
                                    return (
                                        <Tr key={index}>
                                            <Td data-label={formatMessage(messages.reservationId)} column={formatMessage(messages.reservationId)} data={item.id} />
                                            <Td data-label={formatMessage(messages.codeLabel)} column={formatMessage(messages.codeLabel)}>
                                                {item.confirmationCode}
                                            </Td>
                                            {
                                                item.listData && <Td data-label={formatMessage(messages.adminListTitle)} column={formatMessage(messages.adminListTitle)}>
                                                    <a href={"/rooms/" + item.listId} target='_blank'>
                                                        {item.listData.title}
                                                    </a>
                                                </Td>
                                            }
                                            {
                                                !item.listData && <Td data-label={formatMessage(messages.adminListTitle)} column={formatMessage(messages.adminListTitle)} data={formatMessage(messages.dataMissing)} />
                                            }
                                            <Td data-label={formatMessage(messages.hostNameLabel)} column={formatMessage(messages.hostNameLabel)}>
                                                {item.hostData && item.hostData.firstName}
                                            </Td>
                                            <Td data-label={formatMessage(messages.payoutLabel)} column={formatMessage(messages.payoutLabel)}>
                                                <CurrencyConverter
                                                    amount={payoutAmount}
                                                    from={item.currency}
                                                />
                                            </Td>
                                            <Td data-label={formatMessage(messages.reservationStatus)} className={s.ChangeToUpperCase} column={formatMessage(messages.reservationStatus)} data={formatReservationState(item.reservationState)} />
                                            <Td data-label={formatMessage(messages.payoutStatus)} column={formatMessage(messages.payoutStatus)}>
                                                {
                                                    status && status.defaultMessage === 'Failed' ? <Link to={'/siteadmin/failed-payout/' + item.id}>{formatMessage(status)}</Link> :
                                                        (status ? formatMessage(status) : status)
                                                }
                                            </Td>
                                            <Td data-label={formatMessage(messages.holdPayout)} column={formatMessage(messages.holdPayout)}>
                                                {
                                                    ((item && item.hostTransaction) || item.reservationState === 'expired'
                                                        || item.reservationState === 'declined' ) ? ' - ' : <select 
                                                        value={item.isHold} onChange={(e) => this.handleHoldPayout(e, item.id, currentPage)}>
                                                        <option value={true}><FormattedMessage {...messages.yesText} /></option>
                                                        <option value={false}><FormattedMessage {...messages.noText} /></option>
                                                    </select>
                                                }
                                            </Td>
                                            <Td data-label={formatMessage(messages.details)} column={formatMessage(messages.details)}>
                                                <Link to={"/siteadmin/viewpayout/" + item.id + '/payout'} >
                                                    <FormattedMessage {...messages.messageHistroyLabel} />
                                                </Link>
                                            </Td>
                                        </Tr>
                                    )
                                })
                            }
                        </Table>
                    </div>
                    {
                        getAllPayoutReservation && getAllPayoutReservation.reservationData && getAllPayoutReservation.reservationData.length > 0 &&
                        <CustomPagination
                            total={getAllPayoutReservation.count}
                            currentPage={currentPage}
                            defaultCurrent={1}
                            defaultPageSize={10}
                            change={this.paginationData}
                            paginationLabel={formatMessage(messages.payoutsLabel)}
                        />
                    }
                </div>
            </div>
        )
    }
}

const mapState = (state) => ({
    completed: state.payout.completed,
    loading: state.payout.loading,
});

const mapDispatch = {
    updatePayoutStatus,
};
export default compose(injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(reservationsQuery, {
        name: 'getAllPayouts',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only',
        }
    })
)(ManagePayout);