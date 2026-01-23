async function loadLatestPortfolio() {
  try {
    const response = await fetch('portfolio/gallery.json');
    const gallery = await response.json();
    
    const container = document.getElementById('portfolio-wrapper');
    container.innerHTML = ''; // Clear existing content
    
    var i = 1;

    gallery.portfolios.slice(0, 3).forEach(gallery => {
        const imageBase = gallery.image.replace('sm-', '');
        const card = `
            <a class="portfolio-card" href="portfolio/gallery.php?album=${gallery.directory}#">
                <img id="portfolio-image-${i}" class="portfolio-image" src="portfolio/galleries/${gallery.directory}/${gallery.image}" alt="${gallery.description}"
                srcset="portfolio/galleries/${gallery.directory}/sm-${imageBase} 500w,
                        portfolio/galleries/${gallery.directory}/md-${imageBase} 1000w,
                        portfolio/galleries/${gallery.directory}/lg-${imageBase} 1500w,
                        portfolio/galleries/${gallery.directory}/xl-${imageBase} 2000w"
                sizes="(min-width: 1024px) 25vw, 100vw">
                <div class="portfolio-content">
                    <h3 class="portfolio-title">${gallery.title}</h3>
                </div>
            </a>
        `;
        container.insertAdjacentHTML('beforeend', card);
        var displayedImage = document.getElementById("portfolio-image-" + i);
        var imageWidth = undefined;
        var imageHeight = undefined;

        if (displayedImage.complete) {
            imageWidth = displayedImage.naturalWidth;
            imageHeight = displayedImage.naturalHeight;
            displayedImage.setAttribute("width", imageWidth);
            displayedImage.setAttribute("height", imageHeight);
        } else {
            displayedImage.addEventListener('load', () => {
                imageWidth = displayedImage.naturalWidth;
                imageHeight = displayedImage.naturalHeight;
                displayedImage.setAttribute("width", imageWidth);
                displayedImage.setAttribute("height", imageHeight);
            });
        }

        i++

    });
  } catch (error) {
    console.error('Error loading posts:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadLatestPortfolio);










