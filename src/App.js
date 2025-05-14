import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Login from './components/Login';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      {session ? (
        <div>
          <p>ログイン中: {session.user.email}</p>
          <button onClick={() => supabase.auth.signOut()}>ログアウト</button>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
