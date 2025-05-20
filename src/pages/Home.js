import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../supabaseClient'

const Home = () => {
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate() // ✅ React Routerで遷移させる

  useEffect(() => {
    const fetchRole = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError || !user) {
        console.error('ユーザー取得失敗:', userError)
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('ロール取得失敗:', error)
      } else {
        setRole(data.role)
      }

      setLoading(false)
    }

    fetchRole()
  }, [])

  if (loading) {
    return <p>読み込み中...</p>
  }

  return (
    <div>
      <h1>ホームページ</h1>
      <p>あなたのロール: {role}</p>

      {role === 'admin' && (
        <div>
          <button onClick={() => navigate('/patients')}>患者情報を編集する</button>
              <button onClick={() => navigate('/patients')}>施術記録を入力する</button>
          <button onClick={() => alert('チーム管理画面はまだ未実装です')}>
            チームを管理する
          </button>
        </div>
      )}

      {role === 'practitioner' && (
        <div>
          <button onClick={() => navigate('/patients')}>施術記録を入力する</button>
        </div>
      )}

      {role === 'team_leader' && (
        <p>閲覧専用モードです（編集不可）</p>
      )}

      {/* 👇 予備リンク */}
      <div style={{ marginTop: '20px' }}>
        <Link to="/patients">📋 患者一覧ページへ</Link>
      </div>
    </div>
  )
}

export default Home
