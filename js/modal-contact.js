// Enhanced modal-contact.js with better initialization
function initializeModal() {
  // Modal Functions with Animations
  function openModal() {
    const modal = document.getElementById('contactModal');
    if (!modal) {
      console.error('Contact modal not found');
      return;
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add keyboard event listener for Escape key
    document.addEventListener('keydown', handleKeyDown);
    
    // Animate elements when modal opens
    animateModalElements();
  }

  function closeModal() {
    const modal = document.getElementById('contactModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Remove keyboard event listener
    document.removeEventListener('keydown', handleKeyDown);
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  // Add click animation to contact cards
  const contactCards = document.querySelectorAll('.contact-card');
  
  contactCards.forEach(card => {
    card.addEventListener('mousedown', function() {
      this.style.transform = 'translateY(1px)';
    });
    
    card.addEventListener('mouseup', function() {
      this.style.transform = 'translateY(-3px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
  
  // Initialize GSAP animations if available
  if (typeof gsap !== 'undefined') {
    gsap.set('.contact-card', { y: 20, opacity: 0 });
    gsap.set('.social-links', { y: 20, opacity: 0 });
    gsap.set('.modal-close-btn', { y: 20, opacity: 0 });
  }

  // Animate elements when modal opens
  function animateModalElements() {
    if (typeof gsap !== 'undefined') {
      gsap.to('.contact-card', {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });
      
      gsap.to('.social-links', {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.3,
        ease: "back.out(1.7)"
      });
      
      gsap.to('.modal-close-btn', {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0.4,
        ease: "back.out(1.7)"
      });
    }
  }

  // Make functions globally available
  window.openModal = openModal;
  window.closeModal = closeModal;
  
  // Close when clicking outside
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeModal);
} else {
  initializeModal();
}