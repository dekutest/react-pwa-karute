import React, { useState, useEffect } from 'react'
import { fetchPatients } from '../api/fetchPatients'
import { Link, useNavigate } from 'react-router-dom'
import { useAbility } from '../contexts/AbilityContext' // CASLフック追加

const Patients = () => {
  const [patients, setPatients] = useState([])
  const navigate = useNavigate()
  const ability = useAbility() // 👈 権限チェック用

  useEffect(() => {
    const getPatients = async () => {
      const data = await fetchPatients()
      setPatients(data)
    }
    getPatients()
  }, [])

  return (
    <div>
      <h2>患者リスト</h2>
      {patients.length > 0 ? (
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>
              {/* 詳細ページリンク */}
              <Link to={`/patients/${patient.id}`}>
                {patient.name}（チーム: {patient.team}）
              </Link>

              {/* 👇 編集ボタン（条件付き表示） */}
{ability.can('update', 'Patient') && (
  <button
    onClick={() => navigate(`/patients/${patient.id}`)}
    style={{ marginLeft: '10px' }}
  >
    編集
  </button>
)}

            </li>
          ))}
        </ul>
      ) : (
        <p>データがありません。</p>
      )}
    </div>
  )
}

export default Patients
