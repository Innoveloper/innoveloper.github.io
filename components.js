/**
 * Reusable Components for Innoveloper Website
 * Maintains exact UI while providing clean, structured code
 */

// Navigation Configuration
const NAV_CONFIG = {
  links: [
    { href: 'about.html', text: 'About Us' },
    { href: 'services.html', text: 'Services' },
    { href: 'case_studies.html', text: 'Case Studies' },
    { href: 'contact_us.html', text: 'Contact Us' }
  ],
  logo: {
    href: 'index.html',
    text: 'Innoveloper',
    icon: '∞',
    light: 'image/Logo Light.svg',
    dark: 'image/Logo Dark.svg'
  }
};

/**
 * Creates a navigation component
 * @param {Object} options - Navigation options
 * @param {string} options.activeLink - Currently active link
 * @param {Object} options.ctaButton - CTA button configuration
 * @returns {string} HTML string for navigation
 */
function createNavigation(options = {}) {
  const { 
    activeLink = '', 
    ctaButton = { href: 'contact_us.html', text: "Let's Talk", style: 'border-radius: 50px; background: var(--primary-blue); color: white; box-shadow: none;' },
    showCTA = true,
    centered = false // Center the navigation
  } = options;
  
  const navLinks = NAV_CONFIG.links.map(link => 
    `<a href="${link.href}" ${link.href === activeLink ? 'class="active"' : ''}>${link.text}</a>`
  ).join('\n      ');

  const ctaButtonHTML = showCTA 
    ? `<a href="${ctaButton.href}" class="btn-book" style="${ctaButton.style}">${ctaButton.text}</a>`
    : '';

  return `
  <nav class="${centered ? 'nav-centered' : ''}">
    <a href="${NAV_CONFIG.logo.href}" class="logo" style="text-decoration: none; color: inherit;">
      <img src="${NAV_CONFIG.logo.light}" alt="${NAV_CONFIG.logo.text}" class="logo-image" />
      <span class="logo-text">${NAV_CONFIG.logo.text}</span>
    </a>
    <div class="nav-links">
      ${navLinks}
    </div>
    ${ctaButtonHTML}
    <button class="menu-toggle" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </nav>

  <!-- Mobile Drawer -->
  <div class="mobile-drawer-overlay"></div>
  <div class="mobile-drawer">
    <div class="mobile-nav-links">
      ${NAV_CONFIG.links.map(link => 
        `<a href="${link.href}" ${link.href === activeLink ? 'class="active"' : ''}>${link.text}</a>`
      ).join('\n      ')}
    </div>
    ${ctaButtonHTML}
  </div>`;
}

/**
 * Creates a badge component
 * @param {string} text - Badge text
 * @returns {string} HTML string for badge
 */
function createBadge(text) {
  return `<div class="badge">${text}</div>`;
}

/**
 * Creates a button component
 * @param {Object} options - Button options
 * @returns {string} HTML string for button
 */
function createButton(options) {
  const {
    href = '#',
    text = 'Button',
    style = '',
    classes = 'btn-book'
  } = options;
  
  return `<a href="${href}" class="${classes}" style="${style}">${text}</a>`;
}

/**
 * Creates a hero card component
 * @param {Object} options - Hero card options
 * @returns {string} HTML string for hero card
 */
function createHeroCard(options) {
  const {
    badge = '',
    title = '',
    description = '',
    buttons = [],
    backgroundImage = '',
    gridSpan = 'span 8',
    gridRow = 'span 2'
  } = options;

  const backgroundStyle = backgroundImage 
    ? `background: linear-gradient(rgba(5,7,10,0.1), rgba(5,7,10,0.8)), url('${backgroundImage}'); background-size: cover;`
    : '';

  const buttonHTML = buttons.map(btn => {
    // Ensure "View Case Studies" button is visible with proper styling
    if (btn.text && btn.text.includes('View Case Studies')) {
      btn.style = (btn.style || '') + '; opacity: 1; visibility: visible; display: inline-block; color: white; padding: 16px 32px; border-radius: 14px;';
    }
    return createButton(btn);
  }).join('\n        ');

  return `
    <div class="card hero-card" style="grid-column: ${gridSpan}; grid-row: ${gridRow}; ${backgroundStyle}">
      ${badge ? createBadge(badge) : ''}
      <h1 style="font-weight: 800; font-size: 4.8rem; margin-bottom: 20px;">${title}</h1>
      <p class="hero-desc">${description}</p>
      <div class="hero-buttons" style="margin-top: 40px; display: flex; gap: 15px; flex-wrap: wrap;">
        ${buttonHTML}
      </div>
    </div>`;
}

/**
 * Creates a stats card component
 * @param {Object} options - Stats card options
 * @returns {string} HTML string for stats card
 */
function createStatsCard(options) {
  const {
    icon = '🚀',
    label = '',
    value = '',
    subtext = '',
    type = 'progress', // 'progress' or 'uptime'
    gridSpan = 'span 2'
  } = options;

  // For PROJECTS SHIPPED and UPTIME GUARANTEE, remove badges and indicators
  const isSimpleCard = label === 'PROJECTS SHIPPED' || label === 'UPTIME GUARANTEE';
  
  // Extract numeric value for animation
  const numericValue = value.replace(/[^0-9.]/g, '');
  const suffix = value.replace(/[0-9.]/g, '');
  const isPercentage = value.includes('%');
  const isPlus = value.includes('+');

  return `
    <div class="card stats-card" style="grid-column: ${gridSpan};" data-stat-value="${numericValue}" data-stat-suffix="${suffix}" data-stat-type="${type}">
      <div class="logo-icon" style="width:40px; height:40px; background: rgba(255,255,255,0.05);">${icon}</div>
      <p style="color: var(--text-dim); font-size: 0.7rem; font-weight: 700; margin-top: 20px;">${label}</p>
      <h2 class="stat-value-animated" style="font-size: ${type === 'uptime' ? '2.2rem' : '2.8rem'}; margin: ${type === 'uptime' ? '5px 0' : '10px 0'};">
        <span class="stat-number">0</span><span class="stat-suffix">${suffix}</span>
      </h2>
    </div>`;
}

/**
 * Creates a service card component
 * @param {Object} options - Service card options
 * @returns {string} HTML string for service card
 */
function createServiceCard(options) {
  const {
    icon = '&lt;/&gt;',
    title = '',
    description = '',
    iconColor = '#3b82f6',
    gridSpan = 'span 2'
  } = options;

  return `
    <div class="card service-card" style="grid-column: ${gridSpan};">
      <div class="logo-icon" style="width:40px; height:40px; background: rgba(255,255,255,0.05); color:${iconColor};">${icon}</div>
      <h3 style="font-size: 1.1rem; margin: 15px 0 10px;">${title}</h3>
      <p style="color: var(--text-dim); font-size: 0.8rem; line-height: 1.4;">${description}</p>
    </div>`;
}

/**
 * Creates a culture card component
 * @param {Object} options - Culture card options
 * @returns {string} HTML string for culture card
 */
function createCultureCard(options) {
  const {
    title = 'Our Culture',
    description = '',
    buttonText = 'Join the Team',
    images = [],
    gridSpan = 'span 8'
  } = options;

  const imagesHTML = images.map(img => 
    `<div class="culture-img" style="background-image: url('${img}')"></div>`
  ).join('\n        ');

  return `
    <div class="card culture-card-layout culture-card" style="grid-column: ${gridSpan};">
      <div class="culture-text">
        <h2 style="font-size: 2.5rem; margin-bottom: 15px;">${title}</h2>
        <p style="color: var(--text-dim); margin-bottom: 25px;">${description}</p>
      </div>
      <div class="culture-images">
        ${imagesHTML}
      </div>
    </div>`;
}

/**
 * Creates a CTA card component
 * @param {Object} options - CTA card options
 * @returns {string} HTML string for CTA card
 */
function createCTACard(options) {
  const {
    title = 'Ready to Innovate?',
    description = "Let's build something extraordinary together.",
    placeholder = 'Enter your email',
    buttonText = 'Get Started',
    gridSpan = 'span 8'
  } = options;

  return `
    <div class="card cta-card" style="grid-column: ${gridSpan}; background: var(--primary-blue); display: flex; justify-content: space-between; align-items: center; padding: 40px 50px;">
      <div>
        <h2 style="font-size: 2.8rem; font-weight: 800; margin-bottom: 5px;">${title}</h2>
        <p style="color: rgba(255,255,255,0.8); font-size: 0.95rem;">${description}</p>
      </div>
      <div style="display: flex; gap: 2px; background: rgba(255,255,255,0.15); padding: 8px; border-radius: 16px;">
        <input type="email" id="cta-email-input" placeholder="${placeholder}" style="background: transparent; border: none; padding: 0 15px; color: white; outline: none; width: 220px;" class="cta-input-white">
        <button id="cta-get-started-btn" class="btn-cta-white" style="background: white; color: var(--primary-blue); border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; position: relative; overflow: hidden; z-index: 1; transition: color 0.3s ease;">${buttonText}</button>
      </div>
    </div>`;
}

/**
 * Creates an Innovators card component
 * @param {Object} options - Innovators card options
 * @returns {string} HTML string for innovators card
 */
function createInnovatorsCard(options = {}) {
  const {
    innovators = [],
    gridSpan = 'span 6'
  } = options;

  // Function to get LinkedIn profile image URL
  const getLinkedInImage = (linkedinUrl) => {
    // Extract username from LinkedIn URL
    const match = linkedinUrl.match(/linkedin\.com\/in\/([^\/\?]+)/);
    if (match) {
      const username = match[1];
      // Use LinkedIn profile image service
      // Note: LinkedIn profile images require authentication, so we use a service
      // that can fetch them, or fallback to placeholder
      return `https://linkedin-profile-picture.vercel.app/${username}?size=200`;
    }
    return '';
  };

  const innovatorsHTML = innovators.map(innovator => {
    // Use manual image URL if provided, otherwise use fallback placeholder
    // To get LinkedIn profile image: Right-click profile picture on LinkedIn > Copy image address
    const fallbackUrl = `https://i.pravatar.cc/150?u=${innovator.name.toLowerCase().replace(/\s+/g, '')}`;
    const initialImageUrl = (innovator.image && innovator.image.trim()) ? innovator.image : fallbackUrl;
    
    return `
        <div style="display: flex; align-items: center; gap: 15px; flex: 1; min-width: 200px;">
          <a href="${innovator.linkedin}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: inline-block;">
            <img class="innovator-profile-img" 
                 data-linkedin="${innovator.linkedin}"
                 data-username="${innovator.linkedin.match(/linkedin\.com\/in\/([^\/\?]+)/)?.[1] || ''}"
                 src="${initialImageUrl}" 
                 onerror="this.onerror=null; this.src='${fallbackUrl}'" 
                 style="width: 55px; height: 55px; border-radius: 50%; flex-shrink: 0; object-fit: cover; border: 2px solid rgba(59, 130, 246, 0.3); transition: transform 0.3s ease, border-color 0.3s ease; cursor: pointer;" 
                 alt="${innovator.name}"
                 onmouseover="this.style.transform='scale(1.1)'; this.style.borderColor='rgba(59, 130, 246, 0.6)'"
                 onmouseout="this.style.transform='scale(1)'; this.style.borderColor='rgba(59, 130, 246, 0.3)'">
          </a>
          <div style="min-width: 0;">
            <p style="font-weight: 700; font-size: 0.9rem; word-wrap: break-word; margin: 0;">${innovator.name}</p>
            <p style="font-size: 0.7rem; color: var(--primary-blue); margin: 0;">${innovator.role}</p>
          </div>
        </div>
    `;
  }).join('');

  return `
    <div class="card" style="grid-column: ${gridSpan};">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
        <h3 style="font-size: 1.2rem; font-weight: 600;">The Innovators</h3>
      </div>
      <div style="display: flex; gap: 40px; flex-wrap: wrap;">
        ${innovatorsHTML}
      </div>
    </div>`;
}

/**
 * Creates a trusted by bar component with horizontal scrolling
 * @param {Object} options - Trusted by bar options
 * @returns {string} HTML string for trusted by bar
 */
function createTrustedByBar(options = {}) {
  const {
    label = 'TRUSTED BY',
    companies = ['Acme Corp', 'GlobalTech', 'Nebula', 'FoxRun', 'Circle.io', 'Vertigo']
  } = options;

  // Duplicate companies for seamless infinite scroll effect
  const duplicatedCompanies = [...companies, ...companies];
  const companiesHTML = duplicatedCompanies.map(company => `<span class="trusted-company-item">${company}</span>`).join('');

  return `
    <div class="trusted-by-bar">
      <span class="trusted-by-label" style="font-weight: 800; font-size: 0.75rem; color: var(--text-dim); letter-spacing: 2px; white-space: nowrap;">${label}</span>
      <div class="trusted-companies-scroll">
        <div class="trusted-companies-track">
          ${companiesHTML}
        </div>
      </div>
    </div>`;
}

/**
 * Default social media links for Innoveloper Solutions
 */
const DEFAULT_SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/company/innoveloper', name: 'LinkedIn', label: 'LinkedIn' },
  { href: 'https://www.instagram.com/innoveloper/', name: 'Instagram', label: 'Instagram' },
  { href: 'https://www.youtube.com/@Innoveloper', name: 'YouTube', label: 'YouTube' }
];

/**
 * Creates a footer component
 * @param {Object} options - Footer options
 * @param {string} options.text - Copyright text
 * @param {Array} options.socialLinks - Social media links (defaults to DEFAULT_SOCIAL_LINKS)
 * @param {Array} options.legalLinks - Legal links (Privacy, Terms, etc.)
 * @returns {string} HTML string for footer
 */
function createFooter(options = {}) {
  const {
    text = '© 2026 Innoveloper Solutions. All rights reserved.',
    socialLinks = DEFAULT_SOCIAL_LINKS,
    legalLinks = []
  } = options;

  // Helper function to get SVG icon
  const getSocialIcon = (name) => {
    const icons = {
      'LinkedIn': `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>`,
      'Instagram': `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>`,
      'YouTube': `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>`
    };
    return icons[name] || '';
  };

  let socialHTML = '';
  if (socialLinks.length > 0) {
    socialHTML = `
      <div class="footer-social">
        ${socialLinks.map(link => {
          const iconSVG = getSocialIcon(link.name);
          return `<a href="${link.href}" target="_blank" rel="noopener noreferrer" aria-label="${link.label || link.name}">
            ${iconSVG || link.icon || link.name}
          </a>`;
        }).join('')}
      </div>`;
  }

  let legalHTML = '';
  if (legalLinks.length > 0) {
    legalHTML = `
      <div class="footer-legal footer-legal-center">
        ${legalLinks.map(link => `<a href="${link.href}">${link.text}</a>`).join('')}
      </div>`;
  }

  return `
  <footer class="site-footer footer-with-center-legal">
    <div class="footer-content">
      <div class="footer-left">
        <p class="footer-copyright">${text}</p>
      </div>
      ${legalHTML}
      ${socialHTML}
    </div>
  </footer>`;
}

