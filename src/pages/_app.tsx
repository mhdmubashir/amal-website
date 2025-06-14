import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
  return (
    <>
      <Head>
        <title>Amal College</title>
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;