import { useState } from 'react';

const useToggleMultiple = (defaultValue = {}) => {
  const [isOnObject, setIsOnObject] = useState(defaultValue);

  const handleOn = id => setIsOnObject({ ...isOnObject, [id]: true });
  const handleOff = id => setIsOnObject({ ...isOnObject, [id]: false });
  const handleToggle = id => setIsOnObject({ ...isOnObject, [id]: !isOnObject[id] });

  return [isOnObject, handleOn, handleOff, handleToggle];
};

export default useToggleMultiple;
