import React from 'react';
import { mount } from 'enzyme';

import ThumbsFeedback from '.';

describe('ThumbsFeedback', () => {
  const props = {
    up: [{ id: 1, name: 'Joanna Matys' }, { id: 2, name: 'Laren McCal' }],
    down: [{ id: 1, name: 'John Donnald' }],
    onClickUp: jest.fn(),
    onClickDown: jest.fn()
  };

  const wrapper = mount(<ThumbsFeedback {...props} />);

  describe('render', () => {
    it('should render 1 the component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render 1 ThumbUp', () => {
      expect(wrapper.find('.thumbs-feedback__up')).toHaveLength(1);
    });

    it('should render 1 ThumbDown', () => {
      expect(wrapper.find('.thumbs-feedback__down')).toHaveLength(1);
    });

    it('should show the correct amount of thumbs up', () => {
      expect(wrapper.find('.thumbs-feedback__up > span').text()).toBe('2');
    });

    it('should show the correct amount of thumbs down', () => {
      expect(wrapper.find('.thumbs-feedback__down > span').text()).toBe('1');
    });
  });
});
