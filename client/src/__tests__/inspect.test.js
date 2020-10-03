import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { navigate } from '@reach/router';
import '@testing-library/jest-dom/extend-expect'
import Inspect from '../pages/Inspect';
import { deleteTransaction, getOneTransaction, getTransactions, editTransaction } from '../services/TransactionService';

jest.mock('../services/TransactionService');
getOneTransaction.mockResolvedValue('upload');
getTransactions.mockResolvedValue('upload');
deleteTransaction.mockResolvedValue('upload');
editTransaction.mockResolvedValue('upload');

jest.mock('@reach/router')
navigate.mockResolvedValue('');

const users =
{
  _id: "5f75e077dd559746a01dda55",
  lead: "C",
  leadEmail: "1234@test",
  partner: "M",
  partnerEmail: "123@test"
};
const currency = '£';
// _id
//setTransactions
//setIsLoading

describe('Call it even', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
  it('"Save my edits" directs away from page', async () => {
    render(<Inspect
      users={users}
      setTransactions={val => { console.log('transaction', val) }}
      setIsLoading={val => { console.log('isloading', val) }} />)
      
    const a = screen.getByText('Save my edits');
    expect(a).toBeInTheDocument();

    userEvent.click(a);
    expect(navigate).toHaveBeenCalledTimes(1);
  })
  it('"Delete" directs away from page', async () => {
    render(<Inspect
      users={users}
      setTransactions={val => { console.log('transaction', val) }}
      setIsLoading={val => { console.log('isloading', val) }} />)

    const a = screen.getByRole('deleteTrans');
    expect(a).toBeInTheDocument();

    userEvent.click(a);
    expect(navigate).toHaveBeenCalledTimes(1);
  })
})