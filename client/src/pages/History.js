/** @jsx jsx */
/*eslint-disable-next-line no-unused-vars*/
import React from 'react';
import { jsx, css } from '@emotion/core';
import { colors, MainView } from '../theme';

const moment = require('moment');

const History = ({ currency, transactions, users }) => {
  return (
    <MainView>
      <h4>
        <span role="img" aria-label="flying cash">
          💸
        </span>
        Past transactions
        <span role="img" aria-label="flying cash">
          💸
        </span>
      </h4>
      {transactions.map(transaction => (
        <div
          key={transaction._id}
          css={css`
            border: none;
            border-radius: 20px;
            margin: 10px;
            padding: 10px 20px;
            width: 70%;
            color: ${transaction.lender === users.lead
              ? colors.dark
              : colors.white};
            background: ${transaction.lender === users.lead
              ? colors.white
              : colors.dark};
            align-self: ${transaction.lender === users.lead
              ? 'flex-end'
              : 'flex-start'};
          `}
        >
          <time>
            Added{' '}
            <strong>{moment(transaction.date).format('dddd, MMM Do')}</strong>
          </time>
          <p>
            {transaction.item} &rarr;{' '}
            <strong>
              {currency}
              {transaction.amount.toFixed(2)}
            </strong>
          </p>
        </div>
      ))}
    </MainView>
  );
};

export default History;
