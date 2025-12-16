// const APP = {
//   SW: null,
//   init() {
//     if ('serviceWorker' in navigator) {
//       // 1. Register a service worker hosted at the root of site using the default scope
//       navigator.serviceWorker.register('/sw.js', {
//         scope: '/'
//       }).then(registration => {
//         APP.SW = registration.installing || registration.waiting || registration.active;
//         console.log('Service worker registered.');
//       })
//       // 2. See if the page is currently has a service worker
//       if (navigator.serviceWorker.controller) {
//         console.log('We have a service worker installed.')
//       }
//       // 3. Register a handler to detect when a new or updated service worker is installed.
//       navigator.serviceWorker.oncontrollerchange = (event) => {
//         console.log('New service worker activated.')
//       }
//       // 4. Remove/unregister service workers
//       // navigator.serviceWorker.getRegistrations().then(regs => {
//       //   for(let reg of regs) {
//       //     reg.unregister().then(isUnreg => console.log(isUnreg));
//       //   }
//       // })
//       // 5. Listen for messages from the service worker
//     } else {
//       console.log('Service workers are not supported.')
//     }
//   }
// }

// document.addEventListener('DOMContentLoaded', APP.init);


// Cache API
// caches.delete(name).then(isGone => {});
// caches.has(name).then(hasFile => {});
// caches.keys().then(namesArray => {});
// caches.match(Request).then(cacheRespone => {});
// caches.open(name).then(cache => {});

// cache = from caches.open()
// cache.add(Request).then(() => {});
// cache.addAll(Requests[]).then(() => {});
// add and addAll = fetch() + cache.put();
// cache.delete(Request, options).then((isGone) => {});
// cache.keys(Request, options).then((keysArray) => {});
// cache.match(Request, options).then((cacheRespone) => {});
// cache.matchAll(Request, options).then((cachesRespone) => {});
// cache.put(Request, options).then(() => {});
const APP = {
  SW: null,
  cacheName: 'assetCache1',
  init() {
   
    APP.startCaching();

    document.querySelector('header>h2').addEventListener('click', APP.deleteCache);
  },
  startCaching() {
    return caches.open(APP.cacheName).then((cache) => {
      console.log(`Cache ${APP.cacheName} opened`);

      let urlString = '/image/corgi.jpg?id=one';
      cache.add(urlString);

      let url = new URL('http://127.0.0.1:8080/image/corgi.jpg?id=two');
      cache.add(url);

      let req = new Request('/image/corgi.jpg?id=three');
      cache.add(req);

      cache.keys().then(keys => {
        keys.forEach((key, index) => {
          console.log(index, key);
        })
      });

      return cache;
    }).then((cache) => {
      // check if a cache exists
      caches.has(APP.cacheName).then(hasCache => {
        console.log(`${APP.cacheName} ${hasCache}`)
      })

      //search for files in caches
      let urlString = '/image/corgi.jpg?id=one';
      return caches.match(urlString).then((cacheResponse) => {
        if (
          cacheResponse && 
          cacheResponse.status < 400 && 
          cacheResponse.headers.has('content-type') &&
          cacheResponse.headers.has('content-type').match(/^image\//i) 
        ) {
          console.log('Found in the cache');
          return cacheResponse;
        } else {
          // no match found
          console.log('not found in the cache');
          return fetch(urlString).then((fetchResponse) => {
            if (!fetchResponse.ok) {
              throw fetchResponse.statusText;
            }
            cache.put(urlString, fetchResponse.clone())
            return fetchResponse;
          })
        }
      })
    }).then(response => {
      console.log(response);
    });
  },
  deleteCache() {
    caches.open(APP.cacheName).then(cache => {
      let url = '/image/corgi.jpg?id=one';

      cache.delete(url).then(isGone => {
        console.log(isGone)
      });

       cache.delete(APP.cacheName).then(isGone => {
        console.log(isGone)
      });
    })
  }
}

document.addEventListener('DOMContentLoaded', APP.init);