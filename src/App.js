import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage.js';
import Login from './components/Login';
import Callback from './components/Callback';
import PatientDetail from './components/PatientDetail';
import PatientList from './components/PatientList';
import PatientCreate from './components/PatientCreate';
import { AbilityProvider } from './contexts/AbilityContext';
import supabase from './supabaseClient';
import AdminTeams from './pages/AdminTeams';           // ✅ チーム管理
import AdminUsers from './pages/AdminUsers';           // ✅ ユーザー権限変更
import AdminPending from './pages/AdminPending';       // ✅ 登録待ちユーザー管理

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('role, team_ids')
          .eq('id', user.id)
          .single();

        setUser({
          id: user.id,
          role: userData?.role || null,
          teamIds: userData?.team_ids || [],
        });
      }
    };

    fetchUser();
  }, []);

  return (
    <AbilityProvider user={user}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page/Home" element={<Home />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/patients/new" element={<PatientCreate />} />
        <Route path="/patients/:id" element={<PatientDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/admin" element={<AdminPage />} />
          {/* 🔒 管理者関連 */}
  <Route path="/admin" element={<AdminPage />} />
  <Route path="/admin/teams" element={<AdminTeams />} />
  <Route path="/admin/users" element={<AdminUsers />} />
  <Route path="/admin/pending-users" element={<AdminPending />} />
      </Routes>
    </AbilityProvider>
  );
}

export default App;
