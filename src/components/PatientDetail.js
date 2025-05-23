import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';
import useAbility from '../hooks/useAbility';

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [treatments, setTreatments] = useState([]);
  const [newTreatment, setNewTreatment] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [location, setLocation] = useState('');
  const [memo, setMemo] = useState('');
  const [treatmentName, setTreatmentName] = useState('');
  const [date, setDate] = useState('');
  const [userId, setUserId] = useState(null);

  // ログインユーザーIDを取得（Hookのルールを守って return の前に置く）
useEffect(() => {
  const fetchUserId = async () => {
    const { data } = await supabase.auth.getSession()
    const session = data?.session

    if (session?.user?.id) {
      setUserId(session.user.id)
    }
  }
  fetchUserId()
}, [])


  const ability = useAbility(userId);

  // 患者データと施術データを取得（Hookのルールを守って return の前に置く）
useEffect(() => {
  const fetchPatient = async () => {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('患者データ取得エラー:', error.message);
    } else {
      setPatient(data);
    }
  };

  const fetchTreatments = async () => {
    const { data, error } = await supabase
      .from('treatments')
      .select('*')
      .eq('patient_id', id)
      .order('date', { ascending: false });

    if (error) {
      console.error('施術データ取得エラー:', error.message);
    } else {
      setTreatments(data);
    }
  };

  fetchPatient();
  fetchTreatments();
}, [id]);


  if (!userId || !ability) {
    return <p>読み込み中...</p>;
  }

  // 施術登録処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTreatment.trim() === '') return;

    const { data: session } = await supabase.auth.getSession();
    const practitionerName = session?.session?.user?.user_metadata?.full_name || '匿名';

    const { error } = await supabase
      .from('treatments')
      .insert([{
        patient_id: id,
        content: newTreatment,
        body_part: bodyPart,
        date: date || new Date().toISOString(),
        location: location,
        memo: memo,
        patient_name: patient.name,
        practitioner: practitionerName,
        treatment: treatmentName
      }]);

    if (error) {
      console.error('施術登録エラー:', error.message);
    } else {
      setTreatments([{
        content: newTreatment,
        body_part: bodyPart,
        date: date || new Date().toISOString(),
        location: location,
        memo: memo,
        patient_name: patient.name,
        practitioner: practitionerName,
        treatment: treatmentName
      }, ...treatments]);

      setNewTreatment('');
      setBodyPart('');
      setLocation('');
      setMemo('');
      setTreatmentName('');
      setDate('');
    }
  };
  console.log('ログイン中のユーザーID:', userId);


  return (
    <div>
      <h2>患者詳細</h2>
      {patient && (
        <>
          <p>名前: {patient.name}</p>
          <p>患者ID: {patient.display_id}</p>

          {ability.can('update', 'Patient') && (
            <button onClick={() => alert('編集モードに入る処理を書く')}>
              編集する
            </button>
          )}

          <h3>施術記録</h3>

          {ability.can('create', 'Patient') && (
            <form onSubmit={handleSubmit}>
              <label>施術名</label>
              <input
                type="text"
                value={treatmentName}
                onChange={(e) => setTreatmentName(e.target.value)}
                placeholder="施術名"
              />
              <label>治療部位</label>
              <input
                type="text"
                value={bodyPart}
                onChange={(e) => setBodyPart(e.target.value)}
                placeholder="治療部位"
              />
              <label>施術場所</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="施術場所"
              />
              <label>施術日</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <label>施術内容</label>
              <textarea
                value={newTreatment}
                onChange={(e) => setNewTreatment(e.target.value)}
                placeholder="施術内容"
                rows={3}
              />
              <label>メモ</label>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="メモ"
                rows={2}
              />
              <button type="submit">登録</button>
            </form>
          )}

          <h4>施術記録一覧</h4>
          <ul>
            {treatments.map((treatment, index) => (
              <li key={index}>
                <p>施術日: {new Date(treatment.date).toLocaleString()}</p>
                <p>施術名: {treatment.treatment}</p>
                <p>部位: {treatment.body_part}</p>
                <p>場所: {treatment.location}</p>
                <p>施術者: {treatment.practitioner}</p>
                <p>内容: {treatment.content}</p>
                <p>メモ: {treatment.memo}</p>
                <hr />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PatientDetail;
