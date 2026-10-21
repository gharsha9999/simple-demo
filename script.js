const movies=[
{id:1,title:"The Last Horizon",language:"Telugu",year:2024,symbol:"◉",group:"trending"},
{id:2,title:"Shadow Protocol",language:"Hindi",year:2024,symbol:"▱",group:"trending"},
{id:3,title:"Silent Roads",language:"Tamil",year:2023,symbol:"☆",group:"trending"},
{id:4,title:"Project Nova",language:"English",year:2024,symbol:"◉",group:"trending"},
{id:5,title:"The Forgotten Path",language:"Malayalam",year:2024,symbol:"▱",group:"trending"},
{id:6,title:"City of Dreams",language:"Hindi",year:2023,symbol:"☆",group:"trending"},
{id:7,title:"Beyond the Sky",language:"Telugu",year:2024,symbol:"◉",group:"trending"},
{id:8,title:"The Silent Battle",language:"Tamil",year:2023,symbol:"▱",group:"trending"},
{id:9,title:"Rising Tides",language:"Malayalam",year:2024,symbol:"◉",group:"recent"},
{id:10,title:"The Next Chapter",language:"Hindi",year:2024,symbol:"▱",group:"recent"},
{id:11,title:"Midnight Echoes",language:"Telugu",year:2023,symbol:"☆",group:"recent"},
{id:12,title:"Broken Wings",language:"Tamil",year:2024,symbol:"◉",group:"recent"},
{id:13,title:"The Final Call",language:"English",year:2023,symbol:"▱",group:"recent"},
{id:14,title:"Whispers",language:"Malayalam",year:2024,symbol:"☆",group:"recent"},
{id:15,title:"Parallel Lives",language:"Hindi",year:2024,symbol:"◉",group:"recent"},
{id:16,title:"The Last Signal",language:"Tamil",year:2023,symbol:"▱",group:"recent"},
{id:17,title:"Neon Kingdom",language:"Korean",year:2025,symbol:"☆",group:"recent"},
{id:18,title:"Autumn Letters",language:"Korean",year:2024,symbol:"◉",group:"trending"}];
const palettes=[{bg:"#082746",glow:"#125a9a",accent:"#48aaff"},{bg:"#20133d",glow:"#6e2eaa",accent:"#d05bff"},{bg:"#06343a",glow:"#087a83",accent:"#35e1d4"}];
const $=id=>document.getElementById(id),movieList=$("movieList"),recentList=$("recentList"),searchInput=$("searchInput"),clearSearch=$("clearSearch"),languageButton=$("languageButton"),languageMenu=$("languageMenu"),sectionTitle=$("sectionTitle"),sectionSubtitle=$("sectionSubtitle"),emptyMessage=$("emptyMessage"),recentSection=$("recentSection"),collectionSection=$("collectionSection"),profilePanel=$("profilePanel");
let selectedLanguage="All",currentView="all",showAllTrending=false,showAllRecent=false;
function loadSet(key){try{return new Set(JSON.parse(localStorage.getItem(key)||"[]"))}catch{return new Set()}}
let wishlist=loadSet("moviehub-wishlist"),completed=loadSet("moviehub-completed");
function save(){try{localStorage.setItem("moviehub-wishlist",JSON.stringify([...wishlist]));localStorage.setItem("moviehub-completed",JSON.stringify([...completed]))}catch{}}
function filtered(group){const q=searchInput.value.trim().toLowerCase();return movies.filter(m=>(selectedLanguage==="All"||m.language===selectedLanguage)&&(m.title.toLowerCase().includes(q)||m.language.toLowerCase().includes(q)||String(m.year).includes(q))&&(currentView==="wishlist"?wishlist.has(m.id):currentView==="completed"?completed.has(m.id):true)&&(!group||m.group===group))}
function card(m){const p=palettes[(m.id-1)%palettes.length],w=wishlist.has(m.id),d=completed.has(m.id),el=document.createElement("article");el.className="movie-card";el.innerHTML=`<div class="movie-art" style="--art-bg:${p.bg};--art-glow:${p.glow};--art-accent:${p.accent}"><span class="movie-symbol" aria-hidden="true">${m.symbol}</span></div><div class="movie-info"><h3 class="movie-title"></h3><div class="movie-meta"><span class="movie-language"></span><span class="dot">•</span><span>${m.year}</span></div></div><div class="movie-actions"><button class="movie-action wishlist-toggle ${w?"active-wish":""}" aria-pressed="${w}">${w?"♥ Saved":"♡ Wishlist"}</button><button class="movie-action completed-toggle ${d?"active-done":""}" aria-pressed="${d}">${d?"✓ Watched":"✓ Done"}</button></div>`;el.querySelector(".movie-title").textContent=m.title;el.querySelector(".movie-language").textContent=m.language;el.querySelector(".wishlist-toggle").addEventListener("click",()=>{if(wishlist.has(m.id))wishlist.delete(m.id);else{wishlist.add(m.id);completed.delete(m.id)}save();render()});el.querySelector(".completed-toggle").addEventListener("click",()=>{if(completed.has(m.id))completed.delete(m.id);else{completed.add(m.id);wishlist.delete(m.id)}save();render()});return el}
function fill(el,items,limit=Infinity){el.replaceChildren();items.slice(0,limit).forEach(m=>el.appendChild(card(m)))}
function counts(){$("wishlistCount").textContent=wishlist.size;$("completedCount").textContent=completed.size}
function render(){const t=filtered("trending"),r=filtered("recent"),view=currentView!=="all";sectionTitle.textContent=currentView==="wishlist"?"♥ My Wishlist":currentView==="completed"?"✓ Completed Movies":"♨ Trending Now";sectionSubtitle.textContent=currentView==="wishlist"?"Movies you want to watch later":currentView==="completed"?"Your watched movie collection":"Popular picks for your next movie night";recentSection.classList.toggle("hidden",view);$("viewAllButton").classList.toggle("hidden",view);collectionSection.classList.remove("hidden");profilePanel.classList.add("hidden");if(view)fill(movieList,filtered());else{fill(movieList,t,showAllTrending?Infinity:8);fill(recentList,r,showAllRecent?Infinity:8)}emptyMessage.classList.toggle("hidden",(view?filtered().length:t.length+r.length)>0);counts()}
function setView(v){currentView=v;showAllTrending=false;showAllRecent=false;render();collectionSection.scrollIntoView({behavior:"smooth",block:"start"})}
languageButton.addEventListener("click",()=>{const hidden=languageMenu.classList.toggle("hidden");languageButton.setAttribute("aria-expanded",String(!hidden))});
languageMenu.querySelectorAll("[data-language]").forEach(b=>b.addEventListener("click",()=>{selectedLanguage=b.dataset.language;languageMenu.querySelectorAll("button").forEach(x=>x.classList.toggle("selected",x===b));languageButton.innerHTML=`◎ ${selectedLanguage==="All"?"Language":selectedLanguage} <span class="chevron">⌄</span>`;languageMenu.classList.add("hidden");languageButton.setAttribute("aria-expanded","false");render()}));
document.addEventListener("click",e=>{if(!e.target.closest(".language-wrap")){languageMenu.classList.add("hidden");languageButton.setAttribute("aria-expanded","false")}});
searchInput.addEventListener("input",()=>{clearSearch.classList.toggle("hidden",!searchInput.value);render()});clearSearch.addEventListener("click",()=>{searchInput.value="";clearSearch.classList.add("hidden");render();searchInput.focus()});
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>setView(b.dataset.view)));
$("viewAllButton").addEventListener("click",()=>{showAllTrending=!showAllTrending;$("viewAllButton").textContent=showAllTrending?"Show less ↑":"View all →";render()});
$("recentViewAll").addEventListener("click",()=>{showAllRecent=!showAllRecent;$("recentViewAll").textContent=showAllRecent?"Show less ↑":"View all →";render()});
$("profileButton").addEventListener("click",()=>{collectionSection.classList.add("hidden");recentSection.classList.add("hidden");profilePanel.classList.remove("hidden");counts();profilePanel.scrollIntoView({behavior:"smooth",block:"start"})});
$("closeProfile").addEventListener("click",()=>{collectionSection.classList.remove("hidden");if(currentView==="all")recentSection.classList.remove("hidden");profilePanel.classList.add("hidden");render()});
render();
