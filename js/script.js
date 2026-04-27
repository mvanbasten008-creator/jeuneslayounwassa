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

    // 4. Gallery Logic
    const galleryScroll = document.getElementById('galleryScroll');
    const btnPrev = document.getElementById('galleryBtnPrev');
    const btnNext = document.getElementById('galleryBtnNext');

    if (galleryScroll && btnPrev && btnNext) {
        const scrollAmount = 300; // adjust based on item width

        btnPrev.addEventListener('click', () => {
            // Note: Since right-to-left layout might affect direction
            // and we set the buttons as Next/Prev depending on the language direction.
            // But let's scroll left/right with scrollBy
            galleryScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        btnNext.addEventListener('click', () => {
            galleryScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // 5. Gallery Modal Logic
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.getElementById('galleryModal');
    const galleryModalImg = document.getElementById('galleryModalImg');
    const galleryModalClose = document.getElementById('galleryModalClose');
    const galleryModalOverlay = document.getElementById('galleryModalOverlay');

    if (galleryModal && galleryModalImg) {
        const openGalleryModal = (src) => {
            galleryModalImg.src = src;
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeGalleryModal = () => {
            galleryModal.classList.remove('active');
            document.body.style.overflow = '';
            // slight delay to clear src after fade out
            setTimeout(() => { galleryModalImg.src = ''; }, 300);
        };

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-src');
                if (src) openGalleryModal(src);
            });
        });

        if (galleryModalClose) galleryModalClose.addEventListener('click', closeGalleryModal);
        if (galleryModalOverlay) galleryModalOverlay.addEventListener('click', closeGalleryModal);

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
                closeGalleryModal();
            }
        });
    }
});
