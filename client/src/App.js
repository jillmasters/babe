/** @jsx jsx */
import React, { useState } from 'react';
import { Router } from '@reach/router';
import Helmet from 'react-helmet';
import { jsx, css } from '@emotion/core';

// GET COMPONENTS
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Bills from './components/Bills';
import SettleUp from './components/SettleUp';
import About from './components/About';
import Login from './components/Login';
import Settings from './components/Settings';

// INITIAL STATES/MOCK DATA FOR TESTING
// need to set this at sign up
const initialUsers = { lead: 'Jill', partner: 'Sam' };
// this is a bandaid solution: need something more sustainable
const A = initialUsers.lead;
const B = initialUsers.partner;
// these will be added dynamically
const initialTransactions = [
  { lender: A, amount: 10 },
  { lender: B, amount: 3.2 },
  { lender: B, amount: 4.8 },
  { lender: B, amount: 16.95 },
];

function App() {
  // BRANDING
  const app = {
    name: 'Babe',
    description: 'Fast, unfussy bill-splitting for couples',
  };

  // SET STATE
  const [transactions, setTransactions] = useState(initialTransactions);
  const [users, setUsers] = useState(initialUsers);
  const [currency, setCurrency] = useState('£');

  // MASTER APP COMPONENT
  return (
    <main
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        width: 100vw;
        min-width: 300px;
        height: 100vh;
        min-height: 300px;
        background: #a8dadc;
        padding: 5vw 5vw 0 5vw;
      `}
    >
      <Helmet>
        <html lang="en" />
        <title>{app.name}</title>
        <meta name="description" content={app.description} />
      </Helmet>
      <Header
        app={app}
        css={css`
          justify-self: start;
        `}
      />
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
        />
        <Bills path="/bills" users={users} currency={currency} />
        <SettleUp path="/settle-up" />
        <About path="/about" />
        <Login path="/login" />
        <Settings path="/settings" />
      </Router>
      <Footer
        css={css`
          justify-self: end;
        `}
      />
    </main>
  );
}

export default App;
