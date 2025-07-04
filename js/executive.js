document.addEventListener('DOMContentLoaded', function() {
  // Initialize page with loading state
  initializePage();
  
  // Load executive data
  loadExecutiveData();
});

function initializePage() {
  // Show loading spinner
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.innerHTML = `
      <div class="flex flex-col items-center gap-4">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        <p class="text-gray-400 text-sm">Loading executive team...</p>
      </div>
    `;
  }
  
  // Initially hide sections
  const sections = ['moderation-panel', 'wing-panel'];
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
    }
  });
}

async function loadExecutiveData() {
  try {
    const response = await fetch('data/executives.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Validate data structure
    if (!data.moderationPanel || !data.wingPanel) {
      throw new Error('Invalid data structure');
    }
    
    // Hide loading spinner
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
      spinner.style.display = 'none';
    }
    
    // Render panels with staggered animation
    await renderPanelWithAnimation('moderators-container', data.moderationPanel, 'moderation-panel');
    await renderPanelWithAnimation('wing-members-container', data.wingPanel, 'wing-panel', 300);
    
    // Initialize interactive features
    initializeInteractiveFeatures();
    
  } catch (error) {
    console.error('Error loading executive data:', error);
    showErrorState(error.message);
  }
}

async function renderPanelWithAnimation(containerId, members, sectionId, delay = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      renderPanel(containerId, members);
      animateSection(sectionId);
      resolve();
    }, delay);
  });
}

function renderPanel(containerId, members) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container ${containerId} not found`);
    return;
  }
  
  // Clear container
  container.innerHTML = '';
  
  // Determine if this is the moderation panel
  const isModerationPanel = containerId === 'moderators-container';
  
  // Add members with enhanced cards
  members.forEach((member, index) => {
    const card = createMemberCard(member, index, isModerationPanel);
    container.appendChild(card);
  });
}

function createMemberCard(member, index, isModerationPanel = false) {
  // Generate social links with proper icons and labels
  const socialLinks = member.socialLinks.map(link => {
    const iconMap = {
      'fas fa-envelope': { label: 'Email', color: '#ef4444' },
      'fab fa-linkedin': { label: 'LinkedIn', color: '#0077b5' },
      'fab fa-github': { label: 'GitHub', color: '#333' },
      'fab fa-facebook': { label: 'Facebook', color: '#1877f2' },
      'fab fa-twitter': { label: 'Twitter', color: '#1da1f2' },
      'fab fa-instagram': { label: 'Instagram', color: '#e4405f' }
    };
    
    const iconInfo = iconMap[link.icon] || { label: 'Social', color: '#6b7280' };
    
    return `
      <a href="${link.url}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="social-icon" 
         aria-label="${member.name} ${iconInfo.label}"
         title="${iconInfo.label}"
         style="--icon-color: ${iconInfo.color}">
        <i class="${link.icon}"></i>
      </a>
    `;
  }).join('');
  
  // Create card element with appropriate class
  const card = document.createElement('div');
  card.className = isModerationPanel ? 'member-card moderation-card' : 'member-card';
  card.style.animationDelay = `${index * 100}ms`;
  
  card.innerHTML = `
    <div class="member-content">
      <img src="${member.image}" 
           alt="${member.name}" 
           class="member-photo" 
           onerror="this.src='assets/images/members/placeholder.png'" 
           loading="lazy">
      <div class="member-text-content">
        <h3>${member.name}</h3>
        <p>${member.role}</p>
      </div>
    </div>
    <div class="social-icons">${socialLinks}</div>
  `;
  
  // Add click event for accessibility
  card.addEventListener('click', function(e) {
    if (e.target.closest('.social-icon')) return;
    
    const firstSocialLink = card.querySelector('.social-icon');
    if (firstSocialLink) {
      firstSocialLink.click();
    }
  });
  
  return card;
}

function animateSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  
  // Simple fade in animation
  section.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  section.style.opacity = '1';
  section.style.transform = 'translateY(0)';
  
  // Animate cards with simple stagger
  const cards = section.querySelectorAll('.member-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 50 + 100);
  });
}

function initializeInteractiveFeatures() {
  // Enhanced hover effects
  const cards = document.querySelectorAll('.member-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
  
  // Keyboard navigation
  cards.forEach((card, index) => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const firstSocialLink = card.querySelector('.social-icon');
        if (firstSocialLink) {
          firstSocialLink.click();
        }
      }
    });
  });
  
  // Simple intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -20px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in-view');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);
  
  cards.forEach(card => {
    observer.observe(card);
  });
}

function showErrorState(errorMessage) {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.innerHTML = `
      <div class="text-center py-12">
        <div class="mb-6">
          <i class="fas fa-exclamation-triangle text-red-400 text-4xl mb-4"></i>
          <h3 class="text-xl font-semibold text-white mb-2">Failed to Load Executive Data</h3>
          <p class="text-gray-400 mb-4">${errorMessage}</p>
        </div>
        <button onclick="window.location.reload()" 
                class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 font-semibold">
          <i class="fas fa-redo mr-2"></i>Try Again
        </button>
      </div>
    `;
  }
}



