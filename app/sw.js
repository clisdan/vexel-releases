/* Vexel Web service worker: keeps the whole app in the browser so it opens and runs with no internet.
   Generated at build time: the cache name and file list below are filled in by vite.config.ts. */
const CACHE = 'vexel-web-0.3.0-94ab5f49f0';
const ASSETS = ["./","./index.html","./apple-touch-icon.png","./assets/EULA-DTW5hzKd.js","./assets/NOTICES-WEB-BS_VjAdl.js","./assets/csv-DuRIujWx.js","./assets/index-C69xWw-8.js","./assets/index-DMLUQOdm.css","./assets/print-C_euKmAO.js","./assets/report-CjW_3ww1.js","./assets/tauri-stub-ChMuCyMX.js","./assets/xlsx-CvmReTta.js","./assets/zip-DpVAJ4Nf.js","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./manifest.webmanifest"];

self.addEventListener('install', (event) => {
  // Download every file of this version before it can take over.
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith('vexel-web-') && key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});

// The page asks to switch to the new version only when the host clicks Reload.
self.addEventListener('message', (event) => { if (event.data === 'skip-waiting') self.skipWaiting(); });

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    // Any page of the app (including #/display) is index.html: cache first, so it opens offline instantly.
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      return (await cache.match('./index.html')) || (await cache.match('./')) || fetch(req);
    })());
    return;
  }
  event.respondWith(caches.open(CACHE).then((c) => c.match(req, { ignoreSearch: true })).then((hit) => hit || fetch(req)));
});
