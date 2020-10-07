
/*eslint-disable-next-line no-unused-vars*/
// import React from 'react';
// import { Link } from '@reach/router';
// import { jsx, css } from '@emotion/core';
// import { colors } from '../theme';
import React from 'react';
import { Link } from '@reach/router';
import { css } from '@emotion/core';
import { colors } from '../theme';

const Header = () => {
  return (
    <header>
      <section
        css={css`
          flex: 1;
          max-width: 25%;
        `}
      >
        <h1>
          <Link to="/" id="title">
            Babe
          </Link>
        </h1>
      </section>
      <section
        css={css`
          flex: 3;
          max-width: 45%;
        `}
      >
        <h3>
          Split the bill,
          <br />
          share the
          <span
            css={css`
              font-family: 'Kaushan Script';
              font-size: 4.5vh;
              line-height: 3vh;
              padding-left: 0.3vh;
              color: ${colors.pale};
            `}
          >
            love
          </span>
        </h3>
      </section>
    </header>
  );
};

export default Header;
