import React from 'react';
import { shallow } from 'enzyme';
import SelectOptions from './SelectOptions';
import { items as options } from '../../../../__test__/fixtures/SearchMultiSelect';

describe('<SelectOptions />', () => {
  const handleSelect = jest.fn();

  const wrapper = shallow(<SelectOptions options={options} cursor={-1} handleSelect={handleSelect} />);

  it('should render options list', () => {
    expect(wrapper.find('.search-select-multi__list')).toHaveLength(1);
    expect(wrapper.find('li')).toHaveLength(options.length);
  });

  it('should add class active', () => {
    wrapper.setProps({ cursor: 1 });
    expect(
      wrapper
        .find('.search-select-multi__list__item')
        .at(1)
        .hasClass('active')
    ).toBeTruthy();
  });

  it('should call onSelect prop on click', () => {
    wrapper
      .find('.search-select-multi__list__item')
      .first()
      .simulate('click');
    expect(handleSelect).toHaveBeenCalled();
  });
});
