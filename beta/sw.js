const C='harita-cetveli-beta-v4';const F=['fonts/barlow-condensed-latin-500-normal.woff2','fonts/barlow-condensed-latin-600-normal.woff2','fonts/barlow-condensed-latin-700-normal.woff2','fonts/barlow-condensed-latin-ext-500-normal.woff2','fonts/barlow-condensed-latin-ext-600-normal.woff2','fonts/barlow-condensed-latin-ext-700-normal.woff2','fonts/barlow-latin-400-normal.woff2','fonts/barlow-latin-500-normal.woff2','fonts/barlow-latin-600-normal.woff2','fonts/barlow-latin-ext-400-normal.woff2','fonts/barlow-latin-ext-500-normal.woff2','fonts/barlow-latin-ext-600-normal.woff2','icons/icon-180.png','icons/icon-192.png','icons/icon-512.png','icons/maskable-512.png','index.html','manifest.webmanifest','./'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k.startsWith('harita-cetveli-beta')).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
const put=(k,res)=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(k,cp))}return res};
const fromCache=q=>caches.match(q,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'));
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;const u=new URL(q.url);if(u.origin!==location.origin)return;
 const page=q.mode==='navigate'||/\/$|\.html$|\.webmanifest$/.test(u.pathname);
 if(page){e.respondWith(new Promise(ok=>{let done=false;const fin=r=>{if(!done&&r){done=true;ok(r)}};
  const t=setTimeout(()=>fromCache(q).then(fin),3500);
  fetch(q,{cache:'no-cache'}).then(res=>{clearTimeout(t);fin(put(q.mode==='navigate'?'./index.html':q,res))}).catch(()=>fromCache(q).then(r=>{clearTimeout(t);if(r)fin(r);else if(!done){done=true;ok(Response.error())}}))}));return}
 e.respondWith(caches.match(q,{ignoreSearch:true}).then(r=>r||fetch(q).then(res=>put(q,res))));
});
