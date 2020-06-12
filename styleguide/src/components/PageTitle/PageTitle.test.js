import React from 'react';
import { shallow } from 'enzyme';

import PageTitle from './index';

describe('<PageTitle />', () => {
  const props = { title: 'Page Title', className: null };
  const wrapper = shallow(<PageTitle {...props} />);

  describe('renderer', () => {
    it('should return no .page-title__splitter and 1 .page-title__text when title is string', () => {
      expect(wrapper.find('.page-title__splitter')).toHaveLength(0);
      expect(wrapper.find('.page-title__text')).toHaveLength(1);
    });

    it('should return 1 .page-title__splitter and 2 page-title__text when title is string', () => {
      const pageTitleArray = [{ key: 'Reports', linkUrl: '/reports' }, { key: 'Note Object' }];
      wrapper.setProps({ title: pageTitleArray });
      expect(wrapper.find('.page-title__splitter')).toHaveLength(1);
      expect(wrapper.find('.page-title__text')).toHaveLength(2);
    });
  });
});
