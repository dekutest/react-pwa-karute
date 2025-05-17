// 🔥 キャッシュバージョンを設定
const CACHE_VERSION = 'v3';  // バージョンを変更するだけでOK！
const CACHE_NAME = `react-pwa-karut-${CACHE_VERSION}`;

// 🔄 キャッシュしたいファイルのリスト
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
];

// ✅ インストール時にキャッシュを作成
self.addEventListener('install', (event) => {
  console.log(`🚀 Service Worker: インストール中... (バージョン: ${CACHE_VERSION})`);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('✅ キャッシュ作成:', CACHE_NAME);
      return cache.addAll(urlsToCache);
    })
  );
});

// 🔥 アクティベート時に古いキャッシュを削除
self.addEventListener('activate', (event) => {
  console.log(`🔧 Service Worker: アクティベート完了 (バージョン: ${CACHE_VERSION})`);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)  // 古いバージョンを削除
          .map((cacheName) => {
            console.log('🗑️ 古いキャッシュを削除:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
});

// 🌐 フェッチイベントの処理
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // ✅ Chrome拡張機能やAPIリクエストを除外
  if (url.protocol === 'chrome-extension:' || url.pathname.includes('/manifest.json')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return new Response('オフラインで利用できません');
      });
    })
  );
});
