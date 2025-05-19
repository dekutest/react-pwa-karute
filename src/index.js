// Service Workerの完全無効化
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (let registration of registrations) {
      registration.unregister().then(function(boolean) {
        if (boolean) {
          console.log('Service Workerが正常に解除されました');
        }
      });
    }
  });
}
