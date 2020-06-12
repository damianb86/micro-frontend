import React from 'react';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';

import './index.scss';

export const mapEqualToZero = (callback, prevRating, name) =>
  rating => (rating === prevRating ? callback(0, name) : callback(rating, name));

const RatingStars = ({
  mapEqualToZeroHandle,
  className,
  changeRating,
  ratingNumber,
  numberOfStars,
  rating,
  starRatedColor,
  starHoverColor,
  starEmptyColor,
  starDimension,
  starSpacing,
  allowZeroRating,
  name,
  onClick
}) => (
  <div
    className={`stars stars-${Math.ceil(rating)} ${changeRating !== null || onClick !== null ? 'clickable' : ''} ${className}`}
    onClick={onClick}
    role="button"
    tabIndex="0"
  >
    {ratingNumber !== null &&
      <div className="stars__rate-number">{ratingNumber.toFixed(1)}</div>
    }
    <div className="stars__container">
      <StarRatings
        changeRating={changeRating && allowZeroRating ? mapEqualToZeroHandle(changeRating, rating, name) : changeRating}
        rating={rating}
        numberOfStars={numberOfStars}
        starRatedColor={starRatedColor}
        starHoverColor={starHoverColor}
        starEmptyColor={starEmptyColor}
        starDimension={starDimension}
        starSpacing={starSpacing}
        svgIconPath="M 26.000 39.000 L 41.282 47.034 L 38.364 30.017 L 50.727 17.966 L 33.641 15.483
          L 26.000 0.000 L 18.359 15.483 L 1.273 17.966 L 13.636 30.017 L 10.718 47.034 L 26.000 39.000"
        name={name}
      />
    </div>
  </div>
);

RatingStars.defaultProps = {
  mapEqualToZeroHandle: mapEqualToZero,
  className: '',
  changeRating: null,
  ratingNumber: null,
  numberOfStars: 5,
  rating: 0,
  starRatedColor: '#F8C752',
  starHoverColor: '#F8C752',
  starEmptyColor: '#FFFFFF',
  starDimension: '18px',
  starSpacing: '2px',
  allowZeroRating: false,
  name: null,
  onClick: null
};

RatingStars.propTypes = {
  mapEqualToZeroHandle: PropTypes.func,
  className: PropTypes.string,
  changeRating: PropTypes.func,
  ratingNumber: PropTypes.number,
  numberOfStars: PropTypes.number,
  rating: PropTypes.number,
  starRatedColor: PropTypes.string,
  starHoverColor: PropTypes.string,
  starEmptyColor: PropTypes.string,
  starDimension: PropTypes.string,
  starSpacing: PropTypes.string,
  allowZeroRating: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func
};

export default RatingStars;
