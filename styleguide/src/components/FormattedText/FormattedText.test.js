import React from 'react';
import { shallow } from 'enzyme';

import FormattedText from '.';

describe('<FormattedText />', () => {
  let wrapper;

  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = shallow(<FormattedText />);
  });

  describe('render', () => {
    it('should return null when text is not present', () => {
      expect(wrapper.find('span')).toHaveLength(0);
    });

    it('should return formatted text when text is present with className', () => {
      wrapper.setProps({ text: 'Test Biography', className: 'test' });
      expect(wrapper.html()).toBe(`<span class="formatted-text test" title="Test Biography">Test Biography</span>`);
    });
  });
});
