import React, { useState } from 'react';
import { navigate } from '@reach/router';
import {
  MainView,
  FormSection,
  FormLabel,
  RadioLabel,
  FormInput,
  FormButton,
  FormRadio,
} from '../theme';

import UserService from '../services/UserService';
import authentication from '../authentication';

const initialState = {
  email: '',
  password: '',
  name: '',
  partner: '',
  partnerEmail: '',
  currency: '',
};

const SignUp = ({ setIsAuthenticated, setIsLoading }) => {
  const [state, setState] = useState(initialState);

  const handleChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const { email, password, name, partner, currency, partnerEmail } = state;
    const newUser = { email, password, name, partner, partnerEmail, currency };
    try {
      const result = await UserService.signup(newUser);
      const { accessToken } = result;
      localStorage.setItem('accessToken', accessToken);
      setIsAuthenticated(true);
      setIsLoading(true);
      authentication.login(() => navigate('/', { replace: true }));
    } catch (error) {
      alert(
        `There is an account already registered with ${email}. Please use a different email address or log in.`,
      );
      setState(initialState);
    }
  };

  return (
    <MainView data-testid="signUp">
      <h4>
        <span role="img" aria-label="wave emoji">
          👋
        </span>
        Sign up
        <span role="img" aria-label="wave emoji">
          👋
        </span>
      </h4>
      <br />
      <form onSubmit={handleSubmit}>
        <FormSection>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <FormInput
            type="text"
            name="email"
            aria-label="email"
            value={state.email}
            onChange={handleChange}
            required
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="password">Password:</FormLabel>
          <FormInput
            type="password"
            name="password"
            aria-label="password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </FormSection>
        <FormSection onChange={handleChange}>
          <FormRadio type="radio" aria-label="currency-gbp" name="currency" value="£" required />
          <RadioLabel htmlFor="currency">
            <span role="img" aria-label="pounds emoji">
              💷
            </span>
          </RadioLabel>
          <FormRadio type="radio" aria-label="currency-usd" name="currency" value="$" required />
          <RadioLabel htmlFor="currency">
            <span role="img" aria-label="dollars emoji">
              💵
            </span>
          </RadioLabel>
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="name">Your name:</FormLabel>
          <FormInput
            type="text"
            name="name"
            aria-label="your-name"
            value={state.name}
            onChange={handleChange}
            required
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="partner">Partner&apos;s name:</FormLabel>
          <FormInput
            type="text"
            name="partner"
            aria-label="partners-name"
            value={state.partner}
            onChange={handleChange}
            required
          />
        </FormSection>
        <FormSection>
          <FormLabel htmlFor="partnerEmail">Partner&apos;s email:</FormLabel>
          <FormInput
            type="text"
            name="partnerEmail"
            aria-label="partners-email"
            value={state.partnerEmail}
            onChange={handleChange}
            required
          />
        </FormSection>
        <FormButton role="button" type="submit">Let&apos;s get started</FormButton>
      </form>
    </MainView>
  );
};

export default SignUp;
