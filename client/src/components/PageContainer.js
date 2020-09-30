/** @jsx jsx */
/*eslint-disable-next-line no-unused-vars*/
import React from 'react';
import { Router } from '@reach/router';
import { jsx, css } from '@emotion/core';

// IMPORT PAGES
import Dashboard from '../pages/Dashboard';
import Transactions from '../pages/Transactions';
import CallItEven from '../pages/CallItEven';
import SettleUp from '../pages/SettleUp';
import History from '../pages/History';
import Inspect from '../pages/Inspect';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import SignUp from '../pages/SignUp';
import Settings from '../pages/Settings';
import About from '../pages/About';

export default function PageContainer({
  users,
  setUsers,
  transactions,
  setTransactions,
  currency,
  setCurrency,
  summary,
  isAuthenticated,
  setIsAuthenticated,
  setIsLoading,
}) {
  return (
    <Router
      css={css`
        width: 100vw;
        padding: 0 5vw;
        flex: 1;
      `}
    >
      <About path="/about" />
      <Dashboard
        path="/"
        users={users}
        currency={currency}
        summary={summary}
        isAuthenticated={isAuthenticated}
        setIsLoading={setIsLoading}
      />
      <Transactions
        path="/transactions"
        users={users}
        currency={currency}
        setTransactions={setTransactions}
        isAuthenticated={isAuthenticated}
        setIsLoading={setIsLoading}
      />
      <CallItEven
        path="/call-it-even"
        summary={summary}
        users={users}
        currency={currency}
        setTransactions={setTransactions}
        isAuthenticated={isAuthenticated}
        setIsLoading={setIsLoading}
      />
      <SettleUp
        path="/settle-up"
        summary={summary}
        users={users}
        currency={currency}
        setTransactions={setTransactions}
        isAuthenticated={isAuthenticated}
        setIsLoading={setIsLoading}
      />
      <History
        path="/history"
        transactions={transactions}
        currency={currency}
        users={users}
        isAuthenticated={isAuthenticated}
      />
      <Inspect
        path="/transactions/:_id"
        users={users}
        currency={currency}
        setTransactions={setTransactions}
        isAuthenticated={isAuthenticated}
        setIsLoading={setIsLoading}
      />
      <Settings
        path="/settings"
        currency={currency}
        setCurrency={setCurrency}
        users={users}
        setUsers={setUsers}
        setTransactions={setTransactions}
        isAuthenticated={isAuthenticated}
        setIsLoading={setIsLoading}
      />
      <Login
        path="/login"
        setIsAuthenticated={setIsAuthenticated}
        setIsLoading={setIsLoading}
      />
      <Logout
        path="/logout"
        setIsAuthenticated={setIsAuthenticated}
        setIsLoading={setIsLoading}
      />
      <SignUp
        path="/sign-up"
        setIsAuthenticated={setIsAuthenticated}
        setIsLoading={setIsLoading}
      />
    </Router>
  );
}
