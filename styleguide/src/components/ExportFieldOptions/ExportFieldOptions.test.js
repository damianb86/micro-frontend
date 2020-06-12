import React from 'react';
import { shallow } from 'enzyme';

import ExportFieldOptions from './index';
import CandidateExportFields, { defaultSelectedKeys } from '../../../constants/CandidateExportFields';
import { allKeys } from '../../../helpers/gridview';

describe('<ExportFieldOptions />', () => {
  let wrapper = null;

  const allFieldKeys = allKeys(CandidateExportFields);

  const initialProps = {
    fields: CandidateExportFields,
    selectedFields: defaultSelectedKeys,
    allKeys: allKeys
  };

  const wrapperSetup = (newProps = {}) => {
    const props = {
      ...initialProps,
      ...newProps
    };

    wrapper = shallow(<ExportFieldOptions {...props} />);
  };

  beforeEach(() => {
    jest.resetAllMocks();
    wrapperSetup();
  });

  describe('renderer', () => {
    it('should render ExportFieldOptions compoent', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render ActiveForm compoent', () => {
      expect(wrapper.find('ActiveForm')).toHaveLength(1);
    });

    it('should render one h4 and checkbox element in header', () => {
      expect(wrapper.find('.export-fields__header')).toHaveLength(1);
      expect(wrapper.find('.export-fields__header').find('h4')).toHaveLength(1);
      expect(wrapper.find('.export-fields__header').find('CheckBox')).toHaveLength(1);
    });

    it('should return all the options groups', () => {
      expect(wrapper.find('.export-fields__content').children()).toHaveLength(CandidateExportFields.length);
    });

    it('should return all the options present in each groups', () => {
      const groups = wrapper.find('.export-fields__content').children();
      groups.forEach((node, index) => {
        expect(node.find('.export-fields__content__section__list').children()).toHaveLength(CandidateExportFields[index].values.length);
      });
    });
  });

  describe('onChange', () => {
    it('should set isAllFieldsSelected when selectAll option checked', () => {
      wrapper.instance().onChange({ target: { name: 'selectAll', checked: true } });
      expect(wrapper.state().selectedFields).toEqual(allFieldKeys);
    });

    it('should set selected field checked when checked', () => {
      wrapper.instance().onChange({ target: { name: CandidateExportFields[1].values[1].key, checked: true } });
      expect(wrapper.state().selectedFields.indexOf(CandidateExportFields[1].values[1].key) !== -1).toEqual(true);
    });

    it('should set isAllFieldsSelected to false when selectAll option unchecked', () => {
      wrapper.instance().onChange({ target: { name: 'selectAll', checked: false } });
      expect(wrapper.state().selectedFields).toEqual([]);
    });
  });

  describe('handleSubmit', () => {
    const onSubmit = jest.fn();

    beforeEach(() => {
      wrapper.setProps({ onSubmit });
    });

    it('should call onSubmit props once', () => {
      wrapper.setState({ selectedFields: ['name'] });
      wrapper.instance().handleSubmit({});
      expect(onSubmit).toHaveBeenCalled();
    });

    it('should not call onSubmit when no disabled state is true', () => {
      wrapper.setState({ selectedFields: [] });
      wrapper.instance().handleSubmit({});
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
