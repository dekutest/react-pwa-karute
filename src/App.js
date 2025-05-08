import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await supabase.from('patients').select('*');
      if (error) {
        console.error('データ取得エラー:', error.message);
      } else {
        setPatients(data);
        console.log('患者データ:', data);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div>
      <h1>患者リスト</h1>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>{patient.name}（チーム: {patient.team}）</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
