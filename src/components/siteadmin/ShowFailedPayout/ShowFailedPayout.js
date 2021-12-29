import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tr, Td } from 'reactable';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ShowFailedPayout.css';
import bt from '../../../components/commonStyle.css';

import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';



class ShowFailedPayout extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,

    }

    constructor(props) {
        super(props);
    }

    render() {
        const { title, data } = this.props;
        const { formatMessage } = this.props.intl;
        const gobackcss = { padding: '10px' };

        let payoutAmount = data.total - data.hostServiceFee;
        let reason = data && data.hostFailedTransaction && data.hostFailedTransaction.reason;
        reason = JSON.parse(reason);

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <div>
                    <h1 className={s.headerTitle}>{title}</h1>
                    <div className={cx(s.space4, bt.textAlignRight)}>
                        <Link to={'/siteadmin/payout'} className={cx(bt.btnPrimaryBorder, bt.btnLarge, bt.noTextDecoration, bt.btnPrimaryLink)}>
                            <FormattedMessage {...messages.goBack} />
                        </Link>
                    </div>
                    <div className={'table-responsive'}>
                        <Table
                            className="table"
                            noDataText={formatMessage(messages.noRecordFound)}
                            sortable={true}
                        >
                            {data &&
                                <Tr>
                                    <Td column={formatMessage(messages.reservationId)}>
                                        {data.id}
                                    </Td>
                                    <Td column={formatMessage(messages.codeLabel)}>
                                        {data.confirmationCode}
                                    </Td>
                                    {
                                        data.listData && <Td column={formatMessage(messages.adminListTitle)}>
                                            <a href={"/rooms/" + data.listData.id} target='_blank'>
                                                {data.listData.title}
                                            </a>
                                        </Td>
                                    }
                                    {
                                        !data.listData && <Td column={formatMessage(messages.adminListTitle)} data={formatMessage(messages.dataMissing)} />
                                    }
                                    <Td column={formatMessage(messages.hostNameLabel)}>
                                        {data.hostData && data.hostData.firstName}
                                    </Td>
                                    <Td column={formatMessage(messages.payoutLabel)}>
                                        <CurrencyConverter
                                            amount={payoutAmount}
                                            from={data.currency}
                                        />
                                    </Td>
                                    <Td column={formatMessage(messages.reason)}>
                                        {reason && reason.raw && reason.raw.message}
                                    </Td>
                                </Tr>
                            }
                        </Table>
                    </div>
                </div>
            </div>
        )
    }

}

export default injectIntl(withStyles(s, bt)(ShowFailedPayout));