import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DropzoneComponent from 'react-dropzone-component';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';
import { toastr } from 'react-redux-toastr';
import cx from 'classnames';

import { connect } from 'react-redux';
import { startBannerUploaderLoader, doUploadHomeBanner } from '../../../actions/siteadmin/manageHomeBanner';
import { maxUploadSize } from '../../../config';
import { getHomeBannerImages } from '../../../actions/getHomeBannerImages';

//Images
import PictureImage from '../../../../public/adminIcons/defaultAdmin.svg';

class Dropzone extends Component {

    static propTypes = {
        doUploadHomeBanner: PropTypes.any.isRequired,
        startBannerUploaderLoader: PropTypes.any.isRequired,
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.dropzone = null;
        this.state = {
            djsConfig: {}
        }
    }

    componentDidMount() {
        const { placeholder } = this.props;
        const isBrowser = typeof window !== 'undefined';
        const isDocument = typeof document !== undefined;
        if (isBrowser && isDocument) {
          document.querySelector(".dz-hidden-input").style.visibility = 'visible';
          document.querySelector(".dz-hidden-input").style.opacity = '0';
          document.querySelector(".dz-hidden-input").style.height = '100%';
          document.querySelector(".dz-hidden-input").style.width = '100%';
          document.querySelector(".dz-hidden-input").style.cursor = 'pointer';
        }
        if (placeholder) {
            this.setState({
                djsConfig: {
                  dictDefaultMessage: placeholder,
                  addRemoveLinks: false,
                  maxFilesize: 10,
                  maxFiles: 20,
                  acceptedFiles: 'image/jpeg,image/png',
                  hiddenInputContainer: '.dzInputContainer',
                  // dictFileTooBig: '',
                }
              });
            }
      }

      componentWillMount(){
        const { placeholder } = this.props;

        if (placeholder) {
            this.setState({
                djsConfig: {
                  dictDefaultMessage: placeholder,
                  addRemoveLinks: false,
                  maxFilesize: 10,
                  maxFiles: 20,
                  acceptedFiles: 'image/jpeg,image/png',
                  hiddenInputContainer: '.dzInputContainer',
                  // dictFileTooBig: '',
                }
              });
            }
      }

    async success(file, fromServer) {
        const { doUploadHomeBanner, data, getHomeBannerImages } = this.props;
        let fileName = fromServer.file.filename;
        let oldImage = data != undefined ? data : null;
        doUploadHomeBanner(fileName, oldImage);
        this.dropzone.removeFile(file);
        getHomeBannerImages();
    }

    addedfile(file, fromServer) {
        const { startBannerUploaderLoader } = this.props;
        startBannerUploaderLoader();
        if (file.size > (1024 * 1024 * maxUploadSize)) {
            toastr.error('Maximum upload size Exceeded! ', 'Try again with a smaller sized image');
            this.dropzone.removeFile(file);
        }
    }

    render() {

        const { djsConfig } = this.state;
            
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png'],
            postUrl: '/uploadHomeBanner'
        };
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile
        };

        return (
            <div className={'listPhotoContainer'}>
                  <div className={cx('adminPhotoUplod', 'dzInputContainer')}>
                    <DropzoneComponent
                        config={componentConfig}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig}
                    />
                    <img src={PictureImage} className={'photoUploadImg'} alt="PictureImage" />
                </div>
            </div>
        );
    }
}

const mapState = (state) => ({});

const mapDispatch = {
    doUploadHomeBanner,
    startBannerUploaderLoader,
    getHomeBannerImages
};

export default withStyles(s)(connect(mapState, mapDispatch)(Dropzone));
