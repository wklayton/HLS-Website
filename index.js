const navbar = document.getElementById('navigation');
var welcomeOffset = document.getElementById('welcome').offsetHeight;

function stickyNavbar() {
    if (window.pageYOffset >= welcomeOffset) {
        navbar.classList.add("sticky");
    } else {
        navbar.removeAttribute("class");
    }
};

window.onscroll = function() {
    stickyNavbar();
};
window.onresize = function() {
    welcomeOffset = navbar.offsetTop;
};

async function loadLatestAlbums() {
  try {
    const response = await fetch('portfolio.json'); // Fetch your data source
    const albums = await response.json();

    console.log(albums);
    
    const container = document.getElementById('portfolio-wrapper');
    container.innerHTML = ''; // Clear existing content

    // Take only the 3 most recent posts
    albums.portfolios.slice(0, 3).forEach(album => {
      const card = `
        <div class="album-card">
            <a class="album-directory" href="portfolio/${album.directory}.html">
                <img class="album-image" src="images/${album.image}" alt="${album.title} ${album.type}">
                <div class="album-content">
                    <h3 class="album-title">${album.title}</h3>
                    <p class="album-description">${album.description}</p>
                </div>
            </a>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', card); // Efficiently adds new HTML
    });
  } catch (error) {
    console.error('Error loading posts:', error);
  }
}

// Run when the page loads
document.addEventListener('DOMContentLoaded', loadLatestAlbums);




