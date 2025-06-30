/*───────────────────────────────────────────────────────────────
  FOOTER YEAR & SCROLL‑REVEAL
───────────────────────────────────────────────────────────────*/
document.addEventListener('DOMContentLoaded', () => {
    // Update footer year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Initialize components
    initParticles();
    initHeroLighting();
    initScrollReveal();
    initStatsCounter();
    initEventListeners();
    
    // Load games data
    loadGamesData();
});

function initEventListeners(){
    // Hero section buttons - using anchor links instead of functions
    const heroButtons = document.querySelectorAll('.hero-buttons .cta-primary, .hero-buttons .cta-secondary');
    heroButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Collaborator cards hover effects
    const collaboratorCards = document.querySelectorAll('.collaborator-card');
    collaboratorCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
            card.style.borderColor = 'rgba(74, 222, 128, 0.3)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
            card.style.borderColor = 'rgba(74, 222, 128, 0.1)';
        });
    });

    // View all collaborations button
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('mouseenter', () => {
            viewAllBtn.style.background = 'rgba(31, 41, 55, 0.9)';
            viewAllBtn.style.borderColor = 'rgba(74, 222, 128, 0.6)';
        });
        viewAllBtn.addEventListener('mouseleave', () => {
            viewAllBtn.style.background = 'rgba(31, 41, 55, 0.7)';
            viewAllBtn.style.borderColor = 'rgba(74, 222, 128, 0.3)';
        });
    }

    // CTA section buttons
    const ctaButtons = document.querySelectorAll('.cta-primary-large, .cta-secondary-large');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
}

/*───────────────────────────────────────────────────────────────
  PARTICLE SYSTEM INITIALIZATION
───────────────────────────────────────────────────────────────*/
function initParticles() {
    if (!window.tsParticles || !tsParticles.load) {
        console.warn("tsParticles not loaded");
        return;
    }

    tsParticles.load('tsparticles', {
        fpsLimit: 60,
        background: { color: 'transparent' },
        particles: {
            number: { 
                value: 60,
                density: { 
                    enable: true, 
                    area: 1000 
                } 
            },
            color: { 
                value: ['#10b981', '#3b82f6', '#8b5cf6'] 
            },
            opacity: { 
                value: 0.5,
                random: true
            },
            size: { 
                value: { 
                    min: 1, 
                    max: 3
                } 
            },
            shape: { 
                type: 'circle' 
            },
            links: {
                enable: true,
                distance: 150,
                color: '#3b82f6',
                opacity: 0.2,
                width: 1
            },
            move: { 
                enable: true, 
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                outModes: { 
                    default: 'out' 
                } 
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onHover: {
                    enable: false
                },
                onClick: {
                    enable: false
                },
                resize: true
            }
        },
        detectRetina: true
    }).catch(error => {
        console.error("Error loading particles:", error);
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
    sr.reveal('.mission-card', { delay: 300 });
    sr.reveal('.vision-card', { delay: 500 });

    // Collaborators section
    sr.reveal('.collaborator-card', { delay: 200, interval: 150 });

    // About section
    sr.reveal('.about-text', { delay: 200 });
    sr.reveal('.about-visual', { delay: 400 });
    sr.reveal('.stats-grid', { delay: 600, interval: 100 });
}

/*───────────────────────────────────────────────────────────────
  STATS COUNTER ANIMATION
───────────────────────────────────────────────────────────────*/
function initStatsCounter() {
    const statElements = document.querySelectorAll('.stat-preview');
    if (!statElements.length) return;

    const observer = new IntersectionObserver((entries) => {
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
    const numberElement = element.querySelector('.stat-number');
    let current = 0;
    const increment = target / 30;
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(interval);
            current = target;
        }
        numberElement.textContent = Math.floor(current);
    }, 30);
}


/*───────────────────────────────────────────────────────────────
  GAMES DATA LOADING
───────────────────────────────────────────────────────────────*/
let gamesData = [];

async function loadGamesData() {
    try {
        const response = await fetch('../data/games.json');
        if (!response.ok) throw new Error('Failed to load games data');
        gamesData = await response.json();
    } catch (error) {
        console.error('Error loading games data:', error);
        // Fallback data if JSON fails to load
        gamesData = {
            games: [
                { name: "VALORANT", logo: "assets/images/games/valorant.png", platform: "PC" },
                { name: "CODM", logo: "assets/images/games/codm.png", platform: "Mobile" },
                { name: "eFootball", logo: "assets/images/games/efootball.png", platform: "Mobile" },
                { name: "FIFA", logo: "assets/images/games/fifa.png", platform: "PC" },
                { name: "Chess", logo: "assets/images/games/chess.png", platform: "Multi-platform" },
                { name: "Ludo", logo: "assets/images/games/ludo.png", platform: "Mobile" },
                { name: "Carrom", logo: "assets/images/games/carrom.png", platform: "Mobile" }
            ]
        };
    }
}

/*───────────────────────────────────────────────────────────────
  GAMES POPUP FUNCTIONS (OPTIMIZED)
───────────────────────────────────────────────────────────────*/
async function showGamesPopup(event) {
    event.preventDefault();
    const popup = document.getElementById('games-popup');
    const gamesContainer = document.getElementById('games-container');
    
    if (!popup || !gamesContainer) return;
    
    // Ensure games data is loaded
    if (gamesData.games === undefined || gamesData.games.length === 0) {
        await loadGamesData();
    }

    // Clear previous content
    gamesContainer.innerHTML = '';
    
    // Populate games container with actual data from games.json
    gamesData.games.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.className = 'game-item group';
        gameElement.innerHTML = `
            <div class="game-item-inner">
                <img src="${game.logo}" alt="${game.name}" 
                     class="game-logo" 
                     onerror="this.src='assets/images/placeholder-game.png'">
                <h4 class="game-name">${game.name}</h4>
                <p class="game-platform">${game.platform}</p>
            </div>
        `;
        gamesContainer.appendChild(gameElement);
    });
    
    // Show popup with smooth animation
    popup.style.display = 'flex';
    popup.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        popup.style.opacity = '1';
    }, 10);
}

function closeGamesPopup() {
    const popup = document.getElementById('games-popup');
    if (!popup) return;
    
    // Add fade-out animation
    popup.style.opacity = '0';
    
    setTimeout(() => {
        popup.style.display = 'none';
        popup.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

// Initialize popup event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Close popup when clicking outside content
    document.addEventListener('click', function(e) {
        const popup = document.getElementById('games-popup');
        if (popup && !popup.classList.contains('hidden') && 
            (e.target === popup || e.target.classList.contains('modal-backdrop'))) {
            closeGamesPopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const popup = document.getElementById('games-popup');
            if (popup && !popup.classList.contains('hidden')) {
                closeGamesPopup();
            }
        }
    });
});



/*───────────────────────────────────────────────────────────────
  CONTACT MODAL FUNCTION
───────────────────────────────────────────────────────────────*/
function openContactModal(event) {
    event.preventDefault();
    // This will be handled by modal-contact.js
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }
}