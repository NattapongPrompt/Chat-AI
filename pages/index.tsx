import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, Box, Typography, CssBaseline } from '@mui/material';
import { theme } from '../src/theme/theme';
import Chat from '../src/components/Chat';
import Head from 'next/head';

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>AI Chat Interface</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Box 
        sx={{ 
          minHeight: '100vh',
          bgcolor: 'background.default',
          py: { xs: 2, sm: 4 },
          px: { xs: 1, sm: 2 }
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ 
              mb: { xs: 2, sm: 4 },
              background: 'linear-gradient(45deg, #2563eb 30%, #8b5cf6 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AI Chat Interface
          </Typography>
          <Chat />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
