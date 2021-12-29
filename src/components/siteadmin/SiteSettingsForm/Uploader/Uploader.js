import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Uploader.css';
import bt from '../../../../components/commonStyle.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Redux
import { connect } from 'react-redux';
import { doRemoveLogo } from '../../../../actions/siteadmin/manageLogo';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../../locale/messages';

// Component
import DropZone from './DropZone';
import Avatar from '../../../Avatar';
import Loader from '../../../Loader';

// Asset
import defaultPic from '../../../../../public/adminIcons/defaultAdmin.svg';
import DeleteIcon from '../../../../../public/adminIcons/dlt.png';

class Uploader extends React.Component {

  static propTypes = {
    logoUploaderLoading: PropTypes.bool,
    doRemoveLogo: PropTypes.any.isRequired,
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
    logoUploaderLoading: false
  };

  render() {
    const { getLogoData: { loading, getLogo }, doRemoveLogo, logoUploaderLoading } = this.props;
    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <Loader
            show={logoUploaderLoading}
            type={"page"}
          >
            <div className={bt.picContainerMain}>
              <div className={bt.picContainer}>
                <div className={bt.profilePic}>
                  {
                    loading && <div><FormattedMessage {...messages.loadingLabel} /></div>
                  }
                  {
                    !loading && getLogo != null && <div 
                    style={{ backgroundImage: `url(/images/logo/${getLogo.value})` }}
                    className={bt.profileImageBg}
                    />
                  }
                  {
                    !loading && getLogo === null && <div
                    style={{ backgroundImage: `url(${defaultPic})` }}
                    className={bt.profileImageBg}
                    />
                  }
                </div>
                {
                  !loading && getLogo != null && <a href="javascript:void(0);" onClick={() => doRemoveLogo(getLogo.value)}
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
            <DropZone data={getLogo} />
          </div>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
  logoUploaderLoading: state.siteSettings.logoUploaderLoading
});

const mapDispatch = {
  doRemoveLogo
};

export default compose(
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(gql`
      query getLogo{
        getLogo {
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
)(Uploader);
