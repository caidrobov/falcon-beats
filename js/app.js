// ===== CONFIGURACIÓN — edita aquí =====
const WHATSAPP = "";            // número con indicativo, solo dígitos. Ej.: "573001234567"
const EMAIL = "soyfalconproducer@gmail.com";
const CURRENCY = "COP";

const RELEASES = [
  {title:"Látigo", by:"Kilate Ramos x Falcon Beats", tags:["new","collab"], genre:"Urbano",
   links:[["Video oficial","https://www.youtube.com/watch?v=BZU5-HyJo1o"],["TikTok","https://www.tiktok.com/@falcon_beats/video/7697419320351132948"]]},
  {title:"Boca con Boca", by:"Kilate Ramos · Prod. Falcon Beats", tags:["collab"], genre:"Afrobeat",
   links:[["TikTok","https://www.tiktok.com/@falcon_beats/video/7635126493214985493"],["Spotify","https://open.spotify.com/artist/5pQvD1IF7VIeNDOgOgMZUM"]]},
  {title:"Controla", by:"Open The Jail · Prod. Falcon Beats", tags:["collab"], genre:"Reggaetón",
   links:[["Detrás de cámaras","https://www.tiktok.com/@falcon_beats/video/7572263361480527125"]]}
];

// Licencias: precio en pesos. "price: null" = a negociar.
const LICENSES = [
  {id:"basica",  name:"BASIC",     price:80000,  files:"MP3 sin marca de agua", items:["Hasta 50.000 reproducciones","1 video musical","Uso no exclusivo"]},
  {id:"premium", name:"EXTENDED",  price:150000, files:"WAV + MP3", items:["Hasta 500.000 reproducciones","Videos ilimitados","Presentaciones en vivo"], best:true},
  {id:"pistas",  name:"UNLIMITED", price:300000, files:"WAV + stems (trackout)", items:["Reproducciones ilimitadas","Todas las pistas por separado para mezclar","Uso comercial completo"]},
  {id:"exclusiva",name:"EXCLUSIVE",price:null, files:"WAV + stems + derechos exclusivos", items:["El beat es solo tuyo","Se retira de la tienda","Precio a negociar"]}
];

// Añade category y mood para habilitar esos filtros. Reemplaza "src" con tu MP3.
const BEATS = [];
// ======================================

const $=id=>document.getElementById(id);
const money=n=>n==null?"A negociar":"$"+n.toLocaleString("es-CO")+" "+CURRENCY;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

const spotifyPlayback={isPlaying:false,position:0,playingURI:"",updatedAt:0};
window.onSpotifyIframeApiReady=IFrameAPI=>{
  IFrameAPI.createController($("spotify-embed"),{uri:"spotify:artist:5pQvD1IF7VIeNDOgOgMZUM",width:"100%",height:452},controller=>{
    controller.addListener("playback_update",({data})=>{
      spotifyPlayback.isPlaying=!data.isPaused&&!data.isBuffering;
      spotifyPlayback.position=data.position;
      spotifyPlayback.playingURI=data.playingURI;
      spotifyPlayback.updatedAt=performance.now();
    });
    controller.play();
  });
};
const spotifyApiScript=document.createElement("script");
spotifyApiScript.src="https://open.spotify.com/embed/iframe-api/v1";
spotifyApiScript.async=true;
spotifyApiScript.onerror=()=>{
  const fallback=document.createElement("iframe");
  fallback.title="Falcon Beats en Spotify";
  fallback.src="https://open.spotify.com/embed/artist/5pQvD1IF7VIeNDOgOgMZUM?utm_source=generator&theme=0";
  fallback.allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
  $("spotify-embed").replaceWith(fallback);
};
document.head.append(spotifyApiScript);

// ---- vistas (#inicio / #beats / #musica / #lanzamiento / #estudio / #biografia / #contacto)
const falconMenu=$("falconMenu");
const menuToggle=$("falconMenuToggle");
const mobileNav=matchMedia("(max-width: 1020px)");
function setMobileMenu(open){
  const isOpen=open&&mobileNav.matches;
  falconMenu.classList.toggle("open",isOpen);
  menuToggle.setAttribute("aria-expanded",String(isOpen));
  menuToggle.setAttribute("aria-label",isOpen?"Cerrar menú":"Abrir menú");
  menuToggle.textContent=isOpen?"×":"☰";
}
menuToggle.addEventListener("click",()=>setMobileMenu(menuToggle.getAttribute("aria-expanded")!=="true"));
falconMenu.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>setMobileMenu(false)));
document.addEventListener("keydown",event=>{
  if(event.key==="Escape"&&menuToggle.getAttribute("aria-expanded")==="true"){
    setMobileMenu(false);
    menuToggle.focus();
  }
});
function showView(){
  const views=["inicio","beats","musica","lanzamiento","estudio","biografia","contacto"];
  const v=views.includes(location.hash.slice(1))?location.hash.slice(1):"inicio";
  views.forEach(view=>{ $(`view-${view}`).hidden=view!==v });
  document.querySelectorAll(".tab").forEach(t=>{if(t.dataset.view===v)t.setAttribute("aria-current","page");else t.removeAttribute("aria-current")});
  setMobileMenu(false);
}
addEventListener("hashchange",showView);
addEventListener("resize",()=>{if(!mobileNav.matches)setMobileMenu(false)});
if(new URLSearchParams(location.search).get("contacto")==="enviado"){
  const formStatus=$("leadFormStatus");
  formStatus.hidden=false;
  history.replaceState(null,"",`${location.pathname}#contacto`);
  requestAnimationFrame(()=>formStatus.focus());
}

// ---- lanzamientos
$("releases").innerHTML=RELEASES.map(r=>`<li class="rel">
  <div style="min-width:0"><div class="rel-title">${esc(r.title)}</div>
  <div class="rel-sub">${esc(r.by)} · ${esc(r.genre)} ${r.tags.includes("new")?'<span class="tag new">Nuevo</span>':''}${r.tags.includes("collab")?'<span class="tag collab">Colab</span>':''}</div></div>
  <div class="rel-links">${r.links.map(([t,u])=>`<a class="lnk" href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} ↗</a>`).join("")}</div></li>`).join("");

// ---- licencias
const minPrice=Math.min(...LICENSES.filter(l=>l.price!=null).map(l=>l.price));
$("licenses").innerHTML=LICENSES.map(l=>`<div class="lic${l.best?' best':''}">
  ${l.best?'<span class="badge">Más elegida</span>':''}
  <h3>${esc(l.name)}</h3>
  <div class="price">${l.price==null?'A negociar':'$'+l.price.toLocaleString("es-CO")+' <small>'+CURRENCY+'</small>'}</div>
  <div class="b-from">${esc(l.files)}</div>
  <ul>${l.items.map(i=>`<li>${esc(i)}</li>`).join("")}</ul></div>`).join("");

// ---- reproductor + beats
const audio=$("audio"); let idx=-1, shuffle=false, repeat=true;
const fmt=s=>{if(!isFinite(s))return"0:00";s=Math.floor(s);return Math.floor(s/60)+":"+String(s%60).padStart(2,"0")};
$("beatCount").textContent=BEATS.length||"";
document.querySelector(".bar").hidden=!BEATS.length;
const filterControls={
  category:$("filterCategory"),
  bpm:$("filterBpm"),
  mood:$("filterMood"),
  genre:$("filterGenre"),
  sort:$("sortBeats"),
  search:$("searchBeats")
};
function populateFilter(select,values,label){
  const selected=select.value;
  const options=[...new Set(values.filter(value=>typeof value==="string"&&value.trim()).map(value=>value.trim()))].sort((a,b)=>a.localeCompare(b,"es"));
  select.innerHTML=`<option value="">${label}</option>`+options.map(value=>`<option value="${esc(value)}">${esc(value)}</option>`).join("");
  if(options.includes(selected))select.value=selected;
}
function updateFilterOptions(){
  populateFilter(filterControls.category,BEATS.map(beat=>beat.category||""),"Todas las categorías");
  populateFilter(filterControls.mood,BEATS.map(beat=>beat.mood||""),"Todos los moods");
  populateFilter(filterControls.genre,BEATS.map(beat=>beat.genre||""),"Todos los géneros");
}
function filteredBeats(){
  const query=filterControls.search.value.trim().toLocaleLowerCase("es");
  const bpmMatches=beat=>{
    const bpm=Number(beat.bpm);
    if(!Number.isFinite(bpm))return false;
    switch(filterControls.bpm.value){
      case "under-80":return bpm<80;
      case "80-99":return bpm>=80&&bpm<=99;
      case "100-119":return bpm>=100&&bpm<=119;
      case "120-plus":return bpm>=120;
      default:return true;
    }
  };
  const matches=BEATS.map((beat,index)=>({beat,index})).filter(({beat})=>{
    const searchable=[beat.title,beat.genre,beat.key,beat.category,beat.mood].filter(Boolean).join(" ").toLocaleLowerCase("es");
    return (!filterControls.category.value||beat.category===filterControls.category.value)
      &&bpmMatches(beat)
      &&(!filterControls.mood.value||beat.mood===filterControls.mood.value)
      &&(!filterControls.genre.value||beat.genre===filterControls.genre.value)
      &&(!query||searchable.includes(query));
  });
  switch(filterControls.sort.value){
    case "title":matches.sort((a,b)=>a.beat.title.localeCompare(b.beat.title,"es"));break;
    case "bpm-asc":matches.sort((a,b)=>Number(a.beat.bpm)-Number(b.beat.bpm));break;
    case "bpm-desc":matches.sort((a,b)=>Number(b.beat.bpm)-Number(a.beat.bpm));break;
  }
  return matches;
}
function renderBeats(){
  if(!BEATS.length){
    $("filterResults").textContent="Los filtros se activarán cuando publiques tus primeros beats.";
    $("beats").innerHTML=`<li class="beat" style="grid-template-columns:1fr"><div><div class="b-title">Muy pronto: nuevos beats</div><div class="b-meta"><span>Mientras tanto, escríbeme a ${esc(EMAIL)} para beats a la medida.</span></div></div></li>`;
    return;
  }
  const results=filteredBeats();
  $("filterResults").textContent=results.length===BEATS.length
    ?`${results.length} ${results.length===1?"beat disponible":"beats disponibles"}`
    :`${results.length} de ${BEATS.length} ${BEATS.length===1?"beat":"beats"}`;
  if(!results.length){
    $("beats").innerHTML='<li class="beat" style="grid-template-columns:1fr"><div class="b-title">No hay beats que coincidan. Prueba otros filtros.</div></li>';
    return;
  }
  $("beats").innerHTML=results.map(({beat:b,index:i})=>`<li class="beat${i===idx?' is-on':''}">
    <button class="b-play" data-i="${i}" aria-label="${i===idx&&!audio.paused?'Pausar':'Escuchar'} ${esc(b.title)}"><svg viewBox="0 0 24 24">${i===idx&&!audio.paused?'<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>':'<path d="M8 5v14l11-7z"/>'}</svg></button>
    <div style="min-width:0"><div class="b-title">${esc(b.title)}</div><div class="b-meta">${b.category?`<span>${esc(b.category)}</span>`:''}<span>${esc(b.genre)}</span><span>${b.bpm} BPM</span><span>${esc(b.key)}</span>${b.mood?`<span>${esc(b.mood)}</span>`:''}</div></div>
    <div class="b-price"><span class="b-from">Desde <b>${money(minPrice)}</b></span><button class="btn-buy" data-buy="${i}">Comprar licencia</button></div></li>`).join("");
}
Object.values(filterControls).forEach(control=>control.addEventListener(control===filterControls.search?"input":"change",renderBeats));
updateFilterOptions();
function load(i){
  if(!BEATS[i])return; idx=i; const b=BEATS[i]; audio.src=b.src;
  $("nowTitle").textContent=b.title; $("nowSub").textContent=`${b.genre} · ${b.bpm} BPM · Prod. Falcon Beats`;
  if("mediaSession" in navigator) navigator.mediaSession.metadata=new MediaMetadata({title:b.title,artist:"Falcon Beats"});
  play();
}
function next(){ if(!BEATS.length)return; let n; if(shuffle&&BEATS.length>1){do{n=Math.floor(Math.random()*BEATS.length)}while(n===idx)}else{n=idx+1;if(n>=BEATS.length){if(!repeat){audio.pause();return}n=0}} load(n) }
function prev(){ if(audio.currentTime>3){audio.currentTime=0;return} load((idx-1+BEATS.length)%BEATS.length) }
async function play(){ initViz(); try{await audio.play()}catch(e){} }
function sync(){ const on=!audio.paused; $("playIcon").innerHTML=on?'<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>':'<path d="M8 5v14l11-7z"/>'; $("play").setAttribute("aria-label",on?"Pausar":"Reproducir"); renderBeats() }
$("play").onclick=()=>{ if(idx<0){load(0);return} audio.paused?play():audio.pause() };
$("next").onclick=next; $("prev").onclick=prev;
$("shuffle").onclick=()=>{shuffle=!shuffle;$("shuffle").setAttribute("aria-pressed",shuffle)};
$("repeat").onclick=()=>{repeat=!repeat;$("repeat").setAttribute("aria-pressed",repeat)};
$("vol").oninput=e=>audio.volume=e.target.value; audio.volume=.85;
$("seek").oninput=e=>{if(audio.duration)audio.currentTime=e.target.value/100*audio.duration};
audio.addEventListener("ended",next); audio.addEventListener("play",sync); audio.addEventListener("pause",sync);
audio.addEventListener("loadedmetadata",()=>$("dur").textContent=fmt(audio.duration));
audio.addEventListener("timeupdate",()=>{$("cur").textContent=fmt(audio.currentTime); if(audio.duration)$("seek").value=audio.currentTime/audio.duration*100});
if("mediaSession" in navigator){navigator.mediaSession.setActionHandler("play",play);navigator.mediaSession.setActionHandler("pause",()=>audio.pause());navigator.mediaSession.setActionHandler("nexttrack",next);navigator.mediaSession.setActionHandler("previoustrack",prev)}

// ---- compra de licencia
let buyIdx=-1;
$("beats").addEventListener("click",e=>{
  const p=e.target.closest("[data-i]"); if(p){const i=+p.dataset.i; i===idx?(audio.paused?play():audio.pause()):load(i); return}
  const b=e.target.closest("[data-buy]"); if(b) openSheet(+b.dataset.buy);
});
function openSheet(i){
  buyIdx=i; $("sheetTitle").textContent=`Comprar «${BEATS[i].title}»`;
  $("opts").innerHTML=LICENSES.map((l,k)=>`<label class="opt"><input type="radio" name="lic" value="${l.id}" ${l.best?'checked':''}>
    <div style="min-width:0"><b>${esc(l.name)}</b><span>${esc(l.files)}</span></div><span class="p">${money(l.price)}</span></label>`).join("");
  $("sheet").hidden=false; updateMsg(); $("opts").querySelector("input:checked")?.focus();
}
function closeSheet(){ $("sheet").hidden=true }
$("closeSheet").onclick=closeSheet;
$("sheet").addEventListener("click",e=>{ if(e.target.id==="sheet") closeSheet() });
addEventListener("keydown",e=>{ if(e.key==="Escape"&&!$("sheet").hidden) closeSheet() });
$("opts").addEventListener("change",updateMsg); $("artistName").addEventListener("input",updateMsg);
function buildMsg(){
  const l=LICENSES.find(x=>x.id===($("opts").querySelector("input:checked")||{}).value)||LICENSES[0];
  const b=BEATS[buyIdx]; const who=$("artistName").value.trim();
  return `Hola Falcon Beats 🦅 Quiero comprar el beat «${b.title}» (${b.bpm} BPM, ${b.key}) con la licencia ${l.name} (${money(l.price)}).${who?` Mi nombre artístico es ${who}.`:''} ¿Cómo hago el pago?`;
}
function updateMsg(){
  const m=buildMsg(); $("msgPreview").textContent=m;
  const wa=$("waLink");
  if(WHATSAPP){ wa.hidden=false; wa.href=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(m)}` } else { wa.hidden=true }
  $("contactLine").innerHTML = WHATSAPP
    ? `También puedes escribir al WhatsApp <b>+${esc(WHATSAPP)}</b> o al correo <b>${esc(EMAIL)}</b>.`
    : `Copia el mensaje y envíalo al correo <b>${esc(EMAIL)}</b>.`;
}
$("copyMsg").onclick=async()=>{
  const m=buildMsg();
  try{ await navigator.clipboard.writeText(m); $("copyMsg").textContent="Mensaje copiado" }
  catch(e){ const r=document.createRange(); r.selectNodeContents($("msgPreview")); const s=getSelection(); s.removeAllRanges(); s.addRange(r); $("copyMsg").textContent="Selecciona y copia" }
  setTimeout(()=>$("copyMsg").textContent="Copiar mensaje",2000);
};

// ---- visualizador
const cv=$("viz"),cx=cv.getContext("2d"); let analyser=null,data=null;
const vizPoints=112,vizLayers=[
  {color:"#09d8ff",phase:0,scale:1,alpha:.66},
  {color:"#4a72ff",phase:2.1,scale:.76,alpha:.55},
  {color:"#ec28d5",phase:4.2,scale:.84,alpha:.58}
],vizLevels=vizLayers.map(()=>new Float32Array(vizPoints));
function initViz(){ if(analyser)return; try{const ac=new (window.AudioContext||window.webkitAudioContext)();const src=ac.createMediaElementSource(audio);analyser=ac.createAnalyser();analyser.fftSize=128;src.connect(analyser);analyser.connect(ac.destination);data=new Uint8Array(analyser.frequencyBinCount);if(ac.state==="suspended")ac.resume()}catch(e){analyser=null} }
function draw(){
  const w=cv.clientWidth,h=cv.clientHeight,d=devicePixelRatio||1;
  if(cv.width!==Math.round(w*d)||cv.height!==Math.round(h*d)){cv.width=Math.round(w*d);cv.height=Math.round(h*d)}
  cx.setTransform(d,0,0,d,0,0);cx.clearRect(0,0,w,h);
  const now=performance.now(),t=now/1000,mid=h/2;
  const localLive=analyser&&!audio.paused,spotifyLive=spotifyPlayback.isPlaying&&spotifyPlayback.updatedAt>0;
  const spotifyTime=spotifyPlayback.position/1000+(spotifyLive?(now-spotifyPlayback.updatedAt)/1000:0);
  const trackSeed=[...spotifyPlayback.playingURI].reduce((sum,char)=>sum+char.charCodeAt(0),0)*.013;
  if(localLive)analyser.getByteFrequencyData(data);
  const beat=spotifyLive?Math.pow(Math.max(0,Math.sin(spotifyTime*5.1+trackSeed)),7):0;
  for(let layerIndex=vizLayers.length-1;layerIndex>=0;layerIndex--){
    const layer=vizLayers[layerIndex],levels=vizLevels[layerIndex],points=[];
    for(let i=0;i<vizPoints;i++){
      const x=i/(vizPoints-1);
      const peakA=Math.exp(-Math.pow((x-(.24+.035*Math.sin(t*.72+layer.phase)))/(.018+layerIndex*.004),2));
      const peakB=Math.exp(-Math.pow((x-(.75+.04*Math.sin(t*.58+layer.phase+2)))/(.022+layerIndex*.005),2));
      const peakC=Math.exp(-Math.pow((x-(.49+.025*Math.cos(t*.9+layer.phase)))/(.013+layerIndex*.004),2));
      const contour=.12+.14*Math.abs(Math.sin(x*21+t*2.3+layer.phase))+.09*Math.abs(Math.sin(x*43-t*1.7+layer.phase));
      const frequency=localLive?data[Math.min(data.length-1,Math.floor(x*data.length*.88))]/255:0;
      const pulse=spotifyLive ? .12+.11*Math.abs(Math.sin(spotifyTime*2.7+x*17+trackSeed))+beat*(.12+.32*(peakA+peakB+peakC)) : contour;
      const energy=localLive?Math.min(1,.08+Math.sqrt(frequency)*.85+contour*.28):pulse;
      const target=Math.min(1,energy+peakA*(.12+energy*.48)+peakB*(.1+energy*.54)+peakC*(.06+energy*.3));
      levels[i]+=(target-levels[i])*(target>levels[i] ? .32 : .13);
      points.push({x:x*w,amplitude:levels[i]*h*.72*layer.scale});
    }
    cx.beginPath();
    cx.moveTo(points[0].x,mid-points[0].amplitude);
    for(let i=1;i<points.length;i++){
      const previous=points[i-1],point=points[i],middle=(previous.x+point.x)/2;
      cx.quadraticCurveTo(previous.x,mid-previous.amplitude,middle,mid-(previous.amplitude+point.amplitude)/2);
    }
    cx.lineTo(w,mid);
    for(let i=points.length-1;i>0;i--){
      const point=points[i],previous=points[i-1],middle=(previous.x+point.x)/2;
      cx.quadraticCurveTo(point.x,mid+point.amplitude,middle,mid+(previous.amplitude+point.amplitude)/2);
    }
    cx.closePath();
    cx.globalAlpha=layer.alpha;
    cx.fillStyle=layer.color;
    cx.fill();
  }
  cx.globalAlpha=1;
  cx.beginPath();cx.moveTo(0,mid);cx.lineTo(w,mid);cx.strokeStyle="#b7f4ff99";cx.lineWidth=1;cx.stroke();
  requestAnimationFrame(draw);
}
renderBeats(); showView(); draw();
