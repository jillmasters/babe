import React from 'react';
import { connect } from 'react-redux';

import Layout from '../components/layout';
import SEO from '../components/seo';

import { toggleLender } from '../state/app';

const IndexPage = ({ isLender, dispatch }) => (
  <Layout>
    <SEO title="Babe" />
    <h1>Welcome to Babe</h1>
    <button onClick={() => dispatch(toggleLender(!isLender))}>
      {' '}
      {isLender ? 'Jill' : 'Sam'} gets £10
    </button>
  </Layout>
);

export default connect(
  state => ({
    isLender: state.app.isLender,
  }),
  null,
)(IndexPage);
