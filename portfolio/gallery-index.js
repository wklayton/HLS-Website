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

const navbar = document.getElementById('navigation');
const offsetElement = document.getElementById('offset');

// Use an IntersectionObserver to detect when the navbar should stick
const observer = new IntersectionObserver(([entry]) => {
    // If the offset element is no longer visible at the top, stick the nav
    navbar.classList.toggle("sticky", !entry.isIntersecting);
}, { 
    threshold: [1.0],
    rootMargin: "-1px 0px 0px 0px" // Trigger as soon as it hits the top
});

observer.observe(offsetElement);

// Minimal resize handler to update logic if needed
window.addEventListener('resize', () => {
}, { passive: true });


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
