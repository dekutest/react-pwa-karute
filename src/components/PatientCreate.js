import React, { useState } from 'react';
import supabase from '../supabaseClient';

const PatientCreate = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    const { data: maxData, error: fetchError } = await supabase
      .from('patients')
      .select('display_id')
      .order('display_id', { ascending: false })
      .limit(1);

    if (fetchError) {
      console.error('最大ID取得エラー:', fetchError.message);
      setMessage('ID取得エラー');
      return;
    }

    const nextDisplayId = maxData?.[0]?.display_id
      ? String(Number(maxData[0].display_id) + 1).padStart(6, '0')
      : '000001';

    const { error: insertError } = await supabase
      .from('patients')
      .insert([
        {
          name,
          display_id: nextDisplayId,
        }
      ]);

    if (insertError) {
      console.error('患者登録エラー:', insertError.message);
      setMessage('登録エラー');
    } else {
      setMessage(`✅ 登録成功！ID: ${nextDisplayId}`);
      setName('');
    }
  };

  return (
    <div>
      <h2>患者登録</h2>
      <input
        type="text"
        placeholder="名前を入力"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleRegister}>登録する</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PatientCreate;
