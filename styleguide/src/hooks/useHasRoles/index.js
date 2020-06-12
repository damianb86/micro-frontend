import { useState, useEffect } from 'react';

import { getCurrentUser } from '@clockwork/api';

export const useHasRoles = (roles = [], some = false) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user === false && redirect) {
        window.location = '/login';
      } else {
        setCurrentUser(user);
      }
    });
  }, []);

  if (currentUser) {
    return [some ? !roles.length || roles.some(role => currentUser.roles.includes(role)) : !roles.length || roles.every(role => currentUser.roles.includes(role))];
  }

  return [false];
};

export default useHasRoles;
