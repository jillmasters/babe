/** @jsx jsx */
/*eslint-disable-next-line no-unused-vars*/
import React from 'react';
import { jsx, css } from '@emotion/core';
import { colors, MainView, MainViewStatic } from '../theme';
import { Link, navigate } from '@reach/router';
import { Users, Transaction } from '../interfaces';
const moment = require('moment');

interface HistoryProps {
  currency: string;
  transactions: Transaction[];
  users: Users;
}

const History: React.FC<HistoryProps> = ({ currency, transactions, users }) => {
  function navigateToTransaction(transaction: Transaction) {
    if (transaction.lender !== 'Babe') {
      navigate(`/transactions/${transaction._id}`);
    }
  }
  return (
    <React.Fragment>
      {transactions.length !== 0 ? (
        <MainView data-testid="history">
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
              align-items: flex-start;
              justify-content: space-between;
            `}
          >
            <p data-testid="usersPartner">{users.partner}</p>
            <p data-testid="usersLead">{users.lead}</p>
          </div>
          {transactions
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .map((transaction: Transaction) => (
              <section
                data-testid="transaction"
                key={transaction._id}
                css={css`
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-start;
                  width: 100%;
                  height: 100%;
                `}
              >
                <div
                  data-testid="clickToEdit"
                  onClick={() => {
                    navigateToTransaction(transaction);
                  }}
                  css={css`
                    position: relative;
                    border: none;
                    border-radius: 20px;
                    margin: 10px;
                    padding: ${transaction.lender === 'Babe'
                      ? '10px 20px'
                      : '10px 50px 10px 20px'};
                    text-align: ${transaction.lender === 'Babe'
                      ? 'center'
                      : 'left'};
                    width: ${transaction.lender === 'Babe'
                      ? 'calc(100% - 20px)'
                      : '70%'};
                    color: ${transaction.lender === 'Babe'
                      ? colors.mid
                      : transaction.lender === users.leadEmail
                      ? colors.dark
                      : colors.white};
                    background: ${transaction.lender === 'Babe'
                      ? colors.pale
                      : transaction.lender === users.leadEmail
                      ? colors.white
                      : colors.dark};
                    align-self: ${transaction.lender === users.leadEmail
                      ? 'flex-end'
                      : 'flex-start'};

                    &::after {
                      content: ${transaction.lender === 'Babe' ? null : '"🧐"'};
                      font-size: 3.5vh;
                      position: absolute;
                      top: calc(45% - (3.5vh / 2));
                      right: 6%;
                      opacity: 0;
                      transition: opacity 0.5s ease-out;
                    }

                    &:hover {
                      &::after {
                        transition: opacity 1s ease-in;
                        opacity: 1;
                      }
                    }
                  `}
                >
                  <time>
                    Added{' '}
                    <strong>
                      {moment(transaction.date).format('dddd, MMM Do')}
                    </strong>
                  </time>
                  <p data-testid="transItem">
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
      ) : (
        <MainViewStatic>
          <h4>No transactions... yet.</h4>
          <Link to="/transactions">
            <button>Split your first bill</button>
          </Link>
        </MainViewStatic>
      )}
    </React.Fragment>
  );
};

export default History;
