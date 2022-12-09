importScripts("https://cdn.jsdelivr.net/npm/pouchdb@7.3.1/dist/pouchdb.min.js")
importScripts("/js/sw-db.js")

const STATIC_CACHE_NAME = 'static-cache-v1.1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1.1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1.1';

const cleanCache = (cacheName, maxSize)=>{
    caches.open(cacheName)
    .then((cache)=>{
        return cache.keys()
        .then((items)=>{
            console.log(items);
            if(items.length >= maxSize){
                cache.delete(items[0])
                .then(()=>{
                    return cleanCache(cacheName, maxSize);
                })
            }
        })
    })
}

self.addEventListener('install', (event) => {
    console.log('SW: Instalado');
    const respCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll([
            '/',
            '/index.html',
            '/pages/camarera.html',
            '/pages/history.html',
            '/pages/edificio.html',
            '/pages/home.html',
            "/pages/password.html",
            '/css/target.css',
            '/css/home.css',
            '/css/offline.css',
            '/css/login.css',
            '/css/mdb.min.css',
            '/js/mdb.min.js',
            'js/app.js',
            '/js/script.js',
            '/js/buildingController.js',
            '/js/camera.js',
            '/js/edit.js',
            '/js/roomController.js',
            '/js/verifySession.js',
            '/js/verifyConexion.js',
            '/img/lock.png',
            '/img/icono-login.png',
            '/img/icono-registro.png',
            '/img/crown.png',
            '/img/Corona.ico',
            '/img/icons/android-launchericon-48-48.png',
            '/img/icons/android-launchericon-72-72.png',
            '/img/icons/android-launchericon-96-96.png',
            '/img/icons/android-launchericon-192-192.png',
            '/img/icons/android-launchericon-144-144.png',
            '/img/icons/android-launchericon-512-512.png',
            'manifest.json'
        ])

    }); const respCacheInmutable = caches.open(INMUTABLE_CACHE_NAME).then((cache)=>{
        return cache.addAll([
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-solid-900.woff2',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-regular-400.woff2',
            'https://assets5.lottiefiles.com/packages/lf20_ijqswcfu.json',
            'https://assets1.lottiefiles.com/packages/lf20_sg3gnsmo.json',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
            'https://kit.fontawesome.com/64d58efce2.js',
            'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
            'https://cdn.jsdelivr.net/npm/pouchdb@7.3.1/dist/pouchdb.min.js',
            'https://cdn.jsdelivr.net/npm/sweetalert2@11'
        ])
    });
    event.waitUntil(Promise.all([respCacheInmutable, respCache]));
});

self.addEventListener('activate', (event) => {
    const promDeleteCaches = caches.keys().then((items) => {
        items.forEach((key) => {
            if (key !== STATIC_CACHE_NAME && key.includes('static')) {
                return caches.delete(key);
            }
        });
    });
    event.waitUntil(promDeleteCaches);
});

self.addEventListener('fetch', (event) => {

    if (event.request.clone().method === 'POST' || event.request.clone().method === 'PUT') {
        let genericResponse = fetch(event.request.clone())
            .then((response) => {
                return response
            })
            .catch((err) => {
                if (self.registration.sync.register('online')) {
                    return event.request.clone().json().then((json) => {
                        return savePostOffline(
                            json,
                            event.request.url,
                            event.request.method,
                            event.request.headers.get("Authorization")
                        )
                    })
                }
            })

        event.respondWith(genericResponse)
    } else{
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse);
                    })
                    return networkResponse.clone()
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        )
    }
})

 self.addEventListener('sync', (event) => {

    if (event.tag == "online") {
        event.waitUntil(
            getAllPostOffline().then((document) => {
                document.rows.map((item, i) => {
                    fetch(item.doc.url, {
                        method: item.doc.method,
                        headers: {
                            'Content-type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': item.doc.token
                        },
                        body: JSON.stringify(item.doc.body)
                    })
                        .then((response) => {
                            db.remove(item.doc._id, item.doc._rev);
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })

            })

        )
    }
})
