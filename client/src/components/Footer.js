/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';

export default function Footer() {
  return (
    <div
      css={css`
        margin-top: 100px;
        flex: 1;
        height: 10%;
        width: 100vw;
        color: #f1faee;
        background: #1d3557;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      `}
    >
      <a>About</a>
      <a>Log In / Sign Up</a>
      <a>Settings</a>
    </div>
  );
}
