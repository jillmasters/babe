import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dashboard from './Dashboard';
require('jest-canvas-mock');

const USER_NAME = 'joe';

const mockSummary = {
  totalOwed: 2,
  overallLender: USER_NAME,
};
const mockUsers = {
  partner: 'john',
};
const mockCurrency = '$';

test('Show login page when not authenticated', () => {
  render(
    <Dashboard
      summary={mockSummary}
      users={mockUsers}
      currency={mockCurrency}
      isAuthenticated={false}
    />,
  );

  expect(
    screen.getByText('Sign up or login to get started'),
  ).toBeInTheDocument();
  expect(screen.queryByText('Split A Bill')).not.toBeInTheDocument();
});

test('Show main dashboard when logged in', () => {
  render(
    <Dashboard
      summary={mockSummary}
      users={mockUsers}
      current={mockCurrency}
      isAuthenticated={true}
    />,
  );

  expect(
    screen.queryByText('Sign up or login to get started'),
  ).not.toBeInTheDocument();
  expect(screen.getByText('Split A Bill')).toBeInTheDocument();
});

test('Show Call It Even button when user owes money', () => {
  render(
    <Dashboard
      summary={mockSummary}
      users={mockUsers}
      currency={mockCurrency}
      isAuthenticated={true}
    />,
  );

  expect(screen.getByText(/joe\s*gets\s*\$\s*2/)).toBeInTheDocument();

  // if total owed > 0, and user.partner != summary.overallLender then call-it-even
  expect(screen.getByText('Call It Even')).toBeInTheDocument();
});

test('Show Settle Up button when user is owed money', () => {
  render(
    <Dashboard
      summary={mockSummary}
      users={{
        partner: USER_NAME,
      }}
      currency={mockCurrency}
      isAuthenticated={true}
    />,
  );

  // if total owed > 0, and user.partner == summary.overallLender then show settle up
  expect(screen.getByText('Settle Up')).toBeInTheDocument();
});
test('Correct elements show when no money is owed', () => {
  render(
    <Dashboard
      summary={{
        totalOwed: 0,
        overallLender: USER_NAME,
      }}
      users={{
        partner: USER_NAME,
      }}
      currency={mockCurrency}
      isAuthenticated={true}
    />,
  );

  expect(
    screen.getByText(/You and \s*joe\s* are all square/),
  ).toBeInTheDocument();

  expect(screen.queryByText('Settle Up')).not.toBeInTheDocument();
  expect(screen.queryByText('Call It Even')).not.toBeInTheDocument();
});
