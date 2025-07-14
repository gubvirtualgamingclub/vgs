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

    // Initialize tournament with data
    function initializeTournament(data) {
        try {
            console.log('🎮 Initializing tournament with data:', data);
            
            // Check if tournament is active
            if (!data.tournament || !data.tournament.active) {
                showNoTournamentMessage();
                return;
            }
            
            // Show tournament content
            showTournamentContent();
            
            // Set tournament info
            if (data.tournament) {
                setTournamentInfo(data.tournament);
            }
            
            // Set collaborators and credits
            if (data.collaborators) {
                setCollaborators(data.collaborators);
            }
            if (data.credits) {
                setCredits(data.credits);
            }
            
            // Load games for each category with proper availability check
            if (data.games) {
                loadGames(
                    data.games.casual?.games || [], 
                    casualGamesContainer, 
                    'casual', 
                    noCasual, 
                    data.games.casual?.available || false
                );
                
                loadGames(
                    data.games.virtualPc?.games || [], 
                    virtualPcGamesContainer, 
                    'virtual-pc', 
                    noVirtualPc, 
                    data.games.virtualPc?.available || false
                );
                
                loadGames(
                    data.games.virtualMobile?.games || [], 
                    virtualMobileGamesContainer, 
                    'virtual-mobile', 
                    noVirtualMobile, 
                    data.games.virtualMobile?.available || false
                );
            }
            
            console.log('✅ Tournament initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing tournament:', error);
            showErrorAlert('Error initializing tournament data');
            showNoTournamentMessage();
        }
    }

    // Set tournament information
    function setTournamentInfo(tournament) {
        if (tournamentName) {
            tournamentName.textContent = tournament.name || 'Tournament Name';
        }
        if (tournamentLogo) {
            tournamentLogo.src = tournament.logo || 'assets/images/logos/vgs.png';
            tournamentLogo.onerror = function() {
                this.src = 'assets/images/logos/vgs.png';
            };
        }
        if (tournamentDescription) {
            tournamentDescription.textContent = tournament.description || 'Tournament description not available.';
        }
        
        // Set tournament meta details from JSON data
        if (tournamentMeta) {
            tournamentMeta.innerHTML = '';
            
            // Create meta items from tournament data
            const metaItems = [
                { icon: 'fas fa-calendar-alt', label: 'Date', value: tournament.date },
                { icon: 'fas fa-clock', label: 'Time', value: tournament.time },
                { icon: 'fas fa-map-marker-alt', label: 'Venue', value: tournament.venue },
                { icon: 'fas fa-trophy', label: 'Prize Pool', value: tournament.prizePool }
            ].filter(item => item.value); // Only show items that have values
            
            metaItems.forEach(item => {
                const metaItem = document.createElement('div');
                metaItem.className = 'detail-item';
                metaItem.innerHTML = `
                    <div class="flex items-center">
                        <i class="${item.icon} detail-icon"></i>
                        <div>
                            <span class="block text-sm font-semibold text-white">${item.value}</span>
                            <span class="block text-xs text-gray-400">${item.label}</span>
                        </div>
                    </div>
                `;
                tournamentMeta.appendChild(metaItem);
            });
        }
    }

    // Set collaborators
    function setCollaborators(collaboratorsList) {
        if (collaborators) {
            collaborators.innerHTML = '';
            collaboratorsList.forEach(collab => {
                const collabElement = document.createElement('div');
                collabElement.className = 'collaborator-item';
                collabElement.innerHTML = `
                    <img src="${collab.logo}" alt="${collab.name}" class="collaborator-logo">
                `;
                collaborators.appendChild(collabElement);
            });
        }
    }

    // Set credits
    function setCredits(creditsList) {
        if (credits) {
            credits.innerHTML = '';
            creditsList.forEach(credit => {
                const creditElement = document.createElement('div');
                creditElement.className = 'credit-item';
                creditElement.innerHTML = `
                    <img src="${credit.logo}" alt="${credit.name}" class="credit-logo">
                `;
                credits.appendChild(creditElement);
            });
        }
    }

    // Load games for a specific category - CLEAN & SIMPLE
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
            const gameCard = createGameCard(game, type, index);
            container.appendChild(gameCard);
        });

        console.log(`✅ Loaded ${games.length} games for ${type}`);
    }

    // Create individual game card - CLEAN & CONSISTENT
    function createGameCard(game, type, index) {
        const uniqueId = `${type}-${game.id || index}`;
        
        // Get type-specific styling
        const typeInfo = getGameTypeInfo(type);
        const isOpen = game.registrationOpen !== false;
        
        const gameCard = document.createElement('div');
        gameCard.className = `game-card ${type} opacity-0 transform translate-y-4`;
        gameCard.style.animationDelay = `${index * 100}ms`;
        gameCard.id = `game-card-${uniqueId}`;
        
        gameCard.innerHTML = `
            <div class="game-card-inner">
                <!-- Game Image Section -->
                <div class="game-image-container">
                    <img src="${game.logo || game.image || 'assets/images/games/placeholder.png'}" 
                         alt="${game.name || 'Game'}" 
                         class="game-image"
                         onload="this.style.opacity='1'"
                         onerror="console.log('Image failed to load:', this.src); this.src='assets/images/games/placeholder.png';">
                    
                    <!-- Game Type Badge -->
                    <div class="game-type-badge ${typeInfo.class}">
                        <i class="${typeInfo.icon}"></i>
                        <span>${typeInfo.label}</span>
                    </div>
                    
                    <!-- Registration Status -->
                    <div class="registration-status-badge ${isOpen ? 'open' : 'closed'}">
                        <i class="fas ${isOpen ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                        <span>${isOpen ? 'OPEN' : 'CLOSED'}</span>
                    </div>
                </div>
                
                <!-- Game Content Section -->
                <div class="game-content">
                    <h3 class="game-title">${game.name || 'Untitled Game'}</h3>
                    <p class="game-description">${game.description || 'Join this exciting gaming tournament and showcase your skills!'}</p>
                    
                    <!-- Game Details Grid -->
                    <div class="game-details-grid">
                        <div class="detail-item">
                            <i class="fas fa-calendar-alt"></i>
                            <div>
                                <span class="detail-label">Deadline</span>
                                <span class="detail-value">${game.registrationDeadline || 'TBA'}</span>
                            </div>
                        </div>
                        
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <div>
                                <span class="detail-label">How to Play</span>
                                <span class="detail-value">${game.howToPlay || 'TBA'}</span>
                            </div>
                        </div>
                        
                        <div class="detail-item">
                            <i class="fas fa-money-bill-wave"></i>
                            <div>
                                <span class="detail-label">Entry Fee</span>
                                <span class="detail-value">${game.participationFee || 'Free'}</span>
                            </div>
                        </div>
                        
                        <div class="detail-item">
                            <i class="fas fa-user-check"></i>
                            <div>
                                <span class="detail-label">Eligibility</span>
                                <span class="detail-value">${game.eligibility || 'Open to all'}</span>
                            </div>
                        </div>
                        
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <div>
                                <span class="detail-label">Team Based</span>
                                <span class="detail-value">${game.teamBased ? 'Yes' : 'Individual'}</span>
                            </div>
                        </div>
                        
                        <div class="detail-item">
                            <i class="fas fa-tags"></i>
                            <div>
                                <span class="detail-label">Tags</span>
                                <span class="detail-value">${game.tags ? game.tags.join(', ') : 'Gaming'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Additional Info -->
                    <div class="additional-info">
                        <div class="participants-count">
                            <i class="fas fa-user-friends"></i>
                            <span>${game.currentParticipants || 0} Registered</span>
                        </div>
                        ${game.maxParticipants ? `<div class="max-participants">
                            <i class="fas fa-users"></i>
                            <span>Max: ${game.maxParticipants}</span>
                        </div>` : ''}
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="game-actions">
                        <a href="${game.registrationFormLink || '#'}" 
                           class="register-btn ${typeInfo.class} ${!isOpen ? 'disabled' : ''}"
                           ${!isOpen ? 'onclick="return false;"' : 'target="_blank"'}>
                            <i class="fas ${isOpen ? 'fa-user-plus' : 'fa-lock'}"></i>
                            <span>${isOpen ? 'Register Now' : 'Registration Closed'}</span>
                        </a>
                        
                        ${game.rulebookLink ? `
                        <a href="${game.rulebookLink}" 
                           class="rulebook-btn ${typeInfo.class}"
                           target="_blank"
                           download>
                            <i class="fas fa-book"></i>
                            <span>Download Rules</span>
                        </a>` : `
                        <button class="rulebook-btn ${typeInfo.class}" disabled style="opacity: 0.5;">
                            <i class="fas fa-book"></i>
                            <span>Rules Coming Soon</span>
                        </button>`}
                    </div>
                </div>
            </div>
        `;
        
        // Animate card in
        setTimeout(() => {
            gameCard.classList.remove('opacity-0', 'transform', 'translate-y-4');
            gameCard.classList.add('opacity-100');
        }, index * 100);
        
        console.log(`✅ Created game card for: ${game.name} with buttons:`, {
            registerBtn: !!game.registrationFormLink,
            rulebookBtn: !!game.rulebookLink,
            isOpen: isOpen
        });
        
        return gameCard;
    }

    // Get game type information
    function getGameTypeInfo(type) {
        const typeMap = {
            'casual': {
                class: 'casual',
                icon: 'fas fa-gamepad',
                label: 'Casual Gaming'
            },
            'virtual-pc': {
                class: 'virtual-pc',
                icon: 'fas fa-desktop',
                label: 'PC Gaming'
            },
            'virtual-mobile': {
                class: 'virtual-mobile',
                icon: 'fas fa-mobile-alt',
                label: 'Mobile Gaming'
            }
        };
        return typeMap[type] || typeMap['casual'];
    }
    
    // Show no tournament message and hide everything else
    function showNoTournamentMessage() {
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
        
        // Create and show no tournament message
        const existingMessage = document.getElementById('no-tournament-message');
        if (!existingMessage) {
            const noTournamentDiv = document.createElement('div');
            noTournamentDiv.id = 'no-tournament-message';
            noTournamentDiv.className = 'text-center py-20 px-4';
            noTournamentDiv.innerHTML = `
                <div class="max-w-2xl mx-auto">
                    <div class="mb-8">
                        <i class="fas fa-calendar-times text-6xl text-gray-500 mb-4"></i>
                        <h2 class="text-3xl font-bold text-gray-300 mb-4 font-orbitron">No Active Tournament</h2>
                        <p class="text-lg text-gray-400 mb-8">
                            There are no active tournaments at the moment. 
                            Please check back later for upcoming gaming events and competitions.
                        </p>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onclick="location.reload()" 
                                class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 flex items-center justify-center">
                            <i class="fas fa-refresh mr-2"></i>
                            Refresh Page
                        </button>
                        <button onclick="window.location.href='index.html'" 
                                class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 flex items-center justify-center">
                            <i class="fas fa-home mr-2"></i>
                            Back to Home
                        </button>
                    </div>
                </div>
            `;
            
            const container = document.querySelector('section.py-12');
            if (container) {
                container.appendChild(noTournamentDiv);
            }
        }
    }

    // Show tournament content and hide no tournament message
    function showTournamentContent() {
        const noTournamentMessage = document.getElementById('no-tournament-message');
        if (noTournamentMessage) {
            noTournamentMessage.remove();
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
});
