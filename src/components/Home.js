import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <h1>電子カルテアプリ</h1>
      <p>患者リストや施術情報の管理を行います。</p>
      <nav>
        <ul>
          <li><a href="/patients">患者リスト</a></li>
          <li><a href="/treatment">施術入力</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
