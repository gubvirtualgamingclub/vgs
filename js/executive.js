/*═══════════════════════════════════════════════════════════════
  GUCC VGS - EXECUTIVE PAGE JAVASCRIPT
  Year-based committee member display system
═══════════════════════════════════════════════════════════════*/

// Global variables
let executiveData = null;
let currentYear = null;

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Executive page loading...');
  initializePage();
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
    console.log('📡 Loading executive data...');
    const response = await fetch('data/executives.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Validate data structure
    if (!data.committees || typeof data.committees !== 'object') {
      throw new Error('Invalid data structure: missing committees');
    }
    
    executiveData = data;
    console.log('✅ Executive data loaded successfully');
    
    // Hide loading spinner
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
      spinner.style.display = 'none';
    }
    
    // Generate year selector buttons
    generateYearButtons();
    
    // Display the first committee (current committee)
    const currentYear = findActiveYear();
    displayCommittee(currentYear);
    
    // Initialize interactive features
    initializeInteractiveFeatures();
    
  } catch (error) {
    console.error('❌ Error loading executive data:', error);
    showErrorState(error.message);
  }
}

function generateYearButtons() {
  const yearSelector = document.getElementById('year-selector');
  if (!yearSelector || !executiveData) return;
  
  // Get years in order (first object to last object)
  const years = Object.keys(executiveData.committees);
  console.log('📅 Available years (in order):', years);
  
  yearSelector.innerHTML = '';
  
  years.forEach((year, index) => {
    const committee = executiveData.committees[year];
    const button = document.createElement('button');
    button.className = 'year-btn';
    
    // Add "Current" tag to the first committee (current)
    if (index === 0) {
      button.innerHTML = `${year} <span class="current-tag">Current</span>`;
      button.classList.add('active');
    } else {
      button.textContent = year;
    }
    
    button.dataset.year = year;
    
    // Add click event
    button.addEventListener('click', function() {
      switchToYear(year);
    });
    
    yearSelector.appendChild(button);
  });
}

function findActiveYear() {
  if (!executiveData) return null;
  
  // Return the first year (current committee)
  const years = Object.keys(executiveData.committees);
  return years[0] || null;
}

function switchToYear(year) {
  if (currentYear === year) return; // Already displaying this year
  
  console.log(`🔄 Switching to year: ${year}`);
  
  // Update button states
  const yearButtons = document.querySelectorAll('.year-btn');
  yearButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.year === year) {
      btn.classList.add('active');
    }
  });
  
  // Fade out current content, then load new content
  fadeOutSections().then(() => {
    displayCommittee(year);
  });
}

function fadeOutSections() {
  return new Promise((resolve) => {
    const sections = ['moderation-panel', 'wing-panel'];
    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
      }
    });
    
    setTimeout(resolve, 300);
  });
}

function displayCommittee(year) {
  if (!year || !executiveData || !executiveData.committees[year]) {
    console.error('❌ Invalid year or missing committee data:', year);
    return;
  }
  
  currentYear = year;
  const committee = executiveData.committees[year];
  
  console.log(`📋 Displaying committee for ${year}:`, committee);
  
  // Update page title
  const titleElement = document.getElementById('committee-title');
  if (titleElement && committee.name) {
    titleElement.textContent = committee.name.toUpperCase();
  }
  
  // Clear containers
  const moderatorsContainer = document.getElementById('moderators-container');
  const wingContainer = document.getElementById('wing-members-container');
  
  if (moderatorsContainer) moderatorsContainer.innerHTML = '';
  if (wingContainer) wingContainer.innerHTML = '';
  
  // Render panels with animation
  renderPanelWithAnimation('moderators-container', committee.moderationPanel, 'moderation-panel');
  setTimeout(() => {
    renderPanelWithAnimation('wing-members-container', committee.wingPanel, 'wing-panel');
  }, 200);
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
    console.error(`❌ Container ${containerId} not found`);
    return;
  }
  
  if (!members || !Array.isArray(members)) {
    console.warn(`⚠️ No members data for ${containerId}`);
    container.innerHTML = '<p class="text-gray-400 text-center py-8">No members found for this year.</p>';
    return;
  }
  
  // Clear container
  container.innerHTML = '';
  
  // Determine if this is the moderation panel
  const isModerationPanel = containerId === 'moderators-container';
  
  // Create grid container
  const gridClass = isModerationPanel 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
  
  container.className = gridClass;
  
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
  document.addEventListener('mouseenter', function(e) {
    if (e.target.classList.contains('member-card')) {
      e.target.style.zIndex = '10';
    }
  }, true);
  
  document.addEventListener('mouseleave', function(e) {
    if (e.target.classList.contains('member-card')) {
      e.target.style.zIndex = '1';
    }
  }, true);
  
  // Keyboard navigation for year buttons
  document.addEventListener('keydown', function(e) {
    if (e.target.classList.contains('year-btn')) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.target.click();
      }
    }
    
    if (e.target.classList.contains('member-card')) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const firstSocialLink = e.target.querySelector('.social-icon');
        if (firstSocialLink) {
          firstSocialLink.click();
        }
      }
    }
  });
  
  // Set tabindex for accessibility
  setTimeout(() => {
    const cards = document.querySelectorAll('.member-card');
    cards.forEach(card => {
      card.setAttribute('tabindex', '0');
    });
  }, 500);
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

// Export functions for debugging
window.executiveDebug = {
  executiveData,
  currentYear,
  switchToYear,
  displayCommittee
};