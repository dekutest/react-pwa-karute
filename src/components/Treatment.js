import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchPatientName } from '../api/fetchPatientDetails';
// eslint-disable-next-line no-unused-vars
import { addPatient, updatePatient, deletePatient } from '../api/patientOperations';

const Treatment = () => {
  const { patientId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState('');
  const [editName, setEditName] = useState('');
  const [editTeam, setEditTeam] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // 編集モード管理

  useEffect(() => {
    // 新規作成ページかどうかをURLから直接判定
    if (location.pathname.includes('/treatment/new')) {
      setIsNew(true);
      setIsEditing(true); // 新規作成時は編集モードON
      return;
    }

    // 既存患者情報の取得（IDが数値またはUUIDである場合のみ）
    if (patientId && patientId !== 'undefined') {
      const getPatientDetails = async () => {
        try {
          const name = await fetchPatientName(patientId);
          if (name) {
            setPatientName(name);
            setEditName(name);
          }
        } catch (error) {
          console.error("患者情報の取得に失敗しました:", error.message);
        }
      };
      getPatientDetails();
    }
  }, [location, patientId]);

  // 患者を追加または更新
  const handleSave = async () => {
    try {
      if (isNew) {
        const result = await addPatient(editName, editTeam);
        if (result && result.id) {
          alert('患者を追加しました！');
          setIsNew(false);  // 新規モード解除
          // 正しく生成されたIDでリダイレクト
          navigate(`/treatment/${result.id}`);
        } else {
          alert('患者追加に失敗しました');
        }
      } else {
        if (!patientId || patientId === 'undefined') {
          alert('無効な患者IDです');
          return;
        }
        const result = await updatePatient(patientId, editName, editTeam);
        if (result) {
          alert('患者情報を更新しました！');
        } else {
          alert('患者情報の更新に失敗しました');
        }
      }
      setIsEditing(false); // 編集モードをOFF
    } catch (error) {
      console.error('保存中にエラーが発生:', error.message);
    }
  };

  return (
    <div>
      <h2>{isNew ? '新規患者作成ページ' : '患者詳細ページ'}</h2>

      <button onClick={() => navigate('/')}>
        トップページに戻る
      </button>

      <div>
        <h3>{isNew ? '患者情報を入力してください' : `患者名: ${patientName}`}</h3>

        {!isNew && !isEditing && (
          <button onClick={() => setIsEditing(true)} style={{ marginBottom: '10px' }}>
            編集
          </button>
        )}

        {(isNew || isEditing) && (
          <>
            <input
              placeholder="患者名"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={{ margin: '5px', padding: '5px' }}
            />
            <input
              placeholder="チーム"
              value={editTeam}
              onChange={(e) => setEditTeam(e.target.value)}
              style={{ margin: '5px', padding: '5px' }}
            />
            <button onClick={handleSave} style={{ margin: '5px', padding: '5px' }}>
              {isNew ? '追加' : '保存'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Treatment;
