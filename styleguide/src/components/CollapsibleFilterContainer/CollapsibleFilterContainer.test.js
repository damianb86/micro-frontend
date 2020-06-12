import React from 'react';
import { mount } from 'enzyme';

import CollapsibleFilterContainer from './index';

describe('<CollapsibleFilterContainer/>', () => {
  const props = {
    title: 'Title Test',
    id: 'ID',
    isOpen: false,
    onToggle: jest.fn()
  };
  const wrapper = mount(<CollapsibleFilterContainer {...props}><div className="children" /></CollapsibleFilterContainer>);

  describe('render', () => {
    it('should render <CollapsibleFilterContainer/> component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render the title', () => {
      expect(wrapper.find('.collapsible-filter-container__header__title > span').first().text()).toEqual('Title Test');
    });
  });

  describe('interaction', () => {
    it('should render the open icon whe is close', () => {
      expect(wrapper.find('.cc-open-icon')).toHaveLength(1);
      expect(wrapper.find('.cc-close-icon')).toHaveLength(0);
    });

    it('should not render the body when is close', () => {
      expect(wrapper.find('.children')).toHaveLength(0);
    });

    it('should call onToggle fn on click at header', () => {
      wrapper.find('.collapsible-filter-container__header').simulate('click');
      expect(props.onToggle).toBeCalledTimes(1);
      expect(props.onToggle).toBeCalledWith('ID');
    });

    it('should render the body when is open', () => {
      wrapper.setProps({ ...props, isOpen: true });
      expect(wrapper.find('.children')).toHaveLength(1);
    });
  });
});
