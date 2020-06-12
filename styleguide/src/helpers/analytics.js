import { isEmpty } from 'lodash';

export const createParams = (paramsHash) => {
  const params = {};
  const { usersSelected, roleSelected, dealValueSelected, startDate, endDate } = paramsHash;

  if (!isEmpty(usersSelected)) {
    params.user_id = usersSelected.map(user => user.id);
  }

  if (!isEmpty(roleSelected)) {
    params.user_role = roleSelected.map(role => role.id);
  }

  if (dealValueSelected) {
    params.kind_of = dealValueSelected.toLowerCase();
  }

  if (startDate && endDate) {
    params.timeframe = JSON.stringify({ begin: startDate, end: endDate });
  }

  return params;
};

export function userNameWithRoleOrId(userEntities, userId) {
  let userName;
  const userEntity = userEntities[userId];

  if (userEntity) {
    userName = userEntity.role ? `${userEntity.name} (${userEntity.role})` : userEntity.name;
  } else {
    userName = userId;
  }

  return userName;
}
