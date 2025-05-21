import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../supabaseClient'

const Callback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('セッション取得失敗:', error)
        return
      }

      if (data?.session) {
        console.log('✅ セッション取得成功:', data.session)
        navigate('/') // ホームへ戻す
      } else {
        console.log('❌ セッションが未取得')
        navigate('/login')
      }
    }

    checkSession()
  }, [navigate])

  return (
    <div>
      <h2>Google認証コールバックページ</h2>
      <p>ログイン処理中です。お待ちください...</p>
    </div>
  )
}

export default Callback
