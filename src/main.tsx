import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import { App } from './packages/components/components.js';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
