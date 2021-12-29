import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import moment from 'moment';
import { graphql, gql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FormControl } from 'react-bootstrap';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReportManagement.css';
import ReportManagementQuery from './ReportManagement.graphql';
import CustomPagination from '../../CustomPagination';

// Translation
import messages from '../../../locale/messages';

class ReportManagement extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            userId: PropTypes.number.isRequired,
            reporterId: PropTypes.string.isRequired,
            reporterType: PropTypes.string.isRequired,
        })),
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
        // this.handleChange = this.handleChange.bind(this);
        this.paginationData = this.paginationData.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    paginationData(currentPage) {
        const { reportUserManagement: { refetch } } = this.props;
        let variables = { currentPage };
        this.setState({ currentPage });
        refetch(variables);
    }
    handleClick(searchList) {
        const { reportUserManagement: { refetch } } = this.props;
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
        const { data } = this.props;
        const { reportUserManagement: { loading, reportUserManagement } } = this.props;
        const { currentPage } = this.state;
        const { formatMessage } = this.props.intl;

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <div>
                    <h1 className={s.headerTitle}><FormattedMessage {...messages.reportUserMessage} /></h1>
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
                            sortable={true}
                        >
                            <Thead>
                                <Th scope="col">{formatMessage(messages.idLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.reporterName)}</Th>
                                <Th scope="col">{formatMessage(messages.reporterEmail)}</Th>
                                <Th scope="col">{formatMessage(messages.userNameLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.userEmailLabel)}</Th>
                                <Th scope="col">{formatMessage(messages.reportType)}</Th>
                                <Th scope="col">{formatMessage(messages.transferDate)}</Th>

                            </Thead>
                            {
                                reportUserManagement && reportUserManagement.reportsData.length > 0 && reportUserManagement.reportsData.map(function (value, index) {
                                    let date = moment(value.createdAt).format('MM/DD/YYYY');
                                    return (
                                        <Tr key={index}>
                                            <Td data-label={formatMessage(messages.idLabel)} column={formatMessage(messages.idLabel)}>
                                                {value.id}
                                            </Td>
                                            {
                                                value.reporterData && value.reporterData.displayName &&
                                                <Td data-label={formatMessage(messages.reporterName)} column={formatMessage(messages.reporterName)}>
                                                    {value.reporterData.displayName}
                                                </Td>

                                            }
                                            {
                                                value.reporterData === null &&
                                                <Td data-label={formatMessage(messages.reporterName)} column={formatMessage(messages.reporterName)}>
                                                    <FormattedMessage {...messages.userDeletedLabel} />
                                                </Td>
                                            }
                                            {
                                                value.reporterData && value.reporterEmail.email &&
                                                <Td data-label={formatMessage(messages.reporterEmail)} column={formatMessage(messages.reporterEmail)}>
                                                    <a
                                                        href={"/users/show/" + value.userProfileId.profileId}
                                                        target="_blank"
                                                    >
                                                        {value.reporterEmail.email}
                                                    </a>
                                                </Td>
                                            }
                                            {
                                                value.reporterData === null && <Td data-label={formatMessage(messages.reporterEmail)} column={formatMessage(messages.reporterEmail)}>
                                                    <FormattedMessage {...messages.userDeletedLabel} />
                                                </Td>
                                            }
                                            {
                                                value.userData && value.userData.displayName &&
                                                <Td data-label={formatMessage(messages.userNameLabel)} column={formatMessage(messages.userNameLabel)} data={value.userData.displayName} />
                                            }
                                            {
                                                value.userData === null && <Td data-label={formatMessage(messages.userNameLabel)} column={formatMessage(messages.userNameLabel)}>
                                                    <FormattedMessage {...messages.userDeletedLabel} />
                                                </Td>
                                            }
                                            {
                                                value.userData && value.userEmail.email &&
                                                <Td data-label={formatMessage(messages.userEmailLabel)} column={formatMessage(messages.userEmailLabel)}>
                                                    <a
                                                        href={"/users/show/" + value.userData.profileId}
                                                        target="_blank"
                                                    >
                                                        {value.userEmail.email}
                                                    </a>
                                                </Td>
                                            }
                                            {
                                                value.userData === null
                                                && <Td data-label={formatMessage(messages.userEmailLabel)} column={formatMessage(messages.userEmailLabel)}>
                                                    <FormattedMessage {...messages.userDeletedLabel} />
                                                </Td>
                                            }
                                            {
                                                value.reportType &&
                                                <Td
                                                    data-label={formatMessage(messages.reportType)}
                                                    column={formatMessage(messages.reportType)}
                                                    data={value.reportType}
                                                >
                                                </Td>
                                            }
                                            {
                                                value && <Td data-label={formatMessage(messages.transferDate)} column={formatMessage(messages.transferDate)}>
                                                    {date}
                                                </Td>
                                            }
                                        </Tr>
                                    )
                                })
                            }
                        </Table>
                    </div>
                    {
                        reportUserManagement && reportUserManagement.reportsData && reportUserManagement.reportsData.length > 0
                        && <div>
                            <CustomPagination
                                total={reportUserManagement.count}
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
});

const mapDispatch = {
};

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(ReportManagementQuery, {
        name: 'reportUserManagement',
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only',
        }
    })
)(ReportManagement);