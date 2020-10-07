/* eslint no-console: 0 */

const fetchRequest = (path: string, options?: any) => {
  return fetch(`${process.env.REACT_APP_API_CLIENT}${path}`, options)
    .then(res => (res.status < 400 ? res : Promise.reject(res)))
    .then(res => (res.status === 204 ? res : res.json()))
    .catch(error => console.log('---> Error fetching data from API', error));
};

const signup = (newUser: { name: string; password: string }) => {
  return fetchRequest('/sign-up', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
};

const login = (newUser: { name?: string; email: string; password: string }) => {
  return fetchRequest('/login', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
};

const loadUserDetails = (accessToken: string) => {
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

const logout = (tokenName: string) => {
  localStorage.removeItem(tokenName);
};

const editUserDetails = async (
  _id: string,
  field: string,
  value: { value: string },
) => {
  return fetchRequest(`/${_id}/${field}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(value),
  });
};

export default { signup, login, loadUserDetails, logout, editUserDetails };
export { signup, login, loadUserDetails, logout, editUserDetails };
