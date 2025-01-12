import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="global">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
