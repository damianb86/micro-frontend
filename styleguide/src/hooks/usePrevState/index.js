import { useEffect, useRef } from 'react';

// useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue).
// The returned object will persist for the full lifetime of the component.
const usePrevState = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default usePrevState;
