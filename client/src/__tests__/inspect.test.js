import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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

  // check filled in inputs are saved correctly..

  it('When a transaction is updated it\'s sent through correctly: Even Split', async () => {
    render(<Inspect
      users={users}
      setTransactions={val => { console.log('transaction', val) }}
      setIsLoading={val => { console.log('isloading', val) }} />)

    const billItem = screen.getByLabelText('bill-item');
    expect(billItem).toBeInTheDocument();
    userEvent.type(billItem, 'Dinner');

    const billAmount = screen.getByLabelText('bill-amount');
    expect(billAmount).toBeInTheDocument();
    userEvent.type(billAmount, '21');

    const billDate = screen.getByLabelText("bill-date");
    expect(billDate).toBeInTheDocument();
    // userEvent.type(new Date('2019-05-14T11:01:58.135Z'))
    fireEvent.change(billDate, { target: { value: '2020-10-03'}})

    const userPaid = screen.getByLabelText("bill-lender-lead-radio");
    expect(userPaid).toBeInTheDocument();
    userEvent.click(userPaid);

    const slider = screen.getByLabelText("bill-proportion-slider");
    expect(slider).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "50" } });

    const a = screen.getByText('Save my edits');
    expect(a).toBeInTheDocument();

    await waitFor(() => {
      userEvent.click(a);
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(editTransaction).toHaveBeenCalledTimes(1);
      expect(editTransaction).toHaveBeenCalledWith(undefined, {
        item: 'Dinner',
        amount: '21',
        date: '2020-10-03',
        lender: '1234@test',
        split: "50",
        addedBy: '1234@test',
      });
    });
  })
  it('When a transaction is updated it\'s sent through correctly: uneven Split', async () => {
    render(<Inspect
      users={users}
      setTransactions={val => { console.log('transaction', val) }}
      setIsLoading={val => { console.log('isloading', val) }} />)

    const billItem = screen.getByLabelText('bill-item');
    expect(billItem).toBeInTheDocument();
    userEvent.type(billItem, 'Dinner');

    const billAmount = screen.getByLabelText('bill-amount');
    expect(billAmount).toBeInTheDocument();
    userEvent.type(billAmount, '30');

    const billDate = screen.getByLabelText("bill-date");
    expect(billDate).toBeInTheDocument();
    fireEvent.change(billDate, { target: { value: '2020-10-03'}})

    const userPaid = screen.getByLabelText("bill-lender-lead-radio");
    expect(userPaid).toBeInTheDocument();
    userEvent.click(userPaid);

    const slider = screen.getByLabelText("bill-proportion-slider");
    expect(slider).toBeInTheDocument();
    fireEvent.change(slider, { target: { value: "30" } });

    const a = screen.getByText('Save my edits');
    expect(a).toBeInTheDocument();

    await waitFor(() => {
      jest
        .spyOn(global.Date, 'now')
        .mockImplementationOnce('2020-10-03');

      userEvent.click(a);
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(editTransaction).toHaveBeenCalledTimes(1);

      expect(editTransaction).toHaveBeenCalledWith(undefined, {
        item: 'Dinner',
        amount: '30',
        date: '2020-10-03',
        lender: '1234@test',
        split: "30",
        addedBy: '1234@test',
      });
    });
  })
})