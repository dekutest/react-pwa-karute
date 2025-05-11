import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useParams } from 'react-router-dom';

const Treatment = () => {
  const { patientId } = useParams();
  const [practitioner, setPractitioner] = useState('');
  const [date, setDate] = useState('');
  const [treatment, setTreatment] = useState('');
  const [bodyPart, setBodyPart] = useState('');  // 追加
  const [memo, setMemo] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from('treatments').insert([
      {
        patient_id: patientId,
        practitioner: practitioner,
        date: date,
        treatment: treatment,
        body_part: bodyPart,  // 修正箇所
        memo: memo,
        content: content,
      },
    ]);

    if (error) {
      alert('エラーが発生しました：' + error.message);
    } else {
      console.log('登録されたデータ:', data);
      alert('施術情報を登録しました！');
      setPractitioner('');
      setDate('');
      setTreatment('');
      setBodyPart('');
      setMemo('');
      setContent('');
    }
  };

  return (
    <div>
      <h2>施術入力（患者ID: {patientId}）</h2>
      <form onSubmit={handleSubmit}>
        <label>施術者名：</label>
        <input
          type="text"
          value={practitioner}
          onChange={(e) => setPractitioner(e.target.value)}
          required
        />
        <br />
        <label>施術日：</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />
        <label>治療内容：</label>
        <input
          type="text"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          required
        />
        <br />
        <label>治療部位：</label>
        <input
          type="text"
          value={bodyPart}  // 修正箇所
          onChange={(e) => setBodyPart(e.target.value)}
          required
        />
        <br />
        <label>メモ：</label>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        ></textarea>
        <br />
        <label>施術内容：</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <br />
        <button type="submit">保存</button>
      </form>
    </div>
  );
};

export default Treatment;
