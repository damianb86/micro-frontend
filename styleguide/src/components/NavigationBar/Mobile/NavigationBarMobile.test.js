import React from 'react';
import { mount } from 'enzyme';

import NavigationBarMobile from './index';
import { NAVIGATION_MENU_ITEMS_GROUPED } from '../../../project/constants/navigationBar';

describe('<NavigationBarMobile />', () => {
  const wrapper = mount(
    <NavigationBarMobile title="Navigation Bar" currentItem="longList" backLinkUrl="/back-url" items={NAVIGATION_MENU_ITEMS_GROUPED}>
      <span className="link">Link</span>
    </NavigationBarMobile>
  );

  describe('render', () => {
    it('should render the title correctly', () => {
      expect(wrapper.find('.navigation-bar__title').text()).toEqual('Navigation Bar');
    });

    it('should be closed by default', () => {
      expect(wrapper.find('.closed')).toHaveLength(1);
    });

    it('should render 14 links', () => {
      expect(wrapper.find('li')).toHaveLength(14);
    });

    it('should render a back button with the link "backLinkUrl"', () => {
      expect(wrapper.find('.navigation-bar__controls__back')).toHaveLength(1);
      expect(wrapper.find('.navigation-bar__controls__back').props().href).toBe('/back-url');
    });

    it('should render a close button', () => {
      expect(wrapper.find('.navigation-bar__controls__close')).toHaveLength(1);
    });

    it('should currentItem be active', () => {
      expect(wrapper.find('.active')).toHaveLength(1);
      expect(wrapper.find('.active').key()).toBe('longList');
    });
  });

  describe('interaction', () => {
    it('should be open when click the link', () => {
      wrapper.find('.link').simulate('click');
      expect(wrapper.find('.closed')).toHaveLength(0);
    });

    it('should close when close button is pressed', () => {
      wrapper.find('.navigation-bar__controls__close').simulate('click');
      expect(wrapper.find('.closed')).toHaveLength(1);
    });
  });
});
