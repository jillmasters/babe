/*eslint-disable-next-line no-unused-vars*/
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

const CallItEven = ({
  summary,
  currency,
  users,
  setTransactions,
  setIsLoading,
}) => {
  const [note, setNote] = useState('');

  const saveTransaction = transaction => {
    TransactionService.postTransaction(transaction)
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
      item: `${users.lead} called it even: ${note}`,
      amount: summary.totalOwed,
      date: new Date(),
      lender: 'Babe',
      split: 1,
      addedBy: users.leadEmail,
    };
    saveTransaction(newTransaction);
    setNote('');
    setIsLoading(true);
    navigate('/');
  };

  return (
    <MainViewStatic>
      <h4>
        <span role="img" aria-label="fistbump right emoji">
          🤜
        </span>
        Call it even
        <span role="img" aria-label="fistbump left emoji">
          🤛
        </span>
      </h4>
      <h2>
        {users.partner} owes you {currency}
        {summary.totalOwed}.
        <br />
        Happy to call it even?
      </h2>
      <form onSubmit={submit}>
        <FormSection>
          <FormLabel htmlFor="wipe-description">Leave a note:</FormLabel>
          <FormInput
            type="text"
            name="wipe-description"
            placeholder="😘"
            onChange={event => setNote(event.target.value)}
            value={note}
          ></FormInput>
        </FormSection>
        <FormSection>
          <FormButton type="submit">Wipe that debt</FormButton>
        </FormSection>
      </form>
    </MainViewStatic>
  );
};

export default CallItEven;
