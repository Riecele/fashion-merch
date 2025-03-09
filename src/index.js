import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './_components/layout/app';
import { LoadingProvider } from './context/LoadingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LoadingProvider>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </LoadingProvider>

);
