import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropzoneComponent from 'react-dropzone-component';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!./filepicker.css';
import { change } from 'redux-form';

import { connect } from 'react-redux';
import { startStaticImageLoader, doUploadStaticImage, stopStaticImageLoader } from '../../../../actions/siteadmin/manageStaticBlock';

//Message
import { injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

class Dropzone extends Component {

    static propTypes = {
        doUploadStaticImage: PropTypes.any.isRequired,
        startStaticImageLoader: PropTypes.any.isRequired,
    };

    static defaultProps = {
        image: null
    };

    constructor(props) {
        super(props);
        this.success = this.success.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.dropzone = null;
    }

    async success(file, fromServer) {
        const { doUploadStaticImage, data, change } = this.props;
        let fileName = fromServer.file.filename;
        let oldPicture = data != null ? data[0].image : null;
        let filePath = fromServer.file.path;
        doUploadStaticImage(fileName, filePath, oldPicture, 'block1');
        await change('StaticBlockForm', 'blockImage1', fileName);
    }

    addedfile(file, fromServer) {
        const { startStaticImageLoader, stopStaticImageLoader } = this.props;
        startStaticImageLoader();
    }

    render() {
        const { formatMessage } = this.props.intl;
        const djsConfig = {
            dictDefaultMessage: formatMessage(messages.clickHeretoUploadImage),
            addRemoveLinks: false,
            uploadMultiple: false,
            maxFilesize: 10,
            acceptedFiles: 'image/jpeg, image/png',
            dictMaxFilesExceeded: 'Remove the existing image and try upload again',
            previewsContainer: false,
            // maxFiles: 1
        };
        const componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.jpeg'],
            postUrl: '/uploadHomeBanner'
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

const mapState = (state) => ({
});

const mapDispatch = {
    // doRemoveLogo,
    startStaticImageLoader,
    stopStaticImageLoader,
    doUploadStaticImage,
    change
};

export default injectIntl (withStyles(s)(connect(mapState, mapDispatch)(Dropzone)));
