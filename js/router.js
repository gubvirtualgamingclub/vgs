document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navContainer = document.getElementById('nav-placeholder');

    const loadContent = async (url, pushState = true) => {
        try {
            const response = await fetch(url);
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'html');

            const newContent = doc.getElementById('main-content').innerHTML;
            const newTitle = doc.title;

            // Fade out old content
            mainContent.style.opacity = 0;

            setTimeout(() => {
                mainContent.innerHTML = newContent;
                document.title = newTitle;

                // Fade in new content
                mainContent.style.opacity = 1;

                if (pushState) {
                    history.pushState({ path: url }, newTitle, url);
                }

                // Re-run scripts for the new page
                reinitializePageScripts(url);
            }, 300); // Match transition duration

        } catch (error) {
            console.error('Error loading page:', error);
            // Optionally, redirect to the page if fetch fails
            window.location.href = url;
        }
    };

    const reinitializePageScripts = (url) => {
        // Remove old page-specific scripts if any
        document.querySelectorAll('[data-page-script]').forEach(s => s.remove());

        const pageName = url.substring(url.lastIndexOf('/') + 1).split('.')[0] || 'index';
        let scriptSrc;

        // Determine which script to load
        switch (pageName) {
            case 'index':
                scriptSrc = 'js/index.js';
                break;
            case 'activities':
                scriptSrc = 'js/activities.js';
                break;
            case 'tournament':
                scriptSrc = 'js/tournament.js';
                break;
            case 'executive':
                scriptSrc = 'js/executive.js';
                break;
            case 'collaboration':
                scriptSrc = 'js/collaboration.js';
                break;
            case 'update':
                scriptSrc = 'js/update.js';
                break;
            default:
                return; // No specific script for this page
        }

        const newScript = document.createElement('script');
        newScript.src = scriptSrc;
        newScript.dataset.pageScript = 'true'; // Mark as a page-specific script
        newScript.defer = true;
        document.body.appendChild(newScript);
    };

    // Initial page load script initialization
    reinitializePageScripts(window.location.pathname);

    // Handle navigation clicks
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');

        if (link && link.href && link.origin === window.location.origin && !link.hash && link.target !== '_blank') {
            e.preventDefault();
            const url = link.href;

            if (url !== window.location.href) {
                loadContent(url);
            }
        }
    });

    // Handle back/forward browser buttons
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.path) {
            loadContent(e.state.path, false);
        }
    });
});
