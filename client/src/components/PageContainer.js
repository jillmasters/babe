/** @jsx jsx */
/*eslint-disable-next-line no-unused-vars*/
import React from 'react';
import { Router } from '@reach/router';
import { jsx, css } from '@emotion/core';

// IMPORT PAGES
import Dashboard from '../pages/Dashboard';
import Bills from '../pages/Bills';
import SettleUp from '../pages/SettleUp';
import History from '../pages/History';
import Login from '../pages/Login';
import Settings from '../pages/Settings';

export default function PageContainer({
  users,
  transactions,
  currency,
  setTransactions,
}) {
  return (
    <Router
      css={css`
        ${'' /* margin-top: 15vw; */}
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
      />
      <Bills
        path="/bills"
        users={users}
        currency={currency}
        setTransactions={setTransactions}
      />
      <SettleUp path="/settle-up" />
      <History
        path="/history"
        transactions={transactions}
        currency={currency}
        users={users}
      />
      <Login path="/login" />
      <Settings path="/settings" />
    </Router>
  );
}
