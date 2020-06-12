import React from 'react';
import { shallow } from 'enzyme';

import MobileHeader from '.';
import Avatar from '../../../common/Avatar';

describe('<NavigationBar />', () => {
  const wrapper = shallow(
    <MobileHeader
      title="Long List"
      menuTitle="Menu Title"
      currentItem="longList"
      backLinkUrl="/firm/projects"
      tasksUrl="/firm/tasks"
      avatar={<Avatar name="Avatar" className="avatar-test" />}
    />
  );

  describe('render', () => {
    it('should render the title', () => {
      expect(wrapper.find('.page-header__title').text()).toEqual('Long List');
    });

    it('should render the Avatar', () => {
      expect(wrapper.find('.page-header__right__avatar').find('.avatar-test')).toHaveLength(1);
    });
  });
});
