/* eslint-disable no-use-before-define */
/*
  apiCaller: Accepts an API function of returning data as formulated by web/src/api/ajax.js
  onSuccess: This is a callback function which can receive data, check the codition, and return trur or false to continue/discontinue polling
  onFailure: This callback function is made to ensure that on failures there's cleanup for dependent variables ( like removing the loading bar in gridview )

  The hook has three functions here:
    isPolling: use it to know if polling is happening
    startPolling: use it to start polling
    stopPolling: use it force stop polling from caller component
    onFinish: callback to cleanup dependent values
*/

import { useState, useEffect, useRef } from 'react';

const useShortPolling = ({ apiCaller, onSuccess, onFinish, onFailure = () => {} }) => {
  const interval = 10000;
  const maxPolls = 30;
  let pollingCounter = 0;

  const [isPolling, setPolling] = useState(false);

  const persistedIsPolling = useRef();
  const isMounted = useRef();
  const poll = useRef();

  persistedIsPolling.current = isPolling;

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const startPolling = () => {
    setPolling(true);
    runPolling();
  };

  const stopPolling = () => {
    if (isMounted.current) {
      if (poll.current) {
        clearTimeout(poll.current);
        poll.current = null;
      }
      setPolling(false);
      onFinish();
    }
  };

  const runPolling = () => {
    const timeoutId = setTimeout(() => {
      if (pollingCounter < maxPolls) {
        apiCaller()
          .then(data => onSuccess(data)).then((shouldPollContinue) => {
            if (persistedIsPolling.current && shouldPollContinue) {
              runPolling();
            } else {
              stopPolling();
            }
          })
          .catch((error) => {
            stopPolling();
            onFailure(error);
          });

        pollingCounter += 1;
      }
    }, interval);
    poll.current = timeoutId;
  };

  return [isPolling, startPolling, stopPolling];
};

export default useShortPolling;
