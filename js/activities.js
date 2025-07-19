// Activities Page JavaScript - SPA Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('Activities page loaded - SPA version');
    
    // DOM Elements
    const allEventsGrid = document.getElementById('all-events');
    const eventsListView = document.getElementById('events-list-view');
    const eventDetailsView = document.getElementById('event-details-view');
    const eventDetailsContent = document.getElementById('event-details-content');
    const backToEventsBtn = document.getElementById('back-to-events');

    // State
    let allEvents = [];
    let currentView = 'list'; // 'list' or 'details'
    let currentEventId = null;
    let showAllEvents = false; // For show more/less functionality
    const INITIAL_EVENTS_LIMIT = 6;

    // Initialize
    loadEvents();
    setupEventListeners();

    async function loadEvents() {
        try {
            console.log('Loading events...');
            const response = await fetch('data/activities.json');
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('Events data loaded:', data);
            
            // Combine recent and past events into one array
            allEvents = [
                ...(data.recent || []),
                ...(data.past || [])
            ];
            
            renderAllEvents();
            
        } catch (error) {
            console.error('Error loading events:', error);
            showError(allEventsGrid, 'Failed to load events');
        }
    }

    function showError(container, message) {
        container.innerHTML = `
            <div class="col-span-full text-center py-8 text-red-400">
                <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                <p>${message}</p>
            </div>
        `;
    }

    function renderAllEvents() {
        console.log('Rendering all events:', allEvents.length);
        
        if (allEvents.length === 0) {
            allEventsGrid.innerHTML = `
                <div class="col-span-full text-center py-8 text-gray-400">
                    <i class="fas fa-calendar-times text-2xl mb-2"></i>
                    <p>No events to display</p>
                </div>
            `;
            return;
        }

        // Determine how many events to show
        const eventsToShow = showAllEvents ? allEvents : allEvents.slice(0, INITIAL_EVENTS_LIMIT);
        
        // Render event cards
        allEventsGrid.innerHTML = eventsToShow.map(event => createEventCard(event)).join('');
        
        // Add show more/less button if there are more than 6 events
        if (allEvents.length > INITIAL_EVENTS_LIMIT) {
            addShowMoreButton();
        }
    }

    function addShowMoreButton() {
        // Remove existing button if any
        const existingButton = document.getElementById('show-more-btn');
        if (existingButton) {
            existingButton.remove();
        }

        // Create show more/less button
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'col-span-full flex justify-center mt-8';
        buttonContainer.id = 'show-more-btn';
        
        const button = document.createElement('button');
        button.className = 'show-more-button bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl';
        button.setAttribute('aria-label', showAllEvents ? 'Show less events' : 'Show more events');
        
        const hiddenCount = allEvents.length - INITIAL_EVENTS_LIMIT;
        
        if (showAllEvents) {
            button.innerHTML = '<i class="fas fa-chevron-up mr-2"></i>Show Less';
        } else {
            button.innerHTML = `<i class="fas fa-chevron-down mr-2"></i>Show More (${hiddenCount} more events)`;
        }
        
        button.addEventListener('click', toggleShowMore);
        
        buttonContainer.appendChild(button);
        allEventsGrid.appendChild(buttonContainer);
    }

    function toggleShowMore() {
        showAllEvents = !showAllEvents;
        renderAllEvents();
        
        // Smooth scroll to top of events grid if showing less
        if (!showAllEvents) {
            const eventsSection = document.querySelector('#all-events').parentElement;
            eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function createEventCard(event) {
        const isRecent = event.category === 'recent';
        const tagClass = isRecent ? 'bg-green-500' : 'bg-blue-500';
        const tagText = isRecent ? 'Recent' : 'Past';
        
        return `
            <div class="event-card bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-700 hover:border-green-500" onclick="showEventDetails(${event.id})">
                <div class="relative">
                    <img src="${event.banner || 'assets/images/logos/vgs.png'}" 
                         alt="${event.title}" 
                         class="w-full h-48 object-cover"
                         onerror="this.src='assets/images/logos/vgs.png'">
                    <div class="absolute top-3 right-3 px-3 py-1 ${tagClass} text-white text-xs font-bold rounded-full">
                        ${tagText}
                    </div>
                </div>
                
                <div class="p-6">
                    <h3 class="text-xl font-bold text-white mb-2 font-orbitron">${event.title}</h3>
                    <p class="text-gray-400 text-sm mb-3 flex items-center">
                        <i class="fas fa-calendar-alt mr-2 text-green-400"></i>
                        ${event.date}
                    </p>
                    <p class="text-gray-300 text-sm mb-4 line-clamp-3">${event.shortDescription}</p>
                    
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${event.games.slice(0, 3).map(game => `
                            <span class="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">${game}</span>
                        `).join('')}
                        ${event.games.length > 3 ? `<span class="px-2 py-1 bg-gray-600 text-gray-400 text-xs rounded-full">+${event.games.length - 3} more</span>` : ''}
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <span class="text-green-400 text-sm">
                            <i class="fas fa-users mr-1"></i>
                            ${event.participants}/${event.maxParticipants} Participants
                        </span>
                        <span class="text-blue-400 text-sm hover:text-blue-300">
                            <i class="fas fa-arrow-right mr-1"></i>
                            View Details
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    function showEventDetails(eventId) {
        const event = allEvents.find(e => e.id === eventId);
        if (!event) {
            console.error('Event not found:', eventId);
            return;
        }

        currentEventId = eventId;
        currentView = 'details';
        
        // Create event details HTML
        eventDetailsContent.innerHTML = createEventDetailsHTML(event);
        
        // Show details view, hide list view
        eventsListView.classList.add('hidden');
        eventDetailsView.classList.remove('hidden');
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Update URL without page reload
        const newUrl = `activities.html?event=${eventId}`;
        history.pushState({ view: 'details', eventId: eventId }, event.title, newUrl);
    }

    function createEventDetailsHTML(event) {
        const isRecent = event.category === 'recent';
        const registrationButton = isRecent && event.registrationStatus === 'Open' ? 
            `<a href="${event.socialLinks?.registration || '#'}" target="_blank" 
               class="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                <i class="fas fa-user-plus mr-2"></i>Register Now
            </a>` : '';

        const facebookButton = event.socialLinks?.facebook ? 
            `<a href="${event.socialLinks.facebook}" target="_blank" 
               class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                <i class="fab fa-facebook-f mr-2"></i>View on Facebook
            </a>` : '';

        return `
            <!-- Hero Banner -->
            <div class="relative mb-8 rounded-2xl overflow-hidden">
                <img src="${event.banner || 'assets/images/logos/vgs.png'}" 
                     alt="${event.title}" 
                     class="w-full h-80 md:h-96 object-cover"
                     onerror="this.src='assets/images/logos/vgs.png'">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div class="absolute bottom-8 left-8 right-8">
                    <div class="flex items-center gap-3 mb-4">
                        <span class="px-4 py-2 ${isRecent ? 'bg-green-500' : 'bg-blue-500'} text-white text-sm font-bold rounded-full">
                            ${isRecent ? 'Recent Event' : 'Past Event'}
                        </span>
                        <span class="px-4 py-2 bg-gray-800/80 text-white text-sm rounded-full">
                            ${event.registrationStatus || 'Completed'}
                        </span>
                    </div>
                    <h1 class="text-4xl md:text-5xl font-bold text-white font-orbitron mb-2">${event.title}</h1>
                    <p class="text-xl text-gray-200 flex items-center">
                        <i class="fas fa-calendar-alt mr-2 text-green-400"></i>
                        ${event.date} • ${event.time}
                    </p>
                </div>
            </div>

            <!-- Event Info Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <!-- Main Info -->
                <div class="lg:col-span-2">
                    <!-- About Section -->
                    <div class="bg-gray-800 rounded-xl p-6 mb-6">
                        <h2 class="text-2xl font-bold text-green-400 mb-4 flex items-center">
                            <i class="fas fa-info-circle mr-2"></i>
                            About This Event
                        </h2>
                        <p class="text-gray-300 leading-relaxed text-lg">${event.about}</p>
                    </div>

                    <!-- Games Section -->
                    <div class="bg-gray-800 rounded-xl p-6 mb-6">
                        <h2 class="text-2xl font-bold text-green-400 mb-4 flex items-center">
                            <i class="fas fa-gamepad mr-2"></i>
                            Featured Games
                        </h2>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                            ${event.games.map(game => `
                                <div class="bg-gray-700 rounded-lg p-3 text-center hover:bg-gray-600 transition-colors">
                                    <span class="text-white font-medium">${game}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Schedule Section -->
                    ${event.schedule ? `
                    <div class="bg-gray-800 rounded-xl p-6 mb-6">
                        <h2 class="text-2xl font-bold text-green-400 mb-4 flex items-center">
                            <i class="fas fa-clock mr-2"></i>
                            Event Schedule
                        </h2>
                        <div class="space-y-3">
                            ${event.schedule.map(item => `
                                <div class="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                                    <span class="text-blue-400 font-medium">${item.time}</span>
                                    <span class="text-gray-300">${item.activity}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}

                    <!-- Guests Section -->
                    ${event.guests && event.guests.length > 0 ? `
                    <div class="bg-gray-800 rounded-xl p-6 mb-6">
                        <h2 class="text-2xl font-bold text-green-400 mb-4 flex items-center">
                            <i class="fas fa-star mr-2"></i>
                            Special Guests
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${event.guests.map(guest => `
                                <div class="bg-gray-700 rounded-lg p-4 flex items-center space-x-4">
                                    <img src="${guest.image || 'assets/images/members/placeholder.png'}" 
                                         alt="${guest.name}" 
                                         class="w-16 h-16 rounded-full object-cover"
                                         onerror="this.src='assets/images/members/placeholder.png'">
                                    <div>
                                        <h3 class="text-white font-bold">${guest.name}</h3>
                                        <p class="text-blue-400 text-sm">${guest.title}</p>
                                        <p class="text-gray-400 text-xs">${guest.description}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>

                <!-- Sidebar -->
                <div class="space-y-6">
                    <!-- Quick Info -->
                    <div class="bg-gray-800 rounded-xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4">Event Details</h3>
                        <div class="space-y-3">
                            <div class="flex items-start">
                                <i class="fas fa-map-marker-alt text-green-400 mt-1 mr-3"></i>
                                <div>
                                    <p class="text-gray-400 text-sm">Venue</p>
                                    <p class="text-white">${event.venue}</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <i class="fas fa-users text-blue-400 mt-1 mr-3"></i>
                                <div>
                                    <p class="text-gray-400 text-sm">Participants</p>
                                    <p class="text-white">${event.participants}/${event.maxParticipants}</p>
                                </div>
                            </div>
                            ${event.contact ? `
                            <div class="flex items-start">
                                <i class="fas fa-envelope text-purple-400 mt-1 mr-3"></i>
                                <div>
                                    <p class="text-gray-400 text-sm">Contact</p>
                                    <p class="text-white">${event.contact.email}</p>
                                </div>
                            </div>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Prizes Section -->
                    ${event.prizes ? `
                    <div class="bg-gray-800 rounded-xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                            <i class="fas fa-trophy text-yellow-400 mr-2"></i>
                            Prizes
                        </h3>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                <span class="text-yellow-400 font-medium">🥇 1st Place</span>
                                <span class="text-white text-sm">${event.prizes.first}</span>
                            </div>
                            <div class="flex items-center justify-between p-3 bg-gray-400/10 rounded-lg border border-gray-400/20">
                                <span class="text-gray-400 font-medium">🥈 2nd Place</span>
                                <span class="text-white text-sm">${event.prizes.second}</span>
                            </div>
                            <div class="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                <span class="text-orange-400 font-medium">🥉 3rd Place</span>
                                <span class="text-white text-sm">${event.prizes.third}</span>
                            </div>
                        </div>
                    </div>
                    ` : ''}

                    <!-- Sponsors Section -->
                    ${event.sponsors && event.sponsors.length > 0 ? `
                    <div class="bg-gray-800 rounded-xl p-6">
                        <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                            <i class="fas fa-handshake text-green-400 mr-2"></i>
                            Sponsors
                        </h3>
                        <div class="space-y-3">
                            ${event.sponsors.map(sponsor => `
                                <div class="bg-gray-700 rounded-lg p-3 text-center">
                                    <img src="${sponsor.logo}" 
                                         alt="${sponsor.name}" 
                                         class="h-8 mx-auto mb-2 object-contain"
                                         onerror="this.style.display='none'">
                                    <p class="text-white text-sm font-medium">${sponsor.name}</p>
                                    <p class="text-gray-400 text-xs">${sponsor.tier}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}

                    <!-- Action Buttons -->
                    <div class="bg-gray-800 rounded-xl p-6">
                        <div class="space-y-3">
                            ${registrationButton}
                            ${facebookButton}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function showEventsList() {
        currentView = 'list';
        currentEventId = null;
        
        // Show list view, hide details view
        eventDetailsView.classList.add('hidden');
        eventsListView.classList.remove('hidden');
        
        // Update URL
        history.pushState({ view: 'list' }, 'Activities', 'activities.html');
    }

    function setupEventListeners() {
        // Back to events button
        backToEventsBtn.addEventListener('click', showEventsList);

        // Handle browser back/forward buttons
        window.addEventListener('popstate', function(event) {
            if (event.state) {
                if (event.state.view === 'details' && event.state.eventId) {
                    showEventDetails(event.state.eventId);
                } else {
                    showEventsList();
                }
            } else {
                showEventsList();
            }
        });

        // Check URL on page load for direct event links
        const urlParams = new URLSearchParams(window.location.search);
        const eventId = urlParams.get('event');
        if (eventId) {
            setTimeout(() => {
                showEventDetails(parseInt(eventId));
            }, 100); // Small delay to ensure events are loaded
        }
    }

    // Make functions available globally for onclick handlers
    window.showEventDetails = showEventDetails;
});