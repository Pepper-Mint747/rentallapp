import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FailedPayout.css';

import Loader from '../../../components/Loader';

import ShowFailedPayout from '../../../components/siteadmin/ShowFailedPayout/ShowFailedPayout';
import getFailedTransaction from './getFailedTransaction.graphql';

class FailedPayout extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getFailedTransaction: PropTypes.array
        })
    }

    render () {
        const { data: { loading } } = this.props;
        if(loading) {
            return <Loader type={"text"} />
        }

        const { data: {getFailedTransaction}, title } = this.props;
        return <ShowFailedPayout 
            data={getFailedTransaction}
            title={title}
        />
    }
}

export default compose(
    withStyles(s),
    graphql(getFailedTransaction,
        {
            options: (props) => ({
                variables: {
                    id:props.id
                },
                fetchPolicy: 'network-only',
                ssr: true
            })
        }
    )
)(FailedPayout);