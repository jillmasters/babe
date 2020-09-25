/*eslint-disable-next-line no-unused-vars*/
import React from 'react';
import { Link } from '@reach/router';

export default function Footer() {
  return (
    <footer>
      <Link to="/history">History</Link>
      <Link to="/login">Log In / Sign Up</Link>
      <Link to="/settings">Settings</Link>
    </footer>
  );
}
