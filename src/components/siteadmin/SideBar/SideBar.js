import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { openHeaderModal } from '../../../actions/modalActions';
import { formatLocale } from '../../../helpers/formatLocale';

// Style
import {
    Button,
    Collapse
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideBar.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import Link from '../../Link';
import history from '../../../core/history';
import HeaderModal from '../../HeaderModal';

import { validatePrivilege } from '../../../helpers/adminPrivileges';
import logoutIcon from '../../../../public/adminIcons/ce2b5b26.svg';
import languageIcon from '../../../../public/languageIcon.svg';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';
import { adminLogout } from '../../../actions/siteadmin/logout';

class SideBar extends Component {

    static defaultProps = {
        isSuperAdmin: false,
        privileges: []
    };

    constructor(props) {
        super(props);
        this.state = {
            // step1: true,
            step1: false,
            step3: false,
            home: false,
            whyHost: false,
            location: ''
        };
        this.openMenu = this.openMenu.bind(this);
        this.openClose = this.openClose.bind(this);
    }

    componentDidMount() {
        this.setState({
            location: history.location.pathname
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { location, changeLocation } = this.props;
        if (prevState.location !== location) {
            this.setState({
                location
            })
        } else if (history.location.pathname !== location) {
            changeLocation();
            this.setState({
                location: history.location.pathname
            });
        }
    }

    async openMenu() {
        this.setState({
            isOpen: 1,
        })
    }
    async openClose() {
        this.setState({
            isOpen: 0,
        })
    }

    render() {
        const { isSuperAdmin, privileges, adminLogout } = this.props;
        const { step1, step3, home, location } = this.state;
        const { openHeaderModal, currentLocale } = this.props;
        let reviewManagementArray = ['/siteadmin/reviews', '/siteadmin/reviews/edit-review/', '/siteadmin/write-reviews'];
        let adminManagementArray = ['/siteadmin/admin-users', '/siteadmin/admin-roles'];
        let homePageArray = ['/siteadmin/home/caption', '/siteadmin/home/banner', '/siteadmin/home/footer-block', '/siteadmin/popularlocation', '/siteadmin/home/static-info-block', '/siteadmin/home/home-banner', '/siteadmin/popularlocation/add'];
        let whyBecomeHostPageArray = ['/siteadmin/whyHost/Block1', '/siteadmin/whyHost/Block2', '/siteadmin/whyHost/Block3', '/siteadmin/whyHost/Block4', '/siteadmin/whyHost/Block5', '/siteadmin/whyHost/Block6', '/siteadmin/whyHost/Block7'];
        let listSettingStep1 = ['/siteadmin/listsettings/1', '/siteadmin/listsettings/2', '/siteadmin/listsettings/3', '/siteadmin/listsettings/4', '/siteadmin/listsettings/5', '/siteadmin/listsettings/6', '/siteadmin/listsettings/7', '/siteadmin/listsettings/8', '/siteadmin/listsettings/9', '/siteadmin/listsettings/10', '/siteadmin/listsettings/11', '/siteadmin/listsettings/12'];
        let listSettingStep3 = ['/siteadmin/listsettings/13', '/siteadmin/listsettings/14', '/siteadmin/listsettings/15', '/siteadmin/listsettings/16', '/siteadmin/listsettings/17', '/siteadmin/listsettings/18', '/siteadmin/listsettings/19'];

        return (
            <div>
                <div className={cx(s.mobileHeader, 'visible-xs')}>
                    <div onClick={() => this.openMenu()}>
                        <div className={cx("hamburger")}>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </div>
                    </div>
                    <div>
                        <Link to={''} onClick={() => adminLogout()} className={cx(s.logoutIconMobile, 'visible-xs visible-sm')}>
                            <div className={cx(s.logoutIcon, 'logoutIconRTL')}><img src={logoutIcon} /></div>
                        </Link>
                    </div>

                </div>
                <div className={cx({ [s.menuOpen]: this.state.isOpen == 1 }, s.sidebarWrapper, 'adminScrollBar')}>
                    <div className={cx({ [s.menuClose]: this.state.isOpen == 0 })}>
                        <div className={cx(s.closeColor, 'visible-xs', 'closeColorAdminRTL')} onClick={() => this.openClose()} >
                            ×
                        </div>
                    </div>
                    <div className={cx("hidden-print", s.sidebarNavParent)}>
                        <div className={cx(s.sideBarWelcome)}>
                            <span><FormattedMessage {...messages.welcomeAdmin} /></span>
                        </div>

                        <ul className={s.sidebarNav}>
                        <li className={'visible-xs'}>
                                <Link  className={cx(s.sideNavitem, s.disPlayTable)}  onClick={(e) => openHeaderModal('languageModal')}>
                                <span><img src={languageIcon} className={cx(s.languageIcon, 'languageIconRTLAdmin')}/></span>
                                 <span>{formatLocale(currentLocale)}</span>
                                </Link>
                            </li>
                            <li className={cx({ [s.active]: location == '/siteadmin' })}>
                                <Link to={'/siteadmin'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                    <span className={s.disPlayTabelCell}>
                                        <FontAwesome.FaBarChart className={s.navigationIcon} />
                                    </span>
                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.dashboard} /></span>
                                </Link>
                            </li>
                            {
                                validatePrivilege(1, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/settings/site' })}>
                                    <Link to={'/siteadmin/settings/site'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                        <span className={s.disPlayTabelCell}>
                                            <FontAwesome.FaCog className={s.navigationIcon} />
                                        </span>
                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.siteSettings} /></span>
                                    </Link>
                                </li>
                            }
                            {
                                isSuperAdmin && <div>
                                    <div className={cx(adminManagementArray.includes(location) ? [s.active] : '')}>
                                        <Button
                                            bsStyle="link"
                                            className={cx(s.button, s.noPadding, s.sideNavitem, s.disPlayTable)}
                                            onClick={() => this.setState({
                                                subAdmin: !this.state.subAdmin
                                            })}>
                                            <span className={s.disPlayTabelCell}>
                                                <FontAwesome.FaStar className={s.navigationIcon} />
                                            </span>
                                            <span className={s.disPlayTabelCell}><FormattedMessage {...messages.manageAdmin} /></span>
                                            {
                                                this.state.subAdmin &&
                                                <span className={s.disPlayTabelCell}>
                                                    <FontAwesome.FaAngleUp className={s.navigationIcon} />
                                                </span>
                                            }

                                            {
                                                !this.state.subAdmin && <span className={s.disPlayTabelCell}><FontAwesome.FaAngleDown className={s.navigationIcon} /></span>
                                            }

                                        </Button>
                                    </div>
                                    <Collapse in={this.state.subAdmin} className={s.subMenu}>
                                        <div>
                                            <li className={cx({ [s.active]: location === '/siteadmin/admin-users' })}>
                                                <Link to={'/siteadmin/admin-users'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.manageAdminUsers} /></span>
                                                </Link>
                                            </li>

                                            <li className={cx({ [s.active]: location === '/siteadmin/admin-roles' })}>
                                                <Link to={'/siteadmin/admin-roles'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FormattedMessage {...messages.manageAdminRoles} /></span>
                                                </Link>
                                            </li>
                                        </div>
                                    </Collapse>
                                </div>
                            }

                            {
                                validatePrivilege(2, privileges) && <li className={cx({ [s.active]: (location === "/siteadmin/users" || location.startsWith('/siteadmin/profileView')) })}>
                                    <Link to={'/siteadmin/users'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                        <span className={s.disPlayTabelCell}>
                                            <FontAwesome.FaUser className={s.navigationIcon} />
                                        </span>
                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.manageUser} /></span>
                                    </Link>
                                </li>
                            }

                            {
                                validatePrivilege(3, privileges) && <li className={cx({ [s.active]: location === "/siteadmin/listings" })}>
                                    <Link to={'/siteadmin/listings'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                        <span className={s.disPlayTabelCell}>
                                            <FontAwesome.FaList className={s.navigationIcon} />
                                        </span>
                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.manageListing} /></span>
                                    </Link>
                                </li>
                            }

                            {
                                validatePrivilege(4, privileges) && <li className={cx({ [s.active]: (location === "/siteadmin/reservations" || location.startsWith('/siteadmin/viewreservation/')) })} >
                                    <Link to={'/siteadmin/reservations'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                        <span className={s.disPlayTabelCell}>
                                            <FontAwesome.FaPlane className={s.navigationIcon} />
                                        </span>
                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.manageReservations} /></span>
                                    </Link>
                                </li>
                            }

                            {
                                validatePrivilege(5, privileges) && <li className={cx({ [s.active]: (location === "/siteadmin/user-reviews" || location.startsWith('/siteadmin/management-reviews/')) })}>
                                    <Link to={'/siteadmin/user-reviews'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                        <span className={s.disPlayTabelCell}>
                                            <FontAwesome.FaLineChart className={s.navigationIcon} />
                                        </span>
                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.reviewManagement} /></span>
                                    </Link>
                                </li>
                            }
                            {
                                validatePrivilege(6, privileges) &&
                                <div>
                                    <div className={cx({ [s.active]: reviewManagementArray.includes(location) || location.startsWith('/siteadmin/reviews/edit-review/') })}>
                                        <Button
                                            bsStyle="link"
                                            className={cx(s.button, s.noPadding, s.sideNavitem, s.disPlayTable, reviewManagementArray.includes(location) ? [s.active] : '')}
                                            onClick={() => this.setState({
                                                adminReview: !this.state.adminReview
                                            })}>
                                            <span className={s.disPlayTabelCell}>
                                                <FontAwesome.FaStar className={s.navigationIcon} />
                                            </span>
                                            <span className={s.disPlayTabelCell}><FormattedMessage {...messages.adminReviews} /></span>
                                            {
                                                this.state.adminReview && <span className={s.disPlayTabelCell}><FontAwesome.FaAngleUp className={s.navigationIcon} />
                                                </span>
                                            }

                                            {
                                                !this.state.adminReview && <span className={s.disPlayTabelCell}><FontAwesome.FaAngleDown className={s.navigationIcon} />
                                                </span>
                                            }

                                        </Button>
                                    </div>
                                    <Collapse in={this.state.adminReview} className={s.subMenu}>
                                        <div>
                                            <li className={cx({ [s.active]: location.startsWith('/siteadmin/reviews') })}>
                                                <Link to={'/siteadmin/reviews'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.manageReviwes} /></span>
                                                </Link>
                                            </li>

                                            <li className={cx({ [s.active]: location === '/siteadmin/write-reviews' })} >
                                                <Link to={'/siteadmin/write-reviews'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.writeReviwes} /></span>
                                                </Link>
                                            </li>
                                        </div>
                                    </Collapse>
                                </div>
                            }

                            {
                                validatePrivilege(7, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/settings/servicefees' })}>
                                    <Link to={'/siteadmin/settings/servicefees'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                        <span className={s.disPlayTabelCell}>
                                            <FontAwesome.FaCreditCard className={s.navigationIcon} />
                                        </span>
                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.manageServiceFee} /></span>
                                    </Link>
                                </li>
                            }

                            {
                                validatePrivilege(8, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/document' })}>
                                    <Link to={'/siteadmin/document'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                        <span className={s.disPlayTabelCell}>
                                            <FontAwesome.FaFile className={s.navigationIcon} />
                                        </span>
                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.documentverificaiton} /></span>
                                    </Link>
                                </li>
                            }

                            {
                                validatePrivilege(9, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/messages' })}>
                                    <Link to={'/siteadmin/messages'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                        <span className={s.disPlayTabelCell}>
                                            <FontAwesome.FaInbox className={s.navigationIcon} />
                                        </span>
                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.messages} /></span>
                                    </Link>
                                </li>
                            }
                            {
                                validatePrivilege(10, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/reportUser' })}>
                                    <Link to={'/siteadmin/reportUser'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                        <span className={s.disPlayTabelCell}>
                                            <FontAwesome.FaUserSecret className={s.navigationIcon} />
                                        </span>
                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.reportManagement} /></span>
                                    </Link>
                                </li>
                            }

                            {
                                validatePrivilege(17, privileges) && <li className={cx({ [s.active]: (location === '/siteadmin/payout' || location.startsWith('/siteadmin/viewpayout/')) })}>
                                    <Link to={'/siteadmin/payout'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                        <span className={s.disPlayTabelCell}>
                                            <FontAwesome.FaCreditCard className={s.navigationIcon} />
                                        </span>
                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.managePayout} /></span>
                                    </Link>
                                </li>
                            }

                            {
                                isSuperAdmin && <li className={cx({ [s.active]: location === '/siteadmin/currency' })}>
                                    <Link to={'/siteadmin/currency'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                        <span className={s.disPlayTabelCell}>
                                            <FontAwesome.FaMoney className={s.navigationIcon} />
                                        </span>
                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.manageCurrency} /></span>
                                    </Link>
                                </li>
                            }

                            {
                                validatePrivilege(11, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/settings/search' })}>
                                    <Link to={'/siteadmin/settings/search'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                        <span className={s.disPlayTabelCell}>
                                            <FontAwesome.FaCogs className={s.navigationIcon} />
                                        </span>
                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.searchSettings} /></span>
                                    </Link>
                                </li>
                            }

                            <li className={cx({ [s.active]: location === '/siteadmin/change/admin' })}>
                                <Link to={'/siteadmin/change/admin'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                    <span className={s.disPlayTabelCell}>
                                        <FontAwesome.FaCogs className={s.navigationIcon} />
                                    </span>
                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.changePasswordLabel} /></span>
                                </Link>
                            </li>

                            {
                                (validatePrivilege(12, privileges) || validatePrivilege(13, privileges)) && <div>
                                    <div className={cx(
                                        { [s.active]: (location.startsWith('/siteadmin/edit/popularlocation') || homePageArray.includes(location)) })
                                    }>
                                        <Button
                                            bsStyle="link"
                                            className={cx(s.button, s.noPadding, s.sideNavitem, s.disPlayTable)}
                                            onClick={() => this.setState({
                                                home: !this.state.home
                                            })}>
                                            <span className={s.disPlayTabelCell}>
                                                <FontAwesome.FaHome className={s.navigationIcon} />
                                            </span>
                                            <span className={s.disPlayTabelCell}><FormattedMessage {...messages.homePageSettings} /></span>
                                            {
                                                this.state.home && <span className={s.disPlayTabelCell}><FontAwesome.FaAngleUp className={s.navigationIcon} /></span>
                                            }

                                            {
                                                !this.state.home && <span className={s.disPlayTabelCell}><FontAwesome.FaAngleDown className={s.navigationIcon} /></span>
                                            }

                                        </Button>
                                    </div>
                                    <Collapse in={this.state.home} className={s.subMenu}>
                                        <div>
                                            {
                                                validatePrivilege(12, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/home/caption' })}>
                                                    <Link to={'/siteadmin/home/caption'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                        <span className={s.disPlayTabelCell}>
                                                            <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                        </span>
                                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.bannerCaptionLabel} /></span>
                                                    </Link>
                                                </li>
                                            }

                                            {
                                                validatePrivilege(12, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/home/banner' })}>
                                                    <Link to={'/siteadmin/home/banner'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                        <span className={s.disPlayTabelCell}>
                                                            <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                        </span>
                                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.imageBannerLabel} /></span>
                                                    </Link>
                                                </li>
                                            }

                                            {
                                                validatePrivilege(12, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/home/footer-block' })}>
                                                    <Link to={'/siteadmin/home/footer-block'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                        <span className={s.disPlayTabelCell}>
                                                            <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                        </span>
                                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.footerBlockLabel} /></span>
                                                    </Link>
                                                </li>
                                            }

                                            {
                                                validatePrivilege(13, privileges) && <li className={cx({ [s.active]: (location === '/siteadmin/popularlocation' || location.startsWith('/siteadmin/edit/popularlocation/') || location.startsWith('/siteadmin/popularlocation/add')) })}>
                                                    <Link to={'/siteadmin/popularlocation'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                        <span className={s.disPlayTabelCell}>
                                                            <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                        </span>
                                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.managePopularLocations} /></span>
                                                    </Link>
                                                </li>
                                            }

                                            {
                                                validatePrivilege(12, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/home/static-info-block' })}>
                                                    <Link to={'/siteadmin/home/static-info-block'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                        <span className={s.disPlayTabelCell}>
                                                            <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                        </span>
                                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.staticInfoBlock} /></span>
                                                    </Link>
                                                </li>
                                            }
                                            {
                                                validatePrivilege(12, privileges) && <li className={cx({ [s.active]: location === '/siteadmin/home/home-banner' })}>
                                                    <Link to={'/siteadmin/home/home-banner'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                        <span className={s.disPlayTabelCell}>
                                                            <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                        </span>
                                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.homeBannerLabel} /></span>
                                                    </Link>
                                                </li>
                                            }
                                        </div>
                                    </Collapse>
                                </div>
                            }
                            {
                                validatePrivilege(18, privileges) &&
                                <li className={cx({ [s.active]: location === '/siteadmin/static-block' })}>
                                    <Link to={'/siteadmin/static-block'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                        <span className={s.disPlayTabelCell}>
                                            <FontAwesome.FaHome className={s.navigationIcon} />
                                        </span>
                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.sideMenu} /></span>
                                    </Link>
                                </li>
                            }
                            {
                                validatePrivilege(16, privileges) && <div>
                                    <div className={cx(
                                        { [s.active]: whyBecomeHostPageArray.includes(location) })
                                    }>
                                        <Button
                                            bsStyle="link"
                                            className={cx(s.button, s.noPadding, s.sideNavitem, s.disPlayTable)}
                                            onClick={() => this.setState({
                                                whyHost: !this.state.whyHost
                                            })}>
                                            <span className={s.disPlayTabelCell}>
                                                <FontAwesome.FaHome className={s.navigationIcon} />
                                            </span>
                                            <span className={s.disPlayTabelCell}><FormattedMessage {...messages.whyBecomeHostPage} /></span>
                                            {
                                                this.state.whyHost && <span className={s.disPlayTabelCell}><FontAwesome.FaAngleUp className={s.navigationIcon} /></span>
                                            }

                                            {
                                                !this.state.whyHost && <span className={s.disPlayTabelCell}><FontAwesome.FaAngleDown className={s.navigationIcon} /></span>
                                            }

                                        </Button>
                                    </div>
                                    <Collapse in={this.state.whyHost} className={s.subMenu}>
                                        <div>
                                            <li className={cx({ [s.active]: location === '/siteadmin/whyHost/Block1' })}>
                                                <Link to={'/siteadmin/whyHost/Block1'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.blockLabel} /> 1</span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/whyHost/Block2' })}>
                                                <Link to={'/siteadmin/whyHost/Block2'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.blockLabel} /> 2</span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/whyHost/Block3' })}>
                                                <Link to={'/siteadmin/whyHost/Block3'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.blockLabel} /> 3</span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/whyHost/Block4' })}>
                                                <Link to={'/siteadmin/whyHost/Block4'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.blockLabel} /> 4</span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/whyHost/Block5' })}>
                                                <Link to={'/siteadmin/whyHost/Block5'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.blockLabel} /> 5</span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/whyHost/Block6' })}>
                                                <Link to={'/siteadmin/whyHost/Block6'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>

                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.blockLabel} /> 6</span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/whyHost/Block7' })}>
                                                <Link to={'/siteadmin/whyHost/Block7'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.blockLabel} /> 7</span>
                                                </Link>
                                            </li>
                                        </div>
                                    </Collapse>
                                </div>
                            }

                            {
                                validatePrivilege(14, privileges) && <div>
                                    <div className={cx(
                                        { [s.active]: listSettingStep1.includes(location) })
                                    }>
                                        <Button
                                            bsStyle="link"
                                            className={cx(s.button, s.noPadding, s.sideNavitem, s.disPlayTable)}
                                            onClick={() => this.setState({
                                                step1: !this.state.step1
                                            })}>
                                            <span className={s.disPlayTabelCell}>
                                                <FontAwesome.FaSliders className={s.navigationIcon} />
                                            </span>
                                            <span className={s.disPlayTabelCell}><FormattedMessage {...messages.listSettingStep} />#1</span>
                                            {
                                                this.state.step1 && <span className={s.disPlayTabelCell}><FontAwesome.FaAngleUp className={s.navigationIcon} /></span>
                                            }

                                            {
                                                !this.state.step1 && <span className={s.disPlayTabelCell}><FontAwesome.FaAngleDown className={s.navigationIcon} /></span>
                                            }
                                        </Button>
                                    </div>
                                    <Collapse in={this.state.step1} className={s.subMenu}>
                                        <div>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/1' })}>
                                                <Link to={'/siteadmin/listsettings/1'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.roomType} /></span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/2' })} >
                                                <Link to={'/siteadmin/listsettings/2'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.personCapacity} /></span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/3' })}>
                                                <Link to={'/siteadmin/listsettings/3'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.houseTypeLabel} /></span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/4' })}>
                                                <Link to={'/siteadmin/listsettings/4'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.buildingSize} /></span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/5' })}>
                                                <Link to={'/siteadmin/listsettings/5'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.bedRoomsLabel} /></span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/6' })}>
                                                <Link to={'/siteadmin/listsettings/6'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.beds} /></span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/7' })}>
                                                <Link to={'/siteadmin/listsettings/7'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.bedTypeLabel} /></span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/8' })}>
                                                <Link to={'/siteadmin/listsettings/8'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.bathrooms} /></span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/9' })}>
                                                <Link to={'/siteadmin/listsettings/9'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.bathroomType} /></span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/10' })}>
                                                <Link to={'/siteadmin/listsettings/10'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.essentialAmenities} /></span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/11' })}>
                                                <Link to={'/siteadmin/listsettings/11'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.safetyamenities} /></span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/12' })}>
                                                <Link to={'/siteadmin/listsettings/12'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.myHostSpaces} /></span>
                                                </Link>
                                            </li>
                                        </div>
                                    </Collapse>
                                </div>
                            }

                            {
                                validatePrivilege(14, privileges) && <div>
                                    <div className={cx(
                                        { [s.active]: listSettingStep3.includes(location) })
                                    }>
                                        <Button
                                            bsStyle="link"
                                            className={cx(s.button, s.noPadding, s.sideNavitem, s.disPlayTable)}
                                            onClick={() => this.setState({
                                                step3: !this.state.step3
                                            })}>
                                            <span className={s.disPlayTabelCell}>
                                                <FontAwesome.FaSliders className={s.navigationIcon} />
                                            </span>
                                            <span className={s.disPlayTabelCell}><FormattedMessage {...messages.listSettingStep} />#3</span>
                                            {
                                                this.state.step3 && <span className={s.disPlayTabelCell}><FontAwesome.FaAngleUp className={s.navigationIcon} /></span>
                                            }

                                            {
                                                !this.state.step3 && <span className={s.disPlayTabelCell}><FontAwesome.FaAngleDown className={s.navigationIcon} />
                                                </span>
                                            }
                                        </Button>
                                    </div>
                                    <Collapse in={this.state.step3} className={s.subMenu}>
                                        <div>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/13' })}>
                                                <Link to={'/siteadmin/listsettings/13'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.guestRequirements} /></span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/14' })}>
                                                <Link to={'/siteadmin/listsettings/14'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.houseRules} /></span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/15' })}>
                                                <Link to={'/siteadmin/listsettings/15'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.reviewHowGuestBook} /></span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/16' })}>
                                                <Link to={'/siteadmin/listsettings/16'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.bookingNoticeTime} /></span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/18' })}>
                                                <Link to={'/siteadmin/listsettings/18'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.minimumNightsLabel} /></span>
                                                </Link>
                                            </li>
                                            <li className={cx({ [s.active]: location === '/siteadmin/listsettings/19' })}>
                                                <Link to={'/siteadmin/listsettings/19'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                                    <span className={s.disPlayTabelCell}>
                                                        <FontAwesome.FaArrowRight className={cx(s.navigationIcon, 'sideArrowRTL')} />
                                                    </span>
                                                    <span className={s.disPlayTabelCell}><FormattedMessage {...messages.maximumNightsLabel} /></span>
                                                </Link>
                                            </li>
                                        </div>
                                    </Collapse>
                                </div>
                            }
                            {
                                validatePrivilege(15, privileges) && <li className={cx({ [s.active]: (location === '/siteadmin/content-management' || location.startsWith('/siteadmin/edit/page/') || location.startsWith('/siteadmin/page/add')) })}>
                                    <Link to={'/siteadmin/content-management'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                        <span className={s.disPlayTabelCell}>
                                            <FontAwesome.FaList className={s.navigationIcon} />
                                        </span>
                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.contentManagementLabel} /></span>
                                    </Link>
                                </li>
                            }
                            {
                                validatePrivilege(15, privileges) && <li className={cx({ [s.active]: (location === '/siteadmin/staticpage/management' || location.startsWith('/siteadmin/edit/staticpage/')) })}>
                                    <Link to={'/siteadmin/staticpage/management'} className={cx(s.sideNavitem, s.disPlayTable)} onClick={() => this.openClose()}>
                                        <span className={s.disPlayTabelCell}>
                                            <FontAwesome.FaList className={s.navigationIcon} />
                                        </span>
                                        <span className={s.disPlayTabelCell}><FormattedMessage {...messages.staticContentManagement} /></span>
                                    </Link>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
                <HeaderModal modalType={'languageModal'} />
            </div>
        )
    }
}

const mapState = (state) => ({
    isSuperAdmin: state.runtime.isSuperAdmin,
    privileges: state.adminPrevileges.privileges && state.adminPrevileges.privileges.privileges,
    currentLocale: state.intl.locale
});

const mapDispatch = {
    adminLogout,
    openHeaderModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(SideBar));