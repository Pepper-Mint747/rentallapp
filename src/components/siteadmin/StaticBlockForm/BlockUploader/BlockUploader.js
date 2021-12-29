import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BlockUploader.css';
import bt from '../../../../components/commonStyle.css';
import { formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';
import { doRemoveStaticImage } from '../../../../actions/siteadmin/manageStaticBlock';

// Component
import DropZone from './DropZone';
import Loader from '../../../Loader';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../../locale/messages';

// Asset
import defaultPic from '../../../../../public/adminIcons/defaultAdmin.svg';
import DeleteIcon from '../../../../../public/adminIcons/dlt.png';

class BlockUploader extends React.Component {

  static propTypes = {
    staticImageLoading: PropTypes.bool,
    doRemoveStaticImage: PropTypes.any.isRequired,
    getLogoData: PropTypes.shape({
      loading: PropTypes.bool,
      getLogo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    profilePictureData: {
      loading: true
    },
    staticImageLoading: false
  };

  render() {
    const { getLogoData: { loading, getStaticInfo }, image, doRemoveStaticImage, staticImageLoading } = this.props;

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={bt.textAlignCenter}>
          <Loader
            show={staticImageLoading}
            type={"page"}
          >
            <div className={bt.picContainerMain}>
              <div className={bt.picContainer}>
                {
                  loading && <div><FormattedMessage {...messages.loadingLabel} /></div>
                }
                {
                  !loading && getStaticInfo && getStaticInfo[0].image && <div
                    style={{ backgroundImage: `url(/images/home/${getStaticInfo[0].image})` }}
                    className={s.bannerImageBg}
                  />
                }
                {
                  !loading && getStaticInfo && !getStaticInfo[0].image &&
                  <div
                    style={{ backgroundImage: `url(${defaultPic})` }}
                    className={bt.profileImageBg}
                  />
                }
                {
                  !loading && getStaticInfo[0].image && <a href="javascript:void(0);" onClick={() => doRemoveStaticImage(getStaticInfo[0].image, 'block1')}
                    className={cx(bt.trashIconNew, 'trashIconNewRTL')}>
                    <img src={DeleteIcon} />
                  </a>
                }
              </div>
            </div>
          </Loader>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <div className={cx(s.fullWidth, bt.btnPrimary, s.noPadding, 'photoUploadBtn')}>
            <DropZone data={getStaticInfo} />
          </div>
        </Col>
      </Row>
    );
  }
}
const selector = formValueSelector('StaticBlockForm');

const mapState = (state) => ({
  staticImageLoading: state.homeBannerImages.staticImageLoading,
  // image: selector(state, 'blockImage1')
});

const mapDispatch = {
  doRemoveStaticImage
};

export default compose(
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(gql`
  query ($name: String) {
    getStaticInfo(name: $name) {
      name
      image
      content
      title
    }
  }
    `, {
      name: 'getLogoData',
      options: {
        ssr: false,
        variables: {
          name: 'block1'
        },
      }
    }),
)(BlockUploader);