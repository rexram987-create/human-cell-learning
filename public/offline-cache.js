const prefix='cell-bundle-';
const markerPath='/__offline_ready__';
export async function isBundleReady({cacheStorage,origin,version}){
 try {const name=prefix+version;if(!(await cacheStorage.keys()).includes(name))return false;const cache=await cacheStorage.open(name);const marker=await cache.match(origin+markerPath);if(!marker)return false;const data=await marker.json();if(data.version!==version||!Array.isArray(data.assets)||!data.assets.length)return false;const found=await Promise.all(data.assets.map(url=>cache.match(url)));return found.every(Boolean)}catch{return false}
}
export async function cacheBundle(env){
 const {cacheStorage,origin,version,fetchFn}=env;const name=prefix+version;
 if(await isBundleReady(env))return {ready:true,cacheName:name};
 try {
  const response=await fetchFn(origin+'/offline-assets.json',{cache:'no-store'});if(!response.ok)throw new Error('manifest');
  const manifest=await response.json();if(manifest.version!==version||!Array.isArray(manifest.assets)||!manifest.assets.length)throw new Error('version');
  const urls=manifest.assets.map(path=>new URL(path,origin).href);if(urls.some(url=>new URL(url).origin!==origin)||!urls.includes(origin+'/index.html'))throw new Error('assets');
  await cacheStorage.delete(name);const cache=await cacheStorage.open(name);
  const results=await Promise.allSettled(urls.map(async url=>{const r=await fetchFn(url,{cache:'reload'});if(!r.ok||r.type==='opaque')throw new Error('asset');await cache.put(url,r)}));
  if(results.some(r=>r.status==='rejected'))throw new Error('download');
  await cache.put(origin+markerPath,new Response(JSON.stringify({version,assets:urls}),{headers:{'Content-Type':'application/json'}}));
  if(!await isBundleReady(env))throw new Error('incomplete');
  return {ready:true,cacheName:name};
 }catch{await cacheStorage.delete(name);return {ready:false,error:'לא ניתן להשלים את שמירת חבילת הלימוד. בדקו את החיבור ונסו שוב.'}}
}
export async function deleteOldBundles(env){if(!await isBundleReady(env))return;for(const name of await env.cacheStorage.keys())if(name.startsWith(prefix)&&name!==prefix+env.version)await env.cacheStorage.delete(name)}
