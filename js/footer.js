// Updated footer.js
document.addEventListener('DOMContentLoaded', function() {
  // Set current year
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // Load contributors data
  fetch('data/contributors.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      renderCurrentContributors(data.current);
      renderPastContributors(data.past);
      document.getElementById('current-contributors').classList.remove('hidden');
      initPastContributorsModal(); // Initialize modal after data is loaded
    })
    .catch(error => {
      console.error('Error loading contributors:', error);
      // Fallback data
      const fallbackData = {
        current: [
          {
            name: "Faysal Hossain Tomal",
            github: "https://github.com/FaysalHT",
            avatar: "https://github.com/FaysalHT.png",
            role: "Lead Developer"
          }
        ],
        past: [
          {
            name: "John Doe",
            github: "https://github.com/johndoe",
            avatar: "https://github.com/johndoe.png",
            role: "Former Developer",
            year: "2024"
          }
        ]
      };
      renderCurrentContributors(fallbackData.current);
      renderPastContributors(fallbackData.past);
      document.getElementById('current-contributors').classList.remove('hidden');
      initPastContributorsModal(); // Initialize modal with fallback data
    });

  // Initialize modal functionality
  function initPastContributorsModal() {
    const showBtn = document.getElementById('show-past-contributors');
    const closeBtn = document.getElementById('close-modal');
    const modal = document.getElementById('past-contributors-modal');

    if (showBtn && closeBtn && modal) {
      // Show modal
      showBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      });

      // Close modal
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      });

      // Close when clicking outside
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
          document.body.style.overflow = '';
        }
      });

      // Close with Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          modal.classList.add('hidden');
          document.body.style.overflow = '';
        }
      });
    }
  }
});

function renderCurrentContributors(contributors) {
  const container = document.querySelector('.contributors-container');
  if (!container || !contributors) return;

  container.innerHTML = '';
  
  contributors.forEach(contributor => {
    const item = document.createElement('div');
    item.className = 'contributor-item';

    const link = document.createElement('a');
    link.href = contributor.github;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const img = document.createElement('img');
    img.src = contributor.avatar;
    img.alt = contributor.name;
    img.className = 'contributor-avatar';
    img.onerror = () => img.src = 'https://via.placeholder.com/32';

    const tooltip = document.createElement('div');
    tooltip.className = 'contributor-tooltip';

    const tooltipImg = document.createElement('img');
    tooltipImg.src = contributor.avatar;
    tooltipImg.alt = contributor.name;
    tooltipImg.className = 'contributor-tooltip-avatar';
    tooltipImg.onerror = () => tooltipImg.src = 'https://via.placeholder.com/40';

    const name = document.createElement('div');
    name.className = 'contributor-tooltip-name';
    name.textContent = contributor.name;

    const role = document.createElement('div');
    role.className = 'contributor-tooltip-role';
    role.textContent = contributor.role;

    tooltip.appendChild(tooltipImg);
    tooltip.appendChild(name);
    tooltip.appendChild(role);
    link.appendChild(img);
    item.appendChild(link);
    item.appendChild(tooltip);
    container.appendChild(item);
  });
}

function renderPastContributors(contributors) {
  const container = document.getElementById('past-contributors-grid');
  if (!container || !contributors) return;

  container.innerHTML = '';

  contributors.forEach(contributor => {
    const card = document.createElement('div');
    card.className = 'contributor-card';

    const avatar = document.createElement('img');
    avatar.src = contributor.avatar;
    avatar.alt = contributor.name;
    avatar.className = 'contributor-card-avatar';
    avatar.onerror = () => avatar.src = 'https://via.placeholder.com/60';

    const name = document.createElement('h4');
    name.className = 'contributor-card-name';
    name.textContent = contributor.name;

    const role = document.createElement('p');
    role.className = 'contributor-card-role';
    role.textContent = contributor.role;

    const year = document.createElement('p');
    year.className = 'contributor-card-year';
    year.textContent = `Contributed in ${contributor.year || 'previous years'}`;

    const githubLink = document.createElement('a');
    githubLink.href = contributor.github;
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.className = 'contributor-card-link';
    githubLink.innerHTML = '<i class="fab fa-github mr-1"></i> GitHub';

    card.appendChild(avatar);
    card.appendChild(name);
    card.appendChild(role);
    card.appendChild(year);
    card.appendChild(githubLink);
    container.appendChild(card);
  });
}