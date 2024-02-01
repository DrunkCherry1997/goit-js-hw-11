import{S as f,i as d}from"./assets/vendor-5b791d57.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const u=document.querySelector(".searchForm"),o=document.querySelector(".searchInput"),i=document.querySelector(".loader"),a=document.querySelector(".gallery"),e="42055816-5ec499474650eadfc6b07a02f",r="https://pixabay.com/api/",n=new f(".gallery a");u.addEventListener("submit",c=>{c.preventDefault();const l=o.value.trim();if(l===""){d.error({title:"Error",position:"topRight",message:"Please enter a search term."});return}i.classList.remove("hidden"),a.innerHTML="",fetch(`${r}?key=${e}&q=${l}&image_type=photo&orientation=horizontal&safesearch=true`).then(t=>{if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);return t.json()}).then(t=>{if(t.hits.length===0)d.warning({title:"No Results",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});else{const p=t.hits.map(s=>({webformatURL:s.webformatURL,largeImageURL:s.largeImageURL,tags:s.tags,likes:s.likes,views:s.views,comments:s.comments,downloads:s.downloads}));m(p)}}).catch(t=>{console.error("Error fetching data:",t),d.error({title:"Error",position:"topRight",message:"An error occurred while fetching data. Please try again."})}).finally(()=>{i.classList.add("hidden")})});function m(c){const l=c.map(t=>`
          <div class="gallery-item">
            <a href="${t.largeImageURL}" data-lightbox="gallery" data-title="${t.tags}">
              <img src="${t.webformatURL}" alt="${t.tags}" class="image-thumbnail">
            </a>
            <div class="image-details">
              <p><b>Likes:</b> <span class="result-likes">${t.likes}</span></p>
              <p><b>Views:</b> <span class="result-views">${t.views}</span></p>
              <p><b>Comments:</b> <span class="result-comments">${t.comments}</span></p>
              <p><b>Downloads:</b> <span class="result-downloads">${t.downloads}</span></p>
            </div>
          </div>
        `).join("");a.innerHTML=l,n.refresh()}});
//# sourceMappingURL=commonHelpers.js.map
