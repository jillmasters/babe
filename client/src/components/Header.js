/** @jsx jsx */
/*eslint-disable-next-line no-unused-vars*/
import React from 'react';
import { Link } from '@reach/router';
import { jsx, css } from '@emotion/core';

const Header = ({ app }) => {
  return (
    <header
      css={css`
        width: 100%;
        height: 30%;
        background: #e63946;
        border-radius: 50px 50px 0 0;
        border: solid #f1faee thick;
        display: flex;
        justify-content: space-around;
        align-items: center;
      `}
    >
      <div
        css={css`
          flex: 1;
          max-width: 25%;
          text-align: center;
        `}
      >
        <h1>
          <Link to="/">{app.name}</Link>
        </h1>
      </div>
      <div
        css={css`
          flex: 3;
          max-width: 45%;
          text-align: center;
        `}
      >
        <h2>{app.description}</h2>
      </div>
    </header>
  );
};

export default Header;
