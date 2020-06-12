import React from 'react';
import { mount } from 'enzyme';

import SimplePopover from './index';

describe('<SimplePopover />', () => {
  const wrapper = mount(<SimplePopover content="Content" closeDelay={0}><a className="children">Children</a></SimplePopover>);

  it('should render <SimplePopover /> component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render a simple-pop-over-container', () => {
    expect(wrapper.find('.simple-pop-over-container')).toHaveLength(1);
  });

  it('should render the children compoent', () => {
    expect(wrapper.find('.children')).toHaveLength(1);
    expect(wrapper.find('.children').html()).toEqual('<a class="children">Children</a>');
  });

  describe('interaction', () => {
    it('should pop over be closed', () => {
      expect(wrapper.find('.simple-pop-over')).toHaveLength(0);
    });

    it('should open the pop over on mouseOver', () => {
      wrapper.find('.simple-pop-over-container').simulate('mouseover');
      wrapper.update();
      expect(wrapper.find('.simple-pop-over')).toHaveLength(1);
    });

    it('should render the content', () => {
      expect(wrapper.find('.simple-pop-over__content').text()).toBe('Content');
    });

    it('should close the pop over on mouseLeave', () => {
      wrapper.find('.simple-pop-over-container').simulate('mouseleave');
      wrapper.update();
      expect(wrapper.find('.simple-pop-over')).toHaveLength(0);
    });
  });
});
