import React from 'react';
import { clearCacheAndSW } from '../serviceWorkerRegistration';

function CacheClearButton() {
  return (
    <button onClick={clearCacheAndSW} style={{ margin: '10px', padding: '5px', backgroundColor: '#f0ad4e', color: '#fff' }}>
      キャッシュとSWをクリア
    </button>
  );
}

export default CacheClearButton;
