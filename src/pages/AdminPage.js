import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAbility } from '../contexts/AbilityContext';

const AdminPage = () => {
  const ability = useAbility();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ability.can('manage', 'Admin')) {
      navigate('/'); // 権限ない人はトップへ戻す
    }
  }, [ability, navigate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">🛡 管理者ページ</h1>
      <ul className="space-y-4">
        <li>
          <Link to="/admin/teams" className="text-blue-600 underline">
            🔧 チーム管理
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="text-blue-600 underline">
            👤 ユーザー権限変更
          </Link>
        </li>
        <li>
          <Link to="/admin/pending-users" className="text-blue-600 underline">
            ⏳ 登録待ちユーザー管理
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminPage;
