# 🎮 GUCC Virtual Gaming Society (VGS) Website

<div align="center">

![VGS Logo](assets/images/logos/VGSwide.png)

[![Status](https://img.shields.io/badge/Status-Active%20Development-brightgreen?style=for-the-badge&logo=rocket)](https://github.com/gubvirtualgamingclub/vgs)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**🌟 Modern • 📱 Responsive • 🚀 Fast • ♿ Accessible**

*The official website for Green University Computer Club's Virtual Gaming Society - Where passion meets competition in the digital arena.*

[🌐 Live Demo](#) • [📖 Documentation](#project-structure) • [🐛 Report Bug](https://github.com/gubvirtualgamingclub/vgs/issues) • [💡 Request Feature](https://github.com/gubvirtualgamingclub/vgs/issues)

</div>

---

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [📁 Project Structure](#-project-structure)
- [🔧 Technical Stack](#-technical-stack)
- [📄 Page Documentation](#-page-documentation)
- [🧩 Component System](#-component-system)
- [🎨 Styling System](#-styling-system)
- [📊 Data Management](#-data-management)
- [🚀 Getting Started](#-getting-started)
- [🛠️ Development Guide](#️-development-guide)
- [📱 Responsive Design](#-responsive-design)
- [♿ Accessibility](#-accessibility)
- [🔄 Performance](#-performance)
- [🤝 Contributing](#-contributing)

---

## 🎯 Project Overview

The **GUCC Virtual Gaming Society Website** is a modern, responsive web application built for Green University of Bangladesh's official gaming society. It serves as the central hub for esports activities, tournaments, member management, and community engagement.

### 🎪 Key Highlights

- **🎮 Gaming-Focused Design**: Modern gaming aesthetics with neon accents and particle effects
- **📱 Mobile-First Approach**: Optimized for all device sizes and orientations
- **⚡ Performance Optimized**: Fast loading with optimized assets and lazy loading
- **🔧 Component Architecture**: Modular, reusable components for maintainability
- **🎨 Dynamic Theming**: Gaming-inspired color schemes and animations
- **📊 Data-Driven**: JSON-based content management for easy updates

---

## ✨ Features

### 🌟 Core Features
- **🏠 Dynamic Homepage** with interactive hero section and live statistics
- **📰 Updates System** with categorized announcements and news
- **🎯 Activities Hub** with event management and registration
- **🏆 Tournament Platform** with bracket management and results
- **👥 Executive Panel** with member profiles and contact information
- **🎮 Games Showcase** with supported game listings and details
- **🤝 Collaboration Center** with partner and sponsor management

### 🔥 Advanced Features
- **✨ Particle Animations** powered by tsParticles
- **🎭 Smooth Transitions** with CSS animations and GSAP
- **📱 Mobile Menu** with gesture support and accessibility
- **🔍 Smart Loading** with skeleton screens and error handling
- **🎨 Interactive Elements** with hover effects and micro-interactions
- **📊 Live Statistics** with animated counters and data visualization

---

## 🏗️ Architecture

### 🧠 Design Philosophy

The project follows a **Component-Based Architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│  (HTML Pages + CSS Styling)           │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│           Component Layer               │
│  (Reusable UI Components)              │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│           Business Logic Layer          │
│  (JavaScript Controllers)              │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│           Data Layer                    │
│  (JSON Data Files)                     │
└─────────────────────────────────────────┘
```

### 🔄 Component Loading System

The website uses a sophisticated **Component Loader** system:

1. **`js/components/loader.js`** - Central component management
2. **Dynamic Loading** - Components loaded asynchronously
3. **Fallback System** - Backup components for reliability
4. **Error Handling** - Graceful degradation on failures

---

## 📁 Project Structure

```
vgs-website/
├── 📄 Root Pages
│   ├── index.html              # 🏠 Homepage
│   ├── update.html             # 📰 Updates & News
│   ├── activities.html         # 🎯 Events & Activities
│   ├── tournament.html         # 🏆 Tournament Hub
│   ├── executive.html          # 👥 Executive Committee
│   ├── games.html             # 🎮 Supported Games
│   └── collaboration.html      # 🤝 Partners & Sponsors
│
├── 🧩 Components
│   ├── components/
│   │   ├── nav.html           # 🧭 Navigation Component
│   │   └── footer.html        # 🦶 Footer Component
│   │
│   └── js/components/
│       ├── loader.js          # 🔄 Component Loader System
│       ├── nav.js            # 🧭 Navigation Controller
│       └── footer.js         # 🦶 Footer Controller
│
├── 🎨 Styling
│   └── css/
│       ├── index.css          # 🏠 Homepage Styles
│       ├── nav.css           # 🧭 Navigation Styles
│       ├── footer.css        # 🦶 Footer Styles
│       ├── loader.css        # ⏳ Loading States
│       ├── activities.css    # 🎯 Activities Styles
│       ├── executive.css     # 👥 Executive Styles
│       ├── games-simple.css  # 🎮 Games Styles
│       ├── tournament.css    # 🏆 Tournament Styles
│       ├── collaboration.css # 🤝 Collaboration Styles
│       └── update.css        # 📰 Updates Styles
│
├── 🧠 Logic
│   └── js/
│       ├── index.js          # 🏠 Homepage Logic
│       ├── activities.js     # 🎯 Activities Logic
│       ├── executive.js      # 👥 Executive Logic
│       ├── games.js          # 🎮 Games Logic
│       ├── tournament.js     # 🏆 Tournament Logic
│       ├── collaboration.js  # 🤝 Collaboration Logic
│       ├── update.js         # 📰 Updates Logic
│       └── router.js         # 🛣️ Client-side Routing
│
├── 📊 Data
│   └── data/
│       ├── site-data.json    # 🌐 Site Configuration
│       ├── updates.json      # 📰 News & Announcements
│       ├── activities.json   # 🎯 Events Data
│       ├── executives.json   # 👥 Committee Members
│       ├── games.json        # 🎮 Supported Games
│       ├── tournament.json   # 🏆 Tournament Data
│       ├── collaborations.json # 🤝 Partners Data
│       └── contributors.json # 👨‍💻 Contributors Data
│
└── 🖼️ Assets
    └── assets/
        ├── images/
        │   ├── logos/        # 🎯 Brand Assets
        │   ├── banners/      # 🖼️ Hero Banners
        │   ├── members/      # 👤 Member Photos
        │   ├── games/        # 🎮 Game Icons
        │   ├── events/       # 🎪 Event Images
        │   ├── collaborators/ # 🤝 Partner Logos
        │   ├── guests/       # 👤 Guest Photos
        │   └── sponsors/     # 💰 Sponsor Logos
        │
        └── rulebooks/        # 📋 Tournament Rules
```

---

## 🔧 Technical Stack

### 🎨 Frontend Technologies

| Technology | Version | Purpose | Documentation |
|------------|---------|---------|---------------|
| **HTML5** | Latest | Structure & Semantics | [MDN HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) |
| **CSS3** | Latest | Styling & Animations | [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) |
| **JavaScript** | ES6+ | Interactive Logic | [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |
| **TailwindCSS** | 3.x | Utility-First Styling | [Tailwind Docs](https://tailwindcss.com/docs) |

### 📚 Libraries & Frameworks

| Library | Purpose | Implementation |
|---------|---------|----------------|
| **tsParticles** | Particle Animations | Homepage background effects |
| **GSAP** | Advanced Animations | Scroll-triggered animations |
| **ScrollReveal** | Scroll Animations | Element reveal animations |
| **Font Awesome** | Icon System | UI icons throughout the site |
| **Google Fonts** | Typography | Orbitron & Rajdhani fonts |

### 🛠️ Development Tools

| Tool | Purpose | Configuration |
|------|---------|---------------|
| **Live Server** | Development Server | VS Code extension |
| **Git** | Version Control | GitHub integration |
| **Prettier** | Code Formatting | Auto-formatting |
| **ESLint** | Code Linting | JavaScript standards |

---

## 📄 Page Documentation

### 🏠 Homepage (`index.html`)

**Purpose**: Landing page showcasing VGS with hero section, statistics, and featured content.

**Key Features**:
- ✨ Interactive particle background with tsParticles
- 📊 Live statistics with animated counters
- 🎯 Featured games carousel
- 🤝 Collaborators showcase
- 📰 Latest updates preview

**Dependencies**:
- `css/index.css` - Comprehensive styling
- `js/index.js` - Interactive functionality
- `data/site-data.json` - Site statistics and info

**Code Structure**:
```javascript
// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    initParticlesWithRetry();    // Particle system
    initHeroLighting();          // Hero effects  
    initScrollReveal();          // Scroll animations
    loadSiteStats();             // Statistics loading
    loadCollaborators();         // Partners showcase
    loadGamesData();             // Featured games
});
```

### 📰 Updates Page (`update.html`)

**Purpose**: News, announcements, and social media integration hub.

**Key Features**:
- 📋 Dynamic notice cards from JSON data
- 🎭 Smooth card animations
- 📱 Responsive grid layout
- ⚡ Loading states and error handling
- 📊 Categorized content (events, notices, registrations)

**Dependencies**:
- `css/update.css` - Card styling and animations
- `js/update.js` - Content loading and display
- `data/updates.json` - News and announcements data

**Code Structure**:
```javascript
// Content loading system
async function forceInitialize() {
    const response = await fetch('data/updates.json');
    const data = await response.json();
    
    data.updates.forEach(update => {
        const card = createCard(update);
        grid.appendChild(card);
    });
}
```

### 🎯 Activities Page (`activities.html`)

**Purpose**: Event management, registration, and activity showcase.

**Key Features**:
- 📅 Event calendar integration
- 🎪 Event detail modals
- 📝 Registration forms
- 🖼️ Image galleries
- 🔍 Search and filter functionality

**Dependencies**:
- `css/activities.css` - Event styling
- `js/activities.js` - Event management
- `data/activities.json` - Event data

### 🏆 Tournament Page (`tournament.html`)

**Purpose**: Tournament brackets, results, and competitive gaming hub.

**Key Features**:
- 🏅 Tournament brackets
- 📊 Results tracking
- 🎮 Game-specific tournaments
- 📈 Player statistics
- 📋 Rule documentation

**Dependencies**:
- `css/tournament.css` - Tournament styling
- `js/tournament.js` - Tournament logic
- `data/tournament.json` - Tournament data

### 👥 Executive Page (`executive.html`)

**Purpose**: Committee member profiles and organizational structure.

**Key Features**:
- 👤 Member profile cards
- 🏢 Organizational hierarchy
- 📞 Contact information
- 🎭 Interactive member details
- 📱 Responsive member grid

**Dependencies**:
- `css/executive.css` - Member card styling
- `js/executive.js` - Member data handling
- `data/executives.json` - Committee member data

**Code Structure**:
```javascript
// Member data loading
async function loadExecutiveData() {
    const response = await fetch('data/executives_fixed.json');
    const data = await response.json();
    
    displayCommittee(data.executives);
}
```

### 🎮 Games Page (`games.html`)

**Purpose**: Showcase of supported games and gaming categories.

**Key Features**:
- 🎯 Game category filters
- 🖼️ Game galleries
- 📝 Game descriptions
- 🔗 External game links
- 📱 Mobile-optimized grid

**Dependencies**:
- `css/games-simple.css` - Game card styling
- `js/games.js` - Game data management
- `data/games.json` - Games database

### 🤝 Collaboration Page (`collaboration.html`)

**Purpose**: Partners, sponsors, and collaboration showcase.

**Key Features**:
- 🏢 Partner profiles
- 💰 Sponsor showcases
- 📄 Collaboration documents
- 🔗 External partner links
- 📊 Partnership statistics

**Dependencies**:
- `css/collaboration.css` - Partner styling
- `js/collaboration.js` - Partnership logic
- `data/collaborations.json` - Partnership data

---

## 🧩 Component System

### 🔄 Component Loader (`js/components/loader.js`)

**Purpose**: Central component management system for dynamic loading.

**Key Features**:
- 🔄 Asynchronous component loading
- 🛡️ Error handling and fallbacks
- ⚡ Performance optimization
- 🔧 Dependency management

**Methods**:
```javascript
class ComponentLoader {
    static async load()                    // Main loading orchestrator
    static async loadComponent(path)       // Individual component loader
    static async loadScript(path)          // Script loading utility
    static createFallbackNav(force)       // Backup navigation
    static createFallbackFooter(force)    // Backup footer
}
```

**Implementation**:
```javascript
// Automatic initialization
document.addEventListener('DOMContentLoaded', () => {
    ComponentLoader.load()
        .then(() => console.log('✅ All components loaded'))
        .catch(err => console.error('❌ Component loading failed:', err));
});
```

### 🧭 Navigation System (`components/nav.html` + `js/components/nav.js`)

**Purpose**: Responsive navigation with mobile menu and accessibility features.

**Key Features**:
- 📱 Mobile-responsive hamburger menu
- ⌨️ Keyboard navigation support
- 🎨 Smooth animations and transitions
- 🔍 Active page highlighting
- ♿ ARIA accessibility compliance

**HTML Structure**:
```html
<nav class="gaming-navbar">
    <div class="nav-container">
        <a href="index.html" class="nav-brand">
            <img src="assets/images/logos/VGSwide.png" alt="GUCC VGS Logo">
        </a>
        
        <div class="nav-desktop">
            <!-- Desktop navigation links -->
        </div>
        
        <button class="mobile-menu-btn" id="mobile-menu-btn">
            <!-- Hamburger icon -->
        </button>
    </div>
    
    <div class="nav-mobile" id="mobile-menu">
        <!-- Mobile navigation content -->
    </div>
</nav>
```

**JavaScript Controller**:
```javascript
class GamingNavigation {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setActiveLink();
        this.preloadMobileMenu();
    }
    
    toggleMobileMenu(event) {
        // Mobile menu toggle logic
    }
    
    handleScroll() {
        // Scroll-based navbar behavior
    }
}
```

### 🦶 Footer System (`components/footer.html` + `js/components/footer.js`)

**Purpose**: Site footer with university branding, links, and contributor showcase.

**Key Features**:
- 🏫 University branding integration
- 🔗 Quick navigation links
- 👨‍💻 Dynamic contributor display
- 📱 Responsive social media links
- 🎨 Animated background elements

**HTML Structure**:
```html
<footer class="site-footer">
    <div class="footer-wave">
        <!-- Animated SVG waves -->
    </div>
    
    <div class="footer-content">
        <div class="university-branding">
            <!-- University information -->
        </div>
        
        <div class="footer-grid">
            <!-- Footer columns -->
        </div>
        
        <div class="contributors-section">
            <div id="all-contributors-grid">
                <!-- Dynamic contributor cards -->
            </div>
        </div>
    </div>
</footer>
```

**JavaScript Controller**:
```javascript
// Footer initialization
async function initFooter() {
    const response = await fetch('data/contributors.json');
    const data = await response.json();
    
    contributorsData = data.contributors;
    renderContributors();
}

function renderContributors() {
    // Render contributor cards dynamically
}
```

---

## 🎨 Styling System

### 🌈 Color Palette

```css
:root {
    /* Primary Gaming Colors */
    --gaming-primary: #10b981;      /* Green accent */
    --gaming-secondary: #0f172a;    /* Dark background */
    --gaming-accent: #3b82f6;       /* Blue highlights */
    --gaming-dark: #111827;         /* Deep dark */
    --gaming-light: #e2e8f0;        /* Light text */
    
    /* Status Colors */
    --success: #22c55e;
    --warning: #f59e0b;
    --error: #ef4444;
    --info: #3b82f6;
}
```

### 🎭 Animation System

**CSS Animations**:
```css
/* Floating elements */
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

/* Glow effects */
@keyframes glow {
    from { box-shadow: 0 0 20px var(--gaming-primary); }
    to { box-shadow: 0 0 30px var(--gaming-primary); }
}

/* Fade in animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

**JavaScript Animations**:
```javascript
// GSAP animations
gsap.registerPlugin(ScrollTrigger);

gsap.from(".hero-title", {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "power3.out"
});

// Scroll reveal
ScrollReveal().reveal('.reveal', {
    duration: 1000,
    origin: 'bottom',
    distance: '50px'
});
```

### 📱 Responsive Design

**Breakpoint System**:
```css
/* Mobile First Approach */
/* Base styles: 320px+ */

/* Small Mobile */
@media (min-width: 480px) { /* ... */ }

/* Tablet */
@media (min-width: 768px) { /* ... */ }

/* Desktop */
@media (min-width: 1024px) { /* ... */ }

/* Large Desktop */
@media (min-width: 1280px) { /* ... */ }

/* Ultra Wide */
@media (min-width: 1536px) { /* ... */ }
```

**Responsive Grid System**:
```css
.responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}

/* Card responsiveness */
.card {
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}

@media (max-width: 768px) {
    .card {
        margin-bottom: 1rem;
    }
}
```

---

## 📊 Data Management

### 📁 JSON Data Structure

#### `data/site-data.json`
```json
{
    "site": {
        "title": "GUCC Virtual Gaming Society",
        "description": "Green University's official gaming club",
        "year": "2025"
    },
    "contact": {
        "email": "faysaltomal02@gmail.com",
        "facebook": "https://www.facebook.com/gucc.vgs"
    },
    "stats": {
        "activeMembers": 16,
        "tournaments": 2,
        "gamesSupported": 8,
        "industryPartners": 6
    }
}
```

#### `data/updates.json`
```json
{
    "updates": [
        {
            "id": 1,
            "type": "event",
            "title": "Summer Tournament 2024",
            "date": "2024-07-15",
            "image": "assets/images/logos/vgs.png",
            "description": "Join our biggest tournament of the year!",
            "registration_link": "https://example.com/register",
            "status": "upcoming",
            "important": true
        }
    ]
}
```

#### `data/executives.json`
```json
{
    "executives": [
        {
            "name": "Member Name",
            "position": "President",
            "image": "assets/images/members/member.png",
            "bio": "Member description",
            "contact": {
                "email": "member@example.com",
                "facebook": "https://facebook.com/member"
            },
            "year": "2024"
        }
    ]
}
```

### 🔄 Data Loading Patterns

**Async Data Loading**:
```javascript
async function loadData(endpoint) {
    try {
        const response = await fetch(`data/${endpoint}.json`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error loading ${endpoint}:`, error);
        return null;
    }
}
```

**Error Handling**:
```javascript
function handleDataError(error, context) {
    console.error(`${context} Error:`, error);
    
    // Show user-friendly error
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <p>Failed to load ${context}. Please try again later.</p>
    `;
    
    return errorElement;
}
```

**Loading States**:
```javascript
function showLoadingState(container) {
    container.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading content...</p>
        </div>
    `;
}

function hideLoadingState(container) {
    const loader = container.querySelector('.loading-state');
    if (loader) loader.remove();
}
```

---

## �️ **Page Management Instructions**

### **🎯 Content Management Overview**

The VGS website uses a **JSON-based content management system** that allows easy updates without touching the codebase. Each page pulls data from specific JSON files in the `data/` directory.

<div align="center">

| 📄 Page | 📊 Data Source | 🎯 Purpose | ⚡ Update Frequency |
|---------|---------------|------------|-------------------|
| **🏠 Homepage** | `site-data.json` | Statistics & Config | Weekly |
| **📰 Updates** | `updates.json` | News & Announcements | Daily |
| **🎯 Activities** | `activities.json` | Events & Registration | Weekly |
| **🏆 Tournament** | `tournament.json` | Game Registration | Event-based |
| **👥 Executive** | `executives.json` | Team Members | Semester |
| **🎮 Games** | `games.json` | Supported Games | Monthly |
| **🤝 Collaboration** | `collaborations.json` | Partners & Sponsors | Quarterly |

</div>

### 📰 **Updates Page Management**

**📍 File Location**: `data/updates.json`

**🎯 How to Add New Update**:

1. **Open** `data/updates.json`
2. **Add new entry** to the `updates` array:

```json
{
  "isActive": true,
  "updates": [
    {
      "id": 5,                          // ⚡ Increment from last ID
      "type": "event",                  // 🎭 event|notice|registration|announcement
      "title": "New Tournament Announcement", // 📝 Update title
      "date": "2025-07-20",            // 📅 Format: YYYY-MM-DD
      "description": "Join our exciting new tournament with amazing prizes!", // 📄 Description
      "isActive": true,                 // 🔄 Show/hide this update
      "important": true,                // ⭐ Highlight as important
      "registration_link": "https://forms.google.com/register", // 🔗 Optional
      "form_link": "https://example.com/form" // 🔗 Optional
    }
  ]
}
```

**🎛️ Control Options**:
- **Global Control**: Set `"isActive": false` to hide ALL updates
- **Individual Control**: Set update's `"isActive": false` to hide specific update
- **Priority**: Set `"important": true` for highlighted updates

### 🎯 **Activities Page Management**

**📍 File Location**: `data/activities.json`

**🎯 How to Add New Activity**:

1. **Choose Category**: `recent` (upcoming) or `past` (completed)
2. **Add new entry**:

```json
{
  "recent": [
    {
      "id": 6,                          // ⚡ Unique identifier
      "title": "Gaming Workshop 2025",  // 📝 Event title
      "date": "2025-08-15",            // 📅 Event date
      "time": "2:00 PM - 5:00 PM",     // ⏰ Event time
      "location": "Computer Lab 3",     // 📍 Venue
      "image": "assets/images/events/workshop2025.jpg", // 🖼️ Event image
      "description": "Learn advanced gaming techniques", // 📄 Description
      "type": "workshop",               // 🏷️ Event type
      "status": "registration_open",    // 📊 Status
      "registration_link": "https://example.com/register", // 🔗 Registration
      "prizes": [                       // 🏆 Prize information
        "1st Place: Gaming Setup",
        "2nd Place: Gaming Chair",
        "3rd Place: Gaming Headset"
      ],
      "contact": {                      // 📞 Contact details
        "name": "Event Coordinator",
        "email": "coordinator@example.com",
        "phone": "+1234567890"
      },
      "rules": "Standard tournament rules apply" // 📋 Rules
    }
  ],
  "past": [ /* Previous events */ ]
}
```

**📊 Status Options**: `registration_open`, `registration_closed`, `ongoing`, `completed`
**🏷️ Event Types**: `tournament`, `workshop`, `meetup`, `competition`

### 🏆 **Tournament Page Management**

**📍 File Location**: `data/tournament.json`

**🎯 How to Add New Tournament**:

```json
{
  "tournaments": [
    {
      "gameId": "valorant",            // 🎮 Game identifier (must match games.json)
      "status": "open",                // 📊 open|closed|upcoming|completed
      "participants": 45,              // 👥 Current participants
      "maxParticipants": 64,           // 🎯 Maximum allowed
      "type": "virtual-pc",            // 🖥️ casual|virtual-pc|virtual-mobile
      "registrationDeadline": "2025-08-01", // ⏰ Registration deadline
      "startDate": "2025-08-05",       // 📅 Tournament start
      "prizePool": "50,000 BDT",       // 💰 Total prizes
      "entryFee": "500 BDT",          // 💳 Entry fee
      "format": "Single Elimination",  // 🏆 Tournament format
      "rules": "assets/rulebooks/valorant-rules.txt" // 📋 Rules file
    }
  ]
}
```

**🎮 Supported Game IDs**: Check `data/games.json` for available games
**📊 Status Flow**: `upcoming` → `open` → `closed` → `completed`

### 👥 **Executive Page Management**

**📍 File Location**: `data/executives.json`

**🎯 How to Add New Member**:

```json
{
  "executives": [
    {
      "name": "John Doe",              // 👤 Full name
      "position": "President",         // 💼 Official position
      "image": "assets/images/members/john-doe.png", // 📸 Profile photo
      "bio": "Passionate gamer and leader with 5+ years experience", // 📝 Biography
      "contact": {                     // 📞 Contact information
        "email": "john@example.com",
        "facebook": "https://facebook.com/johndoe",
        "phone": "+1234567890"         // 📱 Optional
      },
      "year": "2025",                  // 📅 Service year
      "department": "CSE",             // 🏫 Academic department
      "skills": ["Leadership", "Strategy", "Tournament Management"], // 🎯 Skills
      "achievements": [                // 🏆 Achievements
        "Led 10+ successful tournaments",
        "Increased membership by 200%"
      ]
    }
  ]
}
```

**💼 Position Hierarchy**: `President`, `Vice President`, `Secretary`, `Treasurer`, `Event Coordinator`, `Technical Lead`, `Member`

### 🎮 **Games Page Management**

**📍 File Location**: `data/games.json`

**🎯 How to Add New Game**:

```json
{
  "games": [
    {
      "id": "newgame",                 // 🆔 Unique identifier
      "name": "New Game Title",        // 🎯 Game name
      "category": "pc",                // 🖥️ pc|mobile|casual
      "image": "assets/images/games/newgame.png", // 🖼️ Game thumbnail
      "description": "Exciting new game with amazing features", // 📄 Description
      "popularity": "high",            // 📊 high|medium|low
      "tournaments": 5,                // 🏆 Number of tournaments held
      "players": "5v5",               // 👥 Team format
      "platform": ["PC", "PlayStation", "Xbox"], // 🎮 Supported platforms
      "genre": "FPS",                  // 🏷️ Game genre
      "developer": "Game Studio",      // 🏢 Developer name
      "releaseYear": 2023,            // 📅 Release year
      "esportsReady": true,           // 🏆 Competitive gaming ready
      "website": "https://game-website.com" // 🔗 Official website
    }
  ]
}
```

**🏷️ Categories**: `pc`, `mobile`, `casual`
**🎮 Genres**: `FPS`, `MOBA`, `Battle Royale`, `Strategy`, `Fighting`, `Racing`

### 🤝 **Collaboration Page Management**

**📍 File Location**: `data/collaborations.json`

**🎯 How to Add New Partner**:

```json
{
  "collaborations": [
    {
      "id": "newpartner",              // 🆔 Unique identifier
      "name": "Partner Company",       // 🏢 Company name
      "type": "sponsor",               // 🤝 sponsor|partner|supporter
      "logo": "assets/images/collaborators/partner.png", // 🖼️ Logo image
      "description": "Leading technology company supporting esports", // 📄 Description
      "website": "https://partner.com", // 🔗 Company website
      "partnership_date": "2025-01-15", // 📅 Partnership start
      "status": "active",              // 📊 active|inactive|pending
      "contribution": [                // 🎁 What they provide
        "Gaming Equipment",
        "Prize Sponsorship",
        "Technical Support"
      ],
      "contact": {                     // 📞 Contact person
        "name": "Partnership Manager",
        "email": "partnerships@partner.com"
      },
      "social": {                      // 📱 Social media
        "facebook": "https://facebook.com/partner",
        "twitter": "https://twitter.com/partner"
      }
    }
  ]
}
```

**🤝 Partnership Types**: `sponsor`, `partner`, `supporter`, `media_partner`
**📊 Status Options**: `active`, `inactive`, `pending`, `expired`

### 🏠 **Homepage Statistics Management**

**📍 File Location**: `data/site-data.json`

**🎯 How to Update Statistics**:

```json
{
  "site": {
    "title": "GUCC Virtual Gaming Society",
    "description": "Green University's official gaming club",
    "year": "2025"
  },
  "stats": {
    "activeMembers": 25,             // 👥 Update member count
    "tournaments": 8,                // 🏆 Update tournament count
    "gamesSupported": 12,            // 🎮 Update games count
    "industryPartners": 10           // 🤝 Update partner count
  },
  "contact": {
    "email": "faysaltomal02@gmail.com",
    "facebook": "https://www.facebook.com/gucc.vgs",
    "address": "Green University of Bangladesh, Dhaka"
  }
}
```

### 🚀 **Quick Update Checklist**

#### ✅ **Before Making Changes**

- [ ] 📋 **Backup Files**: Copy JSON files before editing
- [ ] 🔍 **Validate JSON**: Use online JSON validator
- [ ] 📸 **Prepare Images**: Optimize and place in correct folders
- [ ] ✏️ **Check Content**: Proofread text content

#### ✅ **After Making Changes**

- [ ] 🌐 **Test Locally**: Check changes on local server
- [ ] 📱 **Mobile Test**: Verify on mobile devices
- [ ] 🔍 **Browser Test**: Check across different browsers
- [ ] 📊 **Validate Data**: Ensure no broken links or images

### 🖼️ **Image Guidelines**

| 📄 Content Type | 📐 Recommended Size | 📁 Location | 🎨 Format |
|-----------------|-------------------|------------|-----------|
| **Profile Photos** | 400x400px | `assets/images/members/` | PNG/JPG |
| **Game Thumbnails** | 300x200px | `assets/images/games/` | PNG/JPG |
| **Event Images** | 800x400px | `assets/images/events/` | PNG/JPG |
| **Partner Logos** | 200x100px | `assets/images/collaborators/` | PNG |
| **Banners** | 1200x600px | `assets/images/banners/` | JPG |

### 🔧 **JSON Validation Tools**

- **Online Validators**: [JSONLint](https://jsonlint.com/), [JSON Formatter](https://jsonformatter.org/)
- **VS Code Extensions**: JSON Tools, Prettier
- **Command Line**: `jq` for terminal validation

### ⚠️ **Common Pitfalls to Avoid**

- ❌ **Missing Commas**: Ensure proper JSON syntax
- ❌ **Duplicate IDs**: Use unique identifiers
- ❌ **Broken Image Paths**: Verify image file locations
- ❌ **Invalid Dates**: Use YYYY-MM-DD format
- ❌ **Missing Fields**: Include all required properties

---

## �🚀 Getting Started

### 📋 Prerequisites

- **Web Browser**: Modern browser with ES6+ support
- **Local Server**: Live Server extension for VS Code or similar
- **Git**: For version control and collaboration

### 🔧 Installation

1. **Clone the repository**:
```bash
git clone https://github.com/gubvirtualgamingclub/vgs.git
cd vgs
```

2. **Open in VS Code**:
```bash
code .
```

3. **Install Live Server extension** (if not already installed)

4. **Start development server**:
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Navigate to `http://localhost:5500`

### 🌐 Project Structure Setup

```bash
# Verify all directories exist
ls -la assets/images/
ls -la components/
ls -la css/
ls -la data/
ls -la js/components/

# Check file permissions
chmod 644 *.html
chmod 644 css/*.css
chmod 644 js/*.js
chmod 644 data/*.json
```

---

## 🛠️ Development Guide

### 🔄 Adding New Pages

1. **Create HTML file**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Standard head content -->
    <link rel="stylesheet" href="css/new-page.css">
</head>
<body>
    <div id="nav-placeholder"></div>
    
    <main>
        <!-- Page content -->
    </main>
    
    <div id="footer-placeholder"></div>
    
    <!-- Scripts -->
    <script src="js/components/loader.js"></script>
    <script src="js/components/nav.js"></script>
    <script src="js/components/footer.js"></script>
    <script src="js/new-page.js"></script>
</body>
</html>
```

2. **Create CSS file** (`css/new-page.css`):
```css
/* Page-specific styles */
.new-page-container {
    /* Styles here */
}
```

3. **Create JavaScript file** (`js/new-page.js`):
```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Page initialization
    initNewPage();
});

function initNewPage() {
    // Page logic here
}
```

4. **Update navigation** in `components/nav.html`:
```html
<a href="new-page.html" class="nav-link">
    <span class="nav-text">
        <i class="fas fa-icon nav-icon"></i>
        New Page
    </span>
    <span class="nav-underline"></span>
</a>
```

### 🎨 Adding New Components

1. **Create component HTML** (`components/new-component.html`):
```html
<div class="new-component">
    <!-- Component structure -->
</div>
```

2. **Create component CSS** (`css/new-component.css`):
```css
.new-component {
    /* Component styles */
}
```

3. **Create component JavaScript** (`js/components/new-component.js`):
```javascript
class NewComponent {
    constructor() {
        this.init();
    }
    
    init() {
        // Component initialization
    }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    new NewComponent();
});
```

4. **Update component loader** in `js/components/loader.js`:
```javascript
static async load() {
    // Add to loading sequence
    await this.loadComponent('components/new-component.html');
    await this.loadScript('js/components/new-component.js');
}
```

### 📊 Adding New Data Types

1. **Create JSON file** (`data/new-data.json`):
```json
{
    "items": [
        {
            "id": 1,
            "title": "Item Title",
            "description": "Item description"
        }
    ]
}
```

2. **Create data handler**:
```javascript
async function loadNewData() {
    try {
        const response = await fetch('data/new-data.json');
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error loading new data:', error);
        return [];
    }
}
```

### 🔧 Debugging Guide

**Common Issues & Solutions**:

1. **Components not loading**:
```javascript
// Check console for errors
console.log('Component loader status:', ComponentLoader);

// Verify file paths
fetch('components/nav.html')
    .then(response => console.log('Nav component:', response.status))
    .catch(error => console.error('Nav load error:', error));
```

2. **CSS not applying**:
```javascript
// Check CSS loading
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'css/problematic.css';
link.onload = () => console.log('CSS loaded successfully');
link.onerror = () => console.error('CSS load failed');
document.head.appendChild(link);
```

3. **JavaScript errors**:
```javascript
// Add error boundaries
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Add try-catch blocks
try {
    riskyFunction();
} catch (error) {
    console.error('Function error:', error);
    handleError(error);
}
```

---

## 📱 Responsive Design

### 🎯 Mobile-First Approach

The website follows a **mobile-first design philosophy**:

1. **Base styles** target mobile devices (320px+)
2. **Progressive enhancement** for larger screens
3. **Touch-friendly** interfaces and interactions
4. **Optimized performance** for mobile networks

### 📐 Breakpoint Strategy

```css
/* Mobile First (320px+) */
.container {
    padding: 1rem;
    max-width: 100%;
}

/* Small Mobile (480px+) */
@media (min-width: 480px) {
    .container {
        padding: 1.5rem;
    }
}

/* Tablet (768px+) */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
        max-width: 1024px;
        margin: 0 auto;
    }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
    .container {
        padding: 3rem;
        max-width: 1200px;
    }
}
```

### 🎨 Responsive Components

**Navigation**:
- Desktop: Horizontal menu bar
- Mobile: Hamburger menu with slide-out panel

**Grid Layouts**:
- Desktop: Multi-column grids (4 columns)
- Tablet: Reduced columns (2-3 columns)
- Mobile: Single column stacking

**Typography**:
- Fluid typography with `clamp()` functions
- Scalable font sizes based on viewport
- Improved readability on all devices

---

## ♿ Accessibility

### 🎯 Accessibility Standards

The website follows **WCAG 2.1 AA guidelines**:

### 🔧 Implementation

**Semantic HTML**:
```html
<main role="main">
    <section aria-labelledby="section-title">
        <h2 id="section-title">Section Title</h2>
        <!-- Content -->
    </section>
</main>
```

**ARIA Labels**:
```html
<button aria-label="Toggle mobile menu" aria-expanded="false">
    <span class="sr-only">Menu</span>
</button>
```

**Keyboard Navigation**:
```javascript
// Tab trap for modals
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}
```

**Color Contrast**:
- Text contrast ratio: 4.5:1 minimum
- Large text contrast: 3:1 minimum
- Interactive elements: Clear focus indicators

**Screen Reader Support**:
```html
<div class="sr-only">Screen reader only content</div>

<img src="image.jpg" alt="Descriptive alt text">

<form>
    <label for="email">Email Address</label>
    <input type="email" id="email" required aria-describedby="email-help">
    <div id="email-help">We'll never share your email</div>
</form>
```

---

## 🔄 Performance

### ⚡ Optimization Strategies

**Image Optimization**:
- WebP format with fallbacks
- Responsive images with `srcset`
- Lazy loading implementation
- Optimized file sizes

**JavaScript Optimization**:
- Code splitting and lazy loading
- Minification and compression
- Efficient event handling
- Memory leak prevention

**CSS Optimization**:
- Critical CSS inlining
- Unused CSS removal
- CSS Grid and Flexbox for layouts
- Optimized animations with `transform` and `opacity`

**Loading Performance**:
```javascript
// Lazy loading images
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px 0px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
}, observerOptions);

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});
```

**Caching Strategy**:
```javascript
// Service Worker for caching
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('vgs-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/css/index.css',
                '/js/index.js',
                '/assets/images/logos/VGSwide.png'
            ]);
        })
    );
});
```

### 📊 Performance Metrics

**Target Metrics**:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

**Monitoring Tools**:
- Google PageSpeed Insights
- Chrome DevTools Lighthouse
- Web Vitals extension

---

## 🤝 Contributing

### 📋 Development Workflow

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes** following the coding standards
4. **Test thoroughly** on multiple devices
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open Pull Request**

### 📝 Coding Standards

**HTML Guidelines**:
- Use semantic HTML5 elements
- Include proper meta tags
- Maintain consistent indentation (2 spaces)
- Add meaningful comments

**CSS Guidelines**:
- Follow BEM methodology for class naming
- Use CSS custom properties for theming
- Maintain mobile-first approach
- Group related properties

**JavaScript Guidelines**:
- Use ES6+ features
- Follow async/await patterns
- Add comprehensive error handling
- Include JSDoc comments

### 🐛 Bug Reports

When reporting bugs, please include:
- Browser and version
- Device information
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### 💡 Feature Requests

For feature requests, provide:
- Detailed description
- Use case scenarios
- Mockups or examples
- Priority level

---

## 📞 Support & Contact

### 🏫 Organization

**Green University Computer Club - Virtual Gaming Society**
- 🌐 Website: [GUCC VGS](https://gubvirtualgamingclub.github.io/vgs)
- 📧 Email: faysaltomal02@gmail.com
- 📱 Facebook: [@gucc.vgs](https://www.facebook.com/gucc.vgs)
- 🏢 Location: Green University of Bangladesh, Dhaka

### 👨‍💻 Technical Support

For technical issues or questions:
- 🐛 [GitHub Issues](https://github.com/gubvirtualgamingclub/vgs/issues)
- 📧 Developer Contact: faysaltomal02@gmail.com
- 💬 Discussion: GitHub Discussions

### 📚 Resources

- **Documentation**: This README.md
- **Code Style**: Follow existing patterns
- **Best Practices**: Web development standards
- **Accessibility**: WCAG 2.1 AA guidelines

---

<div align="center">

## 🎮 Built with ❤️ by GUCC VGS Team

**🌟 Star this repo if you found it helpful! 🌟**

[![GitHub stars](https://img.shields.io/github/stars/gubvirtualgamingclub/vgs?style=social)](https://github.com/gubvirtualgamingclub/vgs/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/gubvirtualgamingclub/vgs?style=social)](https://github.com/gubvirtualgamingclub/vgs/network/members)

---

**© 2025 GUCC Virtual Gaming Society | Green University of Bangladesh**

*Building the future of esports and gaming excellence in Bangladesh* 🇧🇩

</div>