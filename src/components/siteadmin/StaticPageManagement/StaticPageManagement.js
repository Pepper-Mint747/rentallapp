import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table, Tr, Td, Thead, Th } from 'reactable';
import { connect } from 'react-redux';
import Link from '../../../components/Link';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StaticPageManagement.css';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

class StaticPageManagement extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <h1 className={s.headerTitle}><FormattedMessage {...messages.staticPageManagement} /></h1>
          <div className={cx('table-responsive', 'tableBorderRadiusAdmin', 'NewAdminResponsiveTable', 'NewResponsiveTableAdmin')}>
            <Table className="table"
              noDataText={formatMessage(messages.noRecordFound)}
            >
              <Thead>
                <Th scope="col">{formatMessage(messages.idLabel)}</Th>
                <Th scope="col">{formatMessage(messages.pageName)}</Th>
                <Th scope="col">{formatMessage(messages.preview)}</Th>
                <Th scope="col">{formatMessage(messages.editLabel)}</Th>
              </Thead>
              <Tr>
                <Td data-label={formatMessage(messages.idLabel)} column={formatMessage(messages.idLabel)}>1</Td>
                <Td data-label={formatMessage(messages.pageName)} column={formatMessage(messages.pageName)}><FormattedMessage {...messages.aboutUsLabel} /></Td>
                <Td data-label={formatMessage(messages.preview)} column={formatMessage(messages.preview)}>
                  <a href={"/about"} target={'_blank'}>
                    <FormattedMessage {...messages.preview} />
                  </a>
                </Td>
                <Td data-label={formatMessage(messages.editLabel)} column={formatMessage(messages.editLabel)}>
                  <Link to={"/siteadmin/edit/staticpage/1"}>
                    <FormattedMessage {...messages.editLabel} />
                  </Link>
                </Td>
              </Tr>
              <Tr>
                <Td data-label={formatMessage(messages.idLabel)} column={formatMessage(messages.idLabel)}>2</Td>
                <Td data-label={formatMessage(messages.pageName)} column={formatMessage(messages.pageName)}><FormattedMessage {...messages.trustSafety} /></Td>
                <Td data-label={formatMessage(messages.preview)} column={formatMessage(messages.preview)}>
                  <a href={"/safety"} target={'_blank'}>
                    <FormattedMessage {...messages.preview} />
                  </a>
                </Td>
                <Td data-label={formatMessage(messages.editLabel)} column={formatMessage(messages.editLabel)}>
                  <Link to={"/siteadmin/edit/staticpage/2"}>
                    <FormattedMessage {...messages.editLabel} />
                  </Link>
                </Td>
              </Tr>

              <Tr>
                <Td data-label={formatMessage(messages.idLabel)} column={formatMessage(messages.idLabel)}>3</Td>
                <Td data-label={formatMessage(messages.pageName)} column={formatMessage(messages.pageName)}><FormattedMessage {...messages.travelCredit} /></Td>
                <Td data-label={formatMessage(messages.preview)} column={formatMessage(messages.preview)}>
                  <a href={"/travel"} target={'_blank'}>
                    <FormattedMessage {...messages.preview} />
                  </a>
                </Td>
                <Td data-label={formatMessage(messages.editLabel)} column={formatMessage(messages.editLabel)}>
                  <Link to={"/siteadmin/edit/staticpage/3"}>
                    <FormattedMessage {...messages.editLabel} />
                  </Link>
                </Td>
              </Tr>

              <Tr>
                <Td data-label={formatMessage(messages.idLabel)} column={formatMessage(messages.idLabel)}>4</Td>
                <Td data-label={formatMessage(messages.pageName)} column={formatMessage(messages.pageName)}><FormattedMessage {...messages.termsPrivacy} /></Td>
                <Td data-label={formatMessage(messages.preview)} column={formatMessage(messages.preview)}>
                  <a href={"/privacy"} target={'_blank'}>
                    <FormattedMessage {...messages.preview} />
                  </a>
                </Td>
                <Td data-label={formatMessage(messages.editLabel)} column={formatMessage(messages.editLabel)}>
                  <Link to={"/siteadmin/edit/staticpage/4"}>
                    <FormattedMessage {...messages.editLabel} />
                  </Link>
                </Td>
              </Tr>

              <Tr>
                <Td data-label={formatMessage(messages.idLabel)} column={formatMessage(messages.idLabel)}>5</Td>
                <Td data-label={formatMessage(messages.pageName)} column={formatMessage(messages.pageName)}><FormattedMessage {...messages.help} /></Td>
                <Td data-label={formatMessage(messages.preview)} column={formatMessage(messages.preview)}>
                  <a href={"/help"} target={'_blank'}>
                    <FormattedMessage {...messages.preview} />
                  </a>
                </Td>
                <Td data-label={formatMessage(messages.editLabel)} column={formatMessage(messages.editLabel)}>
                  <Link to={"/siteadmin/edit/staticpage/5"}>
                    <FormattedMessage {...messages.editLabel} />
                  </Link>
                </Td>
              </Tr>

              <Tr>
                <Td data-label={formatMessage(messages.idLabel)} column={formatMessage(messages.idLabel)} >6</Td>
                <Td data-label={formatMessage(messages.pageName)} column={formatMessage(messages.pageName)} ><FormattedMessage {...messages.cookieStaticPolicy} /></Td>
                <Td data-label={formatMessage(messages.preview)} column={formatMessage(messages.preview)}>
                  <a href={"/cookie-policy"} target={'_blank'}>
                    <FormattedMessage {...messages.preview} />
                  </a>
                </Td>
                <Td data-label={formatMessage(messages.editLabel)} column={formatMessage(messages.editLabel)}>
                  <Link to={"/siteadmin/edit/staticpage/6"}>
                    <FormattedMessage {...messages.editLabel} />
                  </Link>
                </Td>
              </Tr>
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

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(StaticPageManagement)));