import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeUploader.css';
import bt from '../../../../components/commonStyle.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Redux
import { connect } from 'react-redux';
import { doRemoveHomeLogo } from '../../../../actions/siteadmin/manageLogo';

// Component
import DropZone from './DropZone';
import Loader from '../../../Loader';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../../locale/messages';

// Asset
import defaultPic from '../../../../../public/adminIcons/defaultAdmin.svg';
import DeleteIcon from '../../../../../public/adminIcons/dlt.png';
class HomeUploader extends React.Component {

  static propTypes = {
    homeLogoUploaderLoading: PropTypes.bool,
    doRemoveHomeLogo: PropTypes.any.isRequired,
    getLogoData: PropTypes.shape({
      loading: PropTypes.bool,
      getHomeLogo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    profilePictureData: {
      loading: true
    },
    homeLogoUploaderLoading: false
  };

  render() {
    const { getLogoData: { loading, getHomeLogo }, doRemoveHomeLogo, homeLogoUploaderLoading } = this.props;
    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <Loader
            show={homeLogoUploaderLoading}
            type={"page"}
          >
            <div className={bt.picContainerMain}>
              <div className={bt.picContainer}>
                <div className={cx(bt.profilePic, bt.whiteImg)}>
                  {
                    loading && <div><FormattedMessage {...messages.loadingLabel} /></div>
                  }
                  {
                    !loading && getHomeLogo && getHomeLogo.value && <div
                      style={{ backgroundImage: `url(/images/logo/${getHomeLogo.value})` }}
                      className={bt.profileImageBg}
                    />
                  }
                  {
                    !loading && getHomeLogo && !getHomeLogo.value && <div
                      style={{ backgroundImage: `url(${defaultPic})` }}
                      className={bt.profileImageBg}
                    />
                  }
                  {
                    !loading && getHomeLogo === null && <div
                      style={{ backgroundImage: `url(${defaultPic})` }}
                      className={bt.profileImageBg}
                    />
                  }
                </div>
                {
                  !loading && getHomeLogo && getHomeLogo.value && <a href="javascript:void(0);" onClick={() => doRemoveHomeLogo(getHomeLogo.value)}
                  className={cx(bt.trashIconNew, 'trashIconNewRTL')}>
                    <img src={DeleteIcon} alt='Delete' />
                  </a>
                }
              </div>
            </div>
          </Loader>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <div className={cx(s.fullWidth, s.button, bt.btnPrimary, s.noPadding, 'photoUploadBtn')}>
            <DropZone data={getHomeLogo} />
          </div>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
  homeLogoUploaderLoading: state.siteSettings.homeLogoUploaderLoading
});

const mapDispatch = {
  doRemoveHomeLogo
};

export default compose(
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(gql`
      query getHomeLogo{
        getHomeLogo {
          id
          title
          name
          value
          type
        }
      }
    `, {
      name: 'getLogoData',
      options: {
        ssr: false
      }
    }),
)(HomeUploader);
