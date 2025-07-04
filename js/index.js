/*───────────────────────────────────────────────────────────────
  DATA LOADING & INITIALIZATION
───────────────────────────────────────────────────────────────*/
let gamesData = { games: [] };
let gameImagesPreloaded = false;

document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Initialize particles with retry mechanism
    initParticlesWithRetry();
    initHeroLighting();
    initScrollReveal();
    //initPopup(); // Deprecated
    
    loadSiteStats();
    loadCollaborators();
    loadGamesData();
});

function initParticlesWithRetry(retryCount = 0) {
    const maxRetries = 5;
    const retryDelay = 1000; // 1 second
    
    console.log(`🎯 Attempting to initialize particles (attempt ${retryCount + 1}/${maxRetries})...`);
    
    if (window.tsParticles && document.getElementById('tsparticles')) {
        initParticles();
    } else {
        if (retryCount < maxRetries) {
            console.log(`⏳ Retrying particles initialization in ${retryDelay}ms...`);
            setTimeout(() => initParticlesWithRetry(retryCount + 1), retryDelay);
        } else {
            console.error('❌ Failed to initialize particles after maximum retries');
        }
    }
}

async function loadSiteStats() {
    try {
        const response = await fetch('data/site-data.json');
        if (!response.ok) throw new Error('Failed to load site data');
        const data = await response.json();
        const stats = data.stats;

        const heroStatsContainer = document.getElementById('hero-stats-container');
        if (heroStatsContainer) {
            heroStatsContainer.innerHTML = `
                <div class="stat-preview" data-target="${stats.activeMembers}">
                    <div class="stat-number">0</div>
                    <div class="stat-label">Active Members</div>
                </div>
                <div class="stat-preview" data-target="${stats.tournaments}">
                    <div class="stat-number">0</div>
                    <div class="stat-label">Tournaments</div>
                </div>
                <div class="stat-preview" data-target="${stats.gamesSupported}">
                    <div class="stat-number">0</div>
                    <div class="stat-label">Games</div>
                </div>
                <div class="stat-preview" data-target="${stats.industryPartners}">
                    <div class="stat-number">0</div>
                    <div class="stat-label">Partners</div>
                </div>
            `;
        }

        const aboutStatsContainer = document.getElementById('about-stats-container');
        if (aboutStatsContainer) {
            aboutStatsContainer.innerHTML = `
                <a href="executive.html" class="stat-card">
                    <i class="fas fa-users stat-icon"></i>
                    <div>
                        <div class="stat-card-number">${stats.activeMembers}</div>
                        <div class="stat-card-label">Active Members</div>
                    </div>
                </a>
                <a href="activities.html" class="stat-card">
                    <i class="fas fa-trophy stat-icon"></i>
                    <div>
                        <div class="stat-card-number">${stats.tournaments}</div>
                        <div class="stat-card-label">Tournaments</div>
                    </div>
                </a>
                <a href="#games-popup" class="stat-card">
                    <i class="fas fa-gamepad stat-icon"></i>
                    <div>
                        <div class="stat-card-number">${stats.gamesSupported}</div>
                        <div class="stat-card-label">Games Supported</div>
                    </div>
                </a>
                <a href="collaboration.html" class="stat-card">
                    <i class="fas fa-handshake stat-icon"></i>
                    <div>
                        <div class="stat-card-number">${stats.industryPartners}</div>
                        <div class="stat-card-label">Industry Partners</div>
                    </div>
                </a>
            `;
        }
        initStatsCounter();
    } catch (error) {
        console.error('Error loading site stats:', error);
    }
}

async function loadCollaborators() {
    try {
        console.log('🔄 Loading collaborators...');
        const response = await fetch('data/collaborations.json');
        if (!response.ok) throw new Error('Failed to load collaborators data');
        const data = await response.json();
        const collaborators = data.partners.slice(0, 3);
        
        console.log('📄 Collaborators data:', collaborators);

        const container = document.getElementById('collaborators-container');
        if (!container) {
            console.error('❌ Collaborators container not found');
            return;
        }
        
        if (collaborators.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <p class="text-gray-400">No collaborators found.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = collaborators.map((partner, index) => {
            // Determine category and badge based on partner type
            const partnerType = partner.types[0].toLowerCase();
            let category = 'hardware';
            let badgeClass = 'hardware-badge';
            let badgeText = 'Hardware Excellence';
            let typeClass = 'hardware-type';
            let iconClass = 'fas fa-microchip';
            
            if (partnerType.includes('seminar') || partnerType.includes('content')) {
                category = 'streaming';
                badgeClass = 'streaming-badge';
                badgeText = 'Tech Content Expert';
                typeClass = 'streaming-type';
                iconClass = 'fas fa-broadcast-tower';
            } else if (partnerType.includes('social') || partnerType.includes('media')) {
                category = 'media';
                badgeClass = 'media-badge';
                badgeText = 'Media Partner';
                typeClass = 'media-type';
                iconClass = 'fas fa-share-alt';
            } else if (partnerType.includes('food') || partnerType.includes('restaurant')) {
                category = 'nutrition';
                badgeClass = 'nutrition-badge';
                badgeText = 'Food Excellence';
                typeClass = 'nutrition-type';
                iconClass = 'fas fa-utensils';
            } else if (partnerType.includes('sponsor') || partnerType.includes('main')) {
                category = 'sponsor';
                badgeClass = 'sponsor-badge';
                badgeText = 'Main Sponsor';
                typeClass = 'sponsor-type';
                iconClass = 'fas fa-trophy';
            }

            return `
                <div class="collaborator-card group" data-category="${category}">
                    <div class="card-inner">
                        <div class="collaborator-header">
                            <div class="collaborator-avatar">
                                <img src="${partner.logo}" alt="${partner.name}" 
                                     class="avatar-img" 
                                     onerror="this.src='assets/images/members/placeholder.png'"
                                     loading="lazy">
                                <div class="avatar-ring"></div>
                            </div>
                            <div class="collaborator-info">
                                <h3 class="collaborator-name">${partner.name}</h3>
                                <p class="collaborator-type ${typeClass}">${partner.types[0]}</p>
                            </div>
                        </div>
                        <p class="collaborator-desc">${partner.shortDesc}</p>
                        <div class="collaborator-stats">
                            <div class="stat-item">
                                <i class="${iconClass}"></i>
                                <span>${partner.events.length} Event${partner.events.length !== 1 ? 's' : ''}</span>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-calendar-alt"></i>
                                <span>Since ${partner.since}</span>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="partnership-badge ${badgeClass}">${badgeText}</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        console.log('✅ Collaborators loaded successfully');
    } catch (error) {
        console.error('❌ Error loading collaborators:', error);
        // Fallback display
        const container = document.getElementById('collaborators-container');
        if (container) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <div class="text-red-500 mb-4">
                        <i class="fas fa-exclamation-triangle text-4xl"></i>
                    </div>
                    <p class="text-gray-400">Failed to load collaborators. Please try again later.</p>
                    <p class="text-gray-500 text-sm mt-2">Error: ${error.message}</p>
                </div>
            `;
        }
    }
}

/*───────────────────────────────────────────────────────────────
  PARTICLE SYSTEM INITIALIZATION
───────────────────────────────────────────────────────────────*/
function initParticles() {
    console.log('🎯 Initializing particles...');
    
    const particlesContainer = document.getElementById('tsparticles');
    if (!particlesContainer) {
        console.error('❌ Particles container not found');
        return;
    }
    
    if (!window.tsParticles) {
        console.warn('⚠️ tsParticles library not loaded, retrying...');
        setTimeout(initParticles, 500);
        return;
    }
    
    console.log('✅ tsParticles library loaded, starting particles...');

    tsParticles.load('tsparticles', {
        fpsLimit: 60,
        background: { color: 'transparent' },
        particles: {
            number: { 
                value: 80,
                density: { 
                    enable: true, 
                    area: 1000 
                } 
            },
            color: { 
                value: ['#10b981', '#3b82f6', '#8b5cf6', '#06b6d4'] 
            },
            opacity: { 
                value: { min: 0.3, max: 0.8 },
                random: true,
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            size: { 
                value: { 
                    min: 1, 
                    max: 4
                },
                random: true,
                animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 0.5,
                    sync: false
                }
            },
            shape: { 
                type: 'circle' 
            },
            links: {
                enable: true,
                distance: 150,
                color: '#3b82f6',
                opacity: 0.3,
                width: 1,
                triangles: {
                    enable: false
                }
            },
            move: { 
                enable: true, 
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                outModes: { 
                    default: 'bounce' 
                },
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 600
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onHover: {
                    enable: true,
                    mode: 'repulse'
                },
                onClick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    quantity: 4
                }
            }
        },
        detectRetina: true
    }).then(() => {
        console.log('✅ Particles loaded successfully');
    }).catch(error => {
        console.error('❌ Error loading particles:', error);
    });
}

/*───────────────────────────────────────────────────────────────
  HERO LIGHTING EFFECT
───────────────────────────────────────────────────────────────*/
function initHeroLighting() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    // Create dynamic spotlight effect
    hero.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        hero.style.setProperty('--mouse-x', x);
        hero.style.setProperty('--mouse-y', y);
        
        // Parallax effect for hero content
        const content = hero.querySelector('.hero-content-wrapper');
        if (content) {
            const moveX = (x - 0.5) * 20;
            const moveY = (y - 0.5) * 20;
            content.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });

    // Reset on mouse leave
    hero.addEventListener('mouseleave', () => {
        hero.style.setProperty('--mouse-x', 0.5);
        hero.style.setProperty('--mouse-y', 0.5);
        const content = hero.querySelector('.hero-content-wrapper');
        if (content) {
            content.style.transform = 'translate(0, 0)';
        }
    });

    // Add pulse animation to CTA buttons
    const ctaButtons = hero.querySelectorAll('.cta-primary, .cta-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'pulse 1.5s infinite';
        });
        button.addEventListener('mouseleave', () => {
            button.style.animation = '';
        });
    });
}

/*───────────────────────────────────────────────────────────────
  SCROLL REVEAL ANIMATIONS
───────────────────────────────────────────────────────────────*/
function initScrollReveal() {
    if (typeof ScrollReveal === 'undefined') return;

    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '40px',
        duration: 800,
        reset: false,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        opacity: 0,
        scale: 1,
        mobile: true
    });

    // Hero section elements
    sr.reveal('.hero-title', { delay: 200 });
    sr.reveal('.hero-subtitle', { delay: 400 });
    sr.reveal('.hero-buttons', { delay: 600 });
    sr.reveal('.hero-stats', { delay: 800, interval: 100 });

    // Mission/Vision cards
    sr.reveal('.value-card', { delay: 200, interval: 200 });

    // Collaborators section
    sr.reveal('.collaborator-card', { delay: 200, interval: 150 });

    // About section
    sr.reveal('.about-text', { delay: 200 });
    sr.reveal('.about-visual', { delay: 400 });
    sr.reveal('.stats-grid .stat-card', { delay: 500, interval: 100 });
}

/*───────────────────────────────────────────────────────────────
  STATS COUNTER ANIMATION
───────────────────────────────────────────────────────────────*/
function initStatsCounter() {
    const statElements = document.querySelectorAll('.stat-preview');
    if (!statElements.length) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statElements.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    if (isNaN(target)) return;

    const numberElement = element.querySelector('.stat-number');
    if (!numberElement) return;

    let current = 0;
    const duration = 2000; // ms
    const stepTime = 30; // ms
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(interval);
            current = target;
        }
        numberElement.textContent = Math.floor(current);
    }, stepTime);
}


/*───────────────────────────────────────────────────────────────
  GAMES DATA LOADING
───────────────────────────────────────────────────────────────*/
async function loadGamesData() {
    try {
        const response = await fetch('data/games.json');
        if (!response.ok) throw new Error('Failed to load games data');
        gamesData = await response.json();
        console.log('🎮 Games data loaded successfully:', gamesData);
        preloadGameImages();
        setupGamesInteraction(); // Setup interaction after data is loaded
    } catch (error) {
        console.error('Error loading games data:', error);
        // Fallback data if JSON fails to load
        gamesData = {
            games: [
                { name: "VALORANT", logo: "assets/images/games/valorant.png", platform: "PC" },
                { name: "CODM", logo: "assets/images/games/codm.png", platform: "Mobile" },
                { name: "eFootball", logo: "assets/images/games/efootball.png", platform: "Mobile" },
                { name: "FIFA 19", logo: "assets/images/games/fifa19.png", platform: "PC" },
                { name: "Chess", logo: "assets/images/games/chess.png", platform: "Casual" },
                { name: "Ludo", logo: "assets/images/games/ludo.png", platform: "Casual" },
                { name: "Carrom", logo: "assets/images/games/carrom.png", platform: "Casual" },
                { name: "Table Tennis", logo: "assets/images/games/tabletennis.png", platform: "Casual" }
            ]
        };
        // Also preload fallback images
        preloadGameImages(gamesData.games);
    }
}

// Function to preload game images
function preloadGameImages(games) {
    if (gameImagesPreloaded) return;
    
    const preloadPromises = games.map(game => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(game.logo);
            img.onerror = () => {
                console.warn(`Failed to preload image: ${game.logo}`);
                resolve(null);
            };
            img.src = game.logo;
        });
    });
    
    Promise.all(preloadPromises).then(() => {
        console.log('All game images preloaded');
        gameImagesPreloaded = true;
    });
}

/*───────────────────────────────────────────────────────────────
  GAMES INTERACTION
───────────────────────────────────────────────────────────────*/
function setupGamesInteraction() {
    const gamesCard = document.getElementById('games-stat-card');
    const gamesGridContainer = document.getElementById('games-grid-container');

    if (gamesCard && gamesGridContainer) {
        gamesCard.addEventListener('click', (e) => {
            e.preventDefault();
            toggleGamesDisplay(gamesGridContainer);
        });
    }
}

function toggleGamesDisplay(container) {
    const isHidden = container.classList.contains('hidden');
    if (isHidden) {
        loadGamesIntoGrid(container);
        container.classList.remove('hidden');
        container.parentElement.classList.add('expanded');
    }
    else {
        container.classList.add('hidden');
        container.parentElement.classList.remove('expanded');
    }
}

function loadGamesIntoGrid(container) {
    if (container.children.length > 0) return; // Already loaded

    const gamesGrid = document.createElement('div');
    gamesGrid.className = 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4';

    gamesData.games.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.className = 'text-center p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300';
        gameElement.innerHTML = `
            <img src="${game.logo}" alt="${game.name}" class="w-16 h-16 mx-auto mb-2 rounded-md">
            <p class="text-sm font-semibold text-white">${game.name}</p>
        `;
        gamesGrid.appendChild(gameElement);
    });

    container.appendChild(gamesGrid);
}


/*───────────────────────────────────────────────────────────────
  UI & ANIMATIONS
───────────────────────────────────────────────────────────────*/
function initScrollReveal() {
    if (typeof ScrollReveal === 'undefined') return;

    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '40px',
        duration: 800,
        reset: false,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        opacity: 0,
        scale: 1,
        mobile: true
    });

    // Hero section elements
    sr.reveal('.hero-title', { delay: 200 });
    sr.reveal('.hero-subtitle', { delay: 400 });
    sr.reveal('.hero-buttons', { delay: 600 });
    sr.reveal('.hero-stats', { delay: 800, interval: 100 });

    // Mission/Vision cards
    sr.reveal('.value-card', { delay: 200, interval: 200 });

    // Collaborators section
    sr.reveal('.collaborator-card', { delay: 200, interval: 150 });

    // About section
    sr.reveal('.about-text', { delay: 200 });
    sr.reveal('.about-visual', { delay: 400 });
    sr.reveal('.stats-grid .stat-card', { delay: 500, interval: 100 });
}