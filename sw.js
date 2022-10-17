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
        const respCache = caches.open('Static').then((cache) => {
                return cache.addAll([
                        '/',
                        '/index.html',
                        '/css/styleCard.css',
                        'js/card.js',
                        '/manifest.json',
                        '/js/app.js',
                ])

        }); const respCacheInmutable = caches.open(INMUTABLE_CACHE_NAME).then((cache) => {
                return cache.addAll([
                        'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
                        'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js',
                        'https://code.jquery.com/jquery-3.6.1.js'
                ])
        });
        event.waitUntil(Promise.all([respCacheInmutable, respCache]));
});

self.addEventListener('fetch', (event) => {
        const resp = caches.match(event.request).then((respCache) => {
                if (respCache) {
                        return respCache;
                }
                //No está en cache, entonces Web
                return fetch(event.request).then((respWeb) => {
                        caches.open(DYNAMIC_CACHE_NAME)
                                .then((cache) => {
                                        cache.put(event.request, respWeb);
                                        cleanCache(DYNAMIC_CACHE_NAME, 5);
                                })
                        return respWeb.clone();
                })
        })
        event.respondWith(resp);
});