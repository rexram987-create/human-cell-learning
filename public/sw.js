import {cacheBundle,isBundleReady,deleteOldBundles} from './offline-cache.js';
const VERSION='__BUILD_VERSION__';
const env={cacheStorage:caches,origin:self.location.origin,version:VERSION,fetchFn:(url,init)=>fetch(url,init)};
let pending=null;
function ensureBundle(){if(!pending)pending=cacheBundle(env).finally(()=>pending=null);return pending}
self.addEventListener('install',event=>event.waitUntil(ensureBundle().then(result=>{if(!result.ready)throw new Error('Offline bundle incomplete')})));
self.addEventListener('activate',event=>event.waitUntil(deleteOldBundles(env).then(()=>self.clients.claim())));
self.addEventListener('message',event=>{
 if(event.data?.type==='APPLY_UPDATE'){self.skipWaiting();return}
 if(event.data?.type==='CACHE_BUNDLE')event.waitUntil(ensureBundle().then(result=>event.ports[0]?.postMessage({type:'BUNDLE_STATUS',...result})));
 if(event.data?.type==='BUNDLE_STATUS')event.waitUntil(isBundleReady(env).then(ready=>event.ports[0]?.postMessage({type:'BUNDLE_STATUS',ready})));
});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
 if(event.request.mode==='navigate')event.respondWith(fetch(event.request).catch(async()=>{const cache=await caches.open('cell-bundle-'+VERSION);return await cache.match(self.location.origin+'/index.html')||new Response('יש להתחבר לאינטרנט כדי לטעון את היישומון בפעם הראשונה.',{status:503,headers:{'Content-Type':'text/plain;charset=UTF-8'}})}));
 else if(url.pathname!=='/offline-assets.json'&&url.pathname!=='/sw.js'&&url.pathname!=='/offline-cache.js')event.respondWith(caches.open('cell-bundle-'+VERSION).then(async cache=>await cache.match(event.request.url)||fetch(event.request)));
});
