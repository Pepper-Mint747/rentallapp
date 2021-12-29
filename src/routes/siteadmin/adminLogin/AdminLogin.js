// General
import React from 'react';
import PropTypes from 'prop-types';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminLogin.css';

//Component
import AdminLoginForm from '../../../components/siteadmin/AdminLoginForm';

class AdminLogin extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div>
        <AdminLoginForm />
      </div>
    );
  }
}

export default withStyles(s)(AdminLogin);