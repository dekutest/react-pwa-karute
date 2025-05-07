import React, { useState } from 'react';

function App() {
  const [patientName, setPatientName] = useState('');
  const [patientID, setPatientID] = useState('');
  const [team, setTeam] = useState('');
  const [treatment, setTreatment] = useState('');
  const [bodyPart, setBodyPart] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      patientName,
      patientID,
      team,
      treatment,
      bodyPart,
    };
    console.log('カルテデータ:', data);
    alert('カルテを保存しました！');
    setPatientName('');
    setPatientID('');
    setTeam('');
    setTreatment('');
    setBodyPart('');
  };

  return (
    <div className="container">
      <h1>カルテ入力</h1>
      <form onSubmit={handleSubmit}>
        <label>患者名前</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="患者名を入力"
        />

        <label>患者ID</label>
        <input
          type="text"
          value={patientID}
          onChange={(e) => setPatientID(e.target.value)}
          placeholder="患者IDを入力"
        />

        <label>所属チーム</label>
        <input
          type="text"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          placeholder="チーム名を入力"
        />

        <label>施術</label>
        <input
          type="text"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          placeholder="施術内容を入力"
        />

        <label>治療部位</label>
        <input
          type="text"
          value={bodyPart}
          onChange={(e) => setBodyPart(e.target.value)}
          placeholder="治療部位を入力"
        />

        <button type="submit">保存</button>
      </form>
    </div>
  );
}

export default App;
