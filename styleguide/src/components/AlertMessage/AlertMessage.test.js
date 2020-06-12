import React from 'react';
import { shallow } from 'enzyme';

import AlertMessage from './index';

describe('<AlertMessage />', () => {
  const props = {
    type: 'success'
  };

  const wrapper = shallow(<AlertMessage {...props} />);

  describe('renderer', () => {
    it('should have .alert-message div', () => {
      expect(wrapper.find('.alert-message')).toHaveLength(1);
    });

    it('should have .alert-message--success', () => {
      expect(wrapper.find('.alert-message--success')).toHaveLength(1);
    });

    it('should have close link', () => {
      wrapper.setProps({ hideHandler: () => {}, closeLink: true });
      expect(wrapper.find('IconLink').prop('type')).toEqual('close-white');
    });
  });
});
