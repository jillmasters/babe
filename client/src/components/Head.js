import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Head({ app }) {
  return (
    <HelmetProvider>
      <Helmet>
        <html lang="en" />
        <title>{app.name}</title>
        <meta name="description" content={app.description} />
      </Helmet>
    </HelmetProvider>
  );
}
