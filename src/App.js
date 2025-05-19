import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <h1>電子カルテアプリ</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<p>ページが見つかりません</p>} />
      </Routes>
    </div>
  );
}

export default App;
