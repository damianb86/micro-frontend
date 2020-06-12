import React from 'react';
import { mount } from 'enzyme';

import NameWithColors from './index';

describe('<NameWithColors />', () => {
  const props = {
    name: 'Name',
    colors: [{ color: 1, key: 1 }, { color: 2, key: 2 }]
  };

  const wrapper = mount(<NameWithColors {...props} />);

  describe('render', () => {
    it('should render the name', () => {
      expect(wrapper.find('.name').text()).toBe(props.name);
    });

    it('should render the correct number of colors', () => {
      expect(wrapper.find('.colors > span')).toHaveLength(props.colors.length);
    });
  });
});
