import React from 'react';
import { shallow } from 'enzyme';

import Hyperlink from './index';

describe('<Hyperlink />', () => {
  const props = {
    value: 'test@email.com',
    href: 'mailto:test@email.com'
  };
  const wrapper = shallow(<Hyperlink {...props} />);

  it('should render a <SimpleLink/> component', () => {
    wrapper.setProps({ ...props, editable: false });
    expect(wrapper.find('SimpleLink')).toHaveLength(1);
  });

  it('should render a <EditableLink/> component', () => {
    wrapper.setProps({ ...props, editable: true });
    expect(wrapper.find('EditableLink')).toHaveLength(1);
  });

  describe('<EditableLink />', () => {
    wrapper.setProps({ ...props, editable: true });

    it('should render an <a/>', () => {
      expect(wrapper.find('EditableLink').dive().find('a')).toHaveLength(1);
    });
  });
});
