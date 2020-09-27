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
        <span role="img" aria-label="flying cash emoji">
          💸
        </span>
        Past transactions
        <span role="img" aria-label="flying cash emoji">
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
          <section
            key={transaction._id}
            css={css`
              display: flex;
              flex-direction: column;
              width: 100%;
              height: 100%;
            `}
          >
            <div
              css={css`
                position: relative;
                border: none;
                border-radius: 20px;
                margin: 10px;
                padding: 10px 50px 10px 20px;
                text-align: ${
                  transaction.lender === 'Babe' ? 'center' : 'left'
                };
                width: ${
                  transaction.lender === 'Babe' ? 'calc(100% - 20px)' : '70%'
                };
                color: ${
                  transaction.lender === 'Babe'
                    ? colors.mid
                    : transaction.lender === users.lead
                    ? colors.dark
                    : colors.white
                };
                background: ${
                  transaction.lender === 'Babe'
                    ? colors.pale
                    : transaction.lender === users.lead
                    ? colors.white
                    : colors.dark
                };
                align-self: ${
                  transaction.lender === users.lead ? 'flex-end' : 'flex-start'
                };

                &::after {
                  content: "🧐";
                  font-size: 3.5vh;
                  position: absolute;
                  top: calc(45% - (3.5vh / 2));
                  right: 6%;
                  opacity: 0;
                  transition: opacity 0.5s ease-out;
              }

              &:hover {
                  &::after {
                      transition: opacity 2s ease-in;
                      opacity: 1;
              }
              `}
            >
              <time>
                Added{' '}
                <strong>
                  {moment(transaction.date).format('dddd, MMM Do')}
                </strong>
              </time>
              <p>
                {transaction.item} &rarr;{' '}
                <strong>
                  {currency}
                  {transaction.amount.toFixed(2)}
                </strong>
              </p>
            </div>
          </section>
        ))}
    </MainView>
  );
};

// if (transaction.lender = users.lead || users.partner) && isSelected

export default History;
