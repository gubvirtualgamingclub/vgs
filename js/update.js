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
           ${update.registration_link ? 'Register Now' : 'Learn More'}
        </a>
    ` : '';

    const card = document.createElement('div');
    card.className = 'update-card';
    card.innerHTML = `
        <div class="card-header">
            <i class="fas ${icon} text-green-500 mr-2"></i>
            <h3 class="card-title">${update.title}</h3>
        </div>
        <img src="${update.image}" alt="${update.title}" class="w-full h-48 object-cover rounded-md mb-4">
        <div class="card-content">
            <p>${update.description}</p>
            ${actionButton}
        </div>
        <div class="card-footer">
            <span>${formatDate(update.date)}</span>
            ${update.important ? '<span class="status-badge">Important</span>' : ''}
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
        console.log('📊 Loaded updates:', data.updates.length, 'items');
        
        // Clear grid and hide loader
        grid.innerHTML = '';
        loader.style.display = 'none';
        
        // Sort updates by date, most recent first
        const sortedUpdates = data.updates.sort((a, b) => 
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

        initFacebook();
        
    } catch (error) {
        console.error('❌ Error loading updates:', error);
        // Show error state in grid
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                <p class="text-gray-400">Failed to load updates. Please try again later.</p>
            </div>
        `;
        loader.style.display = 'none';
    }
}

function initFacebook() {
    console.log('📘 Initializing Facebook embed');
    const fbGrid = document.getElementById('facebook-grid');
    const fbLoader = document.getElementById('facebook-loader');
    
    if (!fbGrid || !fbLoader) {
        console.error('❌ Facebook elements not found!');
        return;
    }
    
    fbLoader.style.display = 'none';
    fbGrid.innerHTML = '';
    
    const embedContainer = document.createElement('div');
    embedContainer.className = 'col-span-full';
    embedContainer.innerHTML = `
        <div class="fb-page" 
             data-href="https://facebook.com/gucc.vgs" 
             data-tabs="timeline" 
             data-width="" 
             data-height="800" 
             data-small-header="false" 
             data-adapt-container-width="true" 
             data-hide-cover="false" 
             data-show-facepile="true">
            <blockquote cite="https://facebook.com/gucc.vgs" 
                        class="fb-xfbml-parse-ignore">
                <a href="https://facebook.com/gucc.vgs">GUCC VGS</a>
            </blockquote>
        </div>
    `;
    fbGrid.appendChild(embedContainer);
    
    if (typeof FB !== 'undefined') {
        FB.XFBML.parse();
    } else {
        console.warn('⚠️ FB SDK not loaded yet, embed may auto-initialize');
    }
}

let initialized = false;

function initializeAll() {
    if (initialized) return;
    initialized = true;
    forceInitialize();
    initFacebook();
}

// Try multiple initialization methods
console.log('📋 Current DOM state:', document.readyState);

// Method 1: Immediate
setTimeout(initializeAll, 100);

// Method 2: DOM Ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    initializeAll();
}

// Method 3: Window Load
window.addEventListener('load', initializeAll);

// Method 4: Aggressive timeout
setTimeout(initializeAll, 2000);

console.log('🏁 UPDATE.JS COMPLETELY REWRITTEN AND READY');