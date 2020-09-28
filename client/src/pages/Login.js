import React from 'react';
import { MainViewStatic } from '../theme';

const Login = ({ setIsAuthenticated }) => {
  return (
    <MainViewStatic>
      <h4>
        <span role="img" aria-label="technologist emoji">
          🧑‍💻
        </span>
        Login
        <span role="img" aria-label="technologist emoji">
          🧑‍💻
        </span>
      </h4>
    </MainViewStatic>
  );
};

export default Login;
