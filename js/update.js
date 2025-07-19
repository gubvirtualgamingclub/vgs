// COMPLETE REWRITE - AGGRESSIVE APPROACH TO MAKE IT WORK
console.log('🚀 STARTING UPDATE.JS');

// Function to format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Function to create a card
function createCard(update) {
    console.log('🎨 Creating card for:', update.title);
    
    const icons = {
        event: 'fa-calendar-check',
        notice: 'fa-info-circle',
        registration: 'fa-user-plus',
        announcement: 'fa-bullhorn'
    };
    
    const icon = icons[update.type] || 'fa-star';
    
    // Create action button if link exists
    const actionLink = update.registration_link || update.form_link;
    const actionButton = actionLink ? `
        <a href="${actionLink}" target="_blank" 
           class="action-btn">
           <i class="fas fa-external-link-alt mr-2"></i>
           ${update.registration_link ? 'Register Now' : 'Learn More'}
        </a>
    ` : '';

    const card = document.createElement('div');
    card.className = 'update-card';
    card.innerHTML = `
        <img src="${update.image}" alt="${update.title}" class="w-full h-48 object-cover" 
             onerror="this.src='assets/images/logos/vgs.png'">
        <div class="card-content-wrapper">
            <div class="card-header">
                <i class="fas ${icon}"></i>
                <h3 class="card-title">${update.title}</h3>
            </div>
            <div class="card-content">
                <p>${update.description}</p>
                ${actionButton}
            </div>
            <div class="card-footer">
                <span><i class="fas fa-calendar-alt mr-1"></i>${formatDate(update.date)}</span>
                ${update.important ? '<span class="status-badge"><i class="fas fa-exclamation-triangle mr-1"></i>Important</span>' : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Main initialization function
async function forceInitialize() {
    console.log('🔥 FORCE INITIALIZING UPDATE PAGE');
    
    // Get elements aggressively
    const grid = document.getElementById('updates-grid');
    const loader = document.getElementById('updates-loader');
    
    if (!grid || !loader) {
        console.error('❌ Required elements not found!');
        return;
    }
    
    try {
        // Load the actual updates from JSON
        const response = await fetch('data/updates.json');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        console.log('📊 Loaded updates data:', data);
        
        // Check if updates are globally active
        if (!data.isActive) {
            showNoUpdatesMessage(grid, loader, 'Updates are currently disabled');
            return;
        }
        
        // Filter only active updates
        const activeUpdates = data.updates.filter(update => update.isActive === true);
        console.log('📊 Active updates:', activeUpdates.length, 'out of', data.updates.length, 'total updates');
        
        // Check if there are any active updates
        if (activeUpdates.length === 0) {
            showNoUpdatesMessage(grid, loader, 'No updates available at the moment');
            return;
        }
        
        // Clear grid and hide loader
        grid.innerHTML = '';
        loader.style.display = 'none';
        
        // Sort updates by date, most recent first
        const sortedUpdates = activeUpdates.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );
        
        // Create and append cards
        sortedUpdates.forEach(update => {
            const card = createCard(update);
            grid.appendChild(card);
        });
        
        // Apply animations
        const cards = grid.querySelectorAll('.update-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        console.log('✅ Update page initialization complete!');
        
    } catch (error) {
        console.error('❌ Error loading updates:', error);
        showNoUpdatesMessage(grid, loader, 'Failed to load updates. Please try again later.', true);
    }
}

// Function to show "No Updates" message
function showNoUpdatesMessage(grid, loader, message, isError = false) {
    loader.style.display = 'none';
    
    const iconClass = isError ? 'fa-exclamation-triangle' : 'fa-info-circle';
    const iconColor = isError ? 'text-red-400' : 'text-blue-400';
    const bgClass = isError ? 'from-red-900 to-red-800' : 'from-blue-900 to-blue-800';
    
    grid.innerHTML = `
        <div class="col-span-full">
            <div class="no-updates-container bg-gradient-to-br ${bgClass} border border-gray-600 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
                <div class="no-updates-icon mb-6">
                    <i class="fas ${iconClass} ${iconColor} text-6xl md:text-7xl opacity-80"></i>
                </div>
                <h3 class="no-updates-title text-2xl md:text-3xl font-bold text-white mb-4 font-orbitron">
                    ${isError ? 'Oops! Something went wrong' : 'No Updates Yet'}
                </h3>
                <p class="no-updates-message text-gray-300 text-lg md:text-xl mb-6 max-w-md mx-auto leading-relaxed">
                    ${message}
                </p>
                ${!isError ? `
                <div class="no-updates-action">
                    <div class="inline-flex items-center gap-2 text-blue-400 text-sm font-semibold">
                        <i class="fas fa-clock animate-pulse"></i>
                        <span>Check back soon for exciting announcements!</span>
                    </div>
                </div>
                ` : `
                <div class="no-updates-action">
                    <button onclick="forceInitialize()" class="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                        <i class="fas fa-redo-alt"></i>
                        <span>Try Again</span>
                    </button>
                </div>
                `}
            </div>
        </div>
    `;
}

// Enhanced initialization with proper error handling
let initialized = false;

function initializeAll() {
    if (initialized) return;
    initialized = true;
    
    console.log('🚀 Initializing update page...');
    forceInitialize();
}

// Initialize when DOM is ready
console.log('📋 Current DOM state:', document.readyState);

// Multiple initialization strategies for reliability
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    // DOM is already ready
    setTimeout(initializeAll, 100);
}

// Fallback initialization
window.addEventListener('load', initializeAll);

// Make function available globally for manual initialization
window.forceInitialize = forceInitialize;

// Method 4: Aggressive timeout
setTimeout(initializeAll, 2000);

console.log('🏁 UPDATE.JS COMPLETELY REWRITTEN AND READY');