/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';

const Header = () => {
  return (
    <header
      css={css`
        flex: 3;
        background: #e63946;
        width: 100%;
        border-radius: 30px 30px 0 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
      `}
    >
      <h1>Babe</h1>
      <h2>Fast, unfussy bill-splitting for couples</h2>
    </header>
  );
};

export default Header;
