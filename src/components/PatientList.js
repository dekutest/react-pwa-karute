import React, { useState, useEffect } from 'react'
import { fetchPatients } from '../api/fetchPatients'
import { Link } from 'react-router-dom'
import supabase from '../supabaseClient'

const Patients = () => {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    const getPatients = async () => {
      // ✅ ログインユーザー取得
      const { data: { user } } = await supabase.auth.getUser()
      const userId = user?.id

      if (!userId) {
        console.error('ログインユーザーが取得できません')
        return
      }

      // ✅ ロールとチームIDを取得
      const { data: userData, error } = await supabase
        .from('users')
        .select('role, team_id')
        .eq('id', userId)
        .single()

      if (error || !userData) {
        console.error('ユーザーデータ取得失敗:', error)
        return
      }

      const role = userData.role
      const teamId = userData.team_id

      if (role === 'practitioner') {
        setPatients([]) // 表示なし
        return
      }

      const data = await fetchPatients(role, teamId)
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
              <Link to={`/patients/${patient.id}`}>
                {patient.name}（チーム: {patient.team}）
              </Link>
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
