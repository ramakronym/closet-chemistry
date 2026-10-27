/* Explicit signals are bounded, occasion-specific, and never an item-level boost. */
(function(root){
const blank=()=>({calm:0,frugal:false,colors:{},styles:{},signals:0});
function normalize(p={}){const out=blank();out.calm=Math.max(0,Math.min(1,Number(p.calm)||0));out.frugal=!!p.frugal;out.signals=Math.max(0,Math.min(100,Number(p.signals)||0));for(let key of ['colors','styles'])out[key]=Object.fromEntries(Object.entries(p[key]||{}).filter(([k,v])=>/^[a-z]+$/.test(k)&&Number.isFinite(v)&&v>=0).map(([k,v])=>[k,Math.min(1,v)]));return out;}
function learn(p,type,items,anchorId){let out=normalize(p);out.signals=Math.min(100,out.signals+1);if(type==='love'){let companions=items.filter(i=>i.id!==anchorId);for(let key of ['colors','styles']){for(let k of Object.keys(out[key]))out[key][k]*=.95;let attrs=new Set(companions.map(i=>key==='colors'?i.color:i.style));for(let k of attrs)out[key][k]=Math.min(1,(out[key][k]||0)+(key==='colors'?.15:.2));}}if(type==='bold')out.calm=Math.min(1,out.calm+.25);if(type==='price')out.frugal=true;return out;}
root.StylePreferences={blank,normalize,learn};if(typeof module!=='undefined')module.exports=root.StylePreferences;
})(typeof window!=='undefined'?window:globalThis);
