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