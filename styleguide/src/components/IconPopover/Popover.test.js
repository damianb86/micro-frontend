import React from 'react';
import { shallow } from 'enzyme';

import Popover from './Popover';

describe('<Popover />', () => {
  const wrapper = shallow(<Popover loadContent={jest.fn(() => Promise.resolve({ items: [{ title: "test", link: "#" }] }))} />);

  describe('renderer', () => {
    it('should render <Popover /> component', () => {
      expect(wrapper).toHaveLength(1);
    });
  });
});
