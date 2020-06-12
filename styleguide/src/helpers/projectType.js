import { isEqual } from 'lodash';

import { STATUS_REPORT, LONG_LIST, ASSESSMENTS, CONTRACT } from '../constants/projectTypes';

export const isFormDisabled = (state, projectType) => {
  const { fieldName, clientInvite, projectStatusOptions, activeMenuOptions, projectTypeOptions, openProjectStatusForm } = state;
  const statusIds = projectStatusOptions.reduce((acc, s) => (s.checked ? acc.concat(s.key) : acc), []);

  if (projectType) {
    const isStatusIdsUnchanged = isEqual(projectType.statusIds, statusIds);

    if (!projectType.editable) {
      return isStatusIdsUnchanged;
    }

    const isProjectTypeOptionsUnchanged = !projectTypeOptions.some(i => i.checked !== projectType[i.key]);
    const isActiveMenuOptionsUnchanged = !activeMenuOptions.some(i => i.checked !== projectType[i.key]);
    const projectTypeUnchanged = !fieldName || fieldName === projectType.name;
    const clientInviteUnchanged = clientInvite === projectType.clientInvite;

    return projectTypeUnchanged
      && openProjectStatusForm
      && isStatusIdsUnchanged
      && clientInviteUnchanged
      && isProjectTypeOptionsUnchanged
      && isActiveMenuOptionsUnchanged;
  }

  return !fieldName;
};

export const getParams = (options) => {
  const { projectTypeOptions, activeMenuOptions, clientInvite, fieldName, projectStatusOptions } = options;
  const fieldOptions = projectTypeOptions.concat(activeMenuOptions).reduce((acc, obj) => { acc[obj.key] = obj.checked; return acc; }, {});
  const statusIds = projectStatusOptions.filter(s => s.checked).map(s => s.key);

  return { ...fieldOptions, clientInvite, name: fieldName, statusIds };
};

export const getAccessibleMenuOptions = (firmFeatures, options) => {
  if (!firmFeatures) {
    return options;
  }

  return options.filter((option) => {
    switch (option.key) {
      case STATUS_REPORT: return firmFeatures.projectStatusReport && firmFeatures.projectStatusReportAccess;
      case LONG_LIST: return firmFeatures.projectLongList && firmFeatures.projectLongListAccess;
      case ASSESSMENTS: return firmFeatures.candidateAssessments;
      case CONTRACT: return firmFeatures.projectContract && firmFeatures.projectContractAccess;
      default: return true;
    }
  });
};
