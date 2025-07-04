document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const tournamentName = document.getElementById('tournament-name');
    const tournamentLogo = document.getElementById('tournament-logo');
    const tournamentDescription = document.getElementById('tournament-description');
    const tournamentMeta = document.getElementById('tournament-meta');
    const tournamentInfo = document.getElementById('tournament-info');
    const collaborators = document.getElementById('collaborators');
    const credits = document.getElementById('credits');
    const partnersSection = document.getElementById('partners-section');
    const gamesSection = document.getElementById('games-section');
    const noTournamentMessage = document.getElementById('no-tournament-message');

    // Initially hide the no tournament message
    if (noTournamentMessage) {
        noTournamentMessage.classList.add('hidden');
        noTournamentMessage.style.display = 'none';
    }
    
    const casualGamesContainer = document.getElementById('casual-games');
    const virtualPcGamesContainer = document.getElementById('virtual-pc-games');
    const virtualMobileGamesContainer = document.getElementById('virtual-mobile-games');
    
    const noCasual = document.getElementById('no-casual');
    const noVirtualPc = document.getElementById('no-virtual-pc');
    const noVirtualMobile = document.getElementById('no-virtual-mobile');

    // Fetch and initialize tournament data
    fetch('data/tournament.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load tournament.json');
            return response.json();
        })
        .then(data => initializeTournament(data))
        .catch(error => {
            console.error('Error loading tournament data:', error);
            showErrorAlert('Failed to load tournament data. Please check the console and ensure tournament.json is accessible.');
            // Show no tournament message as fallback
            showNoTournamentMessage();
        });

    // Show error alert
    function showErrorAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        alert.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-exclamation-triangle mr-3 text-xl"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(alert);
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }

    // Show no tournament message and hide everything else
    function showNoTournamentMessage() {
        // Show no tournament message
        if (noTournamentMessage) {
            noTournamentMessage.classList.remove('hidden');
            noTournamentMessage.style.display = 'block';
        }
        
        // Hide all tournament content
        if (tournamentInfo) {
            tournamentInfo.style.display = 'none';
        }
        if (partnersSection) {
            partnersSection.style.display = 'none';
        }
        if (gamesSection) {
            gamesSection.style.display = 'none';
        }
        
        // Add click event to "Back to Home" button
        const backToHomeBtn = noTournamentMessage.querySelector('button:last-child');
        if (backToHomeBtn) {
            backToHomeBtn.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
    }

    // Show tournament content and hide no tournament message
    function showTournamentContent() {
        // Hide no tournament message
        if (noTournamentMessage) {
            noTournamentMessage.classList.add('hidden');
            noTournamentMessage.style.display = 'none';
        }
        
        // Show tournament content
        if (tournamentInfo) {
            tournamentInfo.style.display = 'flex';
        }
        if (partnersSection) {
            partnersSection.style.display = 'block';
        }
        if (gamesSection) {
            gamesSection.style.display = 'block';
        }
    }

    // Initialize Tournament
    function initializeTournament(data) {
        // Check if tournament is active
        if (!data.tournament.active) {
            showNoTournamentMessage();
            return; // Exit early, don't load any tournament content
        }
        
        // Show tournament content and hide no tournament message
        showTournamentContent();
        
        // Load tournament information
        if (tournamentName) tournamentName.textContent = data.tournament.name || 'Tournament Name';
        if (tournamentLogo) {
            if (data.tournament.logo) {
                // Clear any previous error handlers
                tournamentLogo.onerror = null;
                tournamentLogo.style.display = 'block';
                
                // Set the logo source
                tournamentLogo.src = data.tournament.logo;
                tournamentLogo.alt = `${data.tournament.name || 'Tournament'} Logo`;
                
                // Handle image load errors properly
                tournamentLogo.onerror = function() {
                    console.log('Tournament logo failed to load:', this.src);
                    // Only try fallback once to prevent infinite loop
                    if (!this.hasAttribute('data-fallback-attempted')) {
                        this.setAttribute('data-fallback-attempted', 'true');
                        this.src = 'assets/images/members/placeholder.png';
                        this.onerror = function() {
                            console.log('Fallback image also failed, hiding logo');
                            this.style.display = 'none';
                        };
                    } else {
                        this.style.display = 'none';
                    }
                };
                
                // Handle successful load
                tournamentLogo.onload = function() {
                    console.log('Tournament logo loaded successfully:', this.src);
                    this.style.display = 'block';
                };
            } else {
                // No logo specified, hide the image
                tournamentLogo.style.display = 'none';
            }
        }
        if (tournamentDescription) tournamentDescription.textContent = data.tournament.description || 'No description available';
        
        // Set tournament meta details
        if (tournamentMeta) {
            tournamentMeta.innerHTML = `
                <div class="detail-item">
                    <div class="detail-icon"><i class="fas fa-calendar-alt"></i></div>
                    <div><strong>Date:</strong> ${data.tournament.date || 'TBD'}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-icon"><i class="fas fa-clock"></i></div>
                    <div><strong>Time:</strong> ${data.tournament.time || 'TBD'}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-icon"><i class="fas fa-map-marker-alt"></i></div>
                    <div><strong>Venue:</strong> ${data.tournament.venue || 'TBD'}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-icon"><i class="fas fa-trophy"></i></div>
                    <div><strong>Prize Pool:</strong> ${data.tournament.prizePool || 'TBD'}</div>
                </div>
            `;
        }
        
        // Load collaborators
        if (collaborators && data.collaborators && data.collaborators.length > 0) {
            collaborators.innerHTML = '';
            data.collaborators.forEach(collab => {
                const collaborator = document.createElement('div');
                collaborator.className = 'collaborator transition duration-300 hover:scale-105';
                collaborator.innerHTML = `
                    <img src="${collab.logo || 'assets/images/placeholder-game.png'}" 
                        alt="${collab.name || 'Collaborator'}" 
                        class="collaborator-logo" 
                        title="${collab.name || 'Collaborator'}">
                `;
                collaborators.appendChild(collaborator);
            });
        }

        // Load credits
        if (credits && data.credits && data.credits.length > 0) {
            credits.innerHTML = '';
            data.credits.forEach(credit => {
                const creditItem = document.createElement('div');
                creditItem.className = 'credit transition duration-300 hover:scale-105';
                creditItem.innerHTML = `
                    <img src="${credit.logo || 'assets/images/placeholder-game.png'}" 
                        alt="${credit.name || 'Credit'}" 
                        class="credit-logo" 
                        title="${credit.name || 'Credit'}">
                `;
                credits.appendChild(creditItem);
            });
        }
        
        // Load games
        if (data.games) {
            loadGames(data.games.casual?.games, casualGamesContainer, 'casual', noCasual, data.games.casual?.available);
            loadGames(data.games.virtualPc?.games, virtualPcGamesContainer, 'virtual-pc', noVirtualPc, data.games.virtualPc?.available);
            loadGames(data.games.virtualMobile?.games, virtualMobileGamesContainer, 'virtual-mobile', noVirtualMobile, data.games.virtualMobile?.available);
        }
        
        // Event listeners are handled inline, no additional setup needed
        console.log('✅ Tournament initialized with expandable card system');
    }

    // NEW: Enhanced games loading with expandable cards (no modal popups)
    function loadGames(games, container, type, noGamesElement, available) {
        if (!container) return;
        
        if (!available || !games || games.length === 0) {
            container.style.display = 'none';
            if (noGamesElement) noGamesElement.classList.remove('hidden');
            return;
        }
        
        container.innerHTML = '';
        if (noGamesElement) noGamesElement.classList.add('hidden');
        
        games.forEach((game, index) => {
            const isOpen = game.registrationOpen;
            const participantsText = game.teamBased 
                ? `${game.currentParticipants || 0} Teams Registered` 
                : `${game.currentParticipants || 0} Players Registered`;
            
            const uniqueId = `${type}-${game.id}`;
            console.log(`🎮 Creating game card: ${game.name} with unique ID: ${uniqueId}`);
            
            // Get appropriate icon for game type
            let gameIcon = 'fa-gamepad';
            let typeColor = 'purple';
            if (type === 'virtual-pc') {
                gameIcon = 'fa-desktop';
                typeColor = 'red';
            }
            if (type === 'virtual-mobile') {
                gameIcon = 'fa-mobile-alt';
                typeColor = 'yellow';
            }
            
            const gameCard = document.createElement('div');
            gameCard.className = `game-card ${type} transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`;
            gameCard.style.animationDelay = `${index * 100}ms`;
            gameCard.id = `game-card-${uniqueId}`;
            
            gameCard.innerHTML = `
                <div class="relative overflow-hidden group">
                    <div class="absolute inset-0 bg-gradient-to-br from-${typeColor}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"></div>
                    
                    <img src="${game.logo || 'assets/images/games/placeholder.png'}" 
                         alt="${game.name || 'Game'}" 
                         class="game-image transition-transform duration-500 group-hover:scale-110"
                         onerror="this.src='assets/images/games/placeholder.png'">
                    
                    <div class="absolute top-4 right-4 z-20">
                        <span class="game-status ${isOpen ? 'open' : 'closed'} shadow-lg">
                            <i class="fas ${isOpen ? 'fa-unlock' : 'fa-lock'} mr-1"></i>
                            ${isOpen ? 'OPEN' : 'CLOSED'}
                        </span>
                    </div>
                </div>
                
                <div class="game-content p-6">
                    <h3 class="game-title mb-4 text-xl font-bold flex items-center">
                        <i class="fas ${gameIcon} mr-3 text-${typeColor}-500"></i>
                        ${game.name || 'Untitled Game'}
                    </h3>
                    
                    <div class="game-summary mb-4 space-y-2">
                        <div class="flex items-center text-sm text-gray-300">
                            <i class="fas fa-money-bill-wave text-green-400 mr-2 w-4"></i>
                            <span><strong>Fee:</strong> ${game.participationFee || 'Free'}</span>
                        </div>
                        <div class="flex items-center text-sm text-gray-300">
                            <i class="fas fa-users text-blue-400 mr-2 w-4"></i>
                            <span>${participantsText}</span>
                        </div>
                    </div>
                    
                    <div class="game-tags mb-4 flex flex-wrap gap-2">
                        <span class="game-tag bg-${typeColor}-500/20 text-${typeColor}-300 border-${typeColor}-500/30">
                            <i class="fas ${game.teamBased ? 'fa-users' : 'fa-user'} mr-1"></i>
                            ${game.teamBased ? 'Team' : 'Solo'}
                        </span>
                        ${game.tags && Array.isArray(game.tags) ? 
                          game.tags.map(tag => `<span class="game-tag bg-gray-700/50 text-gray-300 border-gray-600">${tag}</span>`).join('') : ''}
                    </div>
                    
                    <!-- Expandable Details Section (initially hidden) -->
                    <div class="game-details-expanded" 
                         id="details-${uniqueId}" 
                         style="display: none;">
                        <div class="border-t border-gray-700 pt-4 mt-4 space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 class="text-lg font-semibold text-${typeColor}-400 mb-2 flex items-center">
                                        <i class="fas fa-question-circle mr-2"></i>
                                        How to Play
                                    </h4>
                                    <p class="text-gray-300 text-sm leading-relaxed">${game.howToPlay || 'Game instructions will be provided during the tournament.'}</p>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold text-${typeColor}-400 mb-2 flex items-center">
                                        <i class="fas fa-user-check mr-2"></i>
                                        Eligibility
                                    </h4>
                                    <p class="text-gray-300 text-sm leading-relaxed">${game.eligibility || 'Open to all participants.'}</p>
                                </div>
                            </div>
                            
                            <div class="bg-gray-800/50 p-4 rounded-lg">
                                <h4 class="text-lg font-semibold text-${typeColor}-400 mb-2 flex items-center">
                                    <i class="fas fa-info-circle mr-2"></i>
                                    Registration Details
                                </h4>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                    <div><strong>Deadline:</strong> ${game.registrationDeadline || 'TBD'}</div>
                                    <div><strong>Type:</strong> ${game.teamBased ? 'Team-based' : 'Individual'}</div>
                                    <div><strong>Current Participants:</strong> ${game.currentParticipants || 0}</div>
                                    <div><strong>Status:</strong> ${isOpen ? 'Open for Registration' : 'Registration Closed'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="game-actions grid grid-cols-3 gap-2 mt-4">
                        <button class="game-btn info flex items-center justify-center transition-all duration-300 hover:scale-105" 
                                onclick="toggleGameDetails('${uniqueId}')">
                            <i class="fas fa-info-circle mr-1"></i> 
                            <span class="details-btn-text">Details</span>
                        </button>
                        <a href="${game.rulebookLink || '#'}" 
                           target="_blank" 
                           class="game-btn secondary flex items-center justify-center transition-all duration-300 hover:scale-105">
                            <i class="fas fa-book-open mr-1"></i> Rules
                        </a>
                        ${isOpen ? 
                            `<a href="${game.registrationFormLink || '#'}" 
                               target="_blank" 
                               class="game-btn primary flex items-center justify-center transition-all duration-300 hover:scale-105">
                                <i class="fas fa-external-link-alt mr-1"></i> Register
                             </a>` :
                            `<button class="game-btn disabled flex items-center justify-center" disabled>
                                <i class="fas fa-lock mr-1"></i> Closed
                             </button>`
                        }
                    </div>
                </div>
            `;
            container.appendChild(gameCard);
        });
        
        console.log(`✅ Loaded ${games.length} games for ${type} with expandable details`);
    }

    // SIMPLE & BULLETPROOF: Toggle game details expansion
    function toggleGameDetails(uniqueGameId) {
        console.log('🔍 Toggling game details for:', uniqueGameId);
        
        // Find the specific details section for this game
        const detailsSection = document.getElementById(`details-${uniqueGameId}`);
        const button = document.querySelector(`[onclick*="${uniqueGameId}"] .details-btn-text`);
        
        if (!detailsSection) {
            console.error('❌ Could not find details section:', `details-${uniqueGameId}`);
            return;
        }
        
        // Simple toggle: check current display state
        if (detailsSection.style.display === 'none' || detailsSection.style.display === '') {
            // Show details
            detailsSection.style.display = 'block';
            detailsSection.style.animation = 'slideDown 0.3s ease-out';
            if (button) button.textContent = 'Hide';
            console.log('✅ Expanded:', uniqueGameId);
        } else {
            // Hide details
            detailsSection.style.animation = 'slideUp 0.3s ease-out';
            setTimeout(() => {
                detailsSection.style.display = 'none';
            }, 300);
            if (button) button.textContent = 'Details';
            console.log('✅ Collapsed:', uniqueGameId);
        }
    }
    
    // Make function globally available
    window.toggleGameDetails = toggleGameDetails;
    
    // DEBUG: Add a function to inspect all game details elements
    window.debugGameDetails = function() {
        console.log('=== DEBUG: All game detail elements ===');
        const allDetailsElements = document.querySelectorAll('[id^="details-"]');
        allDetailsElements.forEach(el => {
            console.log(`ID: ${el.id}, Hidden: ${el.classList.contains('hidden')}, Display: ${el.style.display}`);
        });
        
        const allGameCards = document.querySelectorAll('[id^="game-card-"]');
        allGameCards.forEach(el => {
            console.log(`Card ID: ${el.id}, Expanded: ${el.classList.contains('expanded')}`);
        });
    };

    
    // Setup event listeners after games are loaded (simplified)
    function setupEventListeners() {
        console.log('✅ Event listeners setup complete - using direct links and expandable cards');
    }
});
