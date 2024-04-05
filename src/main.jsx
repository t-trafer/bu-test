import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ANSWER, LENGTH } from './app.constants';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App answer={ANSWER} length={LENGTH} />
  </React.StrictMode>
);
