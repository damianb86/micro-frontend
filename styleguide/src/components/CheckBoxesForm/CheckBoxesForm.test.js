import React from 'react';
import { mount } from 'enzyme';

import CheckBoxesForm from './index';
import { FILTER_FIELDS } from '../../../constants/projects';

describe('<CheckBoxesForm />', () => {
  const props = {
    itemsSelected: [FILTER_FIELDS[3].key, FILTER_FIELDS[5].key],
    items: FILTER_FIELDS,
    onSubmit: jest.fn(),
    onCancel: jest.fn()
  };
  const wrapper = mount(<CheckBoxesForm {...props} />);

  it('should render <CheckBoxesForm /> component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render <ActiveForm />', () => {
    expect(wrapper.find('ActiveForm')).toHaveLength(1);
  });

  it('should render 17 CheckBox', () => {
    expect(wrapper.find('CheckBox')).toHaveLength(17);
  });

  it('should call onSubmit with the initial params', () => {
    wrapper.find('ActiveForm').find('form').simulate('submit');
    expect(props.onSubmit).toBeCalledWith(props.itemsSelected);
  });

  it('should call onSubmit with the correct params', () => {
    wrapper.find('CheckBox').first().find('input').simulate('change', { target: { checked: true, name: FILTER_FIELDS[0].key } });
    wrapper.find('ActiveForm').find('form').simulate('submit');
    expect(props.onSubmit).toBeCalledWith(props.itemsSelected.concat([FILTER_FIELDS[0].key]));
  });

  it('should call onSubmit with unselected item', () => {
    wrapper.find('CheckBox').first().find('input').simulate('change', { target: { checked: false, name: FILTER_FIELDS[3].key } });
    wrapper.find('ActiveForm').find('form').simulate('submit');
    expect(props.onSubmit).toBeCalledWith([FILTER_FIELDS[5].key, FILTER_FIELDS[0].key]);
  });
});
