import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from "./PayoutManagement.css";

import Loader from '../../../components/Loader';

// Query
import reservationsQuery from './reservationsQuery.graphql';

import ManagePayout from '../../../components/siteadmin/ManagePayout/ManagePayout';


class PayoutManagement extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getAllPayoutReservation: PropTypes.array,
        })
    }

    render() {
        const { data: { loading } } = this.props;
        if (loading) {
            return <Loader type={"text"} />;
        }
        const { data, data: { getAllPayoutReservation, refetch }, title } = this.props;
        return <ManagePayout
            // data={data}
            title={title}
            // refetch={refetch}
        />
    }
}

export default compose(
    withStyles(s),
    graphql(reservationsQuery, {
        options: {
            variables: {
                currentPage: 1,
                searchList: ''
            },
            fetchPolicy: 'network-only',
            ssr: false
        }
    })
)(PayoutManagement);