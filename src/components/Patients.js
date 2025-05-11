import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await supabase.from('patients').select('*');
      if (error) {
        console.error('データ取得エラー:', error.message);
      } else {
        setPatients(data);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div>
      <h2>患者リスト</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.name}（チーム: {patient.team}）
            <Link to={`/treatment/${patient.id}`}>
              <button>施術を登録</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Patients;
