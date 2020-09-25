/*eslint-disable-next-line no-unused-vars*/
import React, { useState } from 'react';
import {
  MainView,
  FormLabel,
  FormInput,
  FormRadio,
  FormButton,
  FormSection,
} from '../theme';

import APIService from '../services/APIService';

const Bills = ({ users, currency, setTransactions }) => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [lender, setLender] = useState('');
  // need to add percentage splitter

  const saveTransaction = transaction => {
    APIService.postTransaction(transaction).catch(error => {
      throw Error('error posting transaction to database');
    });
  };

  const submit = event => {
    event.preventDefault();
    const date = new Date().toDateString();
    const newTransaction = { item, amount, date, lender };
    saveTransaction(newTransaction);
    setItem('');
    setAmount('');
    setLender('');
  };

  return (
    <MainView>
      <form onSubmit={submit}>
        <FormSection>
          <FormLabel htmlFor="billItem">What is it for?</FormLabel>
          <FormInput
            type="text"
            name="billItem"
            placeholder="Pints with Gesh 🍻"
            onChange={event => setItem(event.target.value)}
            value={item}
            required
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="billAmount">How much?</FormLabel>
          <span>{currency}</span>
          <FormInput
            type="number"
            min="0"
            step="0.01"
            placeholder="18.50"
            name="billAmount"
            onChange={event => setAmount(event.target.value)}
            value={amount}
            required
          />
        </FormSection>
        <FormSection onChange={event => setLender(event.target.value)}>
          <FormRadio
            type="radio"
            name="billLender"
            value={users.lead}
            required
          />
          <FormLabel htmlFor="billLender">I paid</FormLabel>
          <FormRadio type="radio" name="billLender" value={users.partner} />
          <FormLabel htmlFor="billLender">{users.partner} paid</FormLabel>
        </FormSection>
        <FormSection>
          <FormButton type="submit">Split</FormButton>
        </FormSection>
      </form>
    </MainView>
  );
};

export default Bills;
