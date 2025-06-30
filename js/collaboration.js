document.addEventListener('DOMContentLoaded', function() {
  // Initialize click blocker
  const clickBlocker = document.getElementById('click-blocker-overlay');
  clickBlocker.style.display = 'none';

  // DOM Elements
  const partnersGrid = document.getElementById('partners-grid');
  const loadingSpinner = document.getElementById('loading-spinner');
  const partnerModal = document.getElementById('partner-modal');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.getElementById('close-partner-modal'); // Updated ID
  const collaborateCTA = document.getElementById('collaborate-cta');
  const collaborateBtn = document.getElementById('collaborate-btn');
  const collaborateModal = document.getElementById('collaborate-modal');
  const closeCollabModal = document.getElementById('close-collab-modal');

  // Store clicked card position for animation
  let clickedCardRect = null;

  // Ensure clickability function
  function ensureClickability() {
    clickBlocker.style.display = 'none';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.querySelectorAll('a, button, [tabindex="0"]').forEach(el => {
      el.style.pointerEvents = 'auto';
      el.style.zIndex = '50'; // Ensure interactive elements are below modals
    });
    // Lower z-index of main content elements
    document.querySelectorAll('nav, #nav-placeholder, #footer-placeholder').forEach(el => {
      el.style.zIndex = '50';
    });
  }

  // Load Data
  fetch('data/collaborations.json')
    .then(response => {
      if (!response.ok) throw new Error('Network error');
      return response.json();
    })
    .then(data => {
      if (!data.partners) throw new Error('Invalid data format');
      renderPartners(data.partners);
      
      setTimeout(() => {
        partnersGrid.style.opacity = '1';
        animateCards();
        ensureClickability(); // Ensure clickability after load
      }, 100);
      
      loadingSpinner.style.display = 'none';
      
      setTimeout(() => {
        collaborateCTA.style.opacity = '1';
        
        setInterval(() => {
          collaborateBtn.classList.toggle('ring-4');
          collaborateBtn.classList.toggle('ring-green-400/50');
        }, 2000);
      }, 1500);
    })
    .catch(error => {
      console.error('Error:', error);
      loadingSpinner.innerHTML = `
        <div class="text-red-500 text-center p-4">
          <i class="fas fa-exclamation-triangle mr-2"></i>
          Failed to load partners. Please try again later.
        </div>
      `;
      ensureClickability(); // Ensure clickability on error
    });

  // Animate cards on load
  function animateCards() {
    const cards = document.querySelectorAll('.partner-card');
    cards.forEach((card, index) => {
      card.style.transform = 'translateY(20px)';
      card.style.opacity = '0';
      card.style.transition = 'all 0.5s ease ' + (index * 0.1) + 's';
      
      setTimeout(() => {
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
      }, 100);
    });
  }

  // Render Partners with Event Tags
  function renderPartners(partners) {
    partnersGrid.innerHTML = '';
    
    partners.forEach(partner => {
      const card = document.createElement('div');
      card.className = 'partner-card bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-green-400/50 hover:scale-[1.02]';
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `View details for ${partner.name}`);
      
      const types = partner.types || (partner.type ? 
        (Array.isArray(partner.type) ? partner.type : [partner.type]) : 
        ['Partner']);
      
      const events = partner.events || [];
      
      card.innerHTML = `
        <div class="partner-logo-container h-48 flex items-center justify-center p-6 bg-gray-900/50">
          <img src="${partner.logo}" alt="${partner.name}" class="partner-logo max-h-full max-w-full object-contain transition-transform duration-300"
               onerror="this.src='assets/images/placeholder-partner.png'">
        </div>
        <div class="partner-content p-6">
          <div class="partner-types flex flex-wrap gap-2 mb-3">
            ${types.map(type => `<span class="partner-type px-2 py-1 rounded-full text-xs font-semibold bg-green-900/30 text-green-400">${type}</span>`).join('')}
          </div>
          <h3 class="partner-name text-xl font-bold mb-2 text-white">${partner.name}</h3>
          <p class="partner-desc text-gray-400 text-sm mb-4">${partner.shortDesc}</p>
          ${events.length > 0 ? `
          <div class="partner-events flex flex-wrap gap-2 mb-3">
            ${events.map(event => `<span class="event-tag px-2 py-1 rounded-full text-xs font-semibold bg-blue-900/30 text-blue-400">${event}</span>`).join('')}
          </div>
          ` : ''}
          <div class="partner-meta flex flex-wrap gap-3 text-xs text-gray-500">
            <span class="flex items-center"><i class="fas fa-globe mr-1"></i> ${new URL(partner.website).hostname}</span>
            <span class="flex items-center"><i class="fas fa-calendar-alt mr-1"></i> Since ${partner.since}</span>
          </div>
        </div>
      `;
      
      card.addEventListener('click', (e) => {
        clickedCardRect = card.getBoundingClientRect();
        openModal(partner);
      });
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          clickedCardRect = card.getBoundingClientRect();
          openModal(partner);
        }
      });
      
      partnersGrid.appendChild(card);
    });
  }

  // Open Modal with Event Tags
  function openModal(partner) {
    clickBlocker.style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    
    // Ensure main content is below modal
    document.querySelectorAll('nav, #nav-placeholder, #footer-placeholder').forEach(el => {
      el.style.zIndex = '50';
    });
    
    const types = partner.types || (partner.type ? 
      (Array.isArray(partner.type) ? partner.type : [partner.type]) : 
      ['Partner']);
    
    const events = partner.events || [];
    
    modalContent.innerHTML = `
      <div class="modal-header text-center">
        <img src="${partner.logo}" alt="${partner.name}" class="mx-auto mb-4 max-h-20"
             onerror="this.src='assets/images/placeholder-partner.png'">
        <h2 class="text-2xl font-bold mb-2 text-green-400">${partner.name}</h2>
        <div class="flex flex-wrap justify-center gap-2 mb-4">
          ${types.map(type => `<span class="px-3 py-1 rounded-full bg-gray-700 text-sm">${type}</span>`).join('')}
          <span class="px-3 py-1 rounded-full bg-gray-700 text-sm">Since ${partner.since}</span>
        </div>
        ${events.length > 0 ? `
        <div class="flex flex-wrap justify-center gap-2 mb-6">
          <span class="text-xs text-gray-400 mr-2">Events:</span>
          ${events.map(event => `<span class="event-tag px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-sm">${event}</span>`).join('')}
        </div>
        ` : ''}
      </div>
      
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2 flex items-center">
          <i class="fas fa-info-circle mr-2 text-green-400"></i>About
        </h3>
        <p class="text-gray-300">${partner.details.description}</p>
      </div>
      
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2 flex items-center">
          <i class="fas fa-handshake mr-2 text-green-400"></i>Collaborations
        </h3>
        <ul class="list-disc pl-5 space-y-2 text-gray-300">
          ${partner.details.collaborations.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      
      <div class="flex flex-col sm:flex-row gap-4 mt-8">
        <a href="mailto:${partner.details.contact}" 
           class="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg text-center transition flex items-center justify-center">
          <i class="fas fa-envelope mr-2"></i>Contact
        </a>
        <a href="${partner.website}" target="_blank" rel="noopener noreferrer"
           class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-center transition flex items-center justify-center">
          <i class="fas fa-globe mr-2"></i>Website
        </a>
      </div>
    `;
    
    partnerModal.style.display = 'flex';
    
    const modal = partnerModal.querySelector('.modal-content');
    modal.style.transformOrigin = `${clickedCardRect.left + clickedCardRect.width/2}px ${clickedCardRect.top + clickedCardRect.height/2}px`;
    modal.style.transform = 'scale(0.8)';
    modal.style.opacity = '0';
    
    setTimeout(() => {
      partnerModal.style.opacity = '1';
      modal.style.transform = 'scale(1)';
      modal.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
      const firstFocusable = modalContent.querySelector('a, button');
      if (firstFocusable) firstFocusable.focus();
    }, 100);
  }

  // Close Modal with animation
  function closeModal() {
    const modal = partnerModal.querySelector('.modal-content');
    modal.style.transform = 'scale(0.8)';
    modal.style.opacity = '0';
    
    setTimeout(() => {
      partnerModal.style.opacity = '0';
      setTimeout(() => {
        partnerModal.style.display = 'none';
        ensureClickability();
      }, 300);
    }, 100);
  }

  closeModalBtn.addEventListener('click', closeModal);
  
  partnerModal.addEventListener('click', (e) => {
    if (e.target === partnerModal) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && partnerModal.style.display === 'flex') {
      closeModal();
    }
  });

  // Open Collaboration Modal
  collaborateBtn.addEventListener('click', () => {
    clickBlocker.style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    
    // Ensure main content is below modal
    document.querySelectorAll('nav, #nav-placeholder, #footer-placeholder').forEach(el => {
      el.style.zIndex = '50';
    });
    
    collaborateModal.style.display = 'flex';
    
    const modalContent = collaborateModal.querySelector('div');
    modalContent.style.transform = 'scale(0.95) translateY(20px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
      modalContent.style.transform = 'scale(1) translateY(0)';
      modalContent.style.opacity = '1';
    }, 10);
    
    setTimeout(() => closeCollabModal.focus(), 50);
  });

  // Close Collaboration Modal
  function closeCollabModalFunc() {
    const modalContent = collaborateModal.querySelector('div');
    modalContent.style.transform = 'scale(0.95) translateY(20px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
      collaborateModal.style.display = 'none';
      ensureClickability();
    }, 300);
  }

  closeCollabModal.addEventListener('click', closeCollabModalFunc);
  
  collaborateModal.addEventListener('click', (e) => {
    if (e.target === collaborateModal) closeCollabModalFunc();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && collaborateModal.style.display === 'flex') {
      closeCollabModalFunc();
    }
  });

  // Mobile touch events for modal
  let touchStartY = 0;
  let isScrolling = false;

  collaborateModal.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    isScrolling = false;
  }, { passive: true });

  collaborateModal.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const modalContent = collaborateModal.querySelector('div');
    
    if (modalContent.scrollTop <= 0 && touchY > touchStartY) {
      isScrolling = true;
      e.preventDefault();
      closeCollabModalFunc();
    }
  }, { passive: false });

  // Final clickability check after all is loaded
  window.addEventListener('load', ensureClickability);
  setTimeout(ensureClickability, 3000); // Fallback
});