/*═══════════════════════════════════════════════════════════════
  GUCC VGS - GAMES PAGE JAVASCRIPT
  Simple, bulletproof games display
═══════════════════════════════════════════════════════════════*/

// Simple global variables
let allGames = [];
let currentFilter = 'all';

// Initialize immediately - don't wait for anything!
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🎮 Games page DOM loaded');
        initGamesPage();
    });
} else {
    console.log('🎮 Games page already loaded - starting immediately');
    initGamesPage();
}

// Also try again after window load as backup
window.addEventListener('load', function() {
    setTimeout(() => {
        if (allGames.length === 0) {
            console.log('🔄 Backup initialization...');
            initGamesPage();
        }
    }, 100);
});

// Add debugging to console
console.log('🔥 Games script loaded!');

// Debug games loading
window.addEventListener('load', function() {
    console.log('🔍 Window loaded, checking games status...');
    const gamesGrid = document.getElementById('games-grid');
    console.log('📋 Games grid element:', gamesGrid);
    if (gamesGrid) {
        console.log('📋 Games grid innerHTML length:', gamesGrid.innerHTML.length);
        console.log('📋 Games grid children count:', gamesGrid.children.length);
    }
    
    setTimeout(() => {
        console.log('🕐 After 2 seconds...');
        console.log('🎮 All games array:', allGames);
        console.log('🎮 Games array length:', allGames.length);
    }, 2000);
});

async function initGamesPage() {
    console.log('🚀 Initializing games page...');
    
    try {
        // Load games data immediately
        await loadGamesData();
        
        // Setup filter buttons
        setupFilterButtons();
        
        // Display all games immediately - no delays!
        displayGames(allGames);
        
        // Update stats immediately
        updateGameStats();
        
        // Hide loading immediately
        hideLoading();
        
        console.log('✅ Games page initialized successfully');
        
    } catch (error) {
        console.error('❌ Error initializing games page:', error);
        showErrorMessage('Failed to load games. Please refresh the page.');
        hideLoading();
    }
}

async function loadGamesData() {
    console.log('📡 Loading games data...');
    
    try {
        const response = await fetch('./data/games.json');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        allGames = data.games || [];
        
        console.log(`🎮 Loaded ${allGames.length} games:`, allGames);
        
        if (allGames.length === 0) {
            throw new Error('No games data found');
        }
        
    } catch (error) {
        console.error('❌ Failed to load games data:', error);
        throw error;
    }
}

function setupFilterButtons() {
    console.log('🔧 Setting up filter buttons...');
    
    const filterButtons = document.querySelectorAll('.filter-tag');
    console.log(`🎯 Found ${filterButtons.length} filter buttons`);
    
    filterButtons.forEach((button, index) => {
        const platform = button.dataset.filter;
        console.log(`🔘 Button ${index}: platform="${platform}"`);
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const selectedPlatform = this.dataset.filter;
            console.log(`🔍 User clicked filter: ${selectedPlatform}`);
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter and display games
            currentFilter = selectedPlatform;
            const filteredGames = filterGames(selectedPlatform);
            console.log(`📋 Filtered games for ${selectedPlatform}:`, filteredGames);
            displayGames(filteredGames);
        });
    });
    
    console.log('✅ Filter buttons setup complete');
}

function filterGames(platform) {
    console.log(`🎮 Filtering games by platform: "${platform}"`);
    console.log(`📊 Total games available: ${allGames.length}`);
    
    if (platform === 'all') {
        console.log('🌐 Showing all games');
        return allGames;
    }
    
    const filtered = allGames.filter(game => {
        const gamePlatform = game.platform;
        const match = gamePlatform.toLowerCase() === platform.toLowerCase();
        console.log(`🔍 Game: ${game.name}, Platform: "${gamePlatform}", Match: ${match}`);
        return match;
    });
    
    console.log(`✅ Filtered ${filtered.length} games for platform "${platform}"`);
    return filtered;
}

function displayGames(games) {
    console.log(`🎨 Displaying ${games.length} games`);
    
    const gamesGrid = document.getElementById('games-grid');
    const emptyState = document.getElementById('games-empty');
    
    if (!gamesGrid) {
        console.error('❌ Games grid not found');
        return;
    }
    
    // Hide empty state
    if (emptyState) {
        emptyState.classList.add('hidden');
    }
    
    if (games.length === 0) {
        gamesGrid.innerHTML = '';
        if (emptyState) {
            emptyState.classList.remove('hidden');
        }
        return;
    }
    
    // Create game cards HTML
    const cardsHTML = games.map((game, index) => createGameCardHTML(game, index)).join('');
    
    // Insert HTML immediately
    gamesGrid.innerHTML = cardsHTML;
    
    // Make all cards visible immediately - no delays!
    const cards = gamesGrid.querySelectorAll('.game-card');
    cards.forEach(card => {
        card.classList.add('show');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
    });
    
    console.log(`✅ ${games.length} games displayed immediately`);
}

function createGameCardHTML(game, index) {
    const platformClass = game.platform.toLowerCase();
    const platformIcon = getPlatformIcon(game.platform);
    
    return `
        <div class="game-card" data-platform="${platformClass}">
            <div class="game-card-inner">
                <div class="game-logo-wrapper">
                    <img src="${game.logo}" 
                         alt="${game.name}" 
                         class="game-logo"
                         onerror="this.src='assets/images/games/placeholder.png'">
                </div>
                
                <h3 class="game-title">${game.name}</h3>
                
                <div class="game-platform-badge ${platformClass}">
                    ${platformIcon}
                    <span>${game.platform}</span>
                </div>
            </div>
        </div>
    `;
}

function getPlatformIcon(platform) {
    const icons = {
        'PC': '<i class="fas fa-desktop"></i>',
        'Mobile': '<i class="fas fa-mobile-alt"></i>',
        'Casual': '<i class="fas fa-chess"></i>'
    };
    return icons[platform] || '<i class="fas fa-gamepad"></i>';
}

function updateGameStats() {
    const totalGames = allGames.length;
    const pcGames = allGames.filter(game => game.platform === 'PC').length;
    const mobileGames = allGames.filter(game => game.platform === 'Mobile').length;
    const casualGames = allGames.filter(game => game.platform === 'Casual').length;
    
    // Update stat numbers in filter buttons
    const countAllElement = document.getElementById('count-all');
    const countPcElement = document.getElementById('count-pc');
    const countMobileElement = document.getElementById('count-mobile');
    const countCasualElement = document.getElementById('count-casual');
    
    if (countAllElement) countAllElement.textContent = totalGames;
    if (countPcElement) countPcElement.textContent = pcGames;
    if (countMobileElement) countMobileElement.textContent = mobileGames;
    if (countCasualElement) countCasualElement.textContent = casualGames;
    
    // Also update stats section if it exists
    const totalElement = document.getElementById('total-games');
    const pcElement = document.getElementById('pc-games');
    const mobileElement = document.getElementById('mobile-games');
    const casualElement = document.getElementById('casual-games');
    
    if (totalElement) totalElement.textContent = totalGames;
    if (pcElement) pcElement.textContent = pcGames;
    if (mobileElement) mobileElement.textContent = mobileGames;
    if (casualElement) casualElement.textContent = casualGames;
    
    console.log(`📊 Stats updated: Total: ${totalGames}, PC: ${pcGames}, Mobile: ${mobileGames}, Casual: ${casualGames}`);
}

function showLoading() {
    const loadingElement = document.getElementById('games-loading');
    if (loadingElement) {
        loadingElement.classList.remove('hidden');
    }
}

function hideLoading() {
    const loadingElement = document.getElementById('games-loading');
    if (loadingElement) {
        loadingElement.classList.add('hidden');
    }
}

function showErrorMessage(message) {
    const gamesGrid = document.getElementById('games-grid');
    if (gamesGrid) {
        gamesGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Oops! Something went wrong</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="retry-btn">
                    <i class="fas fa-refresh"></i> Try Again
                </button>
            </div>
        `;
    }
}

// Make functions globally available for debugging
window.gamesDebug = {
    allGames,
    displayGames,
    filterGames,
    updateGameStats
};
