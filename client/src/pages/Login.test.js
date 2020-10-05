import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Login from './Login';

import UserService from '../services/UserService';
jest.mock('../services/UserService');

import authentication from '../authentication';
jest.mock('../authentication');
authentication.login.mockResolvedValue('LOGGED IN o_O');

const setIsAuthenticatedMock = jest.fn(() => {});
const setIsLoadingMock = jest.fn(() => {});

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test('User can login with correct credentials', async () => {
  UserService.login.mockResolvedValue({ accessToken: 'TOKEN' });

  render(
    <Login
      setIsAuthenticated={setIsAuthenticatedMock}
      setIsLoading={setIsLoadingMock}
    />,
  );

  const email = screen.getByRole('textbox', { name: 'email' });
  expect(email).toBeInTheDocument();
  userEvent.type(email, 'c@mail.com');

  const password = screen.getByLabelText('password');
  expect(password).toBeInTheDocument();
  userEvent.type(password, 'password123');

  const loginButton = screen.getByRole('button', {
    name: 'Show me the money',
  });
  expect(loginButton).toBeInTheDocument();

  userEvent.click(loginButton);

  await waitFor(() => {
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      'accessToken',
      'TOKEN',
    );

    expect(setIsAuthenticatedMock).toHaveBeenCalledTimes(1);
    expect(setIsLoadingMock).toHaveBeenCalledTimes(1);
    expect(authentication.login).toHaveBeenCalledTimes(1);
  });
});

test('User unable to login with incorrect credentials', async () => {
  UserService.login.mockImplementation(() => {
    throw new Error('asdasd');
  });

  render(
    <Login
      setIsAuthenticated={setIsAuthenticatedMock}
      setIsLoading={setIsLoadingMock}
    />,
  );

  const email = screen.getByRole('textbox', { name: 'email' });
  userEvent.type(email, 'c@mail.com');

  const password = screen.getByLabelText('password');
  userEvent.type(password, 'password123');

  const loginButton = screen.getByRole('button', {
    name: 'Show me the money',
  });

  userEvent.click(loginButton);

  await waitFor(() => {
    expect(email.textContent).toEqual('');
    expect(password.textContent).toEqual('');
  });
});
