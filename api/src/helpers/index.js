export const getCurrentUser = () => new Promise((resolve, reject) => {
  const token = localStorage.getItem('token');

  if (token) {
    const jwtUser = getJwtDecoded(token);
    resolve(jwtUser);
  } else {
    reject();
  }
});

export const isJwtTokenValid = () => getJwtDecoded().exp < Math.floor(Date.now() / 1000);

export const getJwtToken = () => 
  localStorage.getItem('token');

export const saveJwtToken = ({ access }) =>
  localStorage.setItem('token', access);

export const removeJwtToken = () =>
  localStorage.removeItem('token');

export const getJwtDecoded = () => {
  try {
    return JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
  } catch (error) {
    return {};
  }
};
