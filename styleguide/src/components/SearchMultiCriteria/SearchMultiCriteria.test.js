import React from 'react';
import { shallow, mount } from 'enzyme';

import SearchMultipleCriteria from './index';

describe('<SearchMultipleCriteria />', () => {
  let wrapper;
  const props = {
    onClear: jest.fn(),
    onSearch: jest.fn(),
    disable: false
  };

  beforeEach(() => {
    wrapper = shallow(<SearchMultipleCriteria {...props} />);
    jest.resetAllMocks();
  });

  describe('render', () => {
    it('should render component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render one MultiCriteriaInputField', () => {
      expect(wrapper.find('MultiCriteriaInputField')).toHaveLength(1);
    });

    it('should render CloseIcon when there is one search input', () => {
      expect(wrapper.find('MultiCriteriaInputField')).toHaveLength(1);
    });

    it('should not render action buttons by default', () => {
      expect(wrapper.find('a')).toHaveLength(0);
      expect(wrapper.find('AddIcon')).toHaveLength(0);
    });
  });

  describe('functions', () => {
    it('should render two action buttons and add criteria on input click', () => {
      wrapper.find('MultiCriteriaInputField').simulate('click');
      expect(wrapper.find('a')).toHaveLength(2);
      expect(wrapper.find('.search-multiple-criteria__actions__add')).toHaveLength(1);
      expect(wrapper.state('touched')).toEqual(true);
    });

    it('should add a new SearchMultiSelect criteria', () => {
      wrapper.setState({ touched: true });
      wrapper.find('.search-multiple-criteria__actions__add button').simulate('click');
      expect(wrapper.find('MultiCriteriaInputField')).toHaveLength(2);
      wrapper.find('.search-multiple-criteria__actions__add button').simulate('click');
      expect(wrapper.find('MultiCriteriaInputField')).toHaveLength(3);
    });

    xit('should call props.onSearch function 1 time', () => {
      wrapper = mount(<SearchMultipleCriteria {...props} />);

      const inputs = [[{ id: 'v1', name: 'v1' }], [{ id: 'v1', name: 'v2' }]];

      wrapper.setState({ touched: true });
      wrapper.find('.search-multiple-criteria__actions__add').simulate('click');
      wrapper.update();

      const MultiCriteriaInputField1 = wrapper.instance().searchRefs[0];
      MultiCriteriaInputField1.setState({ term: inputs[0][0].name });

      const MultiCriteriaInputField2 = wrapper.instance().searchRefs[1];
      MultiCriteriaInputField2.setState({ term: inputs[1][0].name });

      expect(wrapper.find('.search-multiple-criteria__actions__buttons__search').find('a')).toHaveLength(1);
      wrapper.find('.search-multiple-criteria__actions__buttons__search').find('a').simulate('click');
      wrapper.update();
      expect(wrapper.props().onSearch).toHaveBeenCalledWith(inputs);
    });

    it('should clear criteria', () => {
      wrapper.setState({ touched: true });
      wrapper.find('.search-multiple-criteria__actions__buttons a.clear').simulate('click');
      expect(wrapper.find('MultiCriteriaInputField')).toHaveLength(1);
      expect(wrapper.state('touched')).toEqual(false);
      expect(wrapper.find('.search-multiple-criteria__actions')).toHaveLength(0);
    });

    it('should call props.onClear function 1 time', () => {
      wrapper.setState({ touched: true });
      wrapper.find('.search-multiple-criteria__actions__buttons a.clear').simulate('click');
      expect(props.onClear).toHaveBeenCalledTimes(1);
    });

    it('should have one expand icon initially', () => {
      expect(wrapper.find('.search-multiple-criteria__item__close').children()).toHaveLength(1);
    });

    it('should expand or collapse the search section', () => {
      wrapper.setState({ touched: true, expanded: true });
      wrapper.find('.search-multiple-criteria__actions__add button').simulate('click');
      expect(wrapper.find('MultiCriteriaInputField')).toHaveLength(2);
      wrapper.setState({ expanded: false });
      expect(wrapper.find('MultiCriteriaInputField')).toHaveLength(1);
      wrapper.setState({ expanded: true });
      expect(wrapper.find('MultiCriteriaInputField')).toHaveLength(2);
    });
  });
});
