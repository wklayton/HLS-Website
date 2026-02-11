// async function loadFullPortfolio() {
//   try {
//     const response = await fetch('portfolio/gallery.json');
//     const fullGallery = await response.json();
    
//     const container = document.getElementById('portfolio-galleries-wrapper');
//     container.innerHTML = '';

//     var i = 1

//     fullGallery.portfolios.forEach(gallery => {
//       const imageBase = gallery.image.replace('sm-', '');
//       const card = `
//         <a class="gallery-card" href="portfolio/gallery.php?album=${gallery.directory}#">
//             <img id="gallery-image-${i}" class="gallery-image" src="portfolio/galleries/${gallery.directory}/${gallery.image}" alt="${gallery.description}"
//               srcset="portfolio/galleries/${gallery.directory}/sm-${imageBase} 500w,
//                       portfolio/galleries/${gallery.directory}/md-${imageBase} 1000w,
//                       portfolio/galleries/${gallery.directory}/lg-${imageBase} 1500w,
//                       portfolio/galleries/${gallery.directory}/xl-${imageBase} 2000w"
//               sizes="(min-width: 1024px) 33.3vw, 100vw">
//             <div class="gallery-content">
//                 <h3 class="gallery-title">${gallery.title}</h3>
//             </div>
//         </a>
//       `;
//       container.insertAdjacentHTML('beforeend', card);
//       var displayedImage = document.getElementById("gallery-image-" + i);
//         var imageWidth = undefined;
//         var imageHeight = undefined;

//         if (displayedImage.complete) {
//             imageWidth = displayedImage.naturalWidth;
//             imageHeight = displayedImage.naturalHeight;
//             displayedImage.setAttribute("width", imageWidth);
//             displayedImage.setAttribute("height", imageHeight);
//         } else {
//             displayedImage.addEventListener('load', () => {
//                 imageWidth = displayedImage.naturalWidth;
//                 imageHeight = displayedImage.naturalHeight;
//                 displayedImage.setAttribute("width", imageWidth);
//                 displayedImage.setAttribute("height", imageHeight);
//             });
//         }

//         i++

//     });
//   } catch (error) {
//     console.error('Error loading galleries:', error);
//   }
//   }

//   document.addEventListener('DOMContentLoaded', loadFullPortfolio);

let allGalleries = [];
let currentIndex = 0;
const limit = 9;

async function loadFullPortfolio() {
  try {
    const response = await fetch('portfolio/gallery.json');
    const data = await response.json();
    allGalleries = data.portfolios;
    
    const container = document.getElementById('portfolio-galleries-wrapper');
    container.innerHTML = '';

    
    renderNextBatch();
    } catch (error) {
    console.error('Error loading galleries:', error);
    }
}

function renderNextBatch() {
    const container = document.getElementById('portfolio-galleries-wrapper');
    const nextBatch = allGalleries.slice(currentIndex, currentIndex + limit);

    nextBatch.forEach((gallery, index) => {
        const globalIndex = currentIndex + index + 1;
        const imageBase = gallery.image.replace('sm-', '');
    
    const card = `
        <a class="gallery-card" href="portfolio/gallery.php?album=${gallery.directory}#">
            <img id="gallery-image-${globalIndex}" class="gallery-image" 
                src="portfolio/galleries/${gallery.directory}/${gallery.image}" 
                alt="${gallery.description}"
                srcset="portfolio/galleries/${gallery.directory}/sm-${imageBase} 500w,
                        portfolio/galleries/${gallery.directory}/md-${imageBase} 1000w,
                        portfolio/galleries/${gallery.directory}/lg-${imageBase} 1500w,
                        portfolio/galleries/${gallery.directory}/xl-${imageBase} 2000w"
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

  // Hide "Load More" button if no more items remain
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (currentIndex >= allGalleries.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

function handleImageDimensions(id) {
  const img = document.getElementById("gallery-image-" + id);
  const setSize = () => {
    img.setAttribute("width", img.naturalWidth);
    img.setAttribute("height", img.naturalHeight);
  };

  if (img.complete) {
    setSize();
  } else {
    img.addEventListener('load', setSize);
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  loadFullPortfolio();
  
document.getElementById('load-more-btn').addEventListener('click', renderNextBatch);
});