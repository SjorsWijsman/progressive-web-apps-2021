const CORE_CACHE = 'core-cache';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/service-worker.js',
  '/resources/icons/icon-192x192.png',
  '/resources/icons/icon-256x256.png',
  '/resources/icons/icon-384x384.png',
  '/resources/icons/icon-512x512.png',
  '/offline.html',
];
const OFFLINE_URL = "offline.html";

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
  self.skipWaiting();
});

// Get fetch requests from cache, store new html fetch requests to cache
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(caches.match(event.request).then((response) => {
      return response || fetch(event.request).then(res => {
        caches.open(CORE_CACHE).then((cache) => {
          cache.add(event.request.url, res)
        })
        return res;
      })
    }).catch((error) => {
      console.log("haha" + error);
      return caches.open(CORE_CACHE).then((cache) => {
        return cache.match(OFFLINE_URL);
      })
    }))
  } else {
    event.respondWith(caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    }))
  }
});
