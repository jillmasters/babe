/** @jsx jsx */
import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Global, jsx, css } from '@emotion/core';

// GET COMPONENTS
import Header from './components/Header';
import Dashboard from './components/Dashboard';

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
    <div>
      <Global
        styles={css`
        * {
          box-sizing: border-box;
          margin: 0;
        }

        * + * {
          margin-top: 1rem;
        }

        html,
        body {
          margin: 0;
          color: #fff;
          overflow-y: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
          font-size: 18px;
          line-height: 1.4;
          }

          > div {
            margin-top: 0;
          }

          h1, h2, h3, h4, h5, h6 {
            font-family: 'Poppins';
            font-style: italic;
            font-weight: 200;
            line-height: 1.1;

            + * {
              margin-top: 0.5rem;
            }
          }

          h1 {
          font-family: 'Contrail One';
          font-size: 50px;
          color: #ffc971;
          }

          strong {
            color: #e27396;
          }

          button {
            border-radius: 30px;
            border: solid thin #fff;
            font-family: 'Poppins';
            font-weight: 400;
            font-size: 16px;
            background: #ff9f1c;
            color: #fff;
            padding: 2rem;
          }

        }
      `}
      />
      <Helmet>
        <html lang="en" />
        <title>Babe</title>
        <meta
          name="description"
          content="Fast, unfussy bill-splitting for couples"
        />
      </Helmet>
      <main
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 2rem auto 4rem;
          width: 90vw;
          min-width: 550px;
          height: 90vh;
          min-height: 550px;
          background: #fff;
          padding: 5vw;
        `}
      >
        <Header />
        <Dashboard
          users={users}
          transactions={transactions}
          currency={currency}
        />
      </main>
    </div>
  );
}

export default App;
