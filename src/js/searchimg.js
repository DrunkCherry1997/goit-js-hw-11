import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Для SimpleLightbox
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Імпорт бібліотеки SimpleLightbox і стилів css-loader
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.min.js';


document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".searchForm");
  const searchInput = document.querySelector(".searchInput");
  const loaderOverlay = document.getElementById("loaderOverlay");
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
        message: "Please enter a search term.",
      });
      return;
    }

    // Показати індикатор завантаження перед початком запиту
    loaderOverlay.classList.remove("hidden");
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
          message: "An error occurred while fetching data. Please try again.",
        });
      })
      .finally(() => {
        // Сховати індикатор завантаження після завершення запиту
        loaderOverlay.classList.add("hidden");
      });
  });

  // Функція відображення зображень
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

    // Оновити SimpleLightbox після додавання нових зображень
    lightbox.refresh();
  }
});