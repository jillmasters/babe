/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';

export default function Dashboard({ users, currency, transactions }) {
  // reduce transactions into overall balance
  const balance = transactions.reduce((acc, transaction) => {
    if (transaction.lender === users.lead) return acc + transaction.amount;
    if (transaction.lender === users.partner) return acc - transaction.amount;
  }, 0);

  // determine overall lender
  const overallLender = balance > 0 ? users.lead : users.partner;

  // calculate amount owed to overall lender
  const totalOwed = Math.abs(Math.round(balance));

  return (
    <div
      css={css`
        flex: 5;
        width: 100%;
        border-radius: 0 0 30px 30px;
        background: #457b9d;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <div
        css={css`
          flex: 1;
          font-size: 4rem;
          margin: auto;
          display flex;
          align-items: center;
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
          flex: 1;
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-evenly;
          * {
            margin-top: 0px;
          }
        `}
      >
        <button>Split A Bill</button>
        <button>Call It Even</button>
      </div>
    </div>
  );
}
