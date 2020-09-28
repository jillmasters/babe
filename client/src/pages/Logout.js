import React from 'react';
import { MainViewStatic } from '../theme';

const Logout = ({ setIsAuthenticated }) => {
  return (
    <MainViewStatic>
      <h4>
        <span role="img" aria-label="technologist emoji">
          🧑‍💻
        </span>
        Logout
        <span role="img" aria-label="technologist emoji">
          🧑‍💻
        </span>
      </h4>
    </MainViewStatic>
  );
};

export default Logout;
