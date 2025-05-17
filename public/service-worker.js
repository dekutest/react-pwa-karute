// ✅ キャッシュバージョンを更新
const CACHE_VERSION = 'v4';
const CACHE_NAME = `react-pwa-karut-${CACHE_VERSION}`;
const urlsToCache = [
  '/dekutest/react-pwa-karut/',
  '/dekutest/react-pwa-karut/index.html',
  '/dekutest/react-pwa-karut/manifest.json',
  '/dekutest/react-pwa-karut/favicon.ico',
  '/dekutest/react-pwa-karut/logo192.png',
  '/dekutest/react-pwa-karut/logo512.png'
];

self.addEventListener('install', (event) => {
  console.log(`🚀 Service Worker: インストール中... (バージョン: ${CACHE_VERSION})`);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', (event) => {
  console.log(`🔧 Service Worker: アクティベート完了 (バージョン: ${CACHE_VERSION})`);
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // ✅ manifest.jsonのパス解決
  if (url.pathname.endsWith('/manifest.json')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // ✅ キャッシュからのフェッチ
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return new Response('オフラインで利用できません');
      });
    })
  );
});
