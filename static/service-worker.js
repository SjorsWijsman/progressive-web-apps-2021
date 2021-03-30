const CORE_CACHE = 'core-cache';
const CORE_ASSETS = [
  '/',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/resources/icons/icon-192x192.png',
  '/resources/icons/icon-256x256.png',
  '/resources/icons/icon-384x384.png',
  '/resources/icons/icon-512x512.png',
];

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', {
      scope: '.',
    })
    .then((registration) => {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, (err) => {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


// Cache CORE_ASSETS on install
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CORE_CACHE)
      .then((cache) => {
        return cache.addAll(CORE_ASSETS);
      })
  );
});

// Get fetch requests from cache, store new html fetch requests to cache
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request)
    .then(response => {
      return response || fetch(event.request).then(res => {
        if (res.type === 'basic' && res.url.endsWith('.html')) {
          caches.open(CORE_CACHE)
            .then((cache) => {
              cache.add(res.url, res)
            })
        }
        return res;
      });
    })
  )
});
