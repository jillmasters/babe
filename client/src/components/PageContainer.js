/** @jsx jsx */
/*eslint-disable-next-line no-unused-vars*/
import React from 'react';
import { Router } from '@reach/router';
import { jsx, css } from '@emotion/core';

// IMPORT PAGES
import Dashboard from '../pages/Dashboard';
import Bills from '../pages/Bills';
import CallItEven from '../pages/CallItEven';
import SettleUp from '../pages/SettleUp';
import History from '../pages/History';
import Login from '../pages/Login';
import Settings from '../pages/Settings';

export default function PageContainer({
  users,
  setUsers,
  transactions,
  setTransactions,
  currency,
  setCurrency,
  summary,
}) {
  return (
    <Router
      css={css`
        width: 100vw;
        padding: 0 5vw;
        flex: 1;
      `}
    >
      <Dashboard
        path="/"
        users={users}
        transactions={transactions}
        currency={currency}
        summary={summary}
      />
      <Bills
        path="/bills"
        users={users}
        currency={currency}
        setTransactions={setTransactions}
      />
      <CallItEven
        path="/call-it-even"
        summary={summary}
        users={users}
        currency={currency}
        setTransactions={setTransactions}
      />
      <SettleUp
        path="/settle-up"
        summary={summary}
        users={users}
        currency={currency}
        setTransactions={setTransactions}
      />
      <History
        path="/history"
        transactions={transactions}
        currency={currency}
        users={users}
      />
      <Login path="/login" />
      <Settings
        path="/settings"
        currency={currency}
        setCurrency={setCurrency}
        users={users}
        setUsers={setUsers}
      />
    </Router>
  );
}
