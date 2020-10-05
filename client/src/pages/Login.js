import React, { useState } from 'react';
import { navigate } from '@reach/router';
import {
  MainViewStatic,
  FormSection,
  FormLabel,
  FormInput,
  FormButton,
} from '../theme';

import UserService from '../services/UserService';
import authentication from '../authentication';

const initialState = {
  email: '',
  password: '',
};

const Login = ({ setIsAuthenticated, setIsLoading }) => {
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
    const { email, password } = state;
    const user = { email, password };
    try {
      const result = await UserService.login(user);
      const { accessToken } = result;
      localStorage.setItem('accessToken', accessToken);
      setIsAuthenticated(true);
      setIsLoading(true);
      authentication.login(() => navigate('/', { replace: true }));
    } catch (error) {
      alert('Your email or password is incorrect. Please try again.');
      setState(initialState);
    }
  };

  return (
    <MainViewStatic data-testid="login">
      <h4>
        <span role="img" aria-label="technologist emoji">
          🧑‍💻
        </span>
        Login
        <span role="img" aria-label="technologist emoji">
          🧑‍💻
        </span>
      </h4>
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
        <FormSection>
          <FormButton type="submit">Show me the money</FormButton>
        </FormSection>
      </form>
    </MainViewStatic>
  );
};

export default Login;
