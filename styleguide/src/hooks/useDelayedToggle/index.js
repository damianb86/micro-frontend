import { useState, useEffect } from 'react';

import useToggle from '../useToggle';

const useDelayedToggle = (
  defaultValue = false,
  closeDelay = 400,
  openDelay = 0,
  onCallback = () => {},
  offCallback = () => {}
) => {
  const [isOn, setOn, setOff] = useToggle(defaultValue);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOn = () => {
    setIsClosing(false);

    if (openDelay) {
      setIsOpening(true);
    } else {
      setOn();
      onCallback();
    }
  };

  const handleOff = () => {
    setIsOpening(false);

    if (closeDelay) {
      setIsClosing(true);
    } else {
      setOff();
      offCallback();
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (isClosing) {
        setOff();
        setIsClosing(false);
        offCallback();
      }
    }, closeDelay);

    return () => clearTimeout(handler);
  }, [isClosing]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (isOpening) {
        setOn();
        setIsOpening(false);
        onCallback();
      }
    }, openDelay);

    return () => clearTimeout(handler);
  }, [isOpening]);

  return [isOn, handleOn, handleOff];
};

export default useDelayedToggle;
