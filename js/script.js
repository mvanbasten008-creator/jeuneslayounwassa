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

    // 3. Rules Modal Logic
    const openRulesBtn = document.getElementById('openRulesBtn');
    const rulesModal = document.getElementById('rulesModal');
    const closeRulesBtn = document.getElementById('closeRulesBtn');

    if (openRulesBtn && rulesModal && closeRulesBtn) {
        // Find overlay
        const rulesOverlay = rulesModal.querySelector('.rules-modal-overlay');

        const openModal = () => {
            rulesModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        };

        const closeModal = () => {
            rulesModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        };

        openRulesBtn.addEventListener('click', openModal);
        closeRulesBtn.addEventListener('click', closeModal);
        if(rulesOverlay) {
            rulesOverlay.addEventListener('click', closeModal);
        }
    }
});
