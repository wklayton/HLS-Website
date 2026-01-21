// const navbar = document.getElementById('navigation');
// var navOffset = document.getElementById('offset').offsetTop;

// function stickyNavbar() {
//     if (window.pageYOffset >= navOffset) {
//         navbar.classList.add("sticky");
//     } else {
//         navbar.removeAttribute("class");
//     }
// };

// window.onscroll = function() {
//     stickyNavbar();
// };

// window.onresize = function() {
//     navOffset = document.getElementById('offset').offsetTop;
//     stickyNavbar();
// };






// const navbar = document.getElementById('navigation');
// const offsetElement = document.getElementById('offset');

// // Use an IntersectionObserver to detect when the navbar should stick
// const observer = new IntersectionObserver(([entry]) => {
//     navbar.classList.toggle("sticky", !entry.isIntersecting);
// }, {
//     threshold: [1.0],
//     rootMargin: "-1px 0px 0px 0px" // Trigger as soon as it hits the top
// });

// observer.observe(offsetElement);

// // Minimal resize handler to update logic if needed
// window.addEventListener('resize', () => {
//     // IntersectionObserver handles most logic automatically, 
//     // but you can refresh state here if your layout changes drastically.
// }, { passive: true });




async function loadLatestPortfolio() {
  try {
    const response = await fetch('portfolio/gallery.json');
    const gallery = await response.json();
    
    const container = document.getElementById('portfolio-wrapper');
    container.innerHTML = ''; // Clear existing content
    
    var i = 1;

    gallery.portfolios.slice(0, 3).forEach(gallery => {
        const card = `
            <a class="portfolio-card" href="portfolio/gallery.php?album=${gallery.directory}#">
                <img id="portfolio-image-${i}" class="portfolio-image" src="images/${gallery.image}" alt="${gallery.description}">
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










