import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import SettleUp from './SettleUp';

const mockUsers = {
  lead: 'a',
  leadEmail: 'a@',
  partnerEmail: 'b@',
  partner: 'bob',
};

import { postTransaction } from '../services/TransactionService';

jest.mock('../services/TransactionService');

const setTransactionsMock = jest.fn(() => {});
const setIsLoadingMock = jest.fn(() => {});

test('User can settle up', async () => {
  postTransaction.mockResolvedValue('Uploaded blah'); //Promise.resolve({ data: {} })
  render(
    <SettleUp
      summary={{
        totalOwed: 10,
      }}
      currency="$"
      users={mockUsers}
      setTransactions={setTransactionsMock}
      setIsLoading={setIsLoadingMock}
    />,
  );

  const wipeNote = screen.getByRole('textbox', { name: 'wipe-description' });
  expect(wipeNote).toBeInTheDocument();

  userEvent.type(wipeNote, 'Woohoo');

  const submitButton = screen.getByRole('button', { name: 'SettleUp' });
  expect(submitButton).toBeInTheDocument();

  jest
    .spyOn(global.Date, 'now')
    .mockImplementationOnce(() =>
      new Date('2019-05-14T11:01:58.135Z').valueOf(),
    );

  userEvent.click(submitButton);
  expect(postTransaction).toHaveBeenCalledTimes(1);
  expect(postTransaction).toHaveBeenCalledWith({
    item: `a settled up: Woohoo`,
    amount: 10,
    date: new Date('2019-05-14T11:01:58.135Z'),
    lender: 'Babe',
    split: -1,
    addedBy: 'a@',
  });

  expect(setIsLoadingMock).toHaveBeenCalledTimes(1);

  await waitFor(() => {
    expect(setTransactionsMock).toHaveBeenCalledTimes(1);
  });
});

//TODO: Add this test back in when error boundary is being handled better

// test('Server error with settling up', () => {
// // Look for other methods for ethrowing errors
// // try catch

//   const error = new Error('Some error!');
//   postTransaction.mockImplementation(() => {
//     throw error;
//   });

//   render(
//     <SettleUp
//       summary={{
//         totalOwed: 10,
//       }}
//       currency="$"
//       users={mockUsers}
//       setTransactions={setTransactionsMock}
//       setIsLoading={setIsLoadingMock}
//     />,
//   );

//   const wipeNote = screen.getByRole('textbox', { name: 'wipe-description' });
//   expect(wipeNote).toBeInTheDocument();

//   userEvent.type(wipeNote, 'Woohoo');

//   const submitButton = screen.getByRole('button', { name: 'SettleUp' });
//   expect(submitButton).toBeInTheDocument();

//   userEvent.click(submitButton);
//   expect(postTransaction).toThrow(error);
// });
