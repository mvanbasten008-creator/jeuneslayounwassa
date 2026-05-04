// script.js
console.log("Static community site loaded.");

document.addEventListener("DOMContentLoaded", () => {
  // 1. Highlight active link
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const menuLinks = document.querySelectorAll(".main-menu a");

  menuLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    // Remove hardcoded active class first to let JS handle it properly if needed
    link.classList.remove("active");
    if (
      linkPath === currentPath ||
      (currentPath === "" && linkPath === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const mainMenu = document.getElementById("mainMenu");

  if (menuToggle && mainMenu) {
    menuToggle.addEventListener("click", () => {
      mainMenu.classList.toggle("active");
    });
  }

  // 3. Rules Modal Logic
  const openRulesBtn = document.getElementById("openRulesBtn");
  const rulesModal = document.getElementById("rulesModal");
  const closeRulesBtn = document.getElementById("closeRulesBtn");

  if (openRulesBtn && rulesModal && closeRulesBtn) {
    // Find overlay
    const rulesOverlay = rulesModal.querySelector(".rules-modal-overlay");

    const openModal = () => {
      rulesModal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling
    };

    const closeModal = () => {
      rulesModal.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    };

    openRulesBtn.addEventListener("click", openModal);
    closeRulesBtn.addEventListener("click", closeModal);
    if (rulesOverlay) {
      rulesOverlay.addEventListener("click", closeModal);
    }
  }

  // 3.5. Draw Modal Logic
  const openDrawBtn = document.getElementById("openDrawBtn");
  const drawModal = document.getElementById("drawModal");
  const closeDrawBtn = document.getElementById("closeDrawBtn");

  if (openDrawBtn && drawModal && closeDrawBtn) {
    const drawOverlay = drawModal.querySelector(".rules-modal-overlay");

    const openDraw = () => {
      drawModal.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    const closeDraw = () => {
      drawModal.classList.remove("active");
      document.body.style.overflow = "";
    };

    openDrawBtn.addEventListener("click", openDraw);
    closeDrawBtn.addEventListener("click", closeDraw);
    if (drawOverlay) {
      drawOverlay.addEventListener("click", closeDraw);
    }
  }

  // 3.8. Teams Modal Logic
  const openTeamsBtn = document.getElementById("openTeamsBtn");
  const teamsModal = document.getElementById("teamsModal");
  const closeTeamsBtn = document.getElementById("closeTeamsBtn");
  const teamsModalContentContainer = document.getElementById("teamsModalContentContainer");
  const originalTeamsGrid = document.querySelector(".teams-grid");

  if (openTeamsBtn && teamsModal && closeTeamsBtn) {
    const teamsOverlay = teamsModal.querySelector(".rules-modal-overlay");

    const openTeams = () => {
      if (teamsModalContentContainer && originalTeamsGrid && teamsModalContentContainer.innerHTML.trim() === "") {
        teamsModalContentContainer.appendChild(originalTeamsGrid.cloneNode(true));
      }
      teamsModal.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    const closeTeams = () => {
      teamsModal.classList.remove("active");
      document.body.style.overflow = "";
    };

    openTeamsBtn.addEventListener("click", openTeams);
    closeTeamsBtn.addEventListener("click", closeTeams);
    if (teamsOverlay) {
      teamsOverlay.addEventListener("click", closeTeams);
    }
  }

  // 4. Gallery Logic
  const galleryScroll = document.getElementById("galleryScroll");
  const btnPrev = document.getElementById("galleryBtnPrev");
  const btnNext = document.getElementById("galleryBtnNext");

  if (galleryScroll && btnPrev && btnNext) {
    const scrollAmount = 300; // adjust based on item width

    btnPrev.addEventListener("click", () => {
      // Note: Since right-to-left layout might affect direction
      // and we set the buttons as Next/Prev depending on the language direction.
      // But let's scroll left/right with scrollBy
      galleryScroll.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    btnNext.addEventListener("click", () => {
      galleryScroll.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }

  // 5. Gallery Modal Logic
  const galleryItems = document.querySelectorAll(".gallery-item");
  const galleryModal = document.getElementById("galleryModal");
  const galleryModalImg = document.getElementById("galleryModalImg");
  const galleryModalClose = document.getElementById("galleryModalClose");
  const galleryModalOverlay = document.getElementById("galleryModalOverlay");

  if (galleryModal && galleryModalImg) {
    const openGalleryModal = (src) => {
      galleryModalImg.src = src;
      galleryModal.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    const closeGalleryModal = () => {
      galleryModal.classList.remove("active");
      document.body.style.overflow = "";
      // slight delay to clear src after fade out
      setTimeout(() => {
        galleryModalImg.src = "";
      }, 300);
    };

    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const src = item.getAttribute("data-src");
        if (src) openGalleryModal(src);
      });
    });

    if (galleryModalClose)
      galleryModalClose.addEventListener("click", closeGalleryModal);
    if (galleryModalOverlay)
      galleryModalOverlay.addEventListener("click", closeGalleryModal);

    // ESC key to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && galleryModal.classList.contains("active")) {
        closeGalleryModal();
      }
    });
  }

  // 6. Matches Carousel Logic
  const matchesCarousel = document.getElementById("matchesCarousel");
  const matchBtnPrev = document.getElementById("matchBtnPrev");
  const matchBtnNext = document.getElementById("matchBtnNext");
  const matchDots = document.querySelectorAll(".match-dot");

  if (matchesCarousel && matchBtnPrev && matchBtnNext) {
    let originalCards = Array.from(
      matchesCarousel.querySelectorAll(".match-card"),
    );
    const numOriginals = originalCards.length;

    // Add index data to original dots to map them
    matchDots.forEach((dot, index) => {
      dot.dataset.index = index;
      // Also add click events to dots for navigation
      dot.addEventListener("click", () => {
        const currentCards = Array.from(
          matchesCarousel.querySelectorAll(".match-card"),
        );
        // Find nearest card with this index
        const carouselRect = matchesCarousel.getBoundingClientRect();
        const containerCenter = carouselRect.left + carouselRect.width / 2;

        let targetCard = null;
        let minDistance = Infinity;

        currentCards.forEach((card) => {
          if (parseInt(card.dataset.index) === index) {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const dist = Math.abs(cardCenter - containerCenter);
            if (dist < minDistance) {
              minDistance = dist;
              targetCard = card;
            }
          }
        });

        if (targetCard) {
          const carouselRect = matchesCarousel.getBoundingClientRect();
          const containerCenter = carouselRect.left + carouselRect.width / 2;
          const rect = targetCard.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const delta = cardCenter - containerCenter;

          matchesCarousel.scrollBy({ left: delta, behavior: "smooth" });
        }
      });
    });

    // 1. Clone cards to create an infinite loop effect
    // We will prepend 2 sets and append 2 sets.
    originalCards.forEach((card, index) => {
      card.dataset.index = index;
    });

    const prependGroup = [];
    const appendGroup = [];

    // Create 2 sets of clones for prepend
    for (let i = 0; i < 2; i++) {
      originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.classList.remove("active");
        prependGroup.push(clone);
      });
    }

    // Create 2 sets of clones for append
    for (let i = 0; i < 2; i++) {
      originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.classList.remove("active");
        appendGroup.push(clone);
      });
    }

    // Add them to DOM
    // To keep original cards in middle, prepend and append
    prependGroup.reverse().forEach((clone) => matchesCarousel.prepend(clone));
    appendGroup.forEach((clone) => matchesCarousel.append(clone));

    // Get all cards after DOM update
    let allCards = Array.from(matchesCarousel.querySelectorAll(".match-card"));
    const totalCards = allCards.length;

    // Middle block start index
    const middleStartIndex = numOriginals * 2;

    // Helper to scroll purely horizontally within the carousel container
    function scrollToCard(card, behavior = "smooth") {
      const carouselRect = matchesCarousel.getBoundingClientRect();
      const containerCenter = carouselRect.left + carouselRect.width / 2;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const delta = cardCenter - containerCenter;

      if (behavior === "auto") {
        matchesCarousel.style.scrollBehavior = "auto";
        matchesCarousel.scrollBy({ left: delta, behavior: "auto" });
        // Restore smooth scrolling from CSS
        matchesCarousel.style.scrollBehavior = "smooth";
      } else {
        matchesCarousel.scrollBy({ left: delta, behavior: "smooth" });
      }
    }

    // 2. Set initial scroll position to the original elements (middle)
    function centerToMiddle() {
      const centerCard = allCards[middleStartIndex];
      if (centerCard) {
        scrollToCard(centerCard, "auto");
      }
    }

    // Wait for fonts/layout then center
    setTimeout(centerToMiddle, 100);

    function scrollToSibling(direction) {
      const activeCard = allCards.find((c) => c.classList.contains("active"));
      if (activeCard) {
        const activeIndex = allCards.indexOf(activeCard);
        const targetIndex = activeIndex + direction;
        if (targetIndex >= 0 && targetIndex < allCards.length) {
          scrollToCard(allCards[targetIndex], "smooth");
        }
      }
    }

    matchBtnPrev.addEventListener("click", () => scrollToSibling(-1));
    matchBtnNext.addEventListener("click", () => scrollToSibling(1));

    matchesCarousel.addEventListener("click", (e) => {
      const card = e.target.closest(".match-card");
      if (card && !card.classList.contains("active")) {
        scrollToCard(card, "smooth");
      }
    });

    let isScrolling;
    let isHandlingJump = false;

    function updateMatchesDots() {
      if (!matchesCarousel || allCards.length === 0) return;

      // RTL safe logic for center using getBoundingClientRect
      const carouselRect = matchesCarousel.getBoundingClientRect();
      const containerCenter = carouselRect.left + carouselRect.width / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      allCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - containerCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      // Update active styles
      allCards.forEach((card, index) => {
        if (index === closestIndex) {
          card.classList.add("active");
        } else {
          card.classList.remove("active");
        }
      });

      const activeDataIndex = parseInt(allCards[closestIndex].dataset.index);
      matchDots.forEach((dot, index) => {
        if (index === activeDataIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });

      // Seamless jump logic
      // If we scrolled into the first group or last group, jump back to middle group
      if (!isHandlingJump) {
        if (closestIndex <= numOriginals) {
          isHandlingJump = true;
          // We are at the very beginning list, jump forward by 2 groups (to middle)
          const equivalentIndex = closestIndex + numOriginals * 2;
          const targetCard = allCards[equivalentIndex];

          scrollToCard(targetCard, "auto");
          setTimeout(() => (isHandlingJump = false), 50);
        } else if (closestIndex >= totalCards - numOriginals - 1) {
          isHandlingJump = true;
          // We are at the end list, jump backward by 2 groups
          const equivalentIndex = closestIndex - numOriginals * 2;
          const targetCard = allCards[equivalentIndex];

          scrollToCard(targetCard, "auto");
          setTimeout(() => (isHandlingJump = false), 50);
        }
      }
    }

    matchesCarousel.addEventListener("scroll", () => {
      window.clearTimeout(isScrolling);

      // Fast visual update
      updateMatchesDots();

      isScrolling = setTimeout(function () {
        updateMatchesDots();
      }, 50);
    });
  }
});
