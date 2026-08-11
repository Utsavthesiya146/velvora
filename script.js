/**
 * VELVORA Cookware - Modern Minimalist Website JavaScript
 * Carousel, Navigation, Search Modal, and Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. STICKY HEADER SCROLL EFFECT ---
  const header = document.getElementById('main-header');

  const handleHeaderScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // --- 2. INTERACTIVE SLIDESHOW ---
  const slideItems = document.querySelectorAll('.slide-item');
  const slideDots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prev-slide-btn');
  const nextBtn = document.getElementById('next-slide-btn');

  let currentSlideIndex = 0;
  const totalSlides = slideItems.length;
  let autoSlideTimer = null;

  const showSlide = (index) => {
    if (totalSlides === 0) return;

    // Wrap around index
    if (index >= totalSlides) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = totalSlides - 1;
    else currentSlideIndex = index;

    // Update slide visibility
    slideItems.forEach((slide, idx) => {
      if (idx === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update dots
    slideDots.forEach((dot, idx) => {
      if (idx === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  const nextSlide = () => {
    showSlide(currentSlideIndex + 1);
  };

  const prevSlide = () => {
    showSlide(currentSlideIndex - 1);
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideTimer = setInterval(nextSlide, 6000);
  };

  const stopAutoSlide = () => {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
    }
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoSlide();
    });
  }

  slideDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAutoSlide();
    });
  });

  // Start auto carousel
  startAutoSlide();

  // --- 3. MOBILE MENU DRAWER ---
  const hamburgerBtn = document.getElementById('hamburger-toggle');
  const closeDrawerBtn = document.getElementById('close-drawer');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // --- 4. SEARCH MODAL OVERLAY ---
  const openSearchBtn = document.getElementById('open-search-btn');
  const closeSearchBtn = document.getElementById('close-search-btn');
  const searchModal = document.getElementById('search-modal');
  const searchField = document.getElementById('search-field');

  const openSearch = () => {
    if (searchModal) {
      searchModal.classList.add('active');
      if (searchField) setTimeout(() => searchField.focus(), 100);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeSearch = () => {
    if (searchModal) {
      searchModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (openSearchBtn) openSearchBtn.addEventListener('click', openSearch);
  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeSearch();
    }
  });

  // --- 5. SMOOTH SCROLLING FOR ANCHORS ---
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = header.offsetHeight || 72;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
