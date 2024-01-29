import{S as g,i as d}from"./assets/vendor-5b791d57.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{const u=document.querySelector(".searchForm"),s=document.querySelector(".searchInput"),i=document.querySelector(".loader"),a=document.querySelector(".gallery"),e="42055816-5ec499474650eadfc6b07a02f",t="https://pixabay.com/api/",n=new g(".gallery a");u.addEventListener("submit",l=>{l.preventDefault();const c=s.value.trim();if(c===""){d.error({title:"Error",message:"Please enter a search term."});return}i.classList.remove("hidden"),a.innerHTML="",fetch(`${t}?key=${e}&q=${c}&image_type=photo&orientation=horizontal&safesearch=true`).then(r=>{if(!r.ok)throw new Error(`HTTP error! Status: ${r.status}`);return r.json()}).then(r=>{if(r.hits.length===0)d.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"});else{const f=r.hits.map(o=>({webformatURL:o.webformatURL,largeImageURL:o.largeImageURL,tags:o.tags,likes:o.likes,views:o.views,comments:o.comments,downloads:o.downloads}));m(f)}}).catch(r=>{console.error("Error fetching data:",r),d.error({title:"Error",message:"An error occurred while fetching data. Please try again."})}).finally(()=>{i.classList.add("hidden")})});function m(l){const c=l.map(r=>`
        <div class="gallery-item">
          <a href="${r.largeImageURL}" data-lightbox="gallery" data-title="${r.tags}">
            <img src="${r.webformatURL}" alt="${r.tags}">
          </a>
          <div class="image-details">
            <p>Likes: ${r.likes}</p>
            <p>Views: ${r.views}</p>
            <p>Comments: ${r.comments}</p>
            <p>Downloads: ${r.downloads}</p>
          </div>
        </div>
      `).join("");a.innerHTML=c,n.refresh()}});
//# sourceMappingURL=commonHelpers4.js.map
