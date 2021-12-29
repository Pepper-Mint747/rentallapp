import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WriteReview.css';

// Component
import AdminReviewsForm from '../../../components/siteadmin/AdminReviewsForm';

class WriteReview extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired
    };

    static defaultProps = {
        data: {
            loading: true
        }
    };

    render() {
        const { data: { loading } } = this.props;

        return (
            <AdminReviewsForm />  
        );
    }
}

export default withStyles(s)(WriteReview);