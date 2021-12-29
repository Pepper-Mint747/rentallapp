import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropzoneComponent from 'react-dropzone-component';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';
import {change} from 'redux-form';

import { connect } from 'react-redux';
import { startEmailLogoUploaderLoader, doUploadEmailLogo, doRemoveHomeLogo } from '../../../../actions/siteadmin/manageLogo';
// Translation
import {injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';
class Dropzone extends Component {

    static propTypes = {
        doUploadEmailLogo: PropTypes.any.isRequired,
        doRemoveHomeLogo: PropTypes.any.isRequired,
        startEmailLogoUploaderLoader: PropTypes.any.isRequired,
    };

    static defaultProps = {
        data: null
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.dropzone = null;
    }

    async success(file, fromServer) {
        const { doUploadEmailLogo, data, change } = this.props;
        let fileName = fromServer.file.filename;
        let oldPicture = data != null ? data.value : null;
        let filePath = fromServer.file.path;
        doUploadEmailLogo(fileName, filePath, oldPicture);
        await change('SiteSettingsForm', 'emailLogo', fileName);       
    }

    addedfile(file, fromServer) {
        const { startEmailLogoUploaderLoader } = this.props;
        startEmailLogoUploaderLoader();
    }

    render() {
        const { formatMessage } = this.props.intl;
        const djsConfig = {
            dictDefaultMessage: formatMessage(messages.clickHeretoUploadLogo),
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: 10,
            acceptedFiles: 'image/jpeg,image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false
        };
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png'],
            postUrl: '/uploadEmailLogo'
        };
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            success: this.success,
            addedfile: this.addedfile
        };

        return (
            <div>
                <DropzoneComponent
                    config={componentConfig}
                    eventHandlers={eventHandlers}
                    djsConfig={djsConfig}
                />
            </div>
        );
    }
}

const mapState = (state) => ({});

const mapDispatch = {
    doUploadEmailLogo,
    doRemoveHomeLogo,
    startEmailLogoUploaderLoader,
    change
};

export default injectIntl (withStyles(s)(connect(mapState, mapDispatch)(Dropzone)));
