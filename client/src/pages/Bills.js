/** @jsx jsx */
/*eslint-disable-next-line no-unused-vars*/
import React, { useState } from 'react';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';

import APIService from '../services/APIService';

const Bills = ({ users, currency, setTransactions }) => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [lender, setLender] = useState('');
  // need to add percentage splitter

  // NOT SURE IF THIS IS WORKING
  const saveTransaction = transaction => {
    APIService.postTransaction(transaction).catch(error => {
      console.log('---> error posting transaction to API', error); // eslint-disable-line no-console
    });
  };

  const submitBill = event => {
    event.preventDefault();
    const date = new Date().toDateString();
    const newTransaction = { item, amount, date, lender };
    saveTransaction(newTransaction);
    setItem('');
    setAmount('');
    setLender('');
  };

  const FormLabel = styled('label')`
    color: #f1faee;
    font-size: 3vw;
    line-height: 1.4;
    padding: 1em;
  `;

  const FormInput = styled('input')`
    background: #f1faee;
    font-family: 'Poppins';
    font-size: 3vw;
    border: none;
    padding: 0.25em;
  `;

  const FormSection = styled('div')`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 2rem;
  `;

  return (
    <section
      css={css`
        min-height: 90%;
        width: 100%;
        padding: 10% 0
        flex: 2 1 auto;
        border-radius: 0 0 50px 50px;
        border: solid #f1faee thick;
        border-top: none;
        background: #457b9d;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      `}
    >
      <form onSubmit={submitBill}>
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
          <FormInput
            type="radio"
            name="billLender"
            value={users.lead}
            css={css`
              transform: scale(3);
            `}
            required
          />
          <FormLabel htmlFor="billLender">I paid</FormLabel>
          <FormInput
            type="radio"
            name="billLender"
            value={users.partner}
            css={css`
              transform: scale(3);
            `}
          />
          <FormLabel htmlFor="billLender">{users.partner} paid</FormLabel>
        </FormSection>
        <FormSection>
          <button
            type="submit"
            css={css`
              color: #f1faee;
              font-family: 'Poppins';
              font-size: 3vw;
              line-height: 1;
              width: 100%;
            `}
          >
            Split
          </button>
        </FormSection>
      </form>
    </section>
  );
};

export default Bills;
