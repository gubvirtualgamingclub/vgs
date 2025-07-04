// State management
let contributorsData = [];

// Load contributors data and render the grid
async function initFooter() {
    console.log('🔄 Initializing footer components...');
    
    const contributorsGrid = document.getElementById('all-contributors-grid');
    
    if (!contributorsGrid) {
        console.error('❌ Contributors grid element not found!');
        return;
    }

    try {
        // Show loading state
        contributorsGrid.innerHTML = `
            <div class="col-span-full flex items-center justify-center py-8">
                <div class="loading-spinner text-center">
                    <i class="fas fa-spinner fa-spin text-green-400 text-2xl mb-2"></i>
                    <p class="text-gray-400">Loading contributors...</p>
                </div>
            </div>
        `;

        // Fetch contributors data
        const response = await fetch('data/contributors.json');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        contributorsData = data.contributors || [];

        if (contributorsData.length === 0) {
            throw new Error('No contributors found in data');
        }

        // Initialize the display
        renderContributors();

        console.log('✅ Footer initialized successfully');

    } catch (error) {
        console.error('❌ Error initializing footer:', error);
        contributorsGrid.innerHTML = `
            <div class="col-span-full text-center py-8">
                <div class="error-message text-red-400">
                    <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                    <p>Failed to load contributors. Please try again later.</p>
                </div>
            </div>
        `;
    }
}

// Render contributors based on current state
function renderContributors() {
    const contributorsGrid = document.getElementById('all-contributors-grid');
    if (!contributorsGrid) return;

    const contributorsToShow = contributorsData.slice(0, 5);

    // Clear grid
    contributorsGrid.innerHTML = '';

    // Always show current contributors
    contributorsToShow.forEach(contributor => {
        renderContributorCard(contributor);
    });

    // Add the plus button as the last item
    const plusButton = document.createElement('a');
    plusButton.href = 'https://github.com/gubvirtualgamingclub/vgs/graphs/contributors';
    plusButton.target = '_blank';
    plusButton.className = 'contributor-plus-button';
    plusButton.setAttribute('aria-label', 'See all contributors on GitHub');
    plusButton.innerHTML = '<i class="fas fa-plus"></i>';
    
    contributorsGrid.appendChild(plusButton);
}

// Render a single contributor card
function renderContributorCard(contributor) {
    const contributorsGrid = document.getElementById('all-contributors-grid');
    if (!contributorsGrid) return;

    const card = document.createElement('div');
    card.className = `contributor-card`;
    
    let imagePath = contributor.photo;
    if (imagePath.startsWith('/')) {
        imagePath = imagePath.slice(1);
    }
    
    let fallbackPath = 'assets/images/members/placeholder.png';

    card.innerHTML = `
        ${contributor.github ? `
        <a href="${contributor.github}" target="_blank" rel="noopener noreferrer" class="block relative">
        ` : '<div class="relative">'}
            <div class="contributor-photo">
                <img 
                    src="${imagePath}" 
                    alt="${contributor.name}" 
                    loading="lazy"
                    onerror="this.src='${fallbackPath}'"
                >
            </div>
            
            <div class="contributor-info-popup">
                <h4>${contributor.name}</h4>
                <p>${contributor.role}</p>
                ${contributor.github ? `
                <a href="${contributor.github}" target="_blank" rel="noopener noreferrer" class="github-link">
                    <i class="fab fa-github"></i>
                </a>
                ` : ''}
            </div>
        ${contributor.github ? '</a>' : '</div>'}
    `;

    contributorsGrid.appendChild(card);
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
} else {
    initFooter();
}