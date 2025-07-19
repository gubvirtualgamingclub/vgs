// Enhanced Contributors Display System
let contributorsData = [];
let isLoading = false;

// Main initialization function
async function initFooter() {
    console.log('🔄 Footer: Starting initialization...');
    
    // Check if we're already loading
    if (isLoading) {
        console.log('⏳ Footer: Already initializing, skipping...');
        return;
    }
    
    isLoading = true;
    
    try {
        await loadAndDisplayContributors();
        console.log('✅ Footer: Initialization completed successfully');
    } catch (error) {
        console.error('❌ Footer: Initialization failed:', error);
        showErrorState();
    } finally {
        isLoading = false;
    }
}

// Load contributors and display them
async function loadAndDisplayContributors() {
    const contributorsContainer = document.getElementById('all-contributors-grid');
    
    if (!contributorsContainer) {
        console.warn('⚠️ Footer: Contributors container (#all-contributors-grid) not found');
        // Try again in 500ms
        setTimeout(() => {
            const retryContainer = document.getElementById('all-contributors-grid');
            if (retryContainer) {
                console.log('🔄 Footer: Container found on retry, initializing...');
                loadAndDisplayContributors();
            }
        }, 500);
        return;
    }

    console.log('📦 Footer: Contributors container found, loading data...');

    // Show loading state
    showLoadingState(contributorsContainer);

    try {
        // Fetch contributors data
        console.log('📡 Footer: Fetching contributors data...');
        const response = await fetch('data/contributors.json');
        
        if (!response.ok) {
            throw new Error(`Failed to fetch contributors: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        contributorsData = data.contributors || [];

        if (contributorsData.length === 0) {
            throw new Error('No contributors found in data');
        }

        console.log(`📊 Footer: Loaded ${contributorsData.length} contributors successfully`);
        
        // Display contributors
        displayContributors(contributorsContainer);

    } catch (error) {
        console.error('❌ Footer: Error loading contributors:', error);
        showErrorState(contributorsContainer);
        throw error;
    }
}

// Show loading state
function showLoadingState(container) {
    container.innerHTML = `
        <div class="loading-indicator">
            <i class="fas fa-spinner fa-spin text-green-400 text-xl"></i>
            <span class="text-gray-400 text-sm ml-2">Loading contributors...</span>
        </div>
    `;
}

// Show error state
function showErrorState(container = null) {
    const errorHTML = `
        <div class="error-indicator text-center">
            <i class="fas fa-exclamation-triangle text-red-400 text-xl mb-2"></i>
            <p class="text-red-400 text-sm mb-3">Failed to load contributors</p>
            <button onclick="window.retryFooterInit()" class="retry-button px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                <i class="fas fa-redo mr-1"></i>Try Again
            </button>
        </div>
    `;
    
    if (container) {
        container.innerHTML = errorHTML;
    } else {
        const contributorsContainer = document.getElementById('all-contributors-grid');
        if (contributorsContainer) {
            contributorsContainer.innerHTML = errorHTML;
        }
    }
}

// Display contributors
function displayContributors(container) {
    container.innerHTML = '';
    
    console.log(`🎨 Footer: Rendering ${contributorsData.length} contributors...`);
    
    // Create contributors display
    contributorsData.forEach((contributor, index) => {
        const contributorElement = createContributorElement(contributor, index);
        container.appendChild(contributorElement);
    });
    
    // Add GitHub link button
    const githubButton = createGitHubLinkButton();
    container.appendChild(githubButton);
    
    console.log(`✅ Footer: Successfully displayed ${contributorsData.length} contributors`);
}

// Create individual contributor element
function createContributorElement(contributor, index) {
    const element = document.createElement('div');
    element.className = 'contributor-item';
    element.setAttribute('data-contributor-index', index);
    
    // Handle image path
    let imagePath = contributor.photo;
    if (imagePath && imagePath.startsWith('/')) {
        imagePath = imagePath.slice(1);
    }
    
    const fallbackImage = 'assets/images/members/placeholder.png';
    
    // Create HTML structure
    element.innerHTML = `
        <div class="contributor-avatar">
            <img 
                src="${imagePath || fallbackImage}" 
                alt="${contributor.name}"
                loading="lazy"
                onerror="this.src='${fallbackImage}'; this.onerror=null;"
            >
            <div class="contributor-overlay">
                <i class="fas fa-info-circle"></i>
            </div>
        </div>
        
        <div class="contributor-tooltip">
            <div class="tooltip-content">
                <h4 class="contributor-name">${contributor.name}</h4>
                <p class="contributor-role">${contributor.role || 'Contributor'}</p>
                ${contributor.github ? `
                    <a href="${contributor.github}" target="_blank" rel="noopener noreferrer" class="github-link">
                        <i class="fab fa-github"></i>
                        <span>View Profile</span>
                    </a>
                ` : ''}
            </div>
            <div class="tooltip-arrow"></div>
        </div>
    `;
    
    // Add click handler for GitHub link
    if (contributor.github) {
        element.addEventListener('click', (e) => {
            if (!e.target.closest('.github-link')) {
                window.open(contributor.github, '_blank');
            }
        });
        element.style.cursor = 'pointer';
        element.setAttribute('title', `Click to visit ${contributor.name}'s GitHub profile`);
    }
    
    return element;
}

// Create GitHub repository link button
function createGitHubLinkButton() {
    const button = document.createElement('a');
    button.href = 'https://github.com/mdsazibhossenrabby/vgs/graphs/contributors';
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.className = 'github-repo-link';
    button.setAttribute('aria-label', 'View all contributors on GitHub');
    button.setAttribute('title', 'View all contributors on GitHub');
    
    button.innerHTML = `
        <div class="github-button-content">
            <i class="fas fa-plus"></i>
            <span class="github-tooltip">
                <span>View All Contributors</span>
                <i class="fab fa-github ml-1"></i>
            </span>
        </div>
    `;
    
    return button;
}

// Initialize when DOM is ready
function initializeFooterSystem() {
    console.log('🚀 Footer: System starting...');
    
    if (document.readyState === 'loading') {
        console.log('📅 Footer: Waiting for DOM to load...');
        document.addEventListener('DOMContentLoaded', initFooter);
    } else {
        console.log('📅 Footer: DOM ready, initializing immediately...');
        // Add small delay to ensure footer HTML is loaded
        setTimeout(initFooter, 100);
    }
}

// Global retry function
function retryFooterInit() {
    console.log('🔄 Footer: Manual retry initiated...');
    isLoading = false; // Reset loading state
    initFooter();
}

// Expose functions globally
window.initFooter = initFooter;
window.retryFooterInit = retryFooterInit;

// Auto-initialize
initializeFooterSystem();