import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>ホームページ</h2>
      <p>トップページにようこそ！</p>

      {/* 患者一覧ページへのリンク */}
      <button style={{ marginTop: '10px', padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        <Link to="/patients" style={{ textDecoration: 'none', color: 'white' }}>
          患者一覧へ移動
        </Link>
      </button>
    </div>
  );
}

export default Home;
