// script.js
console.log('Static community site loaded.');

document.addEventListener("DOMContentLoaded", () => {
    // 1. Highlight active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.main-menu a');

    menuLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Remove hardcoded active class first to let JS handle it properly if needed
        link.classList.remove('active');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', () => {
            mainMenu.classList.toggle('active');
        });
    }
});
