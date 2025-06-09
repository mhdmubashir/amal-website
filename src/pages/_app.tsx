import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;