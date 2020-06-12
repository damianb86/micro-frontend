import React, { useState, useEffect } from "react";

import { EVENTS, addEventListener, removeEventListener } from '@clockwork/configuration';

export default function Root(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [info, setInfo] = useState('');

  const styles = {
    display: 'block',
    position: 'fixed',
    width: '30vw',
    height: '100vh',
    top: 0,
    right: isVisible ? 0 : -475,
    backgroundColor: '#efefef',
    borderLeft: '3px solid lightgray',
    padding: '60px 20px',
    transition: 'all 0.5s ease'
  }

  useEffect(() => {
    addEventListener(EVENTS.RIGHT_BAR_APP.showInfo, handleToggleVisibility);

    return () => removeEventListener(EVENTS.RIGHT_BAR_APP.showInfo, handleToggleVisibility);
  }, [isVisible]);

  const handleToggleVisibility = (event) => {
    setIsVisible(!isVisible);
    setInfo(event.detail.info);
  }

  return (
    <section style={styles}>
      <div dangerouslySetInnerHTML={{ __html: info }} />
    </section>
  );
}
