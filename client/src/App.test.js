// import React from 'react';
// import { render } from '@testing-library/react';

// test('renders learn react link', () => {
//   // const { getByText } = render(<App />);
//   // const linkElement = getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
// });
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'babel-polyfill';
import App from './App';

require('jest-canvas-mock');

test('Dashboard', () => {
  render(<App />);

  const el = screen.getAllByText('Babe');
  expect(el[0].textContent).toBeTruthy(); // checks if it exists
  // expect(el[0].textContent).toBeInTheDocument(); // checks if it exists
});
