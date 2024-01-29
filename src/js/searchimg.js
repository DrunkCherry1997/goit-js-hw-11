// Для IziToast
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Для SimpleLightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const loader = document.getElementById("loader");
  const gallery = document.getElementById("gallery");

  const apiKey = "42055816-5ec499474650eadfc6b07a02f";
  const apiUrl = "https://pixabay.com/api/";

  const lightbox = new SimpleLightbox(".gallery a");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();

    if (searchTerm === "") {
      iziToast.error({
        title: "Error",
        message: "Please enter a search term.",
      });
      return;
    }

    loader.classList.remove("hidden");
    gallery.innerHTML = "";

    try {
      const response = await fetch(
        `${apiUrl}?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.hits.length === 0) {
        iziToast.warning({
          title: "No Results",
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
    } catch (error) {
      console.error("Error fetching data:", error);
      iziToast.error({
        title: "Error",
        message: "An error occurred while fetching data. Please try again.",
      });
    } finally {
      loader.classList.add("hidden");
    }
  });

  function displayImages(images) {
    const galleryHTML = images
      .map(
        (image) => `
        <div class="gallery-item">
          <a href="${image.largeImageURL}" data-lightbox="gallery" data-title="${image.tags}">
            <img src="${image.webformatURL}" alt="${image.tags}">
          </a>
          <div class="image-details">
            <p>Likes: ${image.likes}</p>
            <p>Views: ${image.views}</p>
            <p>Comments: ${image.comments}</p>
            <p>Downloads: ${image.downloads}</p>
          </div>
        </div>
      `
      )
      .join("");

    gallery.innerHTML = galleryHTML;

    // Refresh SimpleLightbox after adding new images
    lightbox.refresh();
  }
});