import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Rating.css';

// Components
import StarRating from '../../StarRating';
import ListCoverPhoto from '../../ListCoverPhoto';
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';

class ListingDetails extends React.Component {

    static propTypes = {
        formatMessage: PropTypes.any,
        data: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            street: PropTypes.string,
            city: PropTypes.string,
            state: PropTypes.string,
            country: PropTypes.string,
            reviewsCount: PropTypes.number,
            reviewsStarRating: PropTypes.number,
            coverPhoto: PropTypes.number,
            listPhotos: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string,
            }))
        }),
    };

  render() {
    const { data: {id, title, street, city, state, country}} = this.props;
    const { data: {coverPhoto, listPhotos, reviewsCount, reviewsStarRating}} = this.props;
    const { formatMessage } = this.props.intl;
    let starRatingValue = 0;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Math.round(reviewsStarRating / reviewsCount)
    }
    return (
        <div>
            <div className={s.imgContainer}>
                <div className={cx(s.parent)}>
                  <div className={cx(s.children)}>
                    <div className={cx(s.content)}>      
                      <ListCoverPhoto
                        className={cx(s.imageContent)}
                        coverPhoto={coverPhoto}
                        listPhotos={listPhotos}
                        photoType={"x_medium"}
                        bgImage
                      />
                    </div>
                  </div>
                </div>
            </div>
            <h1 className={cx(s.titleText, s.space1)}>
                <Link to={"/rooms/" + id}>{title}</Link>
            </h1>
            <div>
                <span className={s.textMuted}>{city}, {state}, {country}</span>
            </div>
            <div>
                <span><StarRating name={"listRating"} value={starRatingValue} className={s.starReview}/></span>
                <span className={s.textMuted}>&nbsp;{reviewsCount} {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}</span>
            </div>
        </div>
      );
  }
}


export default injectIntl(withStyles(s)(ListingDetails));
