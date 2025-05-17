import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import CacheClearButton from './components/CacheClearButton';

function App() {
  return (
    <BrowserRouter basename="/dekutest/react-pwa-karut">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
      <CacheClearButton />
    </BrowserRouter>
  );
}

export default App;
