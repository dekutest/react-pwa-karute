import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Treatment from './components/Treatment';
import Patients from './components/Patients';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/treatment/:patientId" element={<Treatment />} />
      </Routes>
    </Router>
  );
}

export default App;
