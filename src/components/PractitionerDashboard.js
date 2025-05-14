import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPatients } from '../utils/api';

const PractitionerDashboard = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const loadPatients = async () => {
      const data = await fetchPatients();
      setPatients(data);
    };
    loadPatients();
  }, []);

  return (
    <div>
      <h2>施術者用患者一覧</h2>
      {patients.length === 0 ? (
        <p>患者データがありません。</p>
      ) : (
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>
              <Link to={`/patient/${patient.id}`}>
                {patient.name}（ID: {patient.patient_id}）
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PractitionerDashboard;
