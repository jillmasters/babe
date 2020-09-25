import React from 'react';
import ReactDOM from 'react-dom';

import { injectGlobal } from 'emotion';
import { Global, css } from '@emotion/core';
import { colors } from './theme';

import App from './App';
import * as serviceWorker from './serviceWorker';

injectGlobal`
@font-face {
  font-family: 'Contrail One';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Contrail One'), local('ContrailOne-Regular'), url(https://fonts.gstatic.com/s/contrailone/v10/eLGbP-j_JA-kG0_Zo51noaftYkHs384t2g.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Poppins';
  font-style: italic;
  font-weight: 200;
  font-display: swap;
  src: local('Poppins ExtraLight Italic'), local('Poppins-ExtraLightItalic'), url(https://fonts.gstatic.com/s/poppins/v13/pxiDyp8kv8JHgFVrJJLmv1pVF9eOYktMqg.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: local('Poppins ExtraLight'), local('Poppins-ExtraLight'), url(https://fonts.gstatic.com/s/poppins/v13/pxiByp8kv8JHgFVrLFj_Z1xlFd2JQEk.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Poppins Regular'), local('Poppins-Regular'), url(https://fonts.gstatic.com/s/poppins/v13/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: local('Poppins SemiBold'), local('Poppins-SemiBold'), url(https://fonts.gstatic.com/s/poppins/v13/pxiByp8kv8JHgFVrLEj6Z1xlFd2JQEk.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
`;

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          margin: 0;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
          font-size: 3vw;
          color: ${colors.white};
          }

          > div {
            margin-top: 0;
          }

          header {
            width: 100%;
            height: 15vh;
            border: solid ${colors.white} thick;
            border-radius: 50px 50px 0 0;
            display: flex;
            align-items: center;
            justify-content: space-around;
            background: ${colors.pink};
          }

          main {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            width: 100vw;
            min-width: 300px;
            height: 100vh;
            min-height: 300px;
            background: ${colors.pale};
            padding: 5vw 5vw 0 5vw;
          }

          footer {
            height: 10vh;
            width: 100vw;
            padding: 40px;
            border-top: solid ${colors.white} thick;
            flex: 0 1 auto;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            font-size: 3vw;
            color: ${colors.white};
            background:${colors.dark};
          }

          h1, h2, h3, h4, h5, h6 {
            font-family: 'Poppins';
            font-style: italic;
            line-height: 1.1;
            color: ${colors.white};

            + * {
              margin-top: 0.5rem;
            }
          }

          h1 {
            font-family: 'Contrail One';
            font-size: 12vw;
          }

          button {
            padding: 1rem;
            border: solid thin ${colors.white};
            border-radius: 50px;
            background: ${colors.pink};
            font-family: 'Poppins';
            font-style: italic;
            font-size: 4vw;
            color: ${colors.white};
          }

          a {
            color: ${colors.white};
            text-decoration: none;
          }

        }
      `}
    />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
