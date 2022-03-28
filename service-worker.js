/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-c1e7d40';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./vybijena_002.html","./vybijena_005.html","./vybijena_006.html","./vybijena_007.html","./vybijena_008.html","./vybijena_009.html","./vybijena_010.html","./vybijena_011.html","./vybijena_012.html","./vybijena_013.html","./vybijena_014.html","./vybijena_015.html","./vybijena_016.html","./vybijena_017.html","./vybijena_018.html","./vybijena_019.html","./vybijena_020.html","./vybijena_021.html","./vybijena_022.html","./vybijena_023.html","./vybijena_024.html","./vybijena_025.html","./vybijena_026.html","./vybijena_027.html","./vybijena_028.html","./vybijena_029.html","./vybijena_030.html","./vybijena_031.html","./vybijena_032.html","./vybijena_033.html","./vybijena_034.html","./vybijena_035.html","./vybijena_036.html","./vybijena_037.html","./vybijena_038.html","./vybijena_039.html","./vybijena_040.html","./vybijena_041.html","./vybijena_042.html","./vybijena_043.html","./vybijena_044.html","./vybijena_045.html","./vybijena_046.html","./vybijena_047.html","./vybijena_048.html","./vybijena_049.html","./vybijena_050.html","./vybijena_051.html","./vybijena_052.html","./vybijena_053.html","./vybijena_054.html","./vybijena_055.html","./vybijena_056.html","./vybijena_057.html","./vybijena_058.html","./vybijena_059.html","./vybijena_060.html","./vybijena_061.html","./vybijena_062.html","./vybijena_063.html","./vybijena_064.html","./vybijena_065.html","./vybijena_066.html","./vybijena_067.html","./vybijena_068.html","./vybijena_069.html","./vybijena_070.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001_fmt.png","./resources/image002_fmt.png","./resources/obalka_vybijena_fmt.png","./resources/upoutavka_eknihy_fmt.png","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
