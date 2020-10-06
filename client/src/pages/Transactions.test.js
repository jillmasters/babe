import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'babel-polyfill';
import Transactions from './Transactions';
import userEvent from '@testing-library/user-event';

import { postTransaction } from '../services/TransactionService';
jest.mock('../services/TransactionService');
postTransaction.mockResolvedValue('Uploaded blah');

const mockUsers = {
  leadEmail: 'a@',
  partnerEmail: 'b@',
  partner: 'bob',
};

afterEach(() => {
  jest.clearAllMocks();
})

test('Submit form with even split ', async () => {
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

  const userPaidRadio = screen.getByRole('radio', {
    name: 'bill-lender-lead-radio',
  });
  userEvent.click(userPaidRadio);
  const billSplitEvenRadio = screen.getByRole('radio', {
    name: 'bill-split-even-radio',
  });
  userEvent.click(billSplitEvenRadio);

  const submitButton = screen.getByRole('button', { name: 'Split' });
  expect(submitButton).toBeInTheDocument();

  jest
    .spyOn(global.Date, 'now')
    .mockImplementationOnce(() =>
      new Date('2019-05-14T11:01:58.135Z').valueOf(),
      );
      userEvent.click(submitButton);
      expect(postTransaction).toHaveBeenCalledTimes(1);
  await waitFor(() => {

    expect(postTransaction).toHaveBeenCalledWith({
      item: 'Breakfast',
      amount: 20,
      date: new Date('2019-05-14T11:01:58.135Z'),
      lender: 'a@',
      split: 50,
      addedBy: 'a@',
    });
  });
});

test('Submit form with uneven split ', async () => {
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

  const userPaidRadio = screen.getByRole('radio', {
    name: 'bill-lender-lead-radio',
  });
  userEvent.click(userPaidRadio);

  const billSplitEvenRadio = screen.getByRole('radio', {
    name: 'bill-split-uneven-radio',
  });
  userEvent.click(billSplitEvenRadio);

  const billSplitSlider = screen.getByRole('slider', {
    name: 'bill-split-slider',
  });
  expect(billSplitSlider).toBeInTheDocument();
  fireEvent.change(billSplitSlider, { target: { value: 40 } });

  const submitButton = screen.getByRole('button', { name: 'Split' });
  expect(submitButton).toBeInTheDocument();

  jest
    .spyOn(global.Date, 'now')
    .mockImplementationOnce(() =>
      new Date('2019-05-14T11:01:58.135Z').valueOf(),
    );

  userEvent.click(submitButton);

  expect(postTransaction).toHaveBeenCalledTimes(1); // FIXME: why does this not work when both tests are enabled
  await waitFor(() => {
    expect(postTransaction).toHaveBeenCalledWith({
      item: 'Breakfast',
      amount: '20',
      date: new Date('2019-05-14T11:01:58.135Z'),
      lender: 'a@',
      split: 40,
      addedBy: 'a@',
    });
  });
});

// TODO: Submit form and receive error?
