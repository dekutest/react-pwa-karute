import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Patients from './components/Patients';
import Treatment from './components/Treatment';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/treatment/new" element={<Treatment />} />
        <Route path="/treatment/:patientId" element={<Treatment />} />
      </Routes>
    </div>
  );
}

export default App;
