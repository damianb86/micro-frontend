import { useState, useEffect } from 'react';

import { getCurrentUser } from '@clockwork/api';

export const useCurrentUser = (redirect = false) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      console.log({ user });
      setCurrentUser(user);
    });
  }, []);

  return [currentUser];
};
