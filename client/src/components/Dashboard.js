/** @jsx jsx */
import React from 'react';
import { Link } from '@reach/router';
import { jsx, css } from '@emotion/core';

export default function Dashboard({ users, currency, transactions }) {
  // reduce transactions into overall balance
  const balance = transactions.reduce((acc, transaction) => {
    if (transaction.lender === users.lead) return acc + transaction.amount;
    else return acc - transaction.amount;
  }, 0);

  // determine overall lender
  const overallLender = balance > 0 ? users.lead : users.partner;

  // calculate amount owed to overall lender
  const totalOwed = Math.abs(Math.round(balance));

  return (
    <section
      css={css`
        min-height: 90%;
        width: 100%;
        padding: 10% 0
        flex: 2 1 auto;
        border-radius: 0 0 50px 50px;
        border: solid #f1faee thick;
        border-top: none;
        background: #457b9d;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          flex: 1 1 auto;
          font-size: 6vw;
          margin: auto;
          display: flex;
          align-items: center;
          text-align: center;
          max-width: 80%;
          max-height: 30%;
          padding: 5% 0;
        `}
      >
        <h2>
          {/* add an if clause if nothing is owed either way */}
          {overallLender} gets {currency}
          {totalOwed}
        </h2>
      </div>
      <div
        css={css`
          flex: 1 1 auto;
          display: flex;
          width: 100%;
          max-height: 30%
          align-items: center;
          justify-content: space-evenly;
          padding: 5% 0;
        `}
      >
        <button>
          <Link to="/bills">Split A Bill</Link>
        </button>
        <button>
          <Link to="/settle-up">
            {users.lead === overallLender ? 'Call It Even' : 'Settle Up'}
          </Link>
        </button>
      </div>
    </section>
  );
}
