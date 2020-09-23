import { Link } from 'gatsby';
import React from 'react';

const Header = ({ metadata }) => (
  <header
    style={{
      background: '#f26a8d',
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `#f49cbb`,
            textDecoration: `none`,
          }}
        >
          {metadata.title}: {metadata.description}
        </Link>
      </h1>
    </div>
  </header>
);

export default Header;
