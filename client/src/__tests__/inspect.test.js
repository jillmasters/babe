import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { navigate } from '@reach/router';
import '@testing-library/jest-dom/extend-expect';
import Inspect from '../pages/Inspect';
import {
  deleteTransaction,
  getOneTransaction,
  getTransactions,
  editTransaction,
} from '../services/TransactionService';

jest.mock('../services/TransactionService');
// @ts-ignore
deleteTransaction.mockResolvedValue(
  () => new Promise((resolve, reject) => resolve({})),
);
// @ts-ignore
getOneTransaction.mockResolvedValue(
  () => new Promise((resolve, reject) => resolve({})),
);
// @ts-ignore
getTransactions.mockResolvedValue(
  () => new Promise((resolve, reject) => resolve({})),
);
// @ts-ignore
editTransaction.mockImplementation(
  () => new Promise((resolve, reject) => resolve({})),
);

// const mockedEditTransaction = axios as jest.Mocked<typeof axios>
// FIXME: remove this warning later
// editTransaction.mockResolvedValue(new Promise((resolve) => 'edited'));

jest.mock('@reach/router');
// navigate.mockResolvedValue('');

const users = {
  _id: '5f75e077dd559746a01dda55',
  lead: 'C',
  leadEmail: '1234@test',
  partner: 'M',
  partnerEmail: '123@test',
};
const currency = '£';

describe('Inspect', () => {
  beforeEach(() => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() =>
        new Date('2019-05-14T11:01:58.135Z').valueOf(),
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('"Save my edits" directs away from page', async () => {
    render(
      <Inspect
        _id="123"
        currency={currency}
        users={users}
        setTransactions={() => {}}
        setIsLoading={() => {}}
      />,
    );

    const saveBtn = screen.getByText('Save my edits');
    expect(saveBtn).toBeInTheDocument();

    userEvent.click(saveBtn);
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('Delete directs away from page', async () => {
    render(
      <Inspect
        _id="123"
        currency={currency}
        users={users}
        setTransactions={() => {}}
        setIsLoading={() => {}}
      />,
    );

    const deleteBtn = screen.getByRole('deleteTrans');
    expect(deleteBtn).toBeInTheDocument();

    userEvent.click(deleteBtn);
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('When a transaction is updated its sent through correctly: Even Split', async () => {
    render(
      <Inspect
        _id="123"
        currency={currency}
        users={users}
        setTransactions={() => {}}
        setIsLoading={() => {}}
      />,
    );

    const billItem = screen.getByLabelText('bill-item');
    expect(billItem).toBeInTheDocument();
    userEvent.type(billItem, 'Dinner');

    const billAmount = screen.getByLabelText('bill-amount');
    expect(billAmount).toBeInTheDocument();
    userEvent.type(billAmount, '21');

    // const billDate = screen.getByLabelText('bill-date');
    // expect(billDate).toBeInTheDocument();
    // fireEvent.change(billDate, { target: { value: '2020-10-03' } });

    const userPaid = screen.getByLabelText('bill-lender-lead-radio');
    expect(userPaid).toBeInTheDocument();
    userEvent.click(userPaid);

    const slider = screen.getByLabelText('bill-proportion-slider');
    expect(slider).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: 50 } });

    const saveBtn = screen.getByText('Save my edits');
    expect(saveBtn).toBeInTheDocument();
    userEvent.click(saveBtn);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(editTransaction).toHaveBeenCalledTimes(1);
      expect(editTransaction).toHaveBeenCalledWith('123', {
        item: 'Dinner',
        amount: 21,
        date: new Date('2019-05-14T11:01:58.135Z'),
        lender: '1234@test',
        split: 50,
        addedBy: '1234@test',
      });
    });
  });
  it('When a transaction is updated its sent through correctly: uneven Split', async () => {
    render(
      <Inspect
        _id="123"
        currency={currency}
        users={users}
        setTransactions={() => {}}
        setIsLoading={() => {}}
      />,
    );

    const billItem = screen.getByLabelText('bill-item');
    expect(billItem).toBeInTheDocument();
    userEvent.type(billItem, 'Dinner');

    const billAmount = screen.getByLabelText('bill-amount');
    expect(billAmount).toBeInTheDocument();
    userEvent.type(billAmount, '30');

    // const billDate = screen.getByLabelText('bill-date');
    // expect(billDate).toBeInTheDocument();
    // fireEvent.change(billDate, { target: { value: new Date('2019-05-14T11:01:58.135Z').valueOf() } });

    const userPaid = screen.getByLabelText('bill-lender-lead-radio');
    expect(userPaid).toBeInTheDocument();
    userEvent.click(userPaid);

    const slider = screen.getByLabelText('bill-proportion-slider');
    expect(slider).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: 30 } });

    const saveBtn = screen.getByText('Save my edits');
    expect(saveBtn).toBeInTheDocument();

    await waitFor(() => {
      userEvent.click(saveBtn);
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(editTransaction).toHaveBeenCalledTimes(1);

      expect(editTransaction).toHaveBeenCalledWith('123', {
        item: 'Dinner',
        amount: 30,
        date: new Date('2019-05-14T11:01:58.135Z'),
        lender: '1234@test',
        split: 30,
        addedBy: '1234@test',
      });
    });
  });
});
// mock an error??
