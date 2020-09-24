/** @jsx jsx */
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { jsx, css } from '@emotion/core';

// GET COMPONENTS
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

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
];

function App() {
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
        <title>Babe</title>
        <meta
          name="description"
          content="Fast, unfussy bill-splitting for couples"
        />
      </Helmet>
      <Header />
      <Dashboard
        users={users}
        transactions={transactions}
        currency={currency}
      />
      <Footer
        css={css`
          justify-self: end;
        `}
      />
    </main>
  );
}

export default App;
