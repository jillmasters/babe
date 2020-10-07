import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import Settings from './Settings';

const mockUsers = {
  lead: 'a',
  leadEmail: 'a@',
  partnerEmail: 'b@',
  partner: 'bob',
  _id: 1234,
};

import { editUserDetails } from '../services/UserService';
jest.mock('../services/UserService');
editUserDetails.mockResolvedValue('Uploaded blah');

const setUsersMock = jest.fn(() => {});
const setCurrencyMock = jest.fn(() => {});
const setIsLoadingMock = jest.fn(() => {});

afterEach(() => {
  jest.clearAllMocks();
});

test('Updating Settings triggers updates', async () => {
  render(
    <Settings
      users={mockUsers}
      setUsers={setUsersMock}
      currency="$"
      setCurrency={setCurrencyMock}
      setIsLoading={setIsLoadingMock}
    />,
  );

  const mainUser = screen.getByRole('textbox', { name: 'user-lead' });
  expect(mainUser).toBeInTheDocument();
  userEvent.clear(mainUser);
  userEvent.type(mainUser, 'c');

  const partnerUser = screen.getByRole('textbox', { name: 'user-partner' });
  expect(partnerUser).toBeInTheDocument();
  userEvent.clear(partnerUser);
  userEvent.type(partnerUser, 'd');

  const currency = screen.getByRole('radio', { checked: false });
  expect(currency).toBeInTheDocument();
  userEvent.click(currency);

  const submitButton = screen.getByRole('button', {
    name: 'Save my preferences',
  });
  expect(submitButton).toBeInTheDocument();
  userEvent.click(submitButton);

  expect(editUserDetails).toHaveBeenCalledTimes(3);

  expect(editUserDetails).toHaveBeenNthCalledWith(1, 1234, 'lead', {
    value: 'c',
  });
  expect(editUserDetails).toHaveBeenNthCalledWith(2, 1234, 'partner', {
    value: 'd',
  });
  expect(editUserDetails).toHaveBeenNthCalledWith(3, 1234, 'currency', {
    value: '£',
  });

  expect(setUsersMock).toHaveBeenCalledTimes(1);
  expect(setCurrencyMock).toHaveBeenCalledTimes(1);
  expect(setCurrencyMock).toHaveBeenCalledWith('£');
  expect(setIsLoadingMock).toHaveBeenCalledTimes(1);
  expect(setIsLoadingMock).toHaveBeenCalledWith(true);
});

test('Not updating setting doesnt trigger updates', async () => {
  render(
    <Settings
      users={mockUsers}
      setUsers={setUsersMock}
      currency="$"
      setCurrency={setCurrencyMock}
      setIsLoading={setIsLoadingMock}
    />,
  );

  const mainUser = screen.getByRole('textbox', { name: 'user-lead' });
  expect(mainUser).toBeInTheDocument();
  userEvent.clear(mainUser);
  userEvent.type(mainUser, 'a');

  const partnerUser = screen.getByRole('textbox', { name: 'user-partner' });
  expect(partnerUser).toBeInTheDocument();
  userEvent.clear(partnerUser);
  userEvent.type(partnerUser, 'bob');

  const submitButton = screen.getByRole('button', {
    name: 'Save my preferences',
  });
  expect(submitButton).toBeInTheDocument();
  userEvent.click(submitButton);

  expect(editUserDetails).toHaveBeenCalledTimes(0);

  // These still get called
  expect(setUsersMock).toHaveBeenCalledTimes(1);
  expect(setCurrencyMock).toHaveBeenCalledTimes(1);
  expect(setIsLoadingMock).toHaveBeenCalledTimes(1);
});
