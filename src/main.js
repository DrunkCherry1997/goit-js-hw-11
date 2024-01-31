import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

document.addEventListener("DOMContentLoaded", () => {
  
  const form = document.querySelector(".searchForm");
  const searchInput = document.querySelector(".searchInput");
  const loader = document.querySelector(".loader");
  const gallery = document.querySelector(".gallery");

  const apiKey = "42055816-5ec499474650eadfc6b07a02f";
  const apiUrl = "https://pixabay.com/api/";

  const lightbox = new SimpleLightbox(".gallery a");

  form.addEventListener("submit", (event) => {
   
    event.preventDefault();

    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {
      
      iziToast.error({
          title: "Error",
          position: "topRight",
        message: "Please enter a search term.",
      });
      return;
    }

    loader.classList.remove("hidden");
    gallery.innerHTML = "";

    fetch(`${apiUrl}?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`)
      .then((response) => {
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
       
        return response.json();
      })
      .then((data) => {
       
        if (data.hits.length === 0) {
         
          iziToast.warning({
              title: "No Results",
              position: "topRight",
            message: "Sorry, there are no images matching your search query. Please try again!",
          });
        } else {
       
          const images = data.hits.map((hit) => ({
            webformatURL: hit.webformatURL,
            largeImageURL: hit.largeImageURL,
            tags: hit.tags,
            likes: hit.likes,
            views: hit.views,
            comments: hit.comments,
            downloads: hit.downloads,
          }));

          displayImages(images);
        }
      })
      .catch((error) => {
       
        console.error("Error fetching data:", error);
        iziToast.error({
            title: "Error",
            position: "topRight",
          message: "An error occurred while fetching data. Please try again.",
        });
      })
      .finally(() => {
      
        loader.classList.add("hidden");
      });
  });


  function displayImages(images) {

 const galleryHTML = images
    .map(
      (image, index) => `
        <div class="gallery-item">
          <a href="${image.largeImageURL}" data-lightbox="gallery" data-title="${image.tags}">
            <img src="${image.webformatURL}" alt="${image.tags}" class="image-thumbnail image-${index + 1}">
          </a>
          <div class="image-details image-details-${index + 1}">
            <p class="likes likes-${index + 1}">Likes: <span class="result-likes">${image.likes}</span></p>
            <p class="views views-${index + 1}">Views: <span class="result-views">${image.views}</span></p>
            <p class="comments comments-${index + 1}">Comments: <span class="result-comments">${image.comments}</span></p>
            <p class="downloads downloads-${index + 1}">Downloads: <span class="result-downloads">${image.downloads}</span></p>
          </div>
        </div>
      `
    )
    .join("");


    gallery.innerHTML = galleryHTML;


    lightbox.refresh();
  }
});
