
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { reset, change, submit as submitForm, formValueSelector, getFormValues } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchHeader.css';
import cx from 'classnames';
// Locale
import messages from '../../../locale/messages';
import { connect } from 'react-redux';

// Components
import Dates from '../Filters/Dates';
import Guests from '../Filters/Guests';
import HomeType from '../Filters/HomeType';
import Price from '../Filters/Price';
import InstantBook from '../Filters/InstantBook';
import MoreFilters from '../Filters/MoreFilters';
import ShowMap from '../Filters/ShowMap';
import MoreFiltersModal from '../../MoreFiltersModal';
import { openMoreFiltersModal } from '../../../actions/modalActions';
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap';
class SearchHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        dates: false,
        guests: false,
        homeType: false,
        price: false,
        instantBook: false,
        moreFilters: false
      },
      overlay: false,
      smallDevice: false,
      verySmallDevice: false
    };

    this.handleTabToggle = this.handleTabToggle.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleOpen = this.handleOpen.bind(this);

  }

  componentDidMount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      this.handleResize();
      window.addEventListener('resize', this.handleResize);
    }
  }

  componentWillUnmount() {
    let isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  handleResize(e) {
    const { tabs } = this.state;
    let isBrowser = typeof window !== 'undefined';
    let smallDevice = isBrowser ? window.matchMedia('(max-width: 768px)').matches : true;
    let verySmallDevice = isBrowser ? window.matchMedia('(max-width: 480px)').matches : false;

    for (let key in tabs) {
      tabs[key] = false;
    }

    this.setState({ smallDevice, verySmallDevice, tabs, overlay: false });
  }

  handleTabToggle(currentTab, isExpand) {
    const { showForm, showResults, showFilter } = this.props;
    const { tabs, smallDevice } = this.state;

    for (let key in tabs) {
      if (key == currentTab) {
        tabs[key] = isExpand;
      } else {
        tabs[key] = false;
      }
    }

    this.setState({
      tabs,
      overlay: isExpand
    });

    if (smallDevice) {
      if (isExpand) {
        showFilter();
      } else {
        showResults();
      }
    }
  }

  handleOpen() {
    const { openMoreFiltersModal } = this.props;
    openMoreFiltersModal();
  }

  render() {
    const { searchSettings, formValues } = this.props;
    const { tabs, overlay, smallDevice, verySmallDevice } = this.state;
    let isActive = false;

    if (formValues && (formValues.beds || formValues.bedrooms || formValues.bathrooms
      || (formValues.amenities && formValues.amenities.length) || (formValues.spaces && formValues.spaces.length)
      || (formValues.houseRules && formValues.houseRules.length))) {
      isActive = true;
    }
    return (
      <div>
        <div className={cx(s.searchHeaderContainerBox, { [s.fullResponsiveContainer]: (tabs.dates == true || tabs.guests == true || tabs.moreFilters == true) })}>
          <div className={cx(s.searchHeaderContainer, s.responsiveNoPadding)}>
            <div className={cx(s.searchHeaderResponsiveScroll, 'searchHeaderScroll')}>
              <div className={s.searchHeaderResponsive}>
                <Dates
                  className={s.filterButtonContainer}
                  handleTabToggle={this.handleTabToggle}
                  isExpand={tabs.dates}
                  smallDevice={smallDevice}
                  verySmallDevice={verySmallDevice} />
                <Guests
                  className={s.filterButtonContainer}
                  handleTabToggle={this.handleTabToggle}
                  isExpand={tabs.guests}
                  smallDevice={smallDevice} />
                <HomeType
                  className={cx(s.filterButtonContainer, 'hidden-xs', s.hideTabletSection)}
                  handleTabToggle={this.handleTabToggle}
                  isExpand={tabs.homeType} />
                <Price
                  className={cx(s.filterButtonContainer, 'hidden-xs', s.hideTabletSection)}
                  handleTabToggle={this.handleTabToggle}
                  searchSettings={searchSettings}
                  isExpand={tabs.price} />
                <InstantBook
                  className={cx(s.filterButtonContainer, 'hidden-xs', s.hideTabletSection)}
                  handleTabToggle={this.handleTabToggle}
                  isExpand={tabs.instantBook} />
                {/* <MoreFilters
                  className={s.filterButtonContainer}
                  handleTabToggle={this.handleTabToggle}
                  isExpand={tabs.moreFilters}
                  searchSettings={searchSettings}
                  smallDevice={smallDevice} /> */}
                <div className={s.filterButtonContainer}>
                  <Button
                    className={cx({ [s.btnSecondary]: (isActive == true) },
                      s.btn, s.btnFontsize, s.responsiveFontsize, s.searchBtn)}
                    onClick={this.handleOpen}>
                    <span className={cx('hidden-md hidden-lg')}>
                      <FormattedMessage {...messages.filter} />
                    </span>
                    <span className={cx('hidden-xs hidden-sm')}>
                      <FormattedMessage {...messages.moreFilters} />
                    </span>
                  </Button>
                  <MoreFiltersModal
                  className={s.filterButtonContainer}
                  handleTabToggle={this.handleTabToggle}
                  isExpand={tabs.moreFilters}
                  searchSettings={searchSettings}
                  smallDevice={smallDevice}
                />
                </div>
                
                <ShowMap
                  className={cx(s.filterButtonContainer, s.showMapSection, 'pull-right', 'hidden-xs', s.hideTabletSection, 'showMaprtl')}
                  handleTabToggle={this.handleTabToggle} />
              </div>
            </div>
          </div>
        </div>
        {
          //overlay && <div className={s.searchFilterPopoverOverlay} onClick={this.handleTabToggle}></div>
        }
      </div>
    );
  }
}

const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  formValues: getFormValues('SearchForm')(state),
});

const mapDispatch = {
  openMoreFiltersModal
}
// export default withStyles(s)(SearchHeader);
export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(SearchHeader)));