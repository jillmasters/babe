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
      <div
        css={css`
          font-size: 1.5vh;
          width: 90%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <p>{users.partner}</p>
        <p>{users.lead}</p>
      </div>
      {transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(transaction => (
          <div
            key={transaction._id}
            css={css`
              border: none;
              border-radius: 20px;
              margin: 10px;
              padding: 10px 20px;
              width: ${transaction.lender === 'Babe'
                ? 'calc(100% - 20px)'
                : '70%'};
              color: ${transaction.lender === 'Babe'
                ? colors.mid
                : transaction.lender === users.lead
                ? colors.dark
                : colors.white};
              background: ${transaction.lender === 'Babe'
                ? colors.pale
                : transaction.lender === users.lead
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
