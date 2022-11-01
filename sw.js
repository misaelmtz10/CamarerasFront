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
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
            'https://kit.fontawesome.com/64d58efce2.js',
            'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
            '/js/mdb.min.js',
            'js/app.js',
            '/js/script.js',
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
            '/css/mdb.min.css',
            '/js/mdb.min.js',
            '/pages/offline.html',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-solid-900.woff2',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-regular-400.woff2',
            'https://assets5.lottiefiles.com/packages/lf20_ijqswcfu.json',
            'https://assets1.lottiefiles.com/packages/lf20_sg3gnsmo.json'
        ])
    });
    event.waitUntil(Promise.all([respCacheInmutable, respCache]));
});

self.addEventListener('fetch', (event) =>{
    const resp = caches.match(event.request).then((respCache)=>{
         if(respCache){
             return respCache;
         }
         //No está en cache, entonces Web
         return fetch(event.request).then((respWeb)=>{
             caches.open(DYNAMIC_CACHE_NAME)
             .then((cache)=>{
                 cache.put(event.request, respWeb);
                 cleanCache(DYNAMIC_CACHE_NAME,5);
             })
             return respWeb.clone();
         })
     }).catch(err=>{
        if(event.request.headers.get('accept').includes('text/html')){
            return caches.match('/pages/offline.html');
        }
     })
     event.respondWith(resp);
 });
