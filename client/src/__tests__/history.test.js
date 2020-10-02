import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import History from '../pages/History';
import '@testing-library/jest-dom/extend-expect'
afterEach(cleanup);

const transactions = [
  {
    addedBy: "1234@test",
    amount: 5,
    date: "2020-10-02T15:52:39.226Z",
    item: "C settled up: ",
    lender: "Babe",
    split: -1,
    __v: 0,
    _id: "5f75fb47f11dc559c775e8s09",

  },
  {
    addedBy: "1234@test",
    amount: 5,
    date: "2020-10-01T15:52:39.226Z",
    item: "C settled up: ",
    lender: "Babe",
    split: -1,
    __v: 0,
    _id: "5f75fb47f11dc559c775e809",

  },
  {
    addedBy: "1234@test",
    amount: 10,
    date: "2020-10-01T15:52:26.074Z",
    item: "dinner",
    lender: "123@test",
    split: 50,
    __v: 0,
    _id: "5f75fb3af11dc559c775e808",

  },
  {
    addedBy: "1234@test",
    amount: 10,
    date: "2020-10-01T13:58:52.542Z",
    item: "C settled up: ",
    lender: "Babe",
    split: -1,
    __v: 0,
    _id: "5f75e09cdd559746a01dda57",
  },
  {
    addedBy: "1234@test",
    amount: 20,
    date: "2020-10-01T13:58:35.235Z",
    item: "dinner",
    lender: "123@test",
    split: 50,
    __v: 0,
    _id: "5f75e08bdd559746a01dda56",
  }
];

const users =
{
  _id: "5f75e077dd559746a01dda55",
  lead: "C",
  leadEmail: "1234@test",
  partner: "M",
  partnerEmail: "123@test"
};
const currency = '£';

describe('History', () => {
  it('displays current partner & lead', async () => {
    render(<History transactions={transactions} users={users} currency={currency} />);
    expect(screen.getByTestId('usersLead')).toBeInTheDocument();
    expect(screen.getByTestId('usersLead')).toHaveTextContent("C");
    expect(screen.getByTestId('usersPartner')).toHaveTextContent("M");
  })
  it('correctly displays number of transactions', async () => {
    render(<History transactions={transactions} users={users} currency={currency} />);
    expect(await screen.findAllByRole("transaction")).toHaveLength(transactions.length);
  })
  it('If no transactions, render page correctly', async () => {
    render(<History transactions={[]} users={users} currency={currency} />);
    expect(await screen.getByText('No transactions... yet.')).toBeInTheDocument();
  })

  it('Transactions are rendered in correct date order', async () => {
    render(<History transactions={transactions} users={users} currency={currency} />);
    const trans = await screen.findAllByRole("transaction");
    expect(trans[0]).toHaveTextContent('Friday, Oct 2nd');

    })
});
