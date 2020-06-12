export function saveDraft(key, data) {
  if (!window.localStorage) {
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    return undefined;
  }
}

export function getDraft(key) {
  if (!window.localStorage) {
    return;
  }

  try {
    const data = JSON.parse(localStorage.getItem(key));

    if (data) {
      return data;
    }

    return null;
  } catch (error) {
    return undefined;
  }
}

export function removeDraft(key) {
  if (!window.localStorage) {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (error) {
    return undefined;
  }
}

export const saveInLocalStorage = (key, data) => saveDraft(key, data);

export const getFromLocalStorage = key => getDraft(key);
