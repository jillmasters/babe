import React from 'react';
import {
  MainViewStatic,
  FormSection,
  FormInput,
  FormLabel,
  FormButton,
} from '../theme';

const SettleUp = ({ summary, currency, users }) => {
  return (
    <MainViewStatic>
      <h4>Call it Even</h4>
      <h2>
        You owe {users.partner} {currency}
        {summary.totalOwed}.
        <br />
        <span role="img" aria-label="pointing down emoji">
          👇
        </span>{' '}
        Click to get even.
        <span role="img" aria-label="pointing down emoji">
          👇
        </span>
      </h2>
      <form>
        <FormSection>
          <FormLabel for="wipe-description">Leave a note:</FormLabel>
          <FormInput
            type="text"
            name="wipe-description"
            placeholder="💰💰💰"
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
