import '@/styles/globals.css';

import { enableReactTracking } from '@legendapp/state/config/enableReactTracking';
import { configureObservablePersistence } from '@legendapp/state/persist';
import { ObservablePersistSessionStorage } from '@legendapp/state/persist-plugins/local-storage';
import { ThemeProvider } from '@repo/ui';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Providers } from '@/providers';

enableReactTracking({
  auto: true,
});

configureObservablePersistence({
  pluginLocal: ObservablePersistSessionStorage,
});

ReactDOM.createRoot(document.querySelector('#app')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <Providers />
    </ThemeProvider>
  </React.StrictMode>,
);
