import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader/!css-loader!./index.css';
import { change } from 'redux-form';
import { isRTL } from '../../helpers/formatLocale';
import { connect } from 'react-redux';

//Message
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../locale/messages';

class CustomPagination extends Component {

    static propTypes = {
        total: PropTypes.number.isRequired,
        defaultCurrent: PropTypes.number.isRequired,
        defaultPageSize: PropTypes.number.isRequired,
        change: PropTypes.any.isRequired,
        currentPage: PropTypes.number.isRequired,
        paginationLabel: PropTypes.string
    };

    static defaultProps = {
        paginationLabel: 'items'
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.renderShowTotal = this.renderShowTotal.bind(this);
    }

    handleChange(currentPage, size) {
        const { change } = this.props;
        change(currentPage);
    }

    renderShowTotal(total, range) {
        const { paginationLabel } = this.props;
        const { formatMessage } = this.props.intl;
        
        return (
            <div className={s.resultsCount}>
                <span>{range[0]}</span>
                <span>&nbsp;–&nbsp;</span>
                <span>{range[1]}</span>
                <span>&nbsp;{formatMessage(messages.PaginationOfContent)}&nbsp;</span>
                <span className='paginationRtl'>{total}</span>
                <span>&nbsp;{paginationLabel}</span>
            </div>
        );
    }

    render() {
        const { total, defaultCurrent, defaultPageSize, currentPage } = this.props;
        const locale = { prev_page: 'Previous', next_page: 'Next' };
        
        return (
            <div className={"spaceTop4"}>
                <Pagination
                    className="ant-pagination"
                    defaultCurrent={defaultCurrent}
                    current={currentPage}
                    total={total}
                    defaultPageSize={defaultPageSize}
                    onChange={this.handleChange}
                    showTotal={(total, range) => this.renderShowTotal(total, range)}
                    locale={locale}
                    showLessItems
                />
            </div>
        );
    }


}

const mapState = (state) => ({
});

const mapDispatch = {
}

// export default withStyles(s)(CustomPagination);

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(CustomPagination)));
