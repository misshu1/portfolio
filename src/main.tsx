import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n.ts';
import { ThemeProvider } from './themes';
import { Router } from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </React.StrictMode>
);
