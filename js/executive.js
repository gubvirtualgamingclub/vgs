document.addEventListener('DOMContentLoaded', function() {
  // Load executive data
  fetch('data/executives.json')
    .then(response => response.json())
    .then(data => {
      // Hide loading spinner
      document.getElementById('loading-spinner').style.display = 'none';
      
      // Render moderation panel
      renderPanel('moderators-container', data.moderationPanel);
      
      // Render wing panel
      renderPanel('wing-members-container', data.wingPanel);
      
      // Animate sections
      animateSections();
    })
    .catch(error => {
      console.error('Error loading executive data:', error);
      document.getElementById('loading-spinner').innerHTML = 
        '<p class="text-red-500">Failed to load data. Please try again later.</p>';
    });

  // Floating controller click event
  document.getElementById('floating-controller').addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

function renderPanel(containerId, members) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  
  members.forEach(member => {
    const socialLinks = member.socialLinks.map(link => 
      `<a href="${link.url}" target="_blank" class="social-icon">
        <i class="${link.icon}"></i>
      </a>`
    ).join('');
    
    const card = document.createElement('div');
    card.className = 'member-card';
    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}" class="member-photo">
      <h3>${member.name}</h3>
      <p>${member.role}</p>
      <div class="social-icons">${socialLinks}</div>
    `;
    
    container.appendChild(card);
  });
}

function animateSections() {
  // GSAP animations
  gsap.to("#moderation-panel", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
  });
  
  gsap.to("#wing-panel", {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.3,
    ease: "power2.out"
  });
  
  // ScrollReveal animations
  ScrollReveal().reveal('.member-card', {
    delay: 200,
    interval: 100,
    origin: 'bottom',
    distance: '50px',
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    scale: 0.9
  });
}



