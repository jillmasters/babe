import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { navigate } from '@reach/router';
import '@testing-library/jest-dom/extend-expect'
import SignUp from '../pages/SignUp';
import {signup} from '../services/UserService'

import UserService from '../services/UserService'
jest.mock('../services/UserService');

import authentication from '../authentication';
jest.mock('../authentication');
signup.mockResolvedValue('');

jest.mock('@reach/router')
navigate.mockResolvedValue('');

authentication.login.mockResolvedValue('Logged in')

const setIsAuthenticatedMock = jest.fn(() => {});
const setIsLoadingMock = jest.fn(() => {});

describe('Sign Up', () => {
  afterEach(() => {
    localStorage.clear()
    jest.clearAllMocks();
  })

  it('Correctly filled out form', async () => {
    UserService.login.mockResolvedValue({ accessToken: 'accessToken'});

    render(<SignUp
      setIsAuthenticated={setIsAuthenticatedMock}
      setIsLoading={setIsLoadingMock} />)

    const email = screen.getByLabelText('email');
    expect(email).toBeInTheDocument();
    userEvent.type(email, '23@test');
    expect(email).toHaveValue('23@test')

    const password = screen.getByLabelText('password');
    expect(password).toBeInTheDocument();
    userEvent.type(password, '123');
    expect(password).toHaveValue('123');

    const gbpCurr = screen.getByLabelText('currency-gbp');
    expect(gbpCurr).toBeInTheDocument();

    const usdCurr = screen.getByLabelText('currency-usd');
    expect(usdCurr).toBeInTheDocument();

    userEvent.click(gbpCurr);
    expect(gbpCurr).toBeChecked();

    const yourName = screen.getByLabelText('your-name');
    expect(yourName).toBeInTheDocument();
    userEvent.type(yourName, 'Chris');
    expect(yourName).toHaveValue('Chris')

    const partnerName = screen.getByLabelText('partners-name');
    expect(partnerName).toBeInTheDocument();
    userEvent.type(partnerName, 'Tamara');
    expect(partnerName).toHaveValue('Tamara')

    const partnerEmail = screen.getByLabelText('partners-email');
    expect(partnerEmail).toBeInTheDocument();
    userEvent.type(partnerEmail, 'tamara@test');
    expect(partnerEmail).toHaveValue('tamara@test')

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    await waitFor(() => {
      expect(localStorage.setItem).toBeCalledTimes(1);
      expect(signup).toBeCalledTimes(1);
      expect(setIsLoadingMock).toBeCalledTimes(1);
      expect(setIsAuthenticatedMock).toBeCalledTimes(1);
      expect(authentication.login).toBeCalledTimes(1);

      expect(signup).toHaveBeenCalledWith({
        email: '23@test',
        password: '123',
        name: 'Chris',
        partner: 'Tamara',
        partnerEmail: 'tamara@test',
        currency: '£'
      })

      expect(email.textContent).toEqual('');
      expect(password.textContent).toEqual('');
      expect(yourName.textContent).toEqual('');
      expect(partnerName.textContent).toEqual('');
      expect(partnerEmail.textContent).toEqual('');
    })
  })

  it('Unable to sign up', async () => {
    UserService.login.mockImplementation(() => {
      throw new Error('error');
    })

    render(<SignUp
      setIsAuthenticated={setIsAuthenticatedMock}
      setIsLoading={setIsLoadingMock} />)
  
  const email = screen.getByLabelText('email');
  expect(email).toBeInTheDocument();
  userEvent.type(email, '23@test');
  expect(email).toHaveValue('23@test')

  const password = screen.getByLabelText('password');
  expect(password).toBeInTheDocument();
  userEvent.type(password, '123');
  expect(password).toHaveValue('123');

  const gbpCurr = screen.getByLabelText('currency-gbp');
  expect(gbpCurr).toBeInTheDocument();

  const usdCurr = screen.getByLabelText('currency-usd');
  expect(usdCurr).toBeInTheDocument();

  userEvent.click(gbpCurr);
  expect(gbpCurr).toBeChecked();

  const yourName = screen.getByLabelText('your-name');
  expect(yourName).toBeInTheDocument();
  userEvent.type(yourName, 'Chris');
  expect(yourName).toHaveValue('Chris')

  const partnerName = screen.getByLabelText('partners-name');
  expect(partnerName).toBeInTheDocument();
  userEvent.type(partnerName, 'Tamara');
  expect(partnerName).toHaveValue('Tamara')

  const partnerEmail = screen.getByLabelText('partners-email');
  expect(partnerEmail).toBeInTheDocument();
  userEvent.type(partnerEmail, 'tamara@test');
  expect(partnerEmail).toHaveValue('tamara@test')

  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  userEvent.click(button);

  await waitFor(() => {

    expect(email.textContent).toEqual('');
    expect(password.textContent).toEqual('');
    expect(yourName.textContent).toEqual('');
    expect(partnerName.textContent).toEqual('');
    expect(partnerEmail.textContent).toEqual('');
  })
})
})
