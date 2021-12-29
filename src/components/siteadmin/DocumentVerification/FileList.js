import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
class FileList extends React.Component {

    render(){

        const { data } = this.props;
        const { formatMessage } = this.props.intl;
        let pdf = formatMessage(messages.pdf);
        let img = formatMessage(messages.imageLabel);
        let path = "/images/document/";

        return(
            <div>
               {
                    data.map((item, index) =>{
                        let icon = item.fileType == 'application/pdf' ? pdf : (img);                                           
                        return (
                            <div key={index}>
                                <a href={path + item.fileName} target="_blank">{icon} </a>                                
                            </div>
                        )                               
                   })
               }                           
           </div>
           
        )
    }
}

export default injectIntl(FileList);

