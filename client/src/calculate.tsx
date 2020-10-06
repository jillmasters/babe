/**
 * Calculate thes amount owed by reducing down transaction information
 */
import {Users, Transaction} from './interfaces'

const summariseTransactions = (transactions: Transaction[], users: Users) => { // define output of function '' empty string to be string
  if (transactions) {
    const balance: number = transactions.reduce((acc, transaction) => {
      if (transaction.lender === users.leadEmail)
        return acc + (transaction.amount * (100 - transaction.split)) / 100;
      else if (transaction.lender === users.partnerEmail)
        return acc - transaction.amount * (transaction.split / 100);
      else {
        const remaining = transaction.amount * transaction.split;
        return acc - remaining;
      }
    }, 0);
    const overallLender: string = balance > 0 ? users.lead : users.partner;
    const totalOwed: number = Math.abs(Math.round(balance));
    return { balance, totalOwed, overallLender };
  }
  return {
    balance: 0,
    totalOwed: 0,
    overallLender: '-',
  };
};

export default summariseTransactions;
