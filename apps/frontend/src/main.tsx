import './index.css';
import '@fontsource/geist-mono';
import '@fontsource/geist-sans';

import { ThemeProvider } from '@repo/ui';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { Providers } from './providers/index.tsx';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <Providers>
        <App />
      </Providers>
    </ThemeProvider>
  </React.StrictMode>,
);
