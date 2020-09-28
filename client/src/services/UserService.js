/* eslint no-console: 0 */

const fetchRequest = (path, options) => {
  return fetch(`http://localhost:3001${path}`, options)
    .then(res => (res.status < 400 ? res : Promise.reject(res)))
    .then(res => (res.status === 204 ? res : res.json()))
    .catch(error => console.log('---> Error fetching data from API', error));
};

const signup = newUser => {
  return fetchRequest('/sign-up', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
};

const login = user => {
  return fetchRequest('/login', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
};

const load = accessToken => {
  return fetchRequest('/dashboard', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const logout = tokenName => {
  localStorage.removeItem(tokenName);
};

module.exports = { signup, login, load, logout };
