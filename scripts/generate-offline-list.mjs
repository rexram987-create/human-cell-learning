import {readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
async function walk(dir){let result=[];for(const entry of await readdir(dir,{withFileTypes:true})){const path=dir+'/'+entry.name;result.push(...(entry.isDirectory()?await walk(path):[path]))}return result}
const paths=(await walk('dist')).filter(p=>!p.endsWith('/sw.js')&&!p.endsWith('/offline-assets.json')).sort();
const hash=createHash('sha256');for(const p of paths){hash.update(p);hash.update(await readFile(p))}
const version=hash.digest('hex').slice(0,16);
await writeFile('dist/offline-assets.json',JSON.stringify({version,assets:paths.map(p=>p.slice(4))}));
const sw=await readFile('dist/sw.js','utf8');await writeFile('dist/sw.js',sw.replace('__BUILD_VERSION__',version));
console.log('Offline bundle:',paths.length,'assets; version',version);
