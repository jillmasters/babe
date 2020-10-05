/*eslint-disable-next-line no-unused-vars*/
import React, { useState } from 'react';
import {
  MainView,
  FormLabel,
  FormInput,
  FormRadio,
  FormButton,
  FormSection,
  FormSlider,
  SliderLabel,
} from '../theme';

import TransactionService from '../services/TransactionService';
import { navigate } from '@reach/router';

const Transactions = ({
  users,
  currency,
  setTransactions,
  isLoading,
  setIsLoading,
}) => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [lender, setLender] = useState('');
  const [split, setSplit] = useState(50);

  const [isCustomising, setIsCustomising] = useState(false);

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
    const date = new Date(Date.now());
    const addedBy = users.leadEmail;
    const newTransaction = { item, amount, date, lender, split, addedBy };
    saveTransaction(newTransaction);
    setIsLoading(true);
    navigate('/');
  };

  return (
    <MainView data-testid="transactions">
      <h4>
        <span role="img" aria-label="cartwheel emoji">
          🤸🏼
        </span>
        Split a bill
        <span role="img" aria-label="cartwheel emoji">
          🤸🏼
        </span>
      </h4>
      <form onSubmit={submit}>
        <FormSection>
          <FormLabel htmlFor="bill-item">What is it for?</FormLabel>
          <FormInput
            type="text"
            name="bill-item"
            aria-label="bill-item"

            placeholder="Pints with Gesh 🍻"
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
            placeholder="18.50"
            aria-label="bill-amount"
            name="bill-amount"
            onChange={event => setAmount(event.target.value)}
            value={amount}
            required
          />
        </FormSection>
        <FormSection onChange={event => setLender(event.target.value)}>
          <FormRadio
            type="radio"
            name="bill-lender"
            value={users.leadEmail}
            required
            aria-label="bill-lender-lead-radio"
          />
          <FormLabel htmlFor="bill-lender">I paid</FormLabel>
          <FormRadio
            type="radio"
            name="bill-lender"
            value={users.partnerEmail}
            aria-label="bill-lender-partner-radio"
          />
          <FormLabel htmlFor="bill-lender">{users.partner} paid</FormLabel>
        </FormSection>
        <FormSection>
          <FormRadio
            type="radio"
            name="bill-split"
            value={false}
            onChange={() => setIsCustomising(!isCustomising)}
            defaultChecked
            required
            aria-label="bill-split-even-radio"
          />
          <FormLabel htmlFor="bill-lender">Half each</FormLabel>
          <FormRadio
            type="radio"
            name="bill-split"
            value={true}
            onChange={() => setIsCustomising(!isCustomising)}
            aria-label="bill-split-uneven-radio"
          />
          <FormLabel htmlFor="bill-lender">Customise</FormLabel>
        </FormSection>
        {isCustomising && (
          <FormSection>
            <SliderLabel htmlFor="bill-proportion">
              {split}% mine, {100 - split}% {users.partner}&apos;s
            </SliderLabel>
            <FormSlider
              type="range"
              name="bill-proportion"
              min="0"
              max="100"
              step="10"
              onChange={event => setSplit(event.target.value)}
              aria-label="bill-split-slider"
            />
          </FormSection>
        )}
        <FormSection>
          <FormButton type="submit">Split</FormButton>
        </FormSection>
      </form>
    </MainView>
  );
};

export default Transactions;
