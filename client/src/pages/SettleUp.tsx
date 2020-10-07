import React, { useState } from 'react';
import {
  MainViewStatic,
  FormSection,
  FormInput,
  FormLabel,
  FormButton,
} from '../theme';

import TransactionService from '../services/TransactionService';
import { navigate } from '@reach/router';

import { Transaction, Users, Summary } from '../interfaces';
// const moment = require('moment');

interface SettleUpProps {
  summary: Summary;
  currency: string;
  users: Users;
  setTransactions: Function;
  setIsLoading: Function;
}
const SettleUp: React.FC<SettleUpProps> = ({
  summary,
  currency,
  users,
  setTransactions,
  setIsLoading,
}) => {
  const [note, setNote] = useState('');

  const saveTransaction = (transaction: Transaction) => {
    TransactionService.postTransaction(transaction)
      .then(newTransaction =>
        setTransactions((oldTransactions: Transaction[]) => [
          ...oldTransactions,
          newTransaction,
        ]),
      )
      .catch(error => {
        throw Error('error posting transaction to database');
      });
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTransaction = {
      item: `${users.lead} settled up: ${note}`,
      amount: summary.totalOwed,
      date: new Date(Date.now()),
      lender: 'Babe',
      split: -1,
      addedBy: users.leadEmail,
    };
    saveTransaction(newTransaction);
    setNote('');
    setIsLoading(true);
    navigate('/');
  };
  return (
    <MainViewStatic data-testid="settleUp">
      <h4>
        <span role="img" aria-label="credit card emoji">
          💳
        </span>
        Settle up
        <span role="img" aria-label="credit card emoji">
          💳
        </span>
      </h4>
      <h2>
        You owe {users.partner} {currency}
        {summary.totalOwed}.
        <br />
        Click to get even.
      </h2>
      <form onSubmit={submit}>
        <FormSection>
          <FormLabel htmlFor="wipe-description">Leave a note:</FormLabel>
          <FormInput
            type="text"
            name="wipe-description"
            aria-label="wipe-description"
            placeholder="💰💰💰"
            onChange={event => setNote(event.target.value)}
            value={note}
          ></FormInput>
        </FormSection>
        <FormSection>
          <FormButton type="submit" aria-label="SettleUp">
            I&apos;ve paid {users.partner} back
          </FormButton>
        </FormSection>
      </form>
    </MainViewStatic>
  );
};

export default SettleUp;
