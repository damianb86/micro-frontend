import React from 'react';
import { mount } from 'enzyme';

import IconPopover from './index';
import IconMultipleProjects from '../../icons/icon-16-Multiple Projects.svg';

describe('<IconPopover />', () => {
  const wrapper = mount(<IconPopover icon={IconMultipleProjects} loadContent={jest.fn(() => Promise.resolve())} closeDelay={0} />);

  describe('renderer', () => {
    it('should render <IconPopover /> component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render a pop-over', () => {
      expect(wrapper.find('.pop-over')).toHaveLength(1);
    });

    it('should pop over be closed initially', () => {
      expect(wrapper.find('.pop-over__wrapper')).toHaveLength(0);
    });

    it('should open the pop over on mouseEnter', () => {
      wrapper.find('.pop-over').simulate('mouseEnter');
      wrapper.update();
      expect(wrapper.find('Popover')).toHaveLength(1);
    });

    it('should close the pop over on mouseLeave', () => {
      wrapper.find('.pop-over').simulate('mouseleave');
      wrapper.update();
      expect(wrapper.update().find('Popover')).toHaveLength(0);
    });
  });
});
