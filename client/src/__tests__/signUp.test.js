import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { navigate } from '@reach/router';
import '@testing-library/jest-dom/extend-expect'
import SignUp, {localStorage} from '../pages/SignUp';

import {signup} from '../services/UserService'
import {login} from '../authentication'


jest.mock('../services/UserService');
jest.mock('../authentication');
signup.mockResolvedValue('upload');
jest.mock('@reach/router')
navigate.mockResolvedValue('');


describe('Sign Up', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
  it('Correctly filled out form', async () => {
    render(<SignUp
      setTransactions={val => { console.log('transaction', val) }}
      setIsLoading={val => { console.log('isloading', val) }} />)

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
      expect(signup).toBeCalledTimes(1);
      expect(signup).toHaveBeenCalledWith({
        email: '23@test',
        password: '123',
        name: 'Chris',
        partner: 'Tamara',
        partnerEmail: 'tamara@test',
        currency: '£'
      })
      expect(email).toHaveValue('');
      expect(password).toHaveValue('');
      expect(yourName).toHaveValue('');
      expect(partnerName).toHaveValue('');
      expect(partnerEmail).toHaveValue('');
    })
  })
})
// mock an error??
// check form gets reset