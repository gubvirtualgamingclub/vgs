class GamingNavigation {
  constructor() {
    this.initialized = false;
    this.lastScrollY = 0;
    this.scrollTimeout = null;
    this.scrollTimer = null;
    this.isMobile = this.detectMobile();
    this.init();
  }

  detectMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || 
           window.innerWidth <= 768;
  }

  init() {
    if (this.initialized) return;
    
    console.log('Initializing navigation...');
    
    this.nav = document.querySelector('.gaming-navbar');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.navMobile = document.getElementById('mobile-menu');
    this.navOverlay = document.getElementById('nav-overlay');
    
    console.log('Navigation elements found:', {
      nav: !!this.nav,
      mobileMenuBtn: !!this.mobileMenuBtn,
      navMobile: !!this.navMobile,
      navOverlay: !!this.navOverlay
    });
    
    if (!this.nav) {
      console.error('Navigation element not found');
      return;
    }

    this.setupEventListeners();
    this.setActiveLink();
    this.preloadMobileMenu();
    this.initialized = true;
    
    console.log('Navigation initialized successfully');
  }

  setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Mobile menu toggle
    if (this.mobileMenuBtn) {
      console.log('Adding click listener to mobile menu button');
      
      // Handle both click and touch events for better mobile support
      this.mobileMenuBtn.addEventListener('click', (e) => {
        console.log('Mobile menu button clicked');
        this.toggleMobileMenu(e);
      });
      
      // Prevent double-tap zoom on mobile menu button
      this.mobileMenuBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
      });
      
      // Add keyboard support for accessibility
      this.mobileMenuBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleMobileMenu(e);
        }
      });
    } else {
      console.warn('Mobile menu button not found');
    }

    // Navigation overlay click
    if (this.navOverlay) {
      this.navOverlay.addEventListener('click', this.closeMobileMenu.bind(this));
      
      // Add touch event for better mobile support
      this.navOverlay.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.closeMobileMenu();
      });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', this.closeMobileMenu.bind(this));
      
      // Add touch event for better mobile support
      link.addEventListener('touchstart', (e) => {
        // Don't prevent default here as we want the link to work
        setTimeout(() => this.closeMobileMenu(), 100);
      });
    });

    // Scroll handler for navbar hide/show
    window.addEventListener('scroll', this.throttledScrollHandler.bind(this));

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.closeMobileMenu();
      }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
  }

  toggleMobileMenu(event) {
    console.log('Toggle mobile menu called');
    
    if (!this.mobileMenuBtn || !this.navMobile || !this.navOverlay) {
      console.error('Missing mobile menu elements:', {
        mobileMenuBtn: !!this.mobileMenuBtn,
        navMobile: !!this.navMobile,
        navOverlay: !!this.navOverlay
      });
      return;
    }
    
    // Prevent event from bubbling up
    event?.stopPropagation();

    const isOpening = !this.mobileMenuBtn.classList.contains('active');
    console.log('Menu is opening:', isOpening);
    
    if (isOpening) {
      this.openMobileMenu();
    } else {
      this.closeMobileMenu();
    }
  }

  openMobileMenu() {
    console.log('Opening mobile menu...');
    this.mobileMenuBtn.classList.add('active');
    this.navMobile.classList.remove('closing');
    this.navMobile.classList.add('open');
    this.navOverlay.classList.add('active');
    document.body.classList.add('menu-open', 'no-scroll');
    
    // Set ARIA states
    this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
    this.navMobile.setAttribute('aria-hidden', 'false');
    
    // Focus first menu item
    setTimeout(() => {
      this.navMobile.querySelector('.mobile-nav-link')?.focus();
    }, 300);

    // Add click outside listener
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }

  closeMobileMenu(event) {
    if (!this.mobileMenuBtn || !this.navMobile || !this.navOverlay) return;
    
    // Prevent event from bubbling
    event?.stopPropagation();

    // Remove active states
    this.mobileMenuBtn.classList.remove('active');
    this.navOverlay.classList.remove('active');
    
    // Animate menu closing
    this.navMobile.classList.add('closing');
    
    // Wait for animation to complete
    setTimeout(() => {
      this.navMobile.classList.remove('open', 'closing');
      document.body.classList.remove('menu-open', 'no-scroll');
      
      // Reset ARIA states
      this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
      this.navMobile.setAttribute('aria-hidden', 'true');
    }, 300);

    // Remove click outside listener
    document.removeEventListener('click', this.handleClickOutside.bind(this));
    
    // Return focus to menu button
    this.mobileMenuBtn.focus();
  }

  handleClickOutside(event) {
    if (
      this.navMobile?.classList.contains('open') &&
      !this.navMobile.contains(event.target) &&
      !this.mobileMenuBtn.contains(event.target)
    ) {
      this.closeMobileMenu();
    }
  }

  handleScroll() {
    if (!this.scrollTimeout) {
      this.scrollTimeout = setTimeout(() => {
        const scrollY = window.scrollY;
        
        // Add scrolled class for navbar styling
        if (scrollY > 50) {
          this.nav?.classList.add('scrolled');
        } else {
          this.nav?.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (only if no modals are open)
        const hasOpenModal = document.querySelector('.contributors-modal:not(.hidden)');
        
        if (scrollY > 200 && !hasOpenModal) {
          if (scrollY > this.lastScrollY && !this.navMobile?.classList.contains('open')) {
            this.nav?.classList.add('hidden');
          } else {
            this.nav?.classList.remove('hidden');
          }
        } else {
          this.nav?.classList.remove('hidden');
        }
        
        this.lastScrollY = scrollY;
        this.scrollTimeout = null;
      }, 16); // 60fps for smooth scrolling
    }
  }

  throttledScrollHandler() {
    // Use RAF for smooth 60fps updates
    if (this.scrollTimer) return;
    
    this.scrollTimer = requestAnimationFrame(() => {
      this.handleScroll();
      this.scrollTimer = null;
    });
  }

  preloadMobileMenu() {
    if (window.innerWidth <= 768) {
      // Pre-initialize mobile menu elements for faster open
      const mobileContent = this.navMobile?.querySelector('.mobile-nav-content');
      if (mobileContent) {
        mobileContent.style.transform = 'translateY(0)';
      }
    }
  }

  updateAriaStates() {
    const isOpen = this.navMobile?.classList.contains('open');
    
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.setAttribute('aria-expanded', isOpen.toString());
      this.mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }
    
    if (this.navMobile) {
      this.navMobile.setAttribute('aria-hidden', (!isOpen).toString());
    }
  }

  handleKeyboardNavigation(e) {
    if (!this.navMobile?.classList.contains('open')) return;
    
    const focusableElements = this.navMobile.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  }

  setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Enhanced error handling
  handleError(error, context = 'Navigation') {
    console.error(`${context} Error:`, error);
    
    // Show user-friendly error message
    if (this.nav) {
      const errorBanner = document.createElement('div');
      errorBanner.className = 'nav-error-banner';
      errorBanner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #ef4444;
        color: white;
        padding: 0.5rem;
        text-align: center;
        font-size: 0.875rem;
        z-index: 9999;
        animation: slideDown 0.3s ease-out;
      `;
      errorBanner.textContent = 'Navigation temporarily unavailable. Please refresh the page.';
      
      document.body.insertBefore(errorBanner, document.body.firstChild);
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        errorBanner.style.animation = 'slideUp 0.3s ease-in';
        setTimeout(() => errorBanner.remove(), 300);
      }, 5000);
    }
  }

  // Public method to refresh navigation state
  refresh() {
    this.initialized = false;
    this.init();
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if nav elements are already present
  const navElement = document.querySelector('.gaming-navbar');
  if (navElement) {
    window.GamingNavigation = new GamingNavigation();
  }
});

// Re-initialize if navigation is loaded dynamically
document.addEventListener('navigationLoaded', () => {
  console.log('Navigation loaded event received, initializing...');
  // Wait a bit for the DOM to be ready
  setTimeout(() => {
    if (window.GamingNavigation) {
      window.GamingNavigation.refresh();
    } else {
      window.GamingNavigation = new GamingNavigation();
    }
  }, 100);
});
