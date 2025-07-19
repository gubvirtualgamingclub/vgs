// ========================================
// RESPONSIVE NAVIGATION CONTROLLER
// ========================================

class ResponsiveNavigation {
  constructor() {
    this.mobileMenuBtn = null;
    this.mobileMenu = null;
    this.navOverlay = null;
    this.isMenuOpen = false;
    
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupNavigation());
    } else {
      this.setupNavigation();
    }
  }

  setupNavigation() {
    console.log('🔧 Setting up responsive navigation...');
    
    // Get navigation elements
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.navOverlay = document.getElementById('nav-overlay');
    
    if (!this.mobileMenuBtn || !this.mobileMenu) {
      console.warn('⚠️ Navigation elements not found, retrying...');
      setTimeout(() => this.setupNavigation(), 500);
      return;
    }
    
    this.bindEvents();
    this.setupResponsiveListeners();
    
    console.log('✅ Responsive navigation initialized');
  }

  bindEvents() {
    // Mobile menu button click
    this.mobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleMobileMenu();
    });

    // Overlay click to close menu
    if (this.navOverlay) {
      this.navOverlay.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }

    // Close menu when clicking on mobile nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Escape key to close menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  setupResponsiveListeners() {
    // Close mobile menu when resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    console.log('📱 Opening mobile menu');
    
    this.isMenuOpen = true;
    
    // Add active classes
    this.mobileMenuBtn.classList.add('active');
    this.mobileMenu.classList.add('active');
    if (this.navOverlay) {
      this.navOverlay.classList.add('active');
    }
    
    // Prevent body scroll
    document.body.classList.add('menu-open');
    
    // Update ARIA attributes
    this.mobileMenuBtn.setAttribute('aria-expanded', 'true');
    this.mobileMenu.setAttribute('aria-hidden', 'false');
    
    // Focus management - focus first menu item
    const firstLink = this.mobileMenu.querySelector('.mobile-nav-link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }

  closeMobileMenu() {
    console.log('📱 Closing mobile menu');
    
    this.isMenuOpen = false;
    
    // Remove active classes immediately
    this.mobileMenuBtn.classList.remove('active');
    this.mobileMenu.classList.remove('active');
    
    // Remove overlay after animation starts
    if (this.navOverlay) {
      this.navOverlay.classList.remove('active');
    }
    
    // Restore body scroll
    document.body.classList.remove('menu-open');
    
    // Update ARIA attributes
    this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
    this.mobileMenu.setAttribute('aria-hidden', 'true');
    
    // Force a small delay to ensure clean state
    setTimeout(() => {
      if (!this.isMenuOpen) {
        // Double-check overlay is hidden
        if (this.navOverlay) {
          this.navOverlay.style.display = 'none';
          setTimeout(() => {
            this.navOverlay.style.display = '';
          }, 100);
        }
      }
    }, 350);
  }

  // Public method to check if menu is open
  isMenuOpen() {
    return this.isMenuOpen;
  }

  // Public method to force close menu
  forceClose() {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    }
  }
}

// Initialize navigation when script loads
const responsiveNav = new ResponsiveNavigation();

// Export for global access
window.ResponsiveNavigation = ResponsiveNavigation;
window.responsiveNav = responsiveNav;

console.log('✅ Responsive Navigation script loaded');
