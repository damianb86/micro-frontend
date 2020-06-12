import React from 'react';
import { shallow } from 'enzyme';

import RestrictedAccessMessage from './index';

const message = 'Sample description';
const button = { name: 'Call to Action', url: '/' };

describe('<RestrictedAccessMessage/>', () => {
  const wrapper = shallow(<RestrictedAccessMessage message={message} />);

  it('should render <RestrictedAccessMessage/> component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render <RestrictedAccessMessage/> component with a lock icon', () => {
    expect(wrapper.find('.restricted-access-message__icon')).toHaveLength(1);
  });

  it('should render <RestrictedAccessMessage/> component with defined message', () => {
    expect(wrapper.find('.restricted-access-message__description').text()).toEqual(message);
  });

  it('should render <RestrictedAccessMessage/> component with defined message and a button', () => {
    wrapper.setProps({ button });
    expect(wrapper.find('.pri-button')).toHaveLength(1);
    expect(wrapper.find('.pri-button').text()).toEqual(button.name);
    expect(wrapper.find('.pri-button').props().href).toEqual(button.url);
  });
});
