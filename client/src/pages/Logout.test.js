import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Logout from './Logout';

import UserService from '../services/UserService';
jest.mock('../services/UserService');
UserService.logout.mockResolvedValue('');

import authentication from '../authentication';
jest.mock('../authentication');
authentication.logout.mockResolvedValue('');

const setIsAuthenticatedMock = jest.fn(() => {});
const setIsLoadingMock = jest.fn(() => {});

afterEach(() => {
  jest.clearAllMocks();
});

test('User can logout by pressing logout button', () => {
  render(
    <Logout
      setIsAuthenticated={setIsAuthenticatedMock}
      setIsLoading={setIsLoadingMock}
    />,
  );

  const logoutButton = screen.getByRole('button', {
    name: 'Log me out',
  });
  expect(logoutButton).toBeInTheDocument();

  userEvent.click(logoutButton);

  expect(setIsAuthenticatedMock).toHaveBeenCalledTimes(1);
  expect(setIsAuthenticatedMock).toHaveBeenCalledWith(false);
  expect(UserService.logout).toHaveBeenCalledTimes(1);
  expect(UserService.logout).toHaveBeenCalledWith('accessToken');
  expect(authentication.logout).toHaveBeenCalledTimes(1);
  //TODO: how to check authentation has been called with a callback function hmm
  expect(setIsLoadingMock).toHaveBeenCalledTimes(1);
  expect(setIsLoadingMock).toHaveBeenCalledWith(true);
});

// No test for take me home button as this just calls router link which will be tested in PageContainer.test.js
