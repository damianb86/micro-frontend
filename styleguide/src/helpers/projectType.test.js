import React from 'react';
import { shallow } from 'enzyme';

import { isFormDisabled, getParams, getAccessibleMenuOptions } from './projectType';
import { ACTIVE_MENU_OPTIONS_MAPPINGS } from '../constants/projectTypes';
import projectTypes, { initialTestState } from '../../__test__/fixtures//projectTypes/index';
import {
  STATUS_REPORT,
  CANDIDATES,
  GRID_VIEW,
  LONG_LIST,
  DASHBOARD,
  POSITION,
  STRATEGY,
  MILESTONES,
  CONTRACT,
  CONFIDENTIAL,
  INTERNAL,
  NAME,
  CLIENT_INVITE,
  ASSESSMENTS
} from '../constants/projectTypes';

describe('isFormDisabled fn', () => {
  it('should return false when the state values are same as the corresponding projectType values provided', () => {
    expect(isFormDisabled(initialTestState, projectTypes[1])).toBe(false);
  });

  it('should return true when the state values are different from their corresponding projectType values provided', () => {
    expect(isFormDisabled(initialTestState, projectTypes[7])).toBe(false);
  });

  it('should return true when fieldName not present', () => {
    expect(isFormDisabled({ fieldName: '', projectStatusOptions: [] })).toBe(true);
  });

  it('should return true if status ids not changed for non editable projectType', () => {
    expect(isFormDisabled({projectStatusOptions: [{ key: '1', checked: true }]}, projectTypes[2])).toBe(true);
  });

  it('should return false if status ids changed for non editable projectType', () => {
    expect(isFormDisabled({projectStatusOptions: [{ key: '2', checked: true }]}, projectTypes[2])).toBe(false);
  });

  it('should return true if project name has\'t changed', () => {
    expect(isFormDisabled({
      fieldName: projectTypes[1].name,
      projectStatusOptions: [],
      projectTypeOptions: [],
      activeMenuOptions: [],
      clientInvite: true,
      openProjectStatusForm: true
    }, projectTypes[1])
    ).toBe(true);
  });

  it('should return false if project name has\'t changed', () => {
    expect(isFormDisabled({
      fieldName: projectTypes[1].name,
      projectStatusOptions: [],
      projectTypeOptions: [],
      activeMenuOptions: [{ key: DASHBOARD, checked: true }],
      clientInvite: true,
      openProjectStatusForm: true
    }, projectTypes[1])
    ).toBe(false);
  });
});

describe('getParams fn', () => {
  it('should return formatted params', () => {
    expect(getParams(initialTestState)).toEqual({
      [ASSESSMENTS]: true,
      [CANDIDATES]: true,
      [CLIENT_INVITE]: true,
      [CONFIDENTIAL]: true,
      [CONTRACT]: true,
      [DASHBOARD]: false,
      [GRID_VIEW]: true,
      [INTERNAL]: true,
      [LONG_LIST]: true,
      [MILESTONES]: true,
      [NAME]: 'contingency',
      [POSITION]: true,
      [STATUS_REPORT]: true,
      [STRATEGY]: true,
      statusIds: []
    });
  });
});

describe('getAccessibleMenuOptions fn', () => {
  it('should return permitable menu options', () => {
    const result = getAccessibleMenuOptions({
      projectStatusReport: true,
      projectStatusReportAccess: true,
      projectLongList: true,
      projectLongListAccess: true,
      candidateAssessments: true
    }, ACTIVE_MENU_OPTIONS_MAPPINGS);

    expect(result.find(o => o.key === STATUS_REPORT)).toBeDefined();
    expect(result.find(o => o.key === LONG_LIST)).toBeDefined();
    expect(result.find(o => o.key === ASSESSMENTS)).toBeDefined();
    expect(result.find(o => o.key === CONTRACT)).toBe(undefined);
  });
})
