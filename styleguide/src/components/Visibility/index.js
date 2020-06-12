import React from 'react';

import useHasRoles from '../../hooks/useHasRoles';

const Visibility = ({ roles, rolesSome, children }) => {
  const [isVisible] = useHasRoles(roles);
  const [isVisibleSome] = useHasRoles(rolesSome, true);

  return isVisible && isVisibleSome ? children : null;
}

Visibility.defaultProps = {
  roles : [],
  rolesSome: []
}

export default Visibility;
