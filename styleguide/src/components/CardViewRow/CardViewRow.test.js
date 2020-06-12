import React from 'react';
import { shallow } from 'enzyme';

import CardViewRow from './index';
import icon from '../../../../src/icons/icon-16-download.svg';

describe('<CardViewRow />', () => {
  const data = { id: 1, title: 'Report Name 1', subtitle: '09/22/18', linkedUrl: "http://cw.com" };
  const mockFn = jest.fn();
  const wrapper = shallow(<CardViewRow object={data} icon={icon} />);

  it('should render <CardViewRow /> component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render <CardViewRow /> component with a title', () => {
    expect(wrapper.find('.card-view-row__content__title').text()).toEqual(data.title);
  });

  it('should render <CardViewRow /> component with a subtitle', () => {
    expect(wrapper.find('.card-view-row__content__subtitle').text()).toEqual(data.subtitle);
  });

  it('should render <CardViewRow /> component with an icon', () => {
    expect(wrapper.contains(icon)).toEqual(true);
  });

  it('should have a link to target', () => {
    expect(wrapper.find('a[href="http://cw.com"]')).toHaveLength(1);
  });
});
