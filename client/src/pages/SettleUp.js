import React, { useState } from 'react';
import {
  MainViewStatic,
  FormSection,
  FormInput,
  FormLabel,
  FormButton,
} from '../theme';

import APIService from '../services/APIService';
import { navigate } from '@reach/router';

const SettleUp = ({ summary, currency, users, setTransactions }) => {
  const [note, setNote] = useState('');

  const saveTransaction = transaction => {
    APIService.postTransaction(transaction)
      .then(newTransaction =>
        setTransactions(oldTransactions => [
          ...oldTransactions,
          newTransaction,
        ]),
      )
      .catch(error => {
        throw Error('error posting transaction to database');
      });
  };

  const submit = event => {
    event.preventDefault();
    const newTransaction = {
      item: `${users.lead} settled up: ${note}`,
      amount: summary.totalOwed,
      date: new Date(),
      lender: 'Babe',
      split: -1,
    };
    saveTransaction(newTransaction);
    setNote('');
    navigate('/');
  };
  return (
    <MainViewStatic>
      <h4>
        <span role="img" aria-label="credit card emoji">
          💳
        </span>
        Settle Up
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
            placeholder="💰💰💰"
            onChange={event => setNote(event.target.value)}
            value={note}
          ></FormInput>
        </FormSection>
        <FormSection>
          <FormButton type="submit">
            I&apos;ve paid {users.partner} back
          </FormButton>
        </FormSection>
      </form>
    </MainViewStatic>
  );
};

export default SettleUp;
