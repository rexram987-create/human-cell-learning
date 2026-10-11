import {test,expect} from 'vitest';
import {lessons,sources,assets,categories,glossary} from '../src/content';
test('complete original lessons link to checked sources and licensed assets',()=>{
expect(lessons.length).toBeGreaterThanOrEqual(27);
expect(new Set(lessons.map(l=>l.id)).size).toBe(lessons.length);
for(const l of lessons){expect(categories.some(c=>c.id===l.categoryId)).toBe(true);expect(l.simple.length).toBeGreaterThan(1);expect(l.deeper.length).toBeGreaterThan(0);expect(l.sourceIds.length).toBeGreaterThan(0);for(const id of l.sourceIds)expect(sources.some(s=>s.id===id)).toBe(true);for(const id of l.imageIds)expect(assets.some(a=>a.id===id)).toBe(true);for(const id of l.relatedIds)expect(lessons.some(x=>x.id===id)).toBe(true);expect(l.verifiedAt).toMatch(/^2026-10-11$/);}
expect(glossary.length).toBeGreaterThanOrEqual(25);for(const g of glossary)expect(lessons.some(l=>l.id===g.lessonId)).toBe(true);
for(const a of assets){expect(a.creator).toBeTruthy();expect(a.sourceUrl).toMatch(/^https:/);expect(a.licenseUrl).toMatch(/^https:/);expect(a.path).toMatch(/^\/images\//);}
});
