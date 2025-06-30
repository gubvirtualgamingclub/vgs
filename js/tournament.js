document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const tournamentName = document.getElementById('tournament-name');
    const tournamentLogo = document.getElementById('tournament-logo');
    const tournamentDescription = document.getElementById('tournament-description');
    const tournamentMeta = document.getElementById('tournament-meta');
    const collaborators = document.getElementById('collaborators');
    const credits = document.getElementById('credits');
    
    const casualGamesContainer = document.getElementById('casual-games');
    const virtualPcGamesContainer = document.getElementById('virtual-pc-games');
    const virtualMobileGamesContainer = document.getElementById('virtual-mobile-games');
    
    const noCasual = document.getElementById('no-casual');
    const noVirtualPc = document.getElementById('no-virtual-pc');
    const noVirtualMobile = document.getElementById('no-virtual-mobile');
    
    const registrationModal = document.getElementById('registration-modal');
    const registrationModalContent = document.getElementById('registration-modal-content');
    const closeRegistrationModal = document.getElementById('close-registration-modal');

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

    // Initialize Tournament
    function initializeTournament(data) {
        tournamentName.textContent = data.tournament.name || 'Tournament Name';
        tournamentLogo.src = data.tournament.logo || 'assets/images/placeholder-game.png';
        tournamentLogo.alt = `${data.tournament.name || 'Tournament'} Logo`;
        tournamentDescription.textContent = data.tournament.description || 'No description available';
        
        // Set tournament meta details
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
        
        // Set collaborators
        if (data.collaborators && data.collaborators.length > 0) {
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
        
        // Set credits
        if (data.credits && data.credits.length > 0) {
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
        loadGames(data.games.casual.games, casualGamesContainer, 'casual', noCasual, data.games.casual.available);
        loadGames(data.games.virtualPc.games, virtualPcGamesContainer, 'virtual-pc', noVirtualPc, data.games.virtualPc.available);
        loadGames(data.games.virtualMobile.games, virtualMobileGamesContainer, 'virtual-mobile', noVirtualMobile, data.games.virtualMobile.available);
        
        // Setup event listeners
        setupEventListeners();
    }

    // Load games into container
    function loadGames(games, container, type, noGamesElement, available) {
        if (!available || !games || games.length === 0) {
            container.style.display = 'none';
            noGamesElement.classList.remove('hidden');
            return;
        }
        
        container.innerHTML = '';
        games.forEach(game => {
            const isOpen = game.registrationOpen;
            const participantsText = game.teamBased 
                ? `${game.currentParticipants || 0} Teams Registered` 
                : `${game.currentParticipants || 0} Players Registered`;
            
            // Get appropriate icon for game type
            let gameIcon = 'fa-gamepad';
            if (type === 'virtual-pc') gameIcon = 'fa-desktop';
            if (type === 'virtual-mobile') gameIcon = 'fa-mobile-alt';
            
            const gameCard = document.createElement('div');
            gameCard.className = `game-card ${type}`;
            gameCard.innerHTML = `
                <div class="relative overflow-hidden">
                    <img src="${game.logo || 'assets/images/placeholder-game.png'}" 
                         alt="${game.name || 'Game'}" 
                         class="game-image"
                         onerror="this.src='assets/images/placeholder-game.png'">
                    
                    <span class="game-status ${isOpen ? 'open' : 'closed'}">
                        <i class="fas ${isOpen ? 'fa-unlock' : 'fa-lock'} mr-1"></i>
                        ${isOpen ? 'OPEN' : 'CLOSED'}
                    </span>
                </div>
                
                <div class="game-content">
                    <h3 class="game-title">
                        <i class="fas ${gameIcon}"></i>
                        ${game.name || 'Untitled Game'}
                    </h3>
                    
                    <div class="game-details">
                        <p><strong><i class="fas fa-question-circle"></i> How to Play:</strong> ${game.howToPlay || 'N/A'}</p>
                        <p><strong><i class="fas fa-money-bill-wave"></i> Fee:</strong> ${game.participationFee || 'N/A'}</p>
                        <p><strong><i class="fas fa-user-check"></i> Eligibility:</strong> ${game.eligibility || 'N/A'}</p>
                        <p><strong><i class="fas fa-users"></i> Participants:</strong> ${participantsText}</p>
                    </div>
                    
                    <div class="game-tags">
                        <span class="game-tag">
                            <i class="fas ${game.teamBased ? 'fa-users' : 'fa-user'}"></i>
                            ${game.teamBased ? 'Team' : 'Solo'}
                        </span>
                        ${game.tags && Array.isArray(game.tags) ? 
                          game.tags.map(tag => `<span class="game-tag">${tag}</span>`).join('') : ''}
                    </div>
                    
                    <div class="game-actions grid grid-cols-2 gap-3">
                        <a href="${game.rulebookLink || '#'}" 
                           target="_blank" 
                           class="game-btn secondary">
                            <i class="fas fa-book-open"></i> Rulebook
                        </a>
                        <button class="game-btn ${isOpen ? 'primary' : 'disabled'}" 
                                data-game-id="${game.id || ''}" 
                                data-game-type="${type}"
                                ${!isOpen ? 'disabled' : ''}>
                            <i class="fas ${isOpen ? 'fa-user-plus' : 'fa-clock'}"></i>
                            ${isOpen ? 'Register' : 'Closed'}
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(gameCard);
        });
    }

    // Open registration modal
    function openRegistrationModal(gameId, gameType) {
        fetch('data/tournament.json')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load tournament.json');
                return response.json();
            })
            .then(data => {
                let game;
                if (gameType === 'casual') {
                    game = data.games.casual.games.find(g => g.id == gameId);
                } else if (gameType === 'virtual-pc') {
                    game = data.games.virtualPc.games.find(g => g.id == gameId);
                } else if (gameType === 'virtual-mobile') {
                    game = data.games.virtualMobile.games.find(g => g.id == gameId);
                }
                
                if (game) {
                    registrationModalContent.innerHTML = `
                        <div class="text-center mb-6">
                            <img src="${game.logo || 'assets/images/placeholder-game.png'}" 
                                 alt="${game.name || 'Game'}" 
                                 class="mx-auto h-24 mb-4 rounded-lg border-2 border-gray-700"
                                 onerror="this.src='assets/images/placeholder-game.png'">
                            <h2 class="text-2xl font-bold mb-2 font-orbitron text-green-400">
                                <i class="fas ${gameType === 'casual' ? 'fa-gamepad' : gameType === 'virtual-pc' ? 'fa-desktop' : 'fa-mobile-alt'} mr-2"></i>
                                ${game.name || 'Untitled Game'} Registration
                            </h2>
                            <p class="text-gray-400">
                                <i class="fas ${game.teamBased ? 'fa-users' : 'fa-user'} mr-1"></i>
                                ${game.teamBased ? 'Team Registration' : 'Individual Registration'}
                            </p>
                        </div>
                        
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold mb-2 flex items-center">
                                <i class="fas fa-info-circle mr-2 text-green-400"></i>Registration Details
                            </h3>
                            <div class="bg-gray-700 rounded-lg p-4 space-y-3">
                                <p class="flex items-center">
                                    <i class="fas fa-money-bill-wave mr-2 text-blue-400"></i>
                                    <strong class="mr-2">Participation Fee:</strong> ${game.participationFee || 'N/A'}
                                </p>
                                <p class="flex items-center">
                                    <i class="fas fa-calendar-times mr-2 text-blue-400"></i>
                                    <strong class="mr-2">Deadline:</strong> ${game.registrationDeadline || 'N/A'}
                                </p>
                                <p class="flex items-center">
                                    <i class="fas fa-users mr-2 text-blue-400"></i>
                                    <strong class="mr-2">Participants:</strong> ${game.currentParticipants || 0} ${game.teamBased ? 'teams' : 'players'}
                                </p>
                            </div>
                        </div>
                        
                        <div class="text-center">
                            <a href="${game.registrationFormLink || '#'}" 
                               target="_blank" 
                               class="inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition duration-300 mb-4 w-full">
                                <i class="fas fa-external-link-alt mr-2"></i> Go to Registration Form
                            </a>
                            <p class="text-sm text-gray-400">
                                <i class="fas fa-exclamation-circle mr-1"></i> You will be redirected to the registration form
                            </p>
                        </div>
                    `;
                    
                    // Show modal
                    registrationModal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                } else {
                    throw new Error('Game not found');
                }
            })
            .catch(error => {
                console.error('Error loading game details:', error);
                registrationModalContent.innerHTML = `
                    <div class="text-center p-8">
                        <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                        <h2 class="text-xl font-bold mb-2">Error Loading Registration</h2>
                        <p class="text-gray-400">Could not load registration details. Please try again later.</p>
                        <button class="mt-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition duration-200">
                            <i class="fas fa-sync-alt mr-2"></i> Retry
                        </button>
                    </div>
                `;
                
                // Show modal
                registrationModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
    }

    // Close registration modal
    function closeModal() {
        registrationModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Event listeners
    function setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('game-btn') && 
                !e.target.classList.contains('disabled') && 
                e.target.dataset.gameId) {
                e.preventDefault();
                openRegistrationModal(e.target.dataset.gameId, e.target.dataset.gameType);
            }
        });

        closeRegistrationModal.addEventListener('click', closeModal);
        registrationModal.addEventListener('click', (e) => {
            if (e.target === registrationModal) {
                closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && registrationModal.style.display === 'flex') {
                closeModal();
            }
        });
    }
});