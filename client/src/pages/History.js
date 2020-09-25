/*eslint-disable-next-line no-unused-vars*/
import React from 'react';
import { MainView } from '../theme';

const moment = require('moment');

const History = ({ currency, transactions }) => {
  return (
    <MainView>
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
    </MainView>
  );
};

export default History;
