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

import {Users} from '../interfaces'

interface SettingsProps {
  users: Users,
  setUsers: Function,
  currency: string,
  setCurrency: Function,
  setIsLoading: Function,
}

const Settings: React.FC<SettingsProps> = ({ users, setUsers, currency, setCurrency, setIsLoading }) => {
  const [tempUser, setTempUser] = useState(users.lead);
  const [tempPartner, setTempPartner] = useState(users.partner);
  const [tempCurrency, setTempCurrency] = useState(currency);

  const updateDatabase = (_id: string, field: string, value: {value: string}) => {
    UserService.editUserDetails(_id, field, value).catch(error =>
      // eslint-disable-next-line no-console
      console.log('---> Error editing database values', error),
    );
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
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
    setUsers((originalCouple: [{lead: string, partner: string}]) => ({
      ...originalCouple,
      lead: tempUser,
      partner: tempPartner,
    }));
    setCurrency(tempCurrency);
    setIsLoading(true);
    navigate('/');
  };

  return (
    <MainViewStatic data-testid="settings">
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTempUser(event.target.value)}
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="user-partner">Your partner:</FormLabel>
          <FormInput
            type="text"
            name="user-partner"
            aria-label="user-partner"
            value={tempPartner}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTempPartner(event.target.value)}
          />
        </FormSection>
        <FormSection onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTempCurrency(event.target.value)}>
          <FormRadio
            type="radio"
            name="currency"
            value="£"
            required
            defaultChecked={currency === '£' ? true : undefined}
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
            defaultChecked={currency === '$' ? true : undefined}
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
