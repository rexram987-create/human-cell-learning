// @vitest-environment node
import {readFileSync} from 'node:fs';
import {test,expect} from 'vitest';
test('SPA fallback does not intercept static PWA modules and fonts',()=>{const config=JSON.parse(readFileSync('vercel.json','utf8'));const fallback=new RegExp('^'+config.rewrites[0].source+'$');for(const url of ['/offline-cache.js','/sw.js','/fonts/heebo-3.ttf','/images/nucleus.png','/assets/index.js','/manifest.webmanifest','/offline-assets.json'])expect(fallback.test(url),url).toBe(false);expect(fallback.test('/lesson/nucleus')).toBe(true)});
