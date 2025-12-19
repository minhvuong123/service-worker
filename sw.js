console.log('SW is running!')

// console.log({ self });

self.addEventListener('install', (event) => {
  // service worker is installed.
  // event.skipWaiting(); // skip wating to activate -- link to claims
  // but ... the page will not use the new sw yet
  // console.log('installed');
  // teja();
  // manuel();
  event.waitUntil(
    Promise.resolve()
    .then(() => {
      manuel();
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('Promise function');
          resolve();
        }, 2000)
      })
    })
    .then(() => {
      console.log('installed');
    })
  );
});

function teja () {
  console.log('teja');
}

function manuel () {
  console.log('manuel');
}

self.addEventListener('activate', (event) => {
  // service worker is activated
  console.log('activated - this worker not used until page reloads');
  // clients.claims().then(() => {
  //   // claim means that the html file will use this new service worker.
  //   console.log('The service worker has now claimed all pages so they use the new service worker.')
  // })
});

self.addEventListener('fetch', (event) => {
  // service worker intercepted a fetch call
  console.log('intercepted a http request', event.request, 'from', event.clientId);
});

self.addEventListener('message', (event) => {
  // message from webpage
  console.log('installed');
});