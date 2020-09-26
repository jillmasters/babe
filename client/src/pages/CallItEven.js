/*eslint-disable-next-line no-unused-vars*/
import React from 'react';

import {
  MainViewStatic,
  FormSection,
  FormInput,
  FormLabel,
  FormButton,
} from '../theme';

const CallItEven = ({ summary, currency, users }) => {
  return (
    <MainViewStatic>
      <h4>Call it Even</h4>
      <h2>
        {users.partner} owes you {currency}
        {summary.totalOwed}.
        <br />
        Happy to call it even?
      </h2>
      <form>
        <FormSection>
          <FormLabel for="wipe-description">Leave a note:</FormLabel>
          <FormInput
            type="text"
            name="wipe-description"
            placeholder="😘"
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
