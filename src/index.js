import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { handleAuthRedirect } from './utils/authRedirect';

// 認証リダイレクト処理を実行
handleAuthRedirect();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/dekutest/react-pwa-karut">
    <App />
  </BrowserRouter>
);
