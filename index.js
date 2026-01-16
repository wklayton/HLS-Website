const navbar = document.getElementById('navigation');
var stickyOffset = navbar.offsetTop;

function stickyNavbar() {
    if (window.pageYOffset >= stickyOffset) {
        navbar.classList.add("sticky");
    } else {
        navbar.removeAttribute("class");
    }
};

window.onscroll = function() {
    stickyNavbar();
};
window.onresize = function() {
    stickyOffset = navbar.offsetTop;
};

// async function fetchPortfolio() {
//     const directory = "portfolio/portfolio.json";
//     const response = await fetch(directory);
//     const data = await response.json();
//     return data;
// };

// fetchPortfolio().then(data => {
//     const albumData = data.portfolios.map(function(index) {
//         return index.album;
//     });
//     const heroData = data.portfolios.map(function(index) {
//         return index.hero;
//     });
//     const descriptionData = data.portfolios.map(function(index) {
//         return index.description;
//     });
//     const directoryData = data.portfolios.map(function(index) {
//         return index.directory;
//     });
//     console.log(albumData);
//     console.log(heroData);
//     console.log(descriptionData);
//     console.log(directoryData);

//     for (let i = 0; i <= 2; i++) {
//         console.log(i);
//         document.getElementsByClassName("album-title")[i].innerText=albumData[i];
//         document.getElementsByClassName("album-hero")[i].src=`images/${heroData[i]}`;
//         document.getElementsByClassName("album-description")[i].innerText=descriptionData[i];
//         document.getElementsByClassName("album-directory")[i].href=`portfolio/${directoryData[i]}.html`;
//     };
// });

// Function to load and display latest posts
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




