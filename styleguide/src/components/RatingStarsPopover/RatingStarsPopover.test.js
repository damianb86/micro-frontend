import React from 'react';
import { mount } from 'enzyme';

import RatingStarsPopover from './index';

describe('<RatingStarsPopover />', () => {
  const items = [
    { title: 'Technical Products', rating: 4 },
    { title: 'Measurable Results', rating: 5 },
    { title: 'SQL/Data', rating: 2.5 }
  ];

  const props = {
    rating: 3.8,
    items
  };

  const wrapper = mount(<RatingStarsPopover {...props} />);

  it('should not render <SimplePopover /> component when questions are not present', () => {
    wrapper.setProps({ items: null });
    expect(wrapper.find('SimplePopover')).toHaveLength(0);
  });

  describe('when items are present in the props', () => {
    beforeAll(() => {
      wrapper.setProps({ items });
    });

    it('should render <RatingStarsPopover /> component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render <SimplePopover /> component', () => {
      expect(wrapper.find('SimplePopover')).toHaveLength(1);
    });

    it('should render 1 <RatingStars />', () => {
      expect(wrapper.find('RatingStars')).toHaveLength(1);
    });

    it('should not render <RatingStarItem />', () => {
      expect(wrapper.find('RatingStarItem')).toHaveLength(0);
    });

    describe('interaction', () => {
      it('should pop over be closed', () => {
        expect(wrapper.find('.simple-pop-over')).toHaveLength(0);
      });

      it('should render 3 <RatingStarItem /> the pop over on mouseOver', () => {
        wrapper.find('.simple-pop-over-container').simulate('mouseover');
        expect(wrapper.find('RatingStarItem')).toHaveLength(3);
      });

      describe('RatingStarItem', () => {
        beforeAll(() => {
          wrapper.find('.simple-pop-over-container').simulate('mouseover');
        });

        it('should render correct title', () => {
          expect(wrapper.find('RatingStarItem').first().find('.rating-stars-pop-over__item__title').text()).toBe('1. Technical Products');
        });

        it('should render a RatingStars component with the correct rating', () => {
          expect(wrapper.find('RatingStarItem').first().find('RatingStars')).toHaveLength(1);
        });

        it('should render correct rating', () => {
          expect(wrapper.find('RatingStarItem').first().find('.rating-stars-pop-over__item__rating__number').text()).toBe('4.0');
        });
      });
    });
  });
});
