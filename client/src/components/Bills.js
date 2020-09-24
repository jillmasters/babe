/** @jsx jsx */
import React, { useState } from 'react';
import { Link } from '@reach/router';
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';

const Bills = ({ users, currency }) => {
  const [item, setItem] = useState('');
  const [cost, setCost] = useState('');
  // need to add percentage splitter
  const [lender, setLender] = useState('');

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
      <form onSubmit={console.log('submitted')}>
        <FormSection>
          <FormLabel htmlFor="billItem">What is it for?</FormLabel>
          <FormInput
            type="text"
            name="billItem"
            placeholder="Pints with Gesh 🍻"
            onChange={(event) => setItem(event.target.value)}
            value={item}
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="billCost">How much?</FormLabel>
          <span>{currency}</span>
          <FormInput
            type="number"
            min="0"
            placeholder="18.50"
            name="billCost"
            onChange={(event) => setCost(event.target.value)}
            value={cost}
          />
        </FormSection>
        <FormSection onChange={(event) => setLender(event.target.value)}>
          <FormInput type="radio" name="billLender" value={lender} />
          <FormLabel htmlFor="billLender">I paid</FormLabel>
          <FormInput type="radio" name="billLender" value={lender} />
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
