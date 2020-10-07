import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { navigate } from '@reach/router';
import '@testing-library/jest-dom/extend-expect';
import CallItEven from '../pages/CallItEven';
import { postTransaction } from '../services/TransactionService';

jest.mock('../services/TransactionService');
postTransaction.mockResolvedValue('upload');

jest.mock('@reach/router');
navigate.mockResolvedValue('');

const users = {
  _id: '5f75e077dd559746a01dda55',
  lead: 'C',
  leadEmail: '1234@test',
  partner: 'M',
  partnerEmail: '123@test',
};
const summary = { balance: 5, totalOwed: 5, overallLender: 'C' };
const currency = '£';

describe('Call it even', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays correct summary and users partner', async () => {
    render(<CallItEven users={users} currency={currency} summary={summary} />);
    expect(screen.getByText(/M\s*owes you\s*£5/)).toBeInTheDocument();
  });

  it('On "wipe that debt" click navigation is called', async () => {
    render(
      <CallItEven
        users={users}
        currency={currency}
        summary={summary}
        setTransactions={val => {
          console.log('transaction', val);
        }}
        isLoading={false}
        setIsLoading={val => {
          console.log('isloading', val);
        }}
      />,
    );
    const wipeDebt = await screen.getByText('Wipe that debt');
    userEvent.click(wipeDebt);
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('New transaction created on click', async () => {
    render(
      <CallItEven
        users={users}
        currency={currency}
        summary={summary}
        setTransactions={val => {
          console.log('transaction', val);
        }}
        isLoading={false}
        setIsLoading={val => {
          console.log('isloading', val);
        }}
      />,
    );

    const LeaveNote = screen.getByRole('LeaveNote');
    expect(LeaveNote).toBeInTheDocument();

    const wipeDebt = screen.getByText('Wipe that debt');
    expect(wipeDebt).toBeInTheDocument();

    userEvent.type(LeaveNote, 'HI');

    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() =>
        new Date('2019-05-14T11:01:58.135Z').valueOf(),
      );

    userEvent.click(wipeDebt);

    expect(postTransaction).toHaveBeenCalledTimes(1);
    expect(postTransaction).toHaveBeenCalledWith({
      item: `C called it even: HI`,
      amount: 5,
      date: new Date('2019-05-14T11:01:58.135Z'),
      lender: 'Babe',
      split: 1,
      addedBy: '1234@test',
    });
  });
});
