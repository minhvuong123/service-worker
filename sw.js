console.log('SW is running!')

// console.log({ self });

self.addEventListener('install', (event) => {
  // service worker is installed.
  console.log('installed');
});

self.addEventListener('activate', (event) => {
  // service worker is activated
  console.log('activated');
});

self.addEventListener('fetch', (event) => {
  // service worker intercepted a fetch call
  console.log('intercepted a http request', event.request);
});

self.addEventListener('message', (event) => {
  // message from webpage
  console.log('installed');
});