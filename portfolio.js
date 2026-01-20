const navbar = document.getElementById('navigation');
const offsetElement = document.getElementById('offset');

const observer = new IntersectionObserver(([entry]) => {
    navbar.classList.toggle("sticky", !entry.isIntersecting);
}, {
    threshold: [1.0],
    rootMargin: "-1px 0px 0px 0px"
});

observer.observe(offsetElement);

window.addEventListener('resize', () => {
}, { passive: true });






async function loadFullPortfolio() {
  try {
    const response = await fetch('portfolio/gallery.json');
    const fullGallery = await response.json();
    
    const container = document.getElementById('portfolio-galleries-wrapper');
    container.innerHTML = '';

    fullGallery.portfolios.forEach(gallery => {
      const card = `
        <a class="gallery-card" href="portfolio/gallery.php?album=${gallery.directory}#">
            <img class="gallery-image" src="images/${gallery.image}" alt="${gallery.description}">
            <div class="gallery-content">
                <h3 class="gallery-title">${gallery.title}</h3>
            </div>
        </a>
      `;
      container.insertAdjacentHTML('beforeend', card);
    });
  } catch (error) {
    console.error('Error loading posts:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadFullPortfolio);