import ReactDOM from 'react-dom/client';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import { App } from './libs/components/components.js';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './libs/packages/react-query/react-query.package.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
