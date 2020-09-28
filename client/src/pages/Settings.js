import React, { useState } from 'react';
import {
  MainViewStatic,
  FormSection,
  FormInput,
  FormButton,
  FormLabel,
  FormRadio,
} from '../theme';

import { navigate } from '@reach/router';
import APIService from '../services/APIService';

const Settings = ({
  users,
  setUsers,
  currency,
  setCurrency,
  setTransactions,
}) => {
  const [tempUser, setTempUser] = useState(users.lead);
  const [tempPartner, setTempPartner] = useState(users.partner);
  const [tempCurrency, setTempCurrency] = useState(currency);

  const updateDatabase = (name, newName) => {
    APIService.editName(name, newName).catch(error =>
      // eslint-disable-next-line no-console
      console.log('---> Error editing database names', error),
    );
  };

  const updateLocal = () => {
    APIService.getTransactions()
      .then(allTransactions => setTransactions(allTransactions))
      .catch(error =>
        // eslint-disable-next-line no-console
        console.log('---> Error reloading local listing', error),
      );
  };

  const submit = event => {
    event.preventDefault();
    if (users.lead !== tempUser) {
      const newUser = { newName: tempUser };
      updateDatabase(users.lead, newUser);
    }
    if (users.partner !== tempPartner) {
      const newPartner = { newName: tempPartner };
      updateDatabase(users.partner, newPartner);
    }
    updateLocal();
    const newCouple = { lead: tempUser, partner: tempPartner };
    setUsers(newCouple);
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
        <FormSection onChange={event => setTempCurrency(event.target.value)}>
          <FormRadio
            type="radio"
            name="currency"
            value="£"
            required
            defaultChecked={currency === '£' ? 'true' : null}
          />
          <FormLabel htmlFor="currency">
            <span role="img" aria-label="pounds emoji">
              💷
            </span>
          </FormLabel>
          <FormRadio
            type="radio"
            name="currency"
            value="$"
            required
            defaultChecked={currency === '$' ? 'true' : null}
          />
          <FormLabel htmlFor="currency">
            <span role="img" aria-label="dollars emoji">
              💵
            </span>
          </FormLabel>
        </FormSection>
        <FormSection>
          <FormButton type="submit">Save my preferences</FormButton>
        </FormSection>
      </form>
    </MainViewStatic>
  );
};

export default Settings;
