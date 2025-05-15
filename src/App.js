import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import PractitionerDashboard from './components/PractitionerDashboard';
import PatientDetail from './components/PatientDetail';

function App() {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const getUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (!error) {
          setUserRole(data.role);
        }
      }
    };

    getUserSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      {session ? (
        <div>
          <p>ログイン中: {session.user.email}</p>
          <Routes>
            <Route path="/" element={<PractitionerDashboard />} />
            <Route path="/patient/:id" element={<PatientDetail />} />
          </Routes>
          <button onClick={() => supabase.auth.signOut()}>ログアウト</button>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
