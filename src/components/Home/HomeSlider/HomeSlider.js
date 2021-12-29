import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './HomeSlider.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import { injectIntl } from 'react-intl';

// Component
import HomeItem from '../HomeItem';
import Loader from '../../Loader';

//Helper
import { isRTL } from '../../../helpers/formatLocale';
class SlideComponent extends React.Component {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      listPhotos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string
      })),
      coverPhoto: PropTypes.number,
      listingData: PropTypes.shape({
        basePrice: PropTypes.number,
        currency: PropTypes.string,
      }),
      settingsData: PropTypes.arrayOf(PropTypes.shape({
        listsettings: PropTypes.shape({
          itemName: PropTypes.string,
        }),
      })),
      id: PropTypes.number,
      beds: PropTypes.number,
      title: PropTypes.string,
      bookingType: PropTypes.string,
      reviewsCount: PropTypes.number,
      reviewsStarRating: PropTypes.number
    }))
  };

  static defaultProps = {
    data: [],
    arrow: true
  }

  constructor(props) {
    super(props);
    this.state = {
      isBeginning: true,
      isEnd: false,
      load: false
    };
  }

  componentDidMount() {
    this.setState({
      load: true
    });
  }

  UNSAFE_componentWillReceiveProps(prevProps) {
    const { locale } = this.props.intl;
    const { locale: prevLocale } = prevProps.intl;

    if (locale !== prevLocale) {
      this.setState({
        load: false
      });
      clearTimeout(this.loadSync);
      this.loadSync = null;
      this.loadSync = setTimeout(() => {
        this.setState({
          load: true
        })
      }, 1);
    }
  }
  render() {
    const { data, intl: { locale } } = this.props;
    const { load } = this.state;
    const params = {
      slidesPerView: 4,
      breakpoints: {
        768: {
          slidesPerView: 'auto',
        },
        640: {
          slidesPerView: 'auto', 
        }
      }
    };

    if (data && (data.length > 4 || typeof window !== "undefined" && (window && window.matchMedia('(max-width: 768px) and (min-width: 640px)').matches && data.length > 3 || window.matchMedia('(max-width: 640px)').matches && data.length > 1)))
      params['navigation'] = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      };

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} className={cx("noPadding", 'homeSliderPaading', 'homeSwiper')}>
            {
              !load && <div>
                <Loader type="text" />
              </div>
            }
            {
              load && <Swiper {...params} rtl={isRTL(locale)} className={cx('row homeSlickSlider', s.noMargin)} >
                {
                  data && data.length > 0 && data.map((item, index) => {
                    if (item.listPhotos.length > 0) {
                      return (
                        <div className={cx('col-md-12 col-sm-12 col-xs-12')} key={index}>
                          <div className='swiperSliderMobielWidth'>
                          <HomeItem
                            id={item.id}
                            title={item.title}
                            basePrice={item.listingData.basePrice}
                            currency={item.listingData.currency}
                            roomType={item.settingsData[0].listsettings.itemName}
                            beds={item.beds}
                            listPhotos={item.listPhotos}
                            coverPhoto={item.coverPhoto}
                            photo={item.listPhotos[0].name}
                            bookingType={item.bookingType}
                            reviewsCount={item.reviewsCount}
                            reviewsStarRating={item.reviewsStarRating}
                            wishListStatus={item.wishListStatus}
                            isListOwner={item.isListOwner}
                            userId={item && item.user && item.user.id}
                          />
                          </div>
                        </div>
                      )
                    }
                  })
                }
              </Swiper>
            }
          </Col>
        </Row>
      </Grid>
    );
  }
};

export default injectIntl(withStyles(s)(SlideComponent));