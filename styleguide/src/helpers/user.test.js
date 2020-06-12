import { getRolesDropdownOptions } from './user';
import userRoles, { FILTER_ROLES, NO_EXTERNAL_USER_ROLES, NO_EXTERNAL_FILTER_ROLES } from '../constants/userRoles';

describe('getRolesDropdownOptions', () => {
  describe('when displaying filter menu', () => {
    it('should return filter roles when external roles are enabled', () => {
      expect(getRolesDropdownOptions({ externalRoles: true }, 'filter')).toEqual(FILTER_ROLES);
    });

    it('should return filter roles without external recruiter when external roles are disabled', () => {
      expect(getRolesDropdownOptions({ externalRoles: false }, 'filter')).toEqual(NO_EXTERNAL_FILTER_ROLES);
    });
  });

  describe('when displaying add/edit menu', () => {
    it('should return filter roles when external roles are enabled', () => {
      expect(getRolesDropdownOptions({ externalRoles: true })).toEqual(userRoles);
    });

    it('should return filter roles without external recruiter when external roles are disabled', () => {
      expect(getRolesDropdownOptions({ externalRoles: false })).toEqual(NO_EXTERNAL_USER_ROLES);
    });
  });

  it('should send filter roles when no params are sent', () => {
    expect(getRolesDropdownOptions()).toEqual(NO_EXTERNAL_USER_ROLES);
  });
});
