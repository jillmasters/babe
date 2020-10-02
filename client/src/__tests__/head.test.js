import React from 'react';
import Head from '../components/Head';

import renderer from 'react-test-renderer';

it('Head renders correctly', () => {
  const tree = renderer.create(<Head />).toJSON();
  expect(tree).toMatchSnapshot();
});
