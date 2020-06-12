import React from 'react';
import { shallow } from 'enzyme';

import InformationSection from './';

const props = {
  title: "section title",
  children: "child component",
  name: "section name"
}

describe('<InformationSection />', () => {
  const wrapper = shallow(<InformationSection {...props} />)

  describe('renderer', () => {
    it('should render 1 title', () => {
      expect(wrapper.find('.information-section__title')).toHaveLength(1);
    });

    it('should render 1 content', () => {
      expect(wrapper.find('.information-section__content')).toHaveLength(1);
    });

    it('should render NO edit link when handleEdit is NOT present in props', () => {
      expect(wrapper.find('.information-section__actions')).toHaveLength(0);
    });

    it('should render 1 edit link when handleEdit is present in props', () => {
      wrapper.setProps({ handleEdit: jest.fn() })
      expect(wrapper.find('.information-section__actions')).toHaveLength(1);
    });

    it('should render 1 section link when linkUrl is NOT present in the props', () => {
      expect(wrapper.find('section.information-section')).toHaveLength(1);
    });

    it('should render 1 <Link /> component when linkUrl is present in the props', () => {
      wrapper.setProps({ linkUrl: "noteObject" });
      expect(wrapper.find('Link')).toHaveLength(1);
    });
  });

  describe('interaction', () => {
    it('should call handleEdit fn', () => {
      const handleEditMockFn = jest.fn();
      wrapper.setProps({ handleEdit: handleEditMockFn });
      wrapper.find('.information-section__actions').simulate('click');
      expect(handleEditMockFn).toHaveBeenCalledTimes(1);
    });
  });
});
