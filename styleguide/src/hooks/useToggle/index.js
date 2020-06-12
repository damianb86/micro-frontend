import { useState } from 'react';

const useToggle = (defaultValue = false) => {
  const [isOn, setIsOn] = useState(defaultValue);

  const handleOn = () => setIsOn(true);
  const handleOff = () => setIsOn(false);
  const handleToggle = () => setIsOn(!isOn);

  return [isOn, handleOn, handleOff, handleToggle];
};

export default useToggle;
