const assert=require('node:assert/strict'),C=require('../docs/catalog.js'),S=require('../docs/recommender.js');
const base={items:C.items,anchor:C.items[14],locks:{},owned:new Set(C.owned),mode:'one',budget:75,pref:{calm:0,colors:{},styles:{}},occasion:'office',nonce:1};
function check(r,c){for(let o of r.outfits){let its=o.ids.map(id=>c.items.find(i=>i.id===id));assert(o.ids.includes(c.anchor.id));assert.equal(new Set(o.ids).size,o.ids.length);assert.equal(new Set(its.map(i=>i.category)).size,its.length);assert(its.some(i=>i.category==='shoes'));assert(its.some(i=>i.category==='dress')||['top','bottom'].every(k=>its.some(i=>i.category===k)));assert(its.filter(i=>!c.owned.has(i.id)).length<=(c.mode==='closet'?0:1));assert.equal(o.spend,S.spend(its,c.owned));assert(o.spend<=c.budget);for(let id of Object.values(c.locks))assert(o.ids.includes(id));}assert.equal(new Set(r.outfits.map(o=>o.ids.slice().sort().join())).size,r.outfits.length)}
let scenarios=0;for(let occasion of ['office','weekend','dinner'])for(let mode of ['closet','one'])for(let budget of [0,25,50,100])for(let anchorId of ['cc-14','cc-0','cc-26','cc-42','cc-34','cc-52']){let c={...base,anchor:C.items.find(i=>i.id===anchorId),occasion,mode,budget};let r=S.recommend(c);assert(r.outfits.length);check(r,c);scenarios++}
{let c={...base,locks:{top:'cc-4',shoes:'cc-45'}};let r=S.recommend(c);assert(r.outfits.length);check(r,c)}
{let c={...base,locks:{top:'cc-8',outerwear:'cc-35'}};assert(S.recommend(c).error.includes('Two locked'))}
{let c={...base,locks:{dress:'cc-26'}};assert(S.recommend(c).error.includes('dress'))}
{let c={...base,locks:{outerwear:'cc-35'},budget:10};assert(S.recommend(c).error.includes('exceeds'))}
{let c={...base,owned:new Set(['cc-14']),mode:'closet'};assert.equal(S.recommend(c).outfits.length,0)}
{let c={...base,owned:new Set(['cc-14']),mode:'one'};assert.equal(S.recommend(c).outfits.length,0)}
{let c={...base,anchor:C.items[8],mode:'closet'};assert(S.recommend(c).error.includes('not in this wardrobe'))}
{let a=[C.items[8],C.items[14],C.items[42]],c={...base,pref:{calm:2}};assert(S.score(a,c)<S.score(a,base));let o=[C.items[0],C.items[14],C.items[42]],love={...base,pref:{colors:{ivory:3},styles:{classic:3}}};assert(S.score(o,love)>S.score(o,base));}
{let r=S.recommend(base);assert.equal(r.outfits.length,3);assert(S.reasons(r.outfits[0],base).some(s=>s.includes('starting piece')))}
{let g1=C.art(C.items[0]),g2=C.art(C.items[14]);assert(g1.includes('url(#g-cc-0)'));assert(g2.includes('url(#g-cc-14)'));assert.equal(C.items.length,60)}
{let c={...base,owned:new Set(['cc-14','cc-0','cc-42']),mode:'closet'};assert.equal(S.recommend(c).outfits.length,1)}
console.log(`PASS: ${scenarios} recommendation scenarios plus lock conflicts, sparse wardrobes, preference effects, explanations, and catalog artwork references.`);
