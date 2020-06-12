import React from 'react';
import { mount } from 'enzyme';

import CollapsibleCard from './index';
import ChevronUpIcon from '../../../icons/icon-16-chevron-up.svg';

describe('<CollapsibleCard/>', () => {
  const props = {
    title: 'Title Test',
    subtitle: 'Subtitle Test',
    icons: <ChevronUpIcon className="icon-test" />,
    isOpen: false,
    onOpen: jest.fn(),
    onClose: jest.fn()
  };
  const wrapper = mount(<CollapsibleCard {...props} />);

  describe('render', () => {
    it('should render <CollapsibleCard/> component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render the title', () => {
      expect(wrapper.find('.collapsible-card__header__title > span').first().text()).toEqual('Title Test');
    });

    it('should render the subtitle', () => {
      expect(wrapper.find('.collapsible-card__header__title__subtitle').text()).toEqual('(Subtitle Test)');
    });

    it('should render the subtitle', () => {
      expect(wrapper.find('.icon-test')).toHaveLength(1);
    });
  });

  describe('iteraction', () => {
    it('should render the open icon whe is close', () => {
      expect(wrapper.find('.cc-open-icon')).toHaveLength(1);
      expect(wrapper.find('.cc-close-icon')).toHaveLength(0);
    });

    it('should not render the body when is close', () => {
      expect(wrapper.find('.collapsible-card__body')).toHaveLength(0);
    });

    it('should call onOpen fn on click at .cc-open-icon', () => {
      wrapper.find('.cc-open-icon').simulate('click');
      expect(props.onOpen).toBeCalledTimes(1);
    });

    it('should render the body when is open', () => {
      wrapper.setProps({ ...props, isOpen: true });
      expect(wrapper.find('.collapsible-card__body')).toHaveLength(1);
    });

    it('should call onClose fn on click at #close-icon', () => {
      wrapper.find('.cc-close-icon').simulate('click');
      expect(props.onClose).toBeCalledTimes(1);
    });
  });
});
