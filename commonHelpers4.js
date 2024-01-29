import{S as p,i as d}from"./assets/vendor-5b791d57.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const m=document.getElementById("searchForm"),o=document.getElementById("searchInput"),i=document.getElementById("loader"),a=document.getElementById("gallery"),e="42055816-5ec499474650eadfc6b07a02f",r="https://pixabay.com/api/",n=new p(".gallery a");m.addEventListener("submit",async c=>{c.preventDefault();const l=o.value.trim();if(l===""){d.error({title:"Error",message:"Please enter a search term."});return}i.classList.remove("hidden"),a.innerHTML="";try{const t=await fetch(`${r}?key=${e}&q=${l}&image_type=photo&orientation=horizontal&safesearch=true`);if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);const u=await t.json();if(u.hits.length===0)d.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"});else{const g=u.hits.map(s=>({webformatURL:s.webformatURL,largeImageURL:s.largeImageURL,tags:s.tags,likes:s.likes,views:s.views,comments:s.comments,downloads:s.downloads}));f(g)}}catch(t){console.error("Error fetching data:",t),d.error({title:"Error",message:"An error occurred while fetching data. Please try again."})}finally{i.classList.add("hidden")}});function f(c){const l=c.map(t=>`
        <div class="gallery-item">
          <a href="${t.largeImageURL}" data-lightbox="gallery" data-title="${t.tags}">
            <img src="${t.webformatURL}" alt="${t.tags}">
          </a>
          <div class="image-details">
            <p>Likes: ${t.likes}</p>
            <p>Views: ${t.views}</p>
            <p>Comments: ${t.comments}</p>
            <p>Downloads: ${t.downloads}</p>
          </div>
        </div>
      `).join("");a.innerHTML=l,n.refresh()}});
//# sourceMappingURL=commonHelpers4.js.map
