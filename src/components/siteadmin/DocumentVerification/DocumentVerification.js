import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Table, Tr, Td, Thead, Th} from 'reactable';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { graphql, gql, compose } from 'react-apollo';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DocumentVerification.css';

import DocumentManagement from './DocumentManagementQuery.graphql';

// Translation
import messages from '../../../locale/messages';


// Send Email
import { sendEmail } from '../../../core/email/sendEmail';

//Document List
import FileList from './FileList';



const query = gql`query showAllDocument
{
  showAllDocument {
    id,
    email,
     profile{
          firstName
    }
    document{      
       fileName
        fileType
        documentStatus
    }
    verification{
      isIdVerification
    }
  }
}
`;
class DocumentVerification extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async handleUpdate(id, status, item) {
    const { mutate } = this.props;
    const { data } = await mutate({
      variables: {
        userId: id,
        isIdVerification: status
      },
      refetchQueries: [{ query }]
    });

    if (data.DocumentManagement.status === 'success') {
      let msg = 'Documents have been ';
      msg += (status) ? 'Approved!' : 'Rejected!';
      let content = {
        name: item.profile.firstName,
        verificationStatus: (status) ? 'approved' : 'rejected'
      }
      await sendEmail(item.email, 'documentVerification', content);
      toastr.success("Success!", msg);
    } else {
      toastr.success("Error!", "Something went wrong!");
    }
  }


  render() {
    const { dataList, intl } = this.props;
    const { formatMessage } = this.props.intl;
    let path = "/images/document/";

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.documentVerificationManagement} /></h1>
          <div className={cx('table-responsive', 'tableBorderRadiusAdmin', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin')}>
            <Table className="table"
              noDataText={formatMessage(messages.noRecordFound)}
            >
            <Thead>
              <Th scope="col">{formatMessage(messages.sNoLabel)}</Th>
              <Th scope="col">{formatMessage(messages.hostNameLabel)}</Th>
              <Th scope="col">{formatMessage(messages.hostEMailLabel)}</Th>
              <Th scope="col">{formatMessage(messages.RequestedFiles)}</Th>
              <Th scope="col">{formatMessage(messages.actionLabel)}</Th>
            </Thead>
              {
                dataList && dataList.map((value, key) => {
                  let icon = value.fileType == 'application/pdf' ? formatMessage(messages.documentReject) : formatMessage(messages.documentReject);
                  return (
                    <Tr key={key}>
                      <Td data-label={formatMessage(messages.sNoLabel)} column={formatMessage(messages.sNoLabel)} data={key + 1} />
                      <Td data-label={formatMessage(messages.hostNameLabel)} column={formatMessage(messages.hostNameLabel)} data={value.profile.firstName} />
                      <Td data-label={formatMessage(messages.hostEMailLabel)} column={formatMessage(messages.hostEMailLabel)} data={value.email} />
                      <Td data-label={formatMessage(messages.RequestedFiles)}  column={formatMessage(messages.RequestedFiles)}>
                        <FileList key={'f' + key} data={value.document} />
                      </Td>
                      <Td data-label={formatMessage(messages.actionLabel)} column={formatMessage(messages.actionLabel)}>
                        <div>
                          <a
                            href="javascript:void(0)"
                            onClick={() => this.handleUpdate(value.id, !value.verification.isIdVerification, value)}
                          >
                            <span>{value.verification.isIdVerification ? formatMessage(messages.documentReject) : formatMessage(messages.documentApprove)}</span>
                          </a>
                        </div>
                      </Td>
                    </Tr>
                  )
                })
              }
            </Table>
          </div>
        </div>
      </div>
    );
  }

}

const mapState = (state) => ({
});

const mapDispatch = {

};

export default compose(injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(DocumentManagement, { options: { fetchPolicy: 'network-only' } })
)(DocumentVerification);