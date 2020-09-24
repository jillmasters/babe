import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'emotion';
import { Global, css } from '@emotion/core';

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
          color: #fff;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
          font-size: 18px;
          line-height: 1.4;
          }

          > div {
            margin-top: 0;
          }

          h1, h2, h3, h4, h5, h6 {
            font-family: 'Poppins';
            font-style: italic;
            line-height: 1.1;
            color: #f1faee;

            + * {
              margin-top: 0.5rem;
            }
          }

          h1 {
          font-family: 'Contrail One';
          font-size: 50px;
          }

          button {
            border-radius: 30px;
            border: solid thin #fff;
            font-family: 'Poppins';
            font-weight: 400;
            font-size: 20px;
            background: #e63946;
            color: #fff;
            padding: 2rem;
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
