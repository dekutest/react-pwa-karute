import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Callback from './components/Callback';
import PatientDetail from './components/PatientDetail'; // 👈 もしpagesじゃなくcomponentsにある場合
// 👇この行が抜けてる
import PatientList from './components/PatientList';
import PatientCreate from './components/PatientCreate';



function App() {
  return (
    <div>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/page/Home" element={<Home />} />
  <Route path="/patients" element={<PatientList />} />
  <Route path="/patients/:id" element={<PatientDetail />} /> {/* 👈 これを追加！ */}
  <Route path="/login" element={<Login />} />
  <Route path="/callback" element={<Callback />} />
<Route path="/patients/new" element={<PatientCreate />} />
</Routes>

    </div>
  );
}

export default App;
