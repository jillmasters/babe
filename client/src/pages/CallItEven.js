/*eslint-disable-next-line no-unused-vars*/
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

const CallItEven = ({ summary, currency, users, setTransactions }) => {
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
      item: `${users.lead} called it even: ${note}`,
      amount: summary.totalOwed,
      date: new Date(),
      lender: 'Babe',
      split: 1,
    };
    saveTransaction(newTransaction);
    setNote('');
    navigate('/');
  };

  return (
    <MainViewStatic>
      <h4>Call it Even</h4>
      <h2>
        {users.partner} owes you {currency}
        {summary.totalOwed}.
        <br />
        Happy to call it even?
      </h2>
      <form onSubmit={submit}>
        <FormSection>
          <FormLabel for="wipe-description">Leave a note:</FormLabel>
          <FormInput
            type="text"
            name="wipe-description"
            placeholder="😘"
            onChange={event => setNote(event.target.value)}
            value={note}
          ></FormInput>
        </FormSection>
        <FormSection>
          <FormButton type="submit">
            Wipe that debt
            <span role="img" aria-label="handshake emoji">
              🤝
            </span>
          </FormButton>
        </FormSection>
      </form>
    </MainViewStatic>
  );
};

// SOMETHING BUGGY HAPPENING IN THE REDIRECT (TODO!)

export default CallItEven;
