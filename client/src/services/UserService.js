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

const loadUserDetails = accessToken => {
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

const editUserDetails = async (_id, field, value) => {
  return fetchRequest(`/${_id}/${field}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(value),
  });
};

module.exports = { signup, login, loadUserDetails, logout, editUserDetails };
