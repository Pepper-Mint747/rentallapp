import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { reduxForm } from 'redux-form';
import submit from './submit';
import { getHomeBannerImages } from '../../../actions/getHomeBannerImages';

// Style
import {
  Row,
  FormGroup,
  Col,
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeBannerForm.css';
import bt from '../../../components/commonStyle.css';

// Component
import DropZone from './DropZone';
import { deleteHomeBanner } from '../../../actions/siteadmin/deleteHomeBanner';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

// Images
import DeleteIcon from '../../../../public/adminIcons/dlt.png';

class HomeBannerForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
    bannerUploaderLoading: PropTypes.bool
  };

  render() {

    const { error, handleSubmit,  image, bannerUploaderLoading, homeBannerImages, deleteHomeBanner } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.homeBannerLabel} /></h1>
          <Col xs={12} sm={12} md={8} lg={8} className={s.blockcenter}>
            <Panel className={cx(s.panelHeader, s.bannerPadding)}>
              <form onSubmit={handleSubmit(submit)}>
                {error && <strong>{error}</strong>}
                <FormGroup className={s.formGroup}>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <div>
                        <DropZone data={image} placeholder={formatMessage(messages.photosPlaceholder)}/>
                      </div>
                    </Col>
                  </Row>
                </FormGroup>
                <div className={cx('row')}>
                  {
                    homeBannerImages && homeBannerImages.data.length > 0 && homeBannerImages.data.map((item, key) => {
                      return (
                        <div key={key} className={cx('col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center', s.space3)}>
                          <div className={s.listPhotoMedia}>
                            <div className={s.bannerImageBg} style={{ backgroundImage: `url(/images/home/${item.name})` }} />
                            <a href="javascript:void(0);" onClick={() => deleteHomeBanner(item.id, item.name)} className={cx(s.bannerDelete, 'trashIconNewRTL')}>
                              <img src={DeleteIcon} alt='Delete' />
                            </a>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </form>
            </Panel>
          </Col>
        </div>
      </div>
    );
  }

}

HomeBannerForm = reduxForm({
  form: 'HomeBannerForm', // a unique name for this form
  // validate
})(HomeBannerForm);

const mapState = (state) => ({
  bannerUploaderLoading: state.siteSettings.bannerUploaderLoading,
  homeBannerImages: state.homeBannerImages
});

const mapDispatch = {
  getHomeBannerImages,
  deleteHomeBanner
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(HomeBannerForm)));