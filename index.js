const navbar = document.getElementById('navigation');
var navOffset = document.getElementById('offset').offsetTop;

function stickyNavbar() {
    if (window.pageYOffset >= navOffset) {
        navbar.classList.add("sticky");
    } else {
        navbar.removeAttribute("class");
    }
};

window.onscroll = function() {
    stickyNavbar();
    
};
window.onresize = function() {
    navOffset = document.getElementById('offset').offsetTop;
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






const form = document.getElementById('contact-form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "5cc6df79-0507-4351-b13f-1c4326c3cfe7");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});




