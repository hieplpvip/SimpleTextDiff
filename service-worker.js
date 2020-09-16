const CACHE_NAME = 'simpletextdiff';

const urlsToCache = [
  './',
  './index.html',
  './favicon.png',
  './static/css/bootstrap.min.css',
  './static/css/diff2html.min.css',
  './static/css/theme.css',
  './static/img/keyboard_icon.png',
  './static/js/jquery-3.5.0.min.js',
  './static/js/jquery.hotkeys.js',
  './static/js/bootstrap.bundle.min.js',
  './static/js/diff.min.js',
  './static/js/diff2html.min.js',
  './static/js/main.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    (async function () {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(urlsToCache);
    })()
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async function () {
      const response = await caches.match(event.request);
      return response || fetch(event.request);
    })()
  );
});
