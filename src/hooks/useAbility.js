import React from 'react';
import useAbility from '../hooks/useAbility';

const PatientDetail = ({ userId }) => {
  const ability = useAbility(userId);

  if (!ability) return <p>権限情報を取得中...</p>;

  return (
    <div>
      {ability.can('read', 'Patient') && <p>患者情報を表示できます。</p>}
      {ability.can('update', 'Patient') && <button>患者情報を編集</button>}
      {ability.can('create', 'Patient') && <button>患者を追加</button>}
      {!ability.can('read', 'Patient') && <p>権限がありません。</p>}
    </div>
  );
};

export default PatientDetail;
