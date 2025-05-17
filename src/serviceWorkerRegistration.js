// サービスワーカーを登録する関数
export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('✅ Service Worker登録成功:', registration);
        })
        .catch((error) => {
          console.error('❌ Service Worker登録失敗:', error);
        });
    });
  }
}

// サービスワーカーを解除する関数
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
        console.log('🗑️ Service Worker解除:', registration);
      });
    });
  }
}
// ✅ サービスワーカーとキャッシュを完全クリア
export function clearCacheAndSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });
    caches.keys().then((names) => {
      return Promise.all(
        names.map((name) => caches.delete(name))
      );
    });
    console.log('✅ キャッシュとサービスワーカーを完全クリアしました');
    alert('キャッシュとサービスワーカーをクリアしました。ページをリロードしてください。');
  }
}
