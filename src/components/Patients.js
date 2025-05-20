import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPatients } from '../api/fetchPatients';

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const getPatients = async () => {
      const data = await fetchPatients();
      setPatients(data);
    };
    getPatients();
  }, []);

  return (
    <div>
      <h2>患者一覧</h2>

      {/* 新規作成ボタン */}
      <Link to="/patients/new">
        <button>患者新規作成</button>
      </Link>

      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            <Link to={`/patients/${patient.id}`}>
              {patient.name}（チーム: {patient.team}）
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Patients;
