/** @jsx jsx */
/*eslint-disable-next-line no-unused-vars*/
import React from 'react';
import { jsx, css } from '@emotion/core';

const moment = require('moment');

const History = ({ currency, transactions }) => {
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
        overflow-y: scroll;
      `}
    >
      <h2>Past transactions</h2>
      {transactions.map(transaction => (
        <div key={transaction._id}>
          <p>{moment(transaction.date).format('dddd, MMM Do')}</p>
          <p>
            {transaction.item}({currency}
            {transaction.amount.toFixed(2)})
          </p>
        </div>
      ))}
    </section>
  );
};

export default History;
