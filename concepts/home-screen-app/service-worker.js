self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('butterfly-store').then((cache) => cache.addAll([
      '/snippets/components/home-screen-app/',
      '/snippets/components/home-screen-app/index.html',
      '/snippets/components/home-screen-app/index.js',
      '/snippets/components/home-screen-app/style.css',
      '/snippets/assets/peacock-300.png',
      '/snippets/assets/peacock-192.png',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});