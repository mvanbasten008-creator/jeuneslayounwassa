// script.js
console.log('Static community site loaded.');

// Optional feature: Active link highlights based on current URL path.
// This is already hardcoded in HTML as per strictly static methodology, 
// but can act as a fallback logic if desired.
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.main-menu a');

    menuLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
});
