function initNavigation() {
  const nav = document.querySelector('.gaming-nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMobile = document.getElementById('nav-mobile');
  const navLogo = document.querySelector('.nav-logo');
  let lastScrollY = window.scrollY;
  let ticking = false;

  // Mobile menu toggle
  if (mobileMenuBtn && navMobile) {
    mobileMenuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      this.classList.toggle('active');
      navMobile.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
      
      // Close other open modals if any
      if (document.getElementById('contactModal')?.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // Contact button handler
  function handleContactButton(e) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof openModal === 'function') {
      openModal();
    } else {
      console.error('openModal function not available');
      window.location.href = 'mailto:faysaltomal02@gmail.com';
    }
  }

  // Add contact button event listeners
  document.querySelectorAll('.contact-btn, .mobile-contact-btn').forEach(btn => {
    btn.addEventListener('click', handleContactButton);
  });

  // Ensure logo click works properly
  if (navLogo) {
    navLogo.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Close mobile menu if open
      if (mobileMenuBtn?.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navMobile.classList.remove('open');
        document.body.classList.remove('no-scroll');
      }
      
      // Navigate to index.html
      window.location.href = 'index.html';
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (mobileMenuBtn?.classList.contains('active') && 
        !e.target.closest('.mobile-menu-btn') && 
        !e.target.closest('.nav-mobile') && 
        !e.target.closest('.nav-logo')) {
      mobileMenuBtn.classList.remove('active');
      navMobile.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
      if (navMobile) navMobile.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });

  // Scroll handler
  function handleScroll() {
    const scrollY = window.scrollY;

    // Add/remove scrolled class
    if (scrollY > 50) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }

    // Hide/show nav based on scroll direction
    if (scrollY > lastScrollY && scrollY > 100) {
      nav?.classList.add('hidden');
    } else {
      nav?.classList.remove('hidden');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  // Throttle scroll events
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });

  // Set active link based on current section
  function setActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Desktop links
        document.querySelectorAll(`.nav-link[href*="${sectionId}"]`).forEach(link => {
          link.classList.add('active');
        });
        // Mobile links
        document.querySelectorAll(`.mobile-nav-link[href*="${sectionId}"]`).forEach(link => {
          link.classList.add('active');
        });
      } else {
        document.querySelectorAll(`.nav-link[href*="${sectionId}"]`).forEach(link => {
          link.classList.remove('active');
        });
        document.querySelectorAll(`.mobile-nav-link[href*="${sectionId}"]`).forEach(link => {
          link.classList.remove('active');
        });
      }
    });
  }

  // Initial setup
  handleScroll();
  setActiveLink();

  // Update on scroll
  window.addEventListener('scroll', setActiveLink);

  // Update on hash change
  window.addEventListener('hashchange', function() {
    setActiveLink();
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  });
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const navCheckInterval = setInterval(() => {
    if (document.querySelector('.gaming-nav')) {
      clearInterval(navCheckInterval);
      initNavigation();
    }
  }, 100);
});