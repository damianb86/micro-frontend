/* eslint-disable import/prefer-default-export */
import { defaultMemoize } from 'reselect';

import userRoles, { FILTER_ROLES, NO_EXTERNAL_USER_ROLES, NO_EXTERNAL_FILTER_ROLES } from '../constants/userRoles';

export const getRolesDropdownOptions = defaultMemoize((firmFeature, menuType = 'add/edit') => {
  const externalRolesEnabled = firmFeature && firmFeature.externalRoles;

  if (menuType === 'filter') {
    if (externalRolesEnabled) {
      return FILTER_ROLES;
    }
    return NO_EXTERNAL_FILTER_ROLES;
  }
  if (externalRolesEnabled) {
    return userRoles;
  }
  return NO_EXTERNAL_USER_ROLES;
});
