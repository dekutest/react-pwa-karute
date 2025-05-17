import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const PatientRegister = () => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [message, setMessage] = useState('');

  // 登録処理
  const handleRegister = async () => {
    try {
      const { error } = await supabase
        .from('patients')
        .insert([{ name, team }]);

      if (error) {
        throw error;
      }

      setMessage('登録成功');
      setName('');
      setTeam('');
    } catch (error) {
      setMessage(`エラー: ${error.message}`);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">患者情報登録</h2>
      <input
        className="p-2 border mb-2 w-full"
        type="text"
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="p-2 border mb-2 w-full"
        type="text"
        placeholder="チーム"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded w-full"
        onClick={handleRegister}
      >
        登録
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default PatientRegister;
