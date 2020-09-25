/** @jsx jsx */
/*eslint-disable-next-line no-unused-vars*/
import React from 'react';
import { Link } from '@reach/router';
import { jsx, css } from '@emotion/core';

export default function Footer() {
  return (
    <div
      css={css`
        font-family: 'Poppins';
        flex: 0 1 auto;
        font-size: 4vw;
        letter-spacing: 0.05em;
        padding: 40px;
        border-top: solid #f1faee thick;
        height: 10vh;
        width: 100vw;
        color: #f1faee;
        background: #1d3557;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      `}
    >
      <Link to="/history">History</Link>
      <Link to="/login">Log In / Sign Up</Link>
      <Link to="/settings">Settings</Link>
    </div>
  );
}
