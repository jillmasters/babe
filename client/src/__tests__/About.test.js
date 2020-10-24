import React from 'react';
import About from '../pages/About';

import renderer from 'react-test-renderer';

it('About renders correctly', () => {
  const tree = renderer.create(<About />).toJSON();
  expect(tree).toMatchSnapshot();
});
