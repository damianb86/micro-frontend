import React from 'react';
import { mount } from 'enzyme';

import AvatarList from './index';
import { projectsList } from '../../../../__test__/fixtures/common/Project';

describe('<AvatarList />', () => {
  const wrapper = mount(<AvatarList avatars={projectsList[0].clientTeam} />);

  describe('render ', () => {
    it('should render <AvatarList /> component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render 5 <Avatar /> component', () => {
      expect(wrapper.find('Avatar')).toHaveLength(5);
    });

    it('should render 1 lead icon', () => {
      expect(wrapper.find('.lead')).toHaveLength(1);
    });

    it('should render 1 <Badge />', () => {
      expect(wrapper.find('Badge')).toHaveLength(1);
    });

    it('should render 5 <SimplePopover />', () => {
      expect(wrapper.find('SimplePopover')).toHaveLength(5);
    });

    it('should render "+3" on expand button', () => {
      expect(wrapper.find('a').text()).toBe('+3');
    });

    it('should not render the chevron-up svg', () => {
      expect(wrapper.find('.chevron-up')).toHaveLength(0);
    });
  });

  describe('interaction ', () => {
    beforeAll(() => {
      wrapper.find('a').simulate('click');
    });

    it('should render 8 <Avatar /> component when is expanded', () => {
      expect(wrapper.find('Avatar')).toHaveLength(8);
    });

    it('should render chevron-up svg', () => {
      expect(wrapper.find('.chevron-up')).toHaveLength(1);
    });
  });
});
