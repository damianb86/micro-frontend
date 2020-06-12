export const addEventListener = (event, callback) =>
  window.addEventListener(event, callback);

export const removeEventListener = (event, callback) =>
  window.removeEventListener(event, callback);

export const dispatchEventListener = (event, detail) =>
  window.dispatchEvent(new CustomEvent(event, { detail }, true));
