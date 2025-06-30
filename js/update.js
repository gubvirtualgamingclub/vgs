document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const updatesGrid = document.getElementById('updates-grid');
  const facebookGrid = document.getElementById('facebook-grid');
  const toggleUpdatesBtn = document.getElementById('toggle-updates');
  const toggleFacebookBtn = document.getElementById('toggle-facebook');
  
  // State
  let showAllUpdates = true;
  let showAllFacebook = true;
  
  // Load Club Updates
  fetch('data/updates.json')
    .then(response => response.json())
    .then(data => {
      if (!data.updates) throw new Error('Invalid data format');
      renderUpdates(data.updates);
    })
    .catch(error => {
      console.error('Error loading updates:', error);
      updatesGrid.innerHTML = `
        <div class="col-span-full text-center py-8 text-red-400">
          <i class="fas fa-exclamation-triangle mr-2"></i>
          Failed to load updates. Please try again later.
        </div>
      `;
    });

  // Load Facebook Posts (Mock API - in real implementation use Facebook Graph API)
  function loadFacebookPosts() {
    // In a real implementation, you would use:
    // fetch('https://graph.facebook.com/v12.0/YOUR_PAGE_ID/feed?access_token=YOUR_TOKEN')
    
    // Mock data for demonstration
    const mockFacebookPosts = [
      {
        id: '1',
        message: 'Tournament results are in! Congrats to all winners!',
        created_time: '2024-05-15T14:30:00+0000',
        full_picture: 'assets/images/vgs.png',
        permalink_url: 'https://www.facebook.com/share/v/16VysKArAZ/'
      },
      // Add 9 more mock posts...
    ].slice(0, 10); // Get first 10 posts
    
    renderFacebookPosts(mockFacebookPosts);
  }

  // Render Club Updates
  function renderUpdates(updates) {
    updatesGrid.innerHTML = '';
    
    updates.forEach((update, index) => {
      const card = document.createElement('div');
      card.className = `update-card ${update.important ? 'important-notice' : ''}`;
      card.style.animationDelay = `${index * 0.1}s`;
      
      let badgeClass = '';
      let badgeText = '';
      
      switch(update.type) {
        case 'event':
          badgeClass = 'badge-event';
          badgeText = 'Event';
          break;
        case 'notice':
          badgeClass = 'badge-notice';
          badgeText = 'Notice';
          break;
        case 'registration':
          badgeClass = 'badge-registration';
          badgeText = 'Registration';
          break;
      }
      
      card.innerHTML = `
        <div class="relative overflow-hidden">
          <img src="${update.image}" alt="${update.title}" class="update-image"
               onerror="this.src='assets/images/placeholder-update.jpg'">
          <span class="update-badge ${badgeClass}">${badgeText}</span>
        </div>
        <div class="p-5">
          <h3 class="text-xl font-bold mb-2">${update.title}</h3>
          <p class="update-date mb-3"><i class="far fa-calendar-alt mr-2"></i>${formatDate(update.date)}</p>
          <p class="text-gray-300 mb-4">${update.description}</p>
          ${update.registration_link ? `
            <a href="${update.registration_link}" target="_blank" 
               class="inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition">
              Register Now
            </a>
          ` : ''}
          ${update.form_link ? `
            <a href="${update.form_link}" target="_blank" 
               class="inline-block bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition">
              Apply Now
            </a>
          ` : ''}
        </div>
      `;
      
      updatesGrid.appendChild(card);
    });
    
    // Initialize with all cards visible
    toggleView(updatesGrid, showAllUpdates);
  }

  // Render Facebook Posts
  function renderFacebookPosts(posts) {
    facebookGrid.innerHTML = '';
    
    posts.forEach((post, index) => {
      const card = document.createElement('a');
      card.href = post.permalink_url;
      card.target = "_blank";
      card.className = 'fb-card';
      card.style.animationDelay = `${index * 0.1}s`;
      
      card.innerHTML = `
        <div>
          <img src="${post.full_picture}" alt="Facebook post" class="fb-image"
               onerror="this.src='assets/images/logos/vgs.png'">
        </div>
        <div class="fb-content">
          <p class="fb-date">${formatFacebookDate(post.created_time)}</p>
          <p class="text-gray-200 line-clamp-3">${post.message}</p>
        </div>
      `;
      
      facebookGrid.appendChild(card);
    });
    
    // Initialize with all cards visible
    toggleView(facebookGrid, showAllFacebook);
  }

  // Toggle View Between Full and Minimal
  function toggleView(gridElement, showAll) {
    const cards = gridElement.children;
    const cols = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 2;
    
    if (!showAll) {
      // Show minimal view (4 cards)
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = i < cols ? 'block' : 'none';
      }
      gridElement.classList.remove('lg:grid-cols-5');
      gridElement.classList.add('lg:grid-cols-4');
    } else {
      // Show all cards
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = 'block';
      }
      if (gridElement === facebookGrid) {
        gridElement.classList.remove('lg:grid-cols-4');
        gridElement.classList.add('lg:grid-cols-5');
      }
    }
  }

  // Format Date
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  // Format Facebook Date
  function formatFacebookDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  // Event Listeners
  toggleUpdatesBtn.addEventListener('click', () => {
    showAllUpdates = !showAllUpdates;
    toggleView(updatesGrid, showAllUpdates);
    document.getElementById('toggle-text').textContent = showAllUpdates ? 'Show Less' : 'Show More';
    toggleUpdatesBtn.querySelector('i').className = showAllUpdates ? 'fas fa-chevron-up ml-2' : 'fas fa-chevron-down ml-2';
  });

  toggleFacebookBtn.addEventListener('click', () => {
    showAllFacebook = !showAllFacebook;
    toggleView(facebookGrid, showAllFacebook);
    document.getElementById('fb-toggle-text').textContent = showAllFacebook ? 'Show Less' : 'Show More';
    toggleFacebookBtn.querySelector('i').className = showAllFacebook ? 'fas fa-chevron-up ml-2' : 'fas fa-chevron-down ml-2';
  });

  // Load Facebook posts
  loadFacebookPosts();

  // Initialize ScrollReveal
  if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.update-card, .fb-card', {
      delay: 200,
      interval: 100,
      origin: 'bottom',
      distance: '20px'
    });
  }
});