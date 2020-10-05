import React, { useState } from 'react';
import {
  MainViewStatic,
  FormSection,
  FormInput,
  FormButton,
  FormLabel,
  FormRadio,
  RadioLabel,
} from '../theme';

import { navigate } from '@reach/router';
import UserService from '../services/UserService';

const Settings = ({ users, setUsers, currency, setCurrency, setIsLoading }) => {
  const [tempUser, setTempUser] = useState(users.lead);
  const [tempPartner, setTempPartner] = useState(users.partner);
  const [tempCurrency, setTempCurrency] = useState(currency);

  const updateDatabase = (_id, field, value) => {
    UserService.editUserDetails(_id, field, value).catch(error =>
      // eslint-disable-next-line no-console
      console.log('---> Error editing database values', error),
    );
  };

  const submit = event => {
    event.preventDefault();
    if (users.lead !== tempUser) {
      const leadName = { value: tempUser };
      updateDatabase(users._id, 'lead', leadName);
    }
    if (users.partner !== tempPartner) {
      const partnerName = { value: tempPartner };
      updateDatabase(users._id, 'partner', partnerName);
    }
    if (currency !== tempCurrency) {
      const newCurrency = { value: tempCurrency };
      updateDatabase(users._id, 'currency', newCurrency);
    }
    setUsers(originalCouple => ({
      ...originalCouple,
      lead: tempUser,
      partner: tempPartner,
    }));
    setCurrency(tempCurrency);
    setIsLoading(true);
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
            aria-label="user-lead"
            value={tempUser}
            onChange={event => setTempUser(event.target.value)}
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="user-partner">Your partner:</FormLabel>
          <FormInput
            type="text"
            name="user-partner"
            aria-label="user-partner"
            value={tempPartner}
            onChange={event => setTempPartner(event.target.value)}
          />
        </FormSection>
        <FormSection onChange={event => setTempCurrency(event.target.value)}>
          <FormRadio
            type="radio"
            name="currency"
            value="£"
            required
            defaultChecked={currency === '£' ? 'true' : null}
          />
          <RadioLabel htmlFor="currency">
            <span role="img" aria-label="pounds emoji">
              💷
            </span>
          </RadioLabel>
          <FormRadio
            type="radio"
            name="currency"
            value="$"
            required
            defaultChecked={currency === '$' ? 'true' : null}
          />
          <RadioLabel htmlFor="currency">
            <span role="img" aria-label="dollars emoji">
              💵
            </span>
          </RadioLabel>
        </FormSection>
        <FormSection>
          <FormButton type="submit">Save my preferences</FormButton>
        </FormSection>
      </form>
    </MainViewStatic>
  );
};

export default Settings;
