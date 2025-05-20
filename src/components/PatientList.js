import React, { useState, useEffect } from 'react';
import { fetchPatients } from '../api/fetchPatients';
import { Link } from 'react-router-dom';

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
      <h2>患者リスト</h2>
      {patients.length > 0 ? (
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>
              <Link to={`/patients/${patient.id}`}>{patient.name}（チーム: {patient.team}）</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>データがありません。</p>
      )}
    </div>
  );
};

export default Patients;
