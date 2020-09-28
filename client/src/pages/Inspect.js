/*eslint-disable-next-line no-unused-vars*/
import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import {
  MainView,
  FormLabel,
  FormInput,
  FormRadio,
  FormButton,
  FormSection,
  FormSlider,
  DeleteButton,
} from '../theme';

import APIService from '../services/APIService';
const moment = require('moment');

const Inspect = ({ _id, users, currency, setTransactions }) => {
  const [item, setItem] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [lender, setLender] = useState('');
  const [split, setSplit] = useState('');

  useEffect(() => {
    APIService.getOneTransaction(_id)
      .then(dbTransaction => {
        const { item, date, amount, lender, split } = dbTransaction;
        setItem(item);
        setDate(moment(date).format('YYYY-MM-DD'));
        setAmount(amount.toFixed(2));
        setLender(lender);
        setSplit(split);
      })
      .catch(error => console.log('---> Error loading transaction', error)); // eslint-disable-line no-console
  }, [_id]);

  const saveTransaction = transaction => {
    APIService.editTransaction(_id, transaction)
      .then(() => APIService.getTransactions())
      .then(allTransactions => setTransactions(allTransactions))
      .catch(error =>
        // eslint-disable-next-line no-console
        console.log(
          '---> Error editing transaction and reloading local listing',
          error,
        ),
      );
  };

  const submit = event => {
    event.preventDefault();
    const editedTransaction = { item, amount, date, lender, split };
    saveTransaction(editedTransaction);
    navigate('/');
  };

  const deleteFromDatabase = _id => {
    APIService.deleteTransaction(_id)
      .then(() => APIService.getTransactions())
      .then(allTransactions => setTransactions(allTransactions))
      .catch(error =>
        // eslint-disable-next-line no-console
        console.log(
          '---> Error deleting transaction and reloading local listing',
          error,
        ),
      );
  };

  const deleteMe = event => {
    event.preventDefault();
    deleteFromDatabase(_id);
    navigate('/');
  };

  return (
    <MainView>
      <h4>
        <span role="img" aria-label="inspector emoji">
          🧐
        </span>
        Inspect a bill
        <span role="img" aria-label="inspector emoji">
          🧐
        </span>
      </h4>
      <form onSubmit={submit}>
        <FormSection>
          <FormLabel htmlFor="bill-item">What was it for?</FormLabel>
          <FormInput
            type="text"
            name="bill-item"
            onChange={event => setItem(event.target.value)}
            value={item}
            required
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="bill-amount">How much?</FormLabel>
          <span>{currency}</span>
          <FormInput
            type="number"
            min="0"
            step="0.01"
            name="bill-amount"
            onChange={event => setAmount(event.target.value)}
            value={amount}
            required
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="bill-date">When was it?</FormLabel>
          <FormInput
            type="date"
            max={moment(new Date()).format('YYYY-MM-DD')}
            name="bill-date"
            onChange={event => setDate(event.target.value)}
            value={date}
            required
          />
        </FormSection>
        <FormSection onChange={event => setLender(event.target.value)}>
          <FormRadio
            type="radio"
            name="bill-lender"
            value={users.lead}
            required
            defaultChecked={lender === users.lead ? 'true' : null}
          />
          <FormLabel htmlFor="bill-lender">I paid</FormLabel>
          <FormRadio
            type="radio"
            name="bill-lender"
            value={users.partner}
            required
            defaultChecked={lender === users.partner ? 'true' : null}
          />
          <FormLabel htmlFor="bill-lender">{users.partner} paid</FormLabel>
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="bill-proportion">
            {split}% mine, {100 - split}% {users.partner}&apos;s
          </FormLabel>
          <FormSlider
            type="range"
            name="bill-proportion"
            min="0"
            max="100"
            step="10"
            value={split}
            onChange={event => setSplit(event.target.value)}
          />
        </FormSection>
        <FormSection>
          <FormButton type="submit">Save my edits</FormButton>
        </FormSection>
      </form>
      <form onSubmit={deleteMe}>
        <FormSection>
          <DeleteButton type="submit">
            <span role="img" aria-label="trash emoji">
              🗑
            </span>
          </DeleteButton>
        </FormSection>
      </form>
    </MainView>
  );
};

export default Inspect;
