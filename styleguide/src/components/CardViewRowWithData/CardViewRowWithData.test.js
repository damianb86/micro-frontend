import React from 'react';
import { shallow } from 'enzyme';
import { first } from 'lodash';

import CardViewRowWithData from './index';
import projects from '../../../../__test__/fixtures/dashboard/RecentlyClosedProjects.js';

describe('<CardViewRowWithData />', () => {

  const project = first(projects);
  const {title, subtitle, label, date} = project;

  const mockFn = jest.fn();
  const wrapper = shallow(
    <CardViewRowWithData 
      title={title}
      subtitle={subtitle}
      label={label}
      date={date}
    />
  );

  it('should render <CardViewRowWithData /> component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render <CardViewRowWithData /> component with a title', () => {
    expect(wrapper.find('.card-view-row-with-data__content__title').text()).toEqual(title);
  });

  it('should render <CardViewRowWithData /> component with a subtitle', () => {
    expect(wrapper.find('.card-view-row-with-data__content__subtitle').text()).toEqual(subtitle);
  });
  
  it('should render <CardViewRowWithData /> component with an optional data label', () => {
    expect(wrapper.find('.card-view-row-with-data__data__label').text()).toEqual(label);
  });
  
  it('should render <CardViewRowWithData /> component with an optional data date', () => {
    expect(wrapper.find('.card-view-row-with-data__data__date').text()).toEqual(date);
  });

});
