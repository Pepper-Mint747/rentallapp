import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminLayout.css';
import AdminHeader from '../Header/AdminHeader';
import AdminFooter from '../siteadmin/AdminFooter';
import SideBar from '../siteadmin/SideBar';
import history from '../../core/history';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      location: ''
    };
    this.changeLocation = this.changeLocation.bind(this);
  }

  componentDidMount() {
    this.setState({
      location: history.location.pathname
    });
  }

  changeLocation() {
    this.setState({
      location: history.location.pathname
    })
  }

  render() {
    const { location } = this.state;
    return (
      <div className="adminstyle">
        <AdminHeader />
        <div>
          <SideBar location={location} changeLocation={this.changeLocation} />
          <div className={("hamburger")}>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </div>
        </div>
        <div>{this.props.children}</div>
        <div>
          <AdminFooter />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Layout);
