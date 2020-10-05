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
  SliderLabel,
  DeleteButton,
} from '../theme';

import TransactionService from '../services/TransactionService';
const moment = require('moment');

const Inspect = ({ _id, users, currency, setTransactions, setIsLoading }) => {
  const [item, setItem] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [lender, setLender] = useState('');
  const [split, setSplit] = useState('');

  useEffect(() => {
    TransactionService.getOneTransaction(_id)
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
    TransactionService.editTransaction(_id, transaction)
      .then(() => TransactionService.getTransactions(users._id))
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
    const addedBy = users.leadEmail;
    const editedTransaction = { item, amount, date, lender, split, addedBy };
    saveTransaction(editedTransaction);
    setIsLoading(true);
    navigate('/');
  };

  const deleteFromDatabase = _id => {
    TransactionService.deleteTransaction(_id)
      .then(() => TransactionService.getTransactions(users._id))
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
        <FormSection role='bill-item'>
          <FormLabel htmlFor="bill-item">What was it for?</FormLabel>
          <FormInput
            type="text"
            name="bill-item"
            aria-label="bill-item"
            onChange={event => setItem(event.target.value)}
            value={item}
            required
          />
        </FormSection>
        <FormSection role="bill-amount">
          <FormLabel htmlFor="bill-amount">How much?</FormLabel>
          <span>{currency}</span>
          <FormInput
            type="number"
            min="0"
            step="0.01"
            name="bill-amount"
            aria-label="bill-amount"
            onChange={event => setAmount(event.target.value)}
            value={amount}
            required
          />
        </FormSection>
        <FormSection role="bill-date">
          <FormLabel htmlFor="bill-date">When was it?</FormLabel>
          <FormInput
            type="date"
            max={moment(new Date()).format('YYYY-MM-DD')}
            name="bill-date"
            aria-label="bill-date"
            onChange={event => setDate(event.target.value)}
            value={date}
            required
          />
        </FormSection>
        <FormSection onChange={event => setLender(event.target.value)}>
          <FormRadio
            type="radio"
            name="bill-lender"
            value={users.leadEmail}
            aria-label="bill-lender-lead-radio"
            required
            defaultChecked={lender === users.leadEmail ? 'true' : null}
          />
          <FormLabel htmlFor="bill-lender">I paid</FormLabel>
          <FormRadio
            type="radio"
            name="bill-lender"
            value={users.partnerEmail}
            aria-label="bill-lender-partner-radio"
            required
            defaultChecked={lender === users.partnerEmail ? 'true' : null}
          />
          <FormLabel htmlFor="bill-lender">{users.partner} paid</FormLabel>
        </FormSection>
        <FormSection>
          <SliderLabel htmlFor="bill-proportion">
            {split}% mine, {100 - split}% {users.partner}&apos;s
          </SliderLabel>
          <FormSlider
            type="range"
            name="bill-proportion"
            aria-label="bill-proportion-slider"
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
          <DeleteButton type="submit" role="deleteTrans">
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
