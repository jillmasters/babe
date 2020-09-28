import React, { useState } from 'react';
import {
  MainViewStatic,
  FormSection,
  FormInput,
  FormButton,
  FormLabel,
} from '../theme';

import { navigate } from '@reach/router';

const Settings = ({ users, setUsers, currency, setCurrency }) => {
  const [tempUser, setTempUser] = useState(users.lead);
  const [tempPartner, setTempPartner] = useState(users.partner);
  const [tempCurrency, setTempCurrency] = useState(currency);

  const submit = event => {
    event.preventDefault();
    const newUsers = { lead: tempUser, partner: tempPartner };
    setUsers(newUsers);
    setCurrency(tempCurrency);
    navigate('/');
  };

  return (
    <MainViewStatic>
      <h4>
        <span role="img" aria-label="tools emoji">
          🛠
        </span>
        Settings
        <span role="img" aria-label="tools emoji">
          🛠
        </span>
      </h4>
      <form onSubmit={submit}>
        <FormSection>
          <FormLabel htmlFor="user-lead">Your name:</FormLabel>
          <FormInput
            type="text"
            name="user-lead"
            value={tempUser}
            onChange={event => setTempUser(event.target.value)}
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="user-partner">Your partner:</FormLabel>
          <FormInput
            type="text"
            name="user-partner"
            value={tempPartner}
            onChange={event => setTempPartner(event.target.value)}
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="currency">
            Your
            <span role="img" aria-label="currency emoji">
              💵
            </span>
            ?
          </FormLabel>
          <FormInput
            type="text"
            name="currency"
            value={tempCurrency}
            onChange={event => setTempCurrency(event.target.value)}
          />
        </FormSection>
        <FormSection>
          <FormButton type="submit">Save my preferences</FormButton>
        </FormSection>
      </form>
    </MainViewStatic>
  );
};

export default Settings;
