/* global describe, it, expect, jest, beforeEach */

import React from 'react';
import { shallow } from 'enzyme';
import { SearchCandidate } from './SearchCandidate';

import * as People from '../../../actions/people';
import * as Candidacies from '../../../actions/candidacies';

describe('<SearchCandidate />', () => {
  let wrapper;
  const initialProps = { dispatch: jest.fn() };
  const wrapperSetup = (newProps = {}) => {
    const props = {
      ...initialProps,
      ...newProps,
      peopleIds: [],
      candidacyPersonIds: []
    };
    wrapper = shallow(<SearchCandidate {...props} />);
  };

  beforeEach(() => {
    jest.resetAllMocks();
    wrapperSetup();
  });

  describe('renderer', () => {
    it('should render .search-candidates', () => {
      expect(wrapper.find('.search-candidates')).toHaveLength(1);
    });

    it('should render a StaticSearchBar', () => {
      expect(wrapper.find('StaticSearchBar')).toHaveLength(1);
    });

    it('should render an ActiveForm', () => {
      expect(wrapper.find('ActiveForm')).toHaveLength(1);
    });

    it('should render list items equal to number of people', () => {
      const query = 'wol';
      const peopleIds = ['111', '112'];
      const people = { 111: { id: 111, name: 'Demo' }, 112: { id: 112, name: 'Demo2' } };
      wrapper.setProps({ peopleIds, people });
      wrapper.setState({ query });
      expect(wrapper.find('.search-candidates__list__item').length).toEqual(peopleIds.length);
    });
  });

  describe('requestPeopleData()', () => {
    it('should call peopleQuickSearch', () => {
      People.peopleQuickSearch = jest.fn();
      wrapper.instance().requestPeopleData();
      setTimeout(() => expect(People.peopleQuickSearch).toHaveBeenCalledTimes(1), 501);
    });
  });

  describe('handlePeopleSelectChange()', () => {
    it('should update input value in state when it is different from the previous value', () => {
      wrapper.setState({ query: 'hello' });
      wrapper.instance().handlePeopleSelectChange('hola');
      setTimeout(() => expect(wrapper.state().query).toBe('hola'), 510);
    });

    it('should call peopleQuickSearch when it is different from the previous value', () => {
      People.peopleQuickSearch = jest.fn();
      wrapper.setState({ query: 'hello' });
      wrapper.instance().handlePeopleSelectChange('hello');
      setTimeout(() => expect(People.peopleQuickSearch).toHaveBeenCalledTimes(1), 510);
    });

    it('should do nothing when it is same from the previous value', () => {
      wrapper.setState({ query: 'hello' });
      const res = wrapper.instance().handlePeopleSelectChange('hello');
      expect(res).toBeFalsy();
    });
  });

  describe('handleSubmit()', () => {
    it('should not do anything if there is no value from input', () => {
      const e = { target: {} };
      const res = wrapper.instance().handleSubmit(e);
      expect(res).toBeFalsy();
    });

    it('should call requestAddCandidates', () => {
      Candidacies.requestAddCandidates = jest.fn();
      wrapper.setProps({ dispatch: jest.fn(() => Promise.resolve()) });
      const e = { target: { value: '112' } };
      wrapper.instance().handleSubmit(e);
      expect(Candidacies.requestAddCandidates).toHaveBeenCalledTimes(1);
    });
  });

  describe('renderPosition()', () => {
    it('should return only company name', () => {
      const positions = { 33: { title: 'Leader', companyAlias: { name: 'DC World' } } };
      const person = { currentPosition: { id: 33 } };
      wrapper.setProps({ positions });
      const res = wrapper.instance().renderPosition(person);
      expect(res).toEqual(<span className="search-candidates__list__item__content__position">DC World</span>);
    });

    it('should return nothing when only title is present', () => {
      const positions = { 33: { title: 'Leader', companyAlias: null } };
      const person = { currentPosition: { id: 33 } };
      wrapper.setProps({ positions });
      const res = wrapper.instance().renderPosition(person);
      expect(res).toEqual(<span className="search-candidates__list__item__content__position">{''}</span>);
    });

    it('should return only company name when only company name is present', () => {
      const positions = { 33: { title: null, companyAlias: { name: 'DC World' } } };
      const person = { currentPosition: { id: 33 } };
      wrapper.setProps({ positions });
      const res = wrapper.instance().renderPosition(person);
      expect(res).toEqual(<span className="search-candidates__list__item__content__position">DC World</span>);
    });
  });
});
