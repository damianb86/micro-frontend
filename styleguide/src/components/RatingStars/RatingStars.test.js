import React from 'react';
import { shallow } from 'enzyme';

import RatingStars, { mapEqualToZero } from './index';

describe('RatingStars', () => {
  let wrapper;
  const props = {
    changeRating: jest.fn(() => {}),
    numberOfStars: 5,
    rating: 2.3
  };

  beforeEach(() => {
    wrapper = shallow(<RatingStars {...props} />);
  });

  it('should render <StarRatings />', () => {
    expect(wrapper.find('StarRatings')).toHaveLength(1);
  });

  it('should render 1 star-grad', () => {
    expect(wrapper.find('StarRatings').dive().find('.star-grad')).toHaveLength(1);
  });

  it('should not render the ratingNumber', () => {
    expect(wrapper.find('.stars__rate-number')).toHaveLength(0);
  });

  it('should render the ratingNumber', () => {
    wrapper.setProps({ ratingNumber: 2.3 });
    expect(wrapper.find('.stars__rate-number')).toHaveLength(1);
  });

  describe('mapEqualToZero function', () => {
    it('should return a function', () => {
      expect(typeof mapEqualToZero()).toEqual('function');
    });

    it('should call the callback with the current rating when the ratin is diferent', () => {
      const callback = jest.fn(rating => rating);
      const prevRating = 4;
      const currRating = 3;
      const eventHandler = mapEqualToZero(callback, prevRating);

      expect(eventHandler(currRating)).toEqual(currRating);
      expect(callback.mock.calls.length).toEqual(1);
      expect(callback.mock.calls[0][0]).toEqual(currRating);
    });

    it('should not call the callback with the cero rating when the ratin is equal', () => {
      const callback = jest.fn(rating => rating);
      const prevRating = 4;
      const eventHandler = mapEqualToZero(callback, prevRating);

      expect(eventHandler(prevRating)).toEqual(0);
      expect(callback.mock.calls.length).toEqual(1);
      expect(callback.mock.calls[0][0]).toEqual(0);
    });
  });

  describe('StarRatings component', () => {
    it('should show 5 stars', () => {
      expect(wrapper.find('StarRatings').dive().find('Star')).toHaveLength(5);
    });

    it('should not call mapEqualToZero', () => {
      const mapEqualToZeroHandle = jest.fn();
      wrapper = shallow(<RatingStars {...props} rating={1} mapEqualToZeroHandle={mapEqualToZeroHandle} />);
      const star = wrapper.find('StarRatings').dive().find('Star').first().dive();
      star.find('.star-container').simulate('click');

      expect(mapEqualToZeroHandle.mock.calls.length).toEqual(0);
    });

    it('should call mapEqualToZero', () => {
      const mapEqualToZeroHandle = jest.fn();
      wrapper = shallow(<RatingStars {...props} rating={1} allowZeroRating mapEqualToZeroHandle={mapEqualToZeroHandle} />);
      const star = wrapper.find('StarRatings').dive().find('Star').first().dive();
      star.find('.star-container').simulate('click');

      expect(mapEqualToZeroHandle.mock.calls.length).toEqual(1);
    });
  });
});
