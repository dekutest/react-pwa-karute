import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

const AdminTeams = () => {
  const [allTeams, setAllTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [filterMode, setFilterMode] = useState('all');

  // 仮のユーザー情報（本番では context から取得）
  const user = {
    teamIds: ['team-a', 'team-c'],
  };

  // 🔄 チーム一覧を取得
  useEffect(() => {
    const fetchTeams = async () => {
      const { data, error } = await supabase.from('teams').select('*');
      if (error) {
        console.error('チーム取得失敗:', error);
      } else {
        setAllTeams(data);
      }
    };

    fetchTeams();
  }, []);

  // 🆕 チーム追加処理
const handleAddTeam = async () => {
  const name = newTeamName.trim();

  // 🚫 空欄チェック
  if (!name) {
    alert('チーム名を入力してください');
    return;
  }

  // 🔍 重複チェック
  const { data: existingTeams, error: checkError } = await supabase
    .from('teams')
    .select('id')
    .eq('name', name);

  if (checkError) {
    console.error('重複チェック失敗:', checkError);
    alert('チームの確認中にエラーが発生しました');
    return;
  }

  if (existingTeams.length > 0) {
    alert('同じ名前のチームが既に存在します');
    return;
  }

  // ✅ 追加処理
  const { data, error } = await supabase
    .from('teams')
    .insert([{ name }])
    .select();

  if (error) {
    console.error('追加失敗:', error);
    alert('チームの追加に失敗しました');
  } else {
    setAllTeams([...allTeams, ...data]);
    setNewTeamName('');
  }
};



  const filteredTeams = allTeams.filter(team => {
    if (filterMode === 'related') {
      return user.teamIds.includes(team.id);
    } else if (filterMode === 'unrelated') {
      return !user.teamIds.includes(team.id);
    } else {
      return true;
    }
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">チーム管理</h1>

      {/* 🆕 チーム追加フォーム */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="新しいチーム名を入力"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button onClick={handleAddTeam} className="bg-blue-500 text-white px-4 py-1 rounded">
          追加
        </button>
      </div>

      {/* 🔘 表示切替ボタン */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setFilterMode('all')} className="border px-4 py-2">
          全体表示
        </button>
        <button onClick={() => setFilterMode('related')} className="border px-4 py-2">
          関係チームのみ
        </button>
        <button onClick={() => setFilterMode('unrelated')} className="border px-4 py-2">
          関係していないチームのみ
        </button>
      </div>

      {/* 📋 チーム一覧表示 */}
      <ul>
        {filteredTeams.map(team => (
          <li key={team.id} className="mb-2">
            {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTeams;
