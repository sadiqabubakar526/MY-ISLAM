var CACHE_NAME = 'my-islam-cache';
let urlsToPrefetch = ['/', '/asmaa', '/quran', '/surah', '/calendar', '/hadith'];

let deferredPrompt;

self.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPromotion();
});

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opened cache');
      return cache
        .addAll(
          urlsToPrefetch.map(function (urlToPrefetch) {
            return new Request(urlToPrefetch, { mode: 'no-cors' });
          })
        )
        .then(function () {
          console.log('All resources have been fetched and cached.');
        });
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service worker now ready to handle fetches!');
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then(function (response) {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          let responseToCache = response.clone();

          caches.open(CACHE_NAME).then(function (cache) {
            if (event.request === 'GET') {
              cache.put(event.request, responseToCache);
            }
          });

          return response;
        })
        .catch(unableToResolve);
    })
  );
});

function unableToResolve() {
  console.log('Service worker fetch request failed in both cache and network.');

  return new Response('<h1>Service Unavailable</h1>', {
    status: 503,
    statusText: 'Service Unavailable',
    headers: new Headers({
      'Content-Type': 'text/html',
    }),
  });
}
