import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EmailLogoUploader.css';
import bt from '../../../../components/commonStyle.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Redux
import { connect } from 'react-redux';
import { doRemoveEmailLogo } from '../../../../actions/siteadmin/manageLogo';

// Component
import DropZone from './DropZone';
import Loader from '../../../Loader';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../../locale/messages';


// Asset
import defaultPic from '../../../../../public/adminIcons/defaultAdmin.svg';
import DeleteIcon from '../../../../../public/adminIcons/dlt.png';
class EmailLogoUploader extends React.Component {

  static propTypes = {
    emailLogoUploaderLoading: PropTypes.bool,
    doRemoveEmailLogo: PropTypes.any.isRequired,
    getLogoData: PropTypes.shape({
      loading: PropTypes.bool,
      getEmailLogo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    })
  };

  static defaultProps = {
    getLogoData: {
      loading: true
    },
    emailLogoUploaderLoading: false
  };

  render() {
    const { getLogoData: { loading, getEmailLogo }, doRemoveEmailLogo, emailLogoUploaderLoading } = this.props;

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <Loader
            show={emailLogoUploaderLoading}
            type={"page"}
          >
            <div className={bt.picContainerMain}>
              <div className={bt.picContainer}>
                <div className={bt.profilePic}>
                  {
                    loading && <div><FormattedMessage {...messages.loadingLabel} /></div>
                  }
                  {
                    !loading && getEmailLogo && getEmailLogo.value && <div
                      style={{ backgroundImage: `url(/images/logo/${getEmailLogo.value})` }}
                      className={bt.profileImageBg}
                    />
                  }
                  {
                    !loading && getEmailLogo && !getEmailLogo.value && <div
                    style={{ backgroundImage: `url(${defaultPic})` }}
                    className={bt.profileImageBg}
                    />
                  }
                  {
                    !loading && getEmailLogo === null && <div
                    style={{ backgroundImage: `url(${defaultPic})` }}
                    className={bt.profileImageBg}
                    />
                  }
                </div>
                {
                  !loading && getEmailLogo && getEmailLogo.value && <a href="javascript:void(0);" onClick={() => doRemoveEmailLogo(getEmailLogo.value)}
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
            <DropZone data={getEmailLogo} />
          </div>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
  emailLogoUploaderLoading: state.siteSettings.emailLogoUploaderLoading
});

const mapDispatch = {
  doRemoveEmailLogo
};

export default compose(
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(gql`
      query getEmailLogo{
        getEmailLogo {
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
)(EmailLogoUploader);