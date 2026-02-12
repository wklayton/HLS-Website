let allGalleries = [];
let currentIndex = 0;
let batchesLoaded = 0;

const limit = 6;
const batchScrollLimit = 3;

const loadMoreBtn = document.getElementById('load-more-btn');
const scrollTrigger = document.getElementById('scroll-trigger');

const container = document.getElementById('portfolio-galleries-wrapper');
container.innerHTML = '';

async function initPortfolio() {
  try {
    const response = await fetch('gallery.json');
    const data = await response.json();
    allGalleries = data.portfolios;

    renderNextBatch();

    infiniteScroll();
  } catch (error) {
    console.error('Error loading galleries:', error);
  }
}

function renderNextBatch() {
  const nextBatch = allGalleries.slice(currentIndex, currentIndex + limit);
  if (nextBatch.length === 0) return;

  nextBatch.forEach((gallery, index) => {
    const globalIndex = currentIndex + index + 1;
    const imageBase = gallery.image.replace('sm-', '');

    const card = `
      <a class="gallery-card" href="gallery.php?album=${gallery.directory}#">
          <img id="gallery-image-${globalIndex}" class="gallery-image" 
            src="galleries/${gallery.directory}/${gallery.image}" 
            alt="${gallery.description}"
            srcset="galleries/${gallery.directory}/sm-${imageBase} 500w,
                    galleries/${gallery.directory}/md-${imageBase} 1000w,
                    galleries/${gallery.directory}/lg-${imageBase} 1500w,
                    galleries/${gallery.directory}/xl-${imageBase} 2000w"
            sizes="(min-width: 1024px) 33.3vw, 100vw"
            loading="lazy">
          <div class="gallery-content">
              <h3 class="gallery-title">${gallery.title}</h3>
          </div>
      </a>
    `;
    container.insertAdjacentHTML('beforeend', card);
    handleImageDimensions(globalIndex);
  });

  currentIndex += limit;
  batchesLoaded++;

  checkLoadingMethod();
}

function infiniteScroll() {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && batchesLoaded < batchScrollLimit && currentIndex < allGalleries.length) {
      renderNextBatch();
    }
  }, { rootMargin: '300px' });

  observer.observe(scrollTrigger);
}

function checkLoadingMethod() {
  if (currentIndex >= allGalleries.length) {
    scrollTrigger.style.display = 'none';
    scrollTrigger.style.visibility = 'hidden';
    loadMoreBtn.style.display = 'none';
    loadMoreBtn.style.visibility = 'hidden';
  } else if (batchesLoaded >= batchScrollLimit) {
    scrollTrigger.style.display = 'none';
    scrollTrigger.style.visibility = 'hidden';
    loadMoreBtn.style.display = 'block';
    loadMoreBtn.style.visibility = 'visible';
  } else {
    scrollTrigger.style.display = 'block';
    scrollTrigger.style.visibility = 'visible';
    loadMoreBtn.style.display = 'none';
    loadMoreBtn.style.visibility = 'hidden';
  }
}

function handleImageDimensions(id) {
  const img = document.getElementById("gallery-image-" + id);
  const setSize = () => {
    img.setAttribute("width", img.naturalWidth);
    img.setAttribute("height", img.naturalHeight);
  };
  img.complete ? setSize() : img.addEventListener('load', setSize);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();
  loadMoreBtn.addEventListener('click', renderNextBatch);
  loadMoreBtn.addEventListener('click', () => {
    batchesLoaded = 0;
    checkLoadingMethod();
  });
});