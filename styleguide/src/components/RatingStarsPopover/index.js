import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import './index.scss';
import SimplePopover from '../SimplePopover';
import RatingStars from '../RatingStars';

const RatingStarsPopover = (props) => {
  const { items, rating, className } = props;

  return (
    isEmpty(items) ?
      <RatingStars rating={rating * 0.2} ratingNumber={rating} numberOfStars={1} {...props} />
      : (
        <SimplePopover
          className={classNames('rating-stars-pop-over', className)}
          content={items.map((item, index) => <RatingStarItem key={index} index={index} title={item.title} rating={item.rating || 0} />)}
          width={250}
        >
          <RatingStars rating={rating * 0.2} ratingNumber={rating} numberOfStars={1} {...props} />
        </SimplePopover>
      )
  );
};

RatingStarsPopover.defaultProps = {};

RatingStarsPopover.propTypes = {
  items: PropTypes.array,
  rating: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default RatingStarsPopover;

const RatingStarItem = ({ index, title, rating }) => (
  <div className="rating-stars-pop-over__item">
    <div className="rating-stars-pop-over__item__title" title={`${index + 1}. ${title}`}>
      {index + 1}. {title}
    </div>
    <div className="rating-stars-pop-over__item__rating">
      <div className="rating-stars-pop-over__item__rating__stars">
        <RatingStars rating={rating} />
      </div>
      <div className="rating-stars-pop-over__item__rating__number">
        {rating.toFixed(1)}
      </div>
    </div>
  </div>
);
