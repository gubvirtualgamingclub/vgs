class ComponentLoader {
  static loadedComponents = new Set();
  static MAX_RETRIES = 3;
  static RETRY_DELAY = 500;

  static async load() {
    try {
      console.log('🔧 Loading components...');
      
      // Load navigation first with retries
      if (!this.loadedComponents.has('nav')) {
        console.log('📡 Loading navigation component...');
        await this.loadComponentWithRetry('components/nav.html', 'nav-placeholder');
        this.loadedComponents.add('nav');
        
        // Load nav script after a short delay
        setTimeout(async () => {
          try {
            await this.loadScript('js/components/nav.js');
            console.log('✅ Navigation script loaded');
            document.dispatchEvent(new CustomEvent('navigationLoaded'));
          } catch (error) {
            console.warn('⚠️ Navigation script failed to load:', error);
          }
          
        }, 200);
      }

      // Load footer with retries
      if (!this.loadedComponents.has('footer')) {
        console.log('📡 Loading footer component...');
        await this.loadComponentWithRetry('components/footer.html', 'footer-placeholder');
        this.loadedComponents.add('footer');
          
          // Load footer script after HTML is loaded
          await this.loadScript('js/components/footer.js');
          console.log('✅ Footer script loaded');
          
          // Wait a moment for footer script to initialize
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Trigger footer initialization manually
          if (typeof initFooter === 'function') {
            initFooter();
          }
      }

      console.log('✅ All components loaded successfully');
    } catch (error) {
      console.error('❌ Component loading error:', error);
      this.createFallbackUI();
    }
  }

  static async loadComponentWithRetry(url, placeholderId, retryCount = 0) {
    try {
      return await this.loadComponent(url, placeholderId);
    } catch (error) {
      if (retryCount < this.MAX_RETRIES) {
        console.warn(`⚠️ Retry ${retryCount + 1}/${this.MAX_RETRIES} for ${url}:`, error.message);
        await this.delay(this.RETRY_DELAY * (retryCount + 1));
        return this.loadComponentWithRetry(url, placeholderId, retryCount + 1);
      } else {
        console.error(`❌ Failed to load ${url} after ${this.MAX_RETRIES} retries`);
        throw error;
      }
    }
  }

  static delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async loadComponent(url, placeholderId) {
    try {
      console.log(`📥 Loading: ${url} → ${placeholderId}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const html = await response.text();
      const placeholder = document.getElementById(placeholderId);
      
      if (!placeholder) {
        throw new Error(`Placeholder "${placeholderId}" not found`);
      }
      
      placeholder.innerHTML = html;
      console.log(`✅ Successfully loaded ${url} (${html.length} chars)`);
      
    } catch (error) {
      console.error(`❌ Failed to load ${url}:`, error);
      throw error;
    }
  }

  static loadScript(src) {
    return new Promise((resolve, reject) => {
      console.log(`📜 Loading script: ${src}`);
      
      // Check if script already exists
      const existingScript = document.querySelector(`script[src*="${src.split('/').pop()}"]`);
      if (existingScript) {
        console.log(`⏭️ Script ${src} already loaded`);
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      
      script.onload = () => {
        console.log(`✅ Script loaded: ${src}`);
        resolve();
      };
      
      script.onerror = (error) => {
        console.error(`❌ Script failed: ${src}`, error);
        reject(new Error(`Failed to load script: ${src}`));
      };
      
      document.head.appendChild(script);
    });
  }

  static createFallbackUI() {
    console.log('🔄 Creating fallback UI...');
    
    // Force fallback creation regardless of current content
    this.createFallbackNav(true);
    this.createFallbackFooter(true);
    
    console.log('✅ Fallback UI created');
  }

  static createFallbackNav(force = false) {
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder && (force || !navPlaceholder.innerHTML.trim())) {
      console.log('🔄 Creating fallback navigation...');
      navPlaceholder.innerHTML = `
        <nav class="gaming-navbar">
          <div class="nav-container">
            <!-- Logo/Brand -->
            <a href="index.html" class="nav-brand">
              <img src="assets/images/logos/VGSwide.png" alt="GUCC VGS Logo" class="nav-logo">
              <div class="logo-glow"></div>
            </a>
            
            <!-- Desktop Navigation -->
            <div class="nav-desktop">
              <a href="index.html" class="nav-link">
                <span class="nav-text">
                  <i class="fas fa-home nav-icon"></i>
                  Home
                </span>
                <span class="nav-underline"></span>
              </a>
              <a href="update.html" class="nav-link">
                <span class="nav-text">
                  <i class="fas fa-newspaper nav-icon"></i>
                  Updates
                </span>
                <span class="nav-underline"></span>
              </a>
              <a href="activities.html" class="nav-link">
                <span class="nav-text">
                  <i class="fas fa-calendar-alt nav-icon"></i>
                  Activities
                </span>
                <span class="nav-underline"></span>
              </a>
              <a href="tournament.html" class="nav-link">
                <span class="nav-text">
                  <i class="fas fa-trophy nav-icon"></i>
                  Tournament
                </span>
                <span class="nav-underline"></span>
              </a>
              <a href="executive.html" class="nav-link">
                <span class="nav-text">
                  <i class="fas fa-users nav-icon"></i>
                  Committee
                </span>
                <span class="nav-underline"></span>
              </a>
              <a href="games.html" class="nav-link">
                <span class="nav-text">
                  <i class="fas fa-gamepad nav-icon"></i>
                  Games
                </span>
                <span class="nav-underline"></span>
              </a>
              <a href="collaboration.html" class="nav-link">
                <span class="nav-text">
                  <i class="fas fa-handshake nav-icon"></i>
                  Collaborations
                </span>
                <span class="nav-underline"></span>
              </a>
            </div>

            <!-- Mobile Menu Button -->
            <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle menu">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </button>
          </div>

          <!-- Mobile Navigation -->
          <div class="nav-mobile" id="mobileMenu">
            <div class="mobile-nav-content">
              <a href="index.html" class="mobile-nav-link">
                <i class="fas fa-home"></i>
                <span>Home</span>
              </a>
              <a href="update.html" class="mobile-nav-link">
                <i class="fas fa-newspaper"></i>
                <span>Updates</span>
              </a>
              <a href="activities.html" class="mobile-nav-link">
                <i class="fas fa-calendar-alt"></i>
                <span>Activities</span>
              </a>
              <a href="tournament.html" class="mobile-nav-link">
                <i class="fas fa-trophy"></i>
                <span>Tournament</span>
              </a>
              <a href="executive.html" class="mobile-nav-link">
                <i class="fas fa-users"></i>
                <span>Committee</span>
              </a>
              <a href="games.html" class="mobile-nav-link">
                <i class="fas fa-gamepad"></i>
                <span>Games</span>
              </a>
              <a href="collaboration.html" class="mobile-nav-link">
                <i class="fas fa-handshake"></i>
                <span>Collaborations</span>
              </a>
            </div>
          </div>

          <!-- Navigation Overlay -->
          <div class="nav-overlay" id="navOverlay"></div>
        </nav>

        <!-- Simple Mobile Navigation Script for Fallback -->
        <script>
        (function() {
          'use strict';
          
          console.log('🚀 Fallback mobile navigation script loaded');
          
          function initFallbackMobileMenu() {
            console.log('🔧 Initializing fallback mobile menu...');
            
            const mobileBtn = document.getElementById('mobileMenuBtn');
            const mobileMenu = document.getElementById('mobileMenu');
            const overlay = document.getElementById('navOverlay');
            
            console.log('📱 Fallback mobile menu elements:', {
              button: !!mobileBtn,
              menu: !!mobileMenu,
              overlay: !!overlay
            });
            
            if (!mobileBtn || !mobileMenu || !overlay) {
              console.warn('❌ Fallback mobile menu elements not found');
              return;
            }
            
            let isOpen = false;
            
            function toggleMenu() {
              isOpen = !isOpen;
              console.log('🔄 Fallback toggling menu, isOpen:', isOpen);
              
              if (isOpen) {
                mobileBtn.classList.add('active');
                mobileMenu.classList.add('open');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('✅ Fallback menu opened');
              } else {
                mobileBtn.classList.remove('active');
                mobileMenu.classList.remove('open');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                console.log('✅ Fallback menu closed');
              }
            }
            
            function closeMenu() {
              if (isOpen) {
                isOpen = false;
                mobileBtn.classList.remove('active');
                mobileMenu.classList.remove('open');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                console.log('✅ Fallback menu force closed');
              }
            }
            
            mobileBtn.addEventListener('click', function(e) {
              console.log('📱 Fallback mobile button clicked');
              e.preventDefault();
              e.stopPropagation();
              toggleMenu();
            });
            
            overlay.addEventListener('click', function() {
              console.log('🎯 Fallback overlay clicked');
              closeMenu();
            });
            
            const navLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
            console.log('🔗 Fallback found nav links:', navLinks.length);
            navLinks.forEach(link => {
              link.addEventListener('click', function() {
                console.log('🔗 Fallback nav link clicked');
                closeMenu();
              });
            });
            
            document.addEventListener('keydown', function(e) {
              if (e.key === 'Escape') {
                console.log('⌨️ Fallback escape key pressed');
                closeMenu();
              }
            });
            
            window.addEventListener('resize', function() {
              if (window.innerWidth > 768 && isOpen) {
                console.log('📱 Fallback window resized to desktop, closing menu');
                closeMenu();
              }
            });
            
            console.log('✅ Fallback mobile menu initialized successfully');
          }
          
          setTimeout(initFallbackMobileMenu, 100);
        })();
        </script>
      `;

      // Navigation handled by inline scripts in nav.html
      // No additional setup needed
    }
  }

  static createFallbackFooter(force = false) {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder && (force || !footerPlaceholder.innerHTML.trim())) {
      console.log('🔄 Creating fallback footer...');
      footerPlaceholder.innerHTML = `
        <footer class="site-footer bg-gradient-to-t from-gray-900 via-gray-800 to-gray-900 border-t border-green-500/20 relative overflow-hidden">
          <!-- Animated Background Elements -->
          <div class="footer-wave">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="fill-green-500/30"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="fill-green-500/20"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="fill-green-500/10"></path>
            </svg>
          </div>
          
          <div class="footer-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            <!-- University Branding Section -->
            <div class="university-branding mb-12 p-6 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl border border-green-500/20 backdrop-blur-sm">
              <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
                <!-- University Info -->
                <div class="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                  <div class="university-logo-container relative">
                    <img src="assets/images/logos/GUB-New.png" alt="Green University of Bangladesh" 
                         class="university-logo h-16 w-16 sm:h-20 sm:w-20 object-contain filter drop-shadow-lg">
                  </div>
                  <div class="university-info">
                    <h3 class="text-lg sm:text-xl font-bold text-white font-orbitron mb-1">Green University of Bangladesh</h3>
                    <p class="text-green-400 text-sm font-medium">Purbachal American City, Kanchan, Rupganj, Narayanganj-1461</p>
                    <p class="text-gray-400 text-xs mt-1">Proudly hosting GUCC Virtual Gaming Society</p>
                  </div>
                </div>
                
                <!-- VGS Logo -->
                <div class="vgs-branding flex items-center gap-4">
                  <div class="vgs-logo-container relative">
                    <img src="assets/images/logos/VGSwide.png" alt="GUCC VGS Logo" class="vgs-logo h-12 sm:h-14 object-contain filter drop-shadow-lg">
                  </div>
                  <div class="vgs-info text-center sm:text-right">
                    <h4 class="text-lg font-bold text-white font-rajdhani">GUCC VGS</h4>
                    <p class="text-green-400 text-sm">Virtual Gaming Society</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main Footer Content -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <!-- About Section -->
              <div class="footer-section">
                <h3 class="footer-title mb-4 text-white font-rajdhani font-bold text-lg">About GUCC VGS</h3>
                <p class="footer-text text-gray-300 text-sm leading-relaxed mb-4">
                  Green University Computer Club's official Virtual Gaming Society - where passion meets competition in the digital arena.
                </p>
              </div>

              <!-- Quick Links -->
              <div class="footer-section">
                <h3 class="footer-title mb-4 text-white font-rajdhani font-bold text-lg">Quick Links</h3>
                <ul class="footer-links space-y-2">
                  <li><a href="index.html" class="footer-link text-gray-300 hover:text-green-400 transition-colors text-sm">Home</a></li>
                  <li><a href="update.html" class="footer-link text-gray-300 hover:text-green-400 transition-colors text-sm">Updates</a></li>
                  <li><a href="activities.html" class="footer-link text-gray-300 hover:text-green-400 transition-colors text-sm">Activities</a></li>
                  <li><a href="tournament.html" class="footer-link text-gray-300 hover:text-green-400 transition-colors text-sm">Tournament</a></li>
                </ul>
              </div>

              <!-- Community -->
              <div class="footer-section">
                <h3 class="footer-title mb-4 text-white font-rajdhani font-bold text-lg">Community</h3>
                <ul class="footer-links space-y-2">
                  <li><a href="executive.html" class="footer-link text-gray-300 hover:text-green-400 transition-colors text-sm">Executive Committee</a></li>
                  <li><a href="collaboration.html" class="footer-link text-gray-300 hover:text-green-400 transition-colors text-sm">Collaborations</a></li>
                </ul>
              </div>

              <!-- Contact -->
              <div class="footer-section">
                <h3 class="footer-title mb-4 text-white font-rajdhani font-bold text-lg">Connect</h3>
                <div class="social-links flex gap-3">
                  <a href="#" class="social-link w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-green-600 transition-all">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" class="social-link w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-green-600 transition-all">
                    <i class="fab fa-discord"></i>
                  </a>
                </div>
              </div>
            </div>

            <!-- Footer Bottom -->
            <div class="footer-bottom border-t border-gray-700 pt-6 text-center">
              <p class="text-gray-400 text-sm">
                © <span id="current-year">${new Date().getFullYear()}</span> GUCC Virtual Gaming Society. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      `;
    }
  }
}

// Initialize with multiple fallbacks
function initializeLoader() {
  console.log('🚀 Initializing component loader...');
  console.log('🌐 User Agent:', navigator.userAgent);
  console.log('📍 Current URL:', window.location.href);
  
  // Check if placeholders exist
  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  
  console.log('🔍 Nav placeholder found:', !!navPlaceholder);
  console.log('🔍 Footer placeholder found:', !!footerPlaceholder);
  
  if (!navPlaceholder) {
    console.error('❌ nav-placeholder not found in DOM');
  }
  if (!footerPlaceholder) {
    console.error('❌ footer-placeholder not found in DOM');
  }
  
  if (!navPlaceholder || !footerPlaceholder) {
    console.error('❌ Missing placeholders, using fallback immediately');
    ComponentLoader.createFallbackUI();
    return;
  }
  
  // IMMEDIATE FALLBACK for reliable display
  console.log('🔄 Using immediate fallback to ensure components show');
  ComponentLoader.createFallbackUI();
  
  // Add visual indicator that loader is working
  document.body.style.setProperty('--loader-active', 'true');
  
  // Still try to load the real components in the background
  ComponentLoader.load().then(() => {
    console.log('✅ Real components loaded successfully (replacing fallback)');
    document.body.style.setProperty('--loader-active', 'false');
  }).catch(error => {
    console.error('❌ Real component loading failed, keeping fallback:', error);
    document.body.style.setProperty('--loader-active', 'false');
  });
}

// Multiple initialization strategies
if (document.readyState === 'loading') {
  console.log('📅 DOM loading, waiting for DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', initializeLoader);
} else {
  console.log('📅 DOM already loaded, initializing immediately...');
  initializeLoader();
}
