import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'babel-polyfill';
import Transactions from './Transactions';
import userEvent from '@testing-library/user-event';

import { postTransaction } from '../services/TransactionService';
jest.mock('../services/TransactionService');
// import { getPosts } from "./apiService.js";
postTransaction.mockResolvedValue('Uploaded blah');

const mockUsers = {
  leadEmail: 'a@',
  partnerEmail: 'b@',
  partner: 'bob',
};

test('Submit form with even split ', () => {
  render(
    <Transactions
      users={mockUsers}
      currency={'$'}
      setTransactions={val => {
        console.log('transaction', val);
      }}
      isLoading={false} // this doens't matter
      setIsLoading={val => {
        console.log('isloading', val);
      }}
    />,
  );

  const billItem = screen.getByRole('textbox', { name: 'bill-item' });
  expect(billItem).toBeInTheDocument();

  userEvent.type(billItem, 'Breakfast');

  const billAmount = screen.getByRole('spinbutton', { name: 'bill-amount' });
  expect(billAmount).toBeInTheDocument();
  userEvent.type(billAmount, '20');

  const userPaidRadio = screen.getByRole('radio', { name: 'bill-lender-lead-radio' });
  userEvent.click(userPaidRadio);
  const billSplitEvenRadio = screen.getByRole('radio', { name: 'bill-split-even-radio' });
  userEvent.click(billSplitEvenRadio);

  const submitButton = screen.getByRole('button', { name: 'Split' });
  expect(submitButton).toBeInTheDocument();

  jest
    .spyOn(global.Date, 'now')
    .mockImplementationOnce(() =>
      new Date('2019-05-14T11:01:58.135Z').valueOf()
    );

  userEvent.click(submitButton);

  expect(postTransaction).toHaveBeenCalledTimes(1);
  expect(postTransaction).toHaveBeenCalledWith({
    item: 'Breakfast',
    amount: '20',
    date: new Date('2019-05-14T11:01:58.135Z'),
    lender: 'a@',
    split: 50,
    addedBy: 'a@',
  });
});


// TODO: Submit form with uneven split

// TODO: Submit form and receive error?
