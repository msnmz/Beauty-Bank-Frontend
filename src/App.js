import React from 'react'
import { SnackbarProvider } from 'notistack';

import AppRouter from './router/Router';
import AppContextProvider from './context/AppContext';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AppContextProvider>
        <AppRouter />
      </AppContextProvider>
    </SnackbarProvider>
  );
}

export default App;
