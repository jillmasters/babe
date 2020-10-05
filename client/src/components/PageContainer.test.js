import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Router,
  Link,
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router';
import '@testing-library/jest-dom/extend-expect';

import PageContainer from './PageContainer';
import Inspect from '../pages/Inspect';
import Transactions from '../pages/Transactions';

// 
import TransactionService from '../services/TransactionService';
jest.mock('../services/TransactionService.js');

// this is a handy function that I would utilize for any component
// that relies on the router being in context
function renderWithRouter(
  ui,
  { route = '/', history = createHistory(createMemorySource(route)) } = {},
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

const transactions = [
  {
    addedBy: '1234@test',
    amount: 5,
    date: '2020-10-02T15:52:39.226Z',
    item: 'C settled up: ',
    lender: 'Chris',
    split: -1,
    __v: 0,
    _id: '5f75fb47f11dc559c775e8s09',
  },
  {
    addedBy: '1234@test',
    amount: 5,
    date: '2020-10-01T15:52:39.226Z',
    item: 'C settled up: ',
    lender: 'Babe',
    split: -1,
    __v: 0,
    _id: '5f75fb47f11dc559c775e809',
  },
  {
    addedBy: '1234@test',
    amount: 10,
    date: '2020-10-01T15:52:26.074Z',
    item: 'dinner',
    lender: '123@test',
    split: 50,
    __v: 0,
    _id: '5f75fb3af11dc559c775e808',
  },
  {
    addedBy: '1234@test',
    amount: 10,
    date: '2020-10-01T13:58:52.542Z',
    item: 'C settled up: ',
    lender: 'Babe',
    split: -1,
    __v: 0,
    _id: '5f75e09cdd559746a01dda57',
  },
  {
    addedBy: '1234@test',
    amount: 20,
    date: '2020-10-01T13:58:35.235Z',
    item: 'dinner',
    lender: '123@test',
    split: 50,
    __v: 0,
    _id: '5f75e08bdd559746a01dda56',
  },
];

const users = {
  _id: '5f75e077dd559746a01dda55',
  lead: 'C',
  leadEmail: '1234@test',
  partner: 'M',
  partnerEmail: '123@test',
};

const summary = {
  totalOwed: 0,
  overallLender: 'C',
};

const setIsLoadingMock = jest.fn(() => {});
const setIsAuthenticated = jest.fn(() => {});
const setCurrencyMock = jest.fn(() => {});
const setTransactionsMock = jest.fn(() => {});
const setUsersMock = jest.fn(() => {});

test('full app rendering/navigating', async () => {
  const {
    container,
    history: { navigate },
  } = renderWithRouter(
    <PageContainer
      summary={summary}
      users={users}
      setUsers={setUsersMock}
      transactions={transactions}
      setTransactions={setTransactionsMock}
      currency="$"
      setCurrency={setCurrencyMock}
      isAuthenticated={true}
      setIsAuthenticated={setIsAuthenticated}
      setIsLoading={setIsLoadingMock}
    />,
  );

  // TODO: Why doesn't this work with container.dataset.testid
  // 'dashboard' component is nested within another div for some reason
  expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  expect(screen.queryByTestId('about')).not.toBeInTheDocument();

  await navigate('/about');
  expect(screen.getByTestId('about')).toBeInTheDocument();

  await navigate('/transactions');
  expect(screen.getByTestId('transactions')).toBeInTheDocument();

  await navigate('/call-it-even');
  expect(screen.getByTestId('callItEven')).toBeInTheDocument();

  await navigate('/settle-up');
  expect(screen.getByTestId('settleUp')).toBeInTheDocument();

  await navigate('/history');
  expect(screen.getByTestId('history')).toBeInTheDocument();

  await navigate('/settings');
  expect(screen.getByTestId('settings')).toBeInTheDocument();

  await navigate('/login');
  expect(screen.getByTestId('login')).toBeInTheDocument();

  await navigate('/logout');
  expect(screen.getByTestId('logout')).toBeInTheDocument();

  await navigate('/sign-up');
  expect(screen.getByTestId('signUp')).toBeInTheDocument();

  await navigate('/transactions/123'); //Test for actually using the id value in the Inspect component
  expect(screen.getByTestId('inspect')).toBeInTheDocument();
});

// render function with Router wrapper from @reach/router
// For routes with data
function renderWithRouterWrapper(
  ui,
  { route = '/', history = createHistory(createMemorySource(route)) } = {},
) {
  return {
    ...render(
      <LocationProvider history={history}>
        <Router>{ui}</Router>
      </LocationProvider>,
    ),
    history,
  };
}

test('test Inspect component route', async () => {
  TransactionService.getOneTransaction.mockResolvedValue(transactions[0]);
  const {
    container,
    history: { navigate },
  } = renderWithRouterWrapper(<Inspect path="/transactions/:_id" users={users} />, {
    // and pass the parameter value on the route config
    route: '/transactions/123'
  });

  expect(screen.getByTestId('inspect')).toBeInTheDocument();
});

//TODO test for unused route once error boundary is implemented
