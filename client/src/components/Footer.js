/*eslint-disable-next-line no-unused-vars*/
import React from 'react';
import { Link } from '@reach/router';

export default function Footer({ isAuthenticated }) {
  return (
    <footer>
      {isAuthenticated ? (
        <React.Fragment>
          <Link to="/settings">Settings</Link>
          <Link to="/history">History</Link>
          <Link to="/logout">Logout</Link>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Link to="/login">Login</Link>
          <Link to="/about">About</Link>
          <Link to="/sign-up">Sign Up</Link>
        </React.Fragment>
      )}
    </footer>
  );
}
