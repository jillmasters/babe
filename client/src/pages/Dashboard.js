/** @jsx jsx */
/*eslint-disable-next-line no-unused-vars*/
import React from 'react';
import { Link } from '@reach/router';
import { jsx, css } from '@emotion/core';
import { MainView } from '../theme';

export default function Dashboard({ users, currency, transactions }) {
  // reduce transactions into overall balance
  const balance = transactions.reduce((acc, transaction) => {
    if (transaction.lender === users.lead)
      return acc + (transaction.amount * (100 - transaction.split)) / 100;
    else return acc - (transaction.amount * (100 - transaction.split)) / 100;
  }, 0);

  // determine overall lender
  const overallLender = balance > 0 ? users.lead : users.partner;

  // calculate amount owed to overall lender
  const totalOwed = Math.abs(Math.round(balance));

  return (
    <MainView>
      <div
        css={css`
          flex: 1 1 auto;
          font-size: 3vh;
          margin: auto;
          display: flex;
          align-items: center;
          text-align: center;
          max-width: 80%;
          height: 40vh;
        `}
      >
        {totalOwed > 0 ? (
          <div>
            <figure>
              <span role="img" aria-label="cartwheel emoji">
                🤸🏼
              </span>
            </figure>
            <h2>
              {overallLender} gets {currency}
              {totalOwed}
            </h2>
          </div>
        ) : (
          <h2>
            Welcome, {users.lead}!<br />
            <br /> You and {users.partner} are all square.
          </h2>
        )}
      </div>
      <div
        css={css`
          flex: 1 1 auto;
          display: flex;
          width: 100%;
          height: 20vh;
          align-items: center;
          justify-content: space-evenly;
        `}
      >
        <Link to="/bills">
          <button>Split A Bill</button>
        </Link>
        <Link to="/settle-up">
          <button>
            {users.lead === overallLender ? 'Call It Even' : 'Settle Up'}
          </button>
        </Link>
      </div>
    </MainView>
  );
}
