import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BecomeHostStaticBlock.css';

// Component
import BecomeHostStaticBlockForm from '../../../components/siteadmin/BecomeHostStaticBlockForm/BecomeHostStaticBlockForm';
import Loader from '../../../components/Loader/Loader';

class BecomeHostStaticBlock extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getSideMenu: PropTypes.object,
    })
  };

  static defaultProps = {
    data: {
      loading: true,
      image: null
    }
  };


  render() {
    const { data: { loading, getSideMenu }, title } = this.props;
    let settingsCollection = {};
    
    if (loading) {
      return <Loader type={"text"} />;
    } else {
      getSideMenu.map((item, key) => {
        if (item.name == 'block1') {
          settingsCollection['blockTitle1'] = item.title;
          settingsCollection['blockContent1'] = item.description;
        } else if(item.name == 'block2') {
          settingsCollection['blockTitle2'] = item.title;
          settingsCollection['blockContent2'] = item.description;
        } else if(item.name == 'block3') {
          settingsCollection['blockTitle3'] = item.title;
          settingsCollection['blockContent3'] = item.description;
        }
      });
      return <BecomeHostStaticBlockForm initialValues={settingsCollection} title={title} />
    }
  }

}

export default compose(
  withStyles(s),
  graphql(gql`
  query {
    getSideMenu {
          title
          description
          name
          page
          step
          isEnable
    }
  }
      `),
)(BecomeHostStaticBlock);
