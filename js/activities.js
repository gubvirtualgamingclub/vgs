document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const upcomingGrid = document.getElementById('upcoming-events');
  const pastGrid = document.getElementById('past-events');
  const upcomingToggle = document.getElementById('upcoming-toggle');
  const pastToggle = document.getElementById('past-toggle');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.getElementById('close-modal-events');

  // Initial number of cards to show
  const initialCards = 3;

  // Initialize the app with data
  function initializeApp(data) {
    renderEvents(data.upcoming, upcomingGrid, 'upcoming');
    renderEvents(data.past, pastGrid, 'past');
    
    // Initialize Show More/Show Less
    toggleEvents(upcomingGrid, upcomingToggle, 'upcoming');
    toggleEvents(pastGrid, pastToggle, 'past');
    
    // Initialize ScrollReveal
    ScrollReveal().reveal('.event-card', { 
      delay: 200,
      interval: 100,
      origin: 'bottom',
      distance: '50px'
    });
    ScrollReveal().reveal('#upcoming h2, #past h2', {
      delay: 100,
      origin: 'left',
      distance: '50px'
    });
  }

  // Render event cards
  function renderEvents(events, container, section) {
    container.innerHTML = '';
    events.forEach((event, index) => {
      const card = document.createElement('div');
      card.className = `event-card ${section} ${index >= initialCards ? 'hidden' : ''}`;
      card.innerHTML = `
        <img src="${event.image}" alt="${event.title}" class="event-image" onerror="this.src='assets/images/placeholder-event.png'">
        ${section === 'upcoming' ? `<span class="event-badge ${event.badge.toLowerCase()}">${event.badge}</span>` : ''}
        <div class="event-content">
          <h3 class="event-title">${event.title}</h3>
          <p class="event-date">${event.date}</p>
          <p class="event-description">${event.description}</p>
          <div class="event-tags">
            ${event.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <button class="view-gallery-btn" data-event-id="${event.id}" data-section="${section}">
            ${event.buttonText}
          </button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Show More/Show Less toggle
  function toggleEvents(grid, toggleBtn, section) {
    const hiddenCards = grid.querySelectorAll(`.event-card.${section}.hidden`);
    if (hiddenCards.length === 0) {
      toggleBtn.style.display = 'none';
      return;
    }
    
    toggleBtn.textContent = 'Show More';
    toggleBtn.addEventListener('click', () => {
      const isShowingMore = toggleBtn.textContent === 'Show More';
      hiddenCards.forEach(card => {
        card.classList.toggle('hidden', !isShowingMore);
      });
      toggleBtn.textContent = isShowingMore ? 'Show Less' : 'Show More';
      
      // Re-animate newly shown cards
      if (isShowingMore) {
        ScrollReveal().reveal(hiddenCards, { 
          delay: 200,
          interval: 100,
          origin: 'bottom',
          distance: '50px',
          reset: true
        });
      }
    });
  }

  // Open modal with event details
  function openModal(event, section) {
    document.body.style.overflow = 'hidden';
    
    modalContent.innerHTML = section === 'past' ? `
      <div class="modal-header text-center">
        <img src="${event.image}" alt="${event.title}" class="mx-auto mb-4 max-h-48 w-full object-cover rounded-lg" onerror="this.src='assets/images/placeholder-event.png'">
        <h2 class="text-2xl font-bold mb-2 text-green-400">${event.title}</h2>
        <p class="text-gray-400 mb-4">${event.date}</p>
      </div>
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2 flex items-center">
          <i class="fas fa-info-circle mr-2 text-green-400"></i>About
        </h3>
        <p class="text-gray-300">${event.detailedDescription}</p>
      </div>
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2 flex items-center">
          <i class="fas fa-tags mr-2 text-green-400"></i>Tags
        </h3>
        <div class="flex flex-wrap gap-2">
          ${event.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
      <div class="text-center">
        <a href="${event.galleryLink}" target="_blank" rel="noopener noreferrer" class="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-300">
          View Full Event Gallery
        </a>
      </div>
    ` : `
      <div class="modal-header text-center">
        <img src="${event.image}" alt="${event.title}" class="mx-auto mb-4 max-h-48 w-full object-cover rounded-lg" onerror="this.src='assets/images/placeholder-event.png'">
        <h2 class="text-2xl font-bold mb-2 text-green-400">${event.title}</h2>
        <p class="text-gray-400 mb-4">${event.date}</p>
      </div>
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2 flex items-center">
          <i class="fas fa-info-circle mr-2 text-green-400"></i>About
        </h3>
        <p class="text-gray-300">${event.detailedDescription}</p>
      </div>
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2 flex items-center">
          <i class="fas fa-tags mr-2 text-green-400"></i>Tags
        </h3>
        <div class="flex flex-wrap gap-2">
          ${event.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
      ${event.badge === 'Ongoing' && event.registrationLink ? `
        <div class="text-center">
          <a href="${event.registrationLink}" target="_blank" rel="noopener noreferrer" class="inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition duration-300">
            Register Now
          </a>
        </div>
      ` : ''}
    `;

    modalOverlay.classList.remove('hidden');
    modalOverlay.classList.add('flex');
  }

  // Close modal
  function closeModal() {
    modalOverlay.classList.add('hidden');
    modalOverlay.classList.remove('flex');
    document.body.style.overflow = '';
  }

  // Event listeners for modal
  closeModalBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('flex')) {
      closeModal();
    }
  });

  // Learn More button click handler
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-gallery-btn')) {
      const eventId = e.target.dataset.eventId;
      const section = e.target.dataset.section;
      
      fetch('data/activities.json')
        .then(response => response.json())
        .then(data => {
          const event = data[section].find(e => e.id == eventId);
          if (event) openModal(event, section);
        })
        .catch(error => {
          console.error('Error loading event details:', error);
        });
    }
  });

  // Initialize the app when data is loaded
  window.initializeApp = initializeApp;
});