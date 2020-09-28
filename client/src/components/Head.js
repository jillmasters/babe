import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Head() {
  return (
    <HelmetProvider>
      <Helmet>
        <html lang="en" />
        <title>Babe</title>
        <meta
          name="description"
          content="A low-maintenance bill-splitting app for couples"
        />
      </Helmet>
    </HelmetProvider>
  );
}
