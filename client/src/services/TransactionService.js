/* eslint no-console: 0 */

const fetchRequest = (path, options) => {
  return fetch(`${process.env.REACT_APP_API_CLIENT}${path}`, options)
    .then(res => (res.status < 400 ? res : Promise.reject(res)))
    .then(res => (res.status === 204 ? res : res.json()))
    .catch(error => console.log('---> Error fetching data from API', error));
};

const getTransactions = async _id => {
  return fetchRequest(`/history/${_id}`);
};

const getOneTransaction = async _id => {
  return fetchRequest(`/transactions/${_id}`);
};

const postTransaction = async newTransaction => {
  return fetchRequest('/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTransaction),
  });
};

const deleteTransaction = async _id => {
  return fetchRequest(`/transactions/${_id}`, { method: 'DELETE' });
};

const editTransaction = async (_id, editedTransaction) => {
  return fetchRequest(`/transactions/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editedTransaction),
  });
};

export default {
  getTransactions,
  postTransaction,
  getOneTransaction,
  deleteTransaction,
  editTransaction,
};
