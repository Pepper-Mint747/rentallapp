import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditStaticPage.css';
import cx from 'classnames';

// Component
import EditStaticPageManage from '../../../components/siteadmin/EditStaticPage/EditStaticPage';

// Query
import editStaticPage from './editStaticPage.graphql';
import NotFound from '../../notFound/NotFound';


class EditStaticPage extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        blogId: PropTypes.number.isRequired,
        editStaticPageData: PropTypes.shape({
            loading: PropTypes.bool,
            getEditStaticPage: PropTypes.object
        }),
    };


    render() {
        const { editStaticPageData, title } = this.props;
        
        if(editStaticPageData && editStaticPageData.getEditStaticPage === null) {
            return <div className={cx(s.pagecontentWrapper)}><NotFound /></div>
        }

        return (
            <EditStaticPageManage
                title={title} initialValues={editStaticPageData.getEditStaticPage}
            />
        );
    }
}

export default compose(
    withStyles(s),
    graphql(editStaticPage, {
        name: 'editStaticPageData',
        options: (props) => ({
            variables: {
                id: props.pageId,
            },
            fetchPolicy: 'network-only'
        })
    }),
)(EditStaticPage);