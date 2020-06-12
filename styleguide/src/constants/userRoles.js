export const ROLES = {
  ADMIN: 'Admin',
  RESEARCHER: 'Researcher',
  RECRUITER: 'Recruiter',
  PARTNER: 'Partner',
  CLIENT: 'Client',
  EXTERNAL_RECRUITER: 'External Recruiter',
  PERSON: 'Person',
  OWNER: 'Owner',
  DEACTIVATED: 'Deactivated',
  PHANTOM: 'Phantom'
};

const { ADMIN, RESEARCHER, RECRUITER, PARTNER, EXTERNAL_RECRUITER } = ROLES;

const userRoles = [
  { id: PARTNER, value: PARTNER },
  { id: RECRUITER, value: RECRUITER },
  { id: RESEARCHER, value: RESEARCHER },
  { id: EXTERNAL_RECRUITER, value: EXTERNAL_RECRUITER },
  { id: ADMIN, value: ADMIN }
];

export const NO_EXTERNAL_USER_ROLES = userRoles.filter(role => role.id !== EXTERNAL_RECRUITER);

export const FILTER_ROLES = [
  { id: 'activeFirmRole', value: 'All Active' },
  ...userRoles,
  { id: 'Deactivated', value: 'Deactivated' }
];

export const NO_EXTERNAL_FILTER_ROLES = FILTER_ROLES.filter(role => role.id !== EXTERNAL_RECRUITER);

export default userRoles;
