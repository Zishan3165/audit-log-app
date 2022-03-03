import React from 'react';
import { setupToaster } from './utils/toaster';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppRouter } from './AppRouter';

setupToaster();

function App() {
  return <AppRouter />;
}

export default App;
