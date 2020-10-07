/*eslint-disable-next-line no-unused-vars*/
import React from 'react';
import { Link } from '@reach/router';

interface FooterProps {
  isAuthenticated: Boolean;
}

const Footer: React.FC<FooterProps> = ({ isAuthenticated }) => {
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
          <Link to="/about">About</Link>
          <Link to="/sign-up">Sign up</Link>
          <Link to="/login">Login</Link>
        </React.Fragment>
      )}
    </footer>
  );
};
export default Footer;
