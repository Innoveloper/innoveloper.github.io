/**
 * Common utilities and functionality
 * Shared across all pages
 */

// Store menu state to prevent duplicate listeners
let menuInitialized = false;

/**
 * Initializes mobile menu functionality
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  if (!menuToggle || !mobileDrawer || !overlay) {
    return false;
  }

  // Prevent duplicate initialization
  if (menuToggle.dataset.initialized === 'true') {
    return true;
  }

  // Track touch start position to distinguish between taps and scrolls
  let touchStartX = 0;
  let touchStartY = 0;
  let touchMoved = false;
  let touchStartTime = 0;

  function openMenu() {
    menuToggle.classList.add('active');
    mobileDrawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Enable pointer events on overlay when menu is open
    overlay.style.pointerEvents = 'auto';
  }

  function closeMenu() {
    menuToggle.classList.remove('active');
    mobileDrawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    // Disable pointer events on overlay when menu is closed
    overlay.style.pointerEvents = 'none';
  }

  function toggleMenu(e) {
    // Don't toggle menu if clicking on story button or process button
    if (e && e.target) {
      const storyBtn = e.target.closest('[data-story-button="true"]');
      const processBtn = e.target.closest('[data-process-button="true"]');
      if (storyBtn || processBtn) {
        return;
      }
    }
    
    // If this was a scroll gesture (touch moved), don't toggle menu
    if (touchMoved) {
      touchMoved = false;
      return;
    }
    
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const isOpen = mobileDrawer.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Only handle events directly on the menu toggle button or its children (spans)
  function isMenuToggleElement(target) {
    if (!target) return false;
    // Check if target is the button itself
    if (target === menuToggle) return true;
    // Check if target is a child of the button (like the spans)
    if (menuToggle.contains(target)) return true;
    // Check if target's closest menu-toggle is our button
    const closestToggle = target.closest('.menu-toggle');
    return closestToggle === menuToggle;
  }

  // Track touch start for menu toggle - ONLY on the button itself
  menuToggle.addEventListener('touchstart', function(e) {
    // Only track if touch starts on the menu toggle button
    const target = e.target || e.touches[0].target;
    if (isMenuToggleElement(target)) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchMoved = false;
      touchStartTime = Date.now();
      e.stopPropagation(); // Prevent event from bubbling
    } else {
      // Reset if touch didn't start on menu toggle
      touchStartTime = 0;
    }
  }, { passive: true });

  menuToggle.addEventListener('touchmove', function(e) {
    // Only process if touch started on menu toggle and we have valid start coordinates
    if (touchStartTime > 0 && e.touches.length > 0) {
      const target = e.target || e.touches[0].target;
      if (isMenuToggleElement(target)) {
        const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
        const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
        // If touch moved more than 10px, it's a scroll, not a tap
        if (deltaX > 10 || deltaY > 10) {
          touchMoved = true;
        }
        e.stopPropagation(); // Prevent event from bubbling
      } else {
        // Touch moved outside menu toggle, treat as scroll
        touchMoved = true;
      }
    }
  }, { passive: true });

  // Handle click event - ONLY on menu toggle button
  menuToggle.addEventListener('click', function(e) {
    // Only handle if click is directly on menu toggle
    if (isMenuToggleElement(e.target)) {
      // Prevent default and stop propagation to avoid conflicts
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      toggleMenu(e);
    }
  }, true); // Use capture phase to handle early

  // Handle touchend - ONLY on menu toggle button
  menuToggle.addEventListener('touchend', function(e) {
    // Only handle if touch ended on menu toggle and wasn't a scroll
    if (isMenuToggleElement(e.target) && touchStartTime > 0 && !touchMoved) {
      const touchDuration = Date.now() - touchStartTime;
      // Only trigger if it was a quick tap (< 500ms)
      if (touchDuration < 500) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu(e);
      }
    }
    // Reset tracking
    touchMoved = false;
    touchStartTime = 0;
  }, { passive: false });
  
  // Overlay should only be clickable when menu is open
  // Use capture phase and check if overlay is active before handling
  overlay.addEventListener('click', function(e) {
    // Only close menu if overlay is active (menu is open)
    if (overlay.classList.contains('active')) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      closeMenu();
    }
  }, true);

  overlay.addEventListener('touchend', function(e) {
    // Only close menu if overlay is active (menu is open)
    if (overlay.classList.contains('active')) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      closeMenu();
    }
  }, { passive: false, capture: true });

  // Close menu when clicking on a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.stopPropagation();
      closeMenu();
    });
  });

  // Initialize overlay as non-interactive when menu is closed
  overlay.style.pointerEvents = 'none';

  // Mark as initialized
  menuToggle.dataset.initialized = 'true';
  return true;
}

/**
 * Initialize card glow effect that follows mouse
 */
function initCardGlow() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    let lastX = '50%';
    let lastY = '50%';
    
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      lastX = x + '%';
      lastY = y + '%';
      
      card.style.setProperty('--mouse-x', lastX);
      card.style.setProperty('--mouse-y', lastY);
    });
    
    card.addEventListener('mouseleave', function() {
      // Keep the last position instead of resetting to prevent blinking
      // The opacity transition will handle the fade out smoothly
      // Don't reset position to avoid the blink effect
    });
  });
}

/**
 * Initialize button water-fill animation
 */
function initButtonWaterFill() {
  const buttons = document.querySelectorAll('.btn-book, .btn-send, .back-button, .back-button-process, #cta-get-started-btn, button[type="submit"], a.btn-book, button:not(.menu-toggle)');
  
  buttons.forEach(button => {
    if (button.classList.contains('menu-toggle')) return;
    
    button.addEventListener('mouseenter', function(e) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Determine fill direction (opposite of cursor entry)
      const width = rect.width;
      const height = rect.height;
      
      let originX, originY;
      
      // Determine horizontal origin (opposite side from cursor)
      if (x < width / 3) {
        originX = '100%'; // Fill from right if cursor entered from left
      } else if (x > (width * 2) / 3) {
        originX = '0%'; // Fill from left if cursor entered from right
      } else {
        originX = x < width / 2 ? '100%' : '0%';
      }
      
      // Determine vertical origin (opposite side from cursor)
      if (y < height / 3) {
        originY = '100%'; // Fill from bottom if cursor entered from top
      } else if (y > (height * 2) / 3) {
        originY = '0%'; // Fill from top if cursor entered from bottom
      } else {
        originY = y < height / 2 ? '100%' : '0%';
      }
      
      button.style.setProperty('--fill-origin-x', originX);
      button.style.setProperty('--fill-origin-y', originY);
    });
  });
}

/**
 * Initialize header cursor glow effect
 */
function initHeaderCursorGlow() {
  const navLinks = document.querySelector('.nav-links');
  
  if (navLinks) {
    // Initialize with no position to avoid center blink
    navLinks.style.setProperty('--cursor-x', '-100px');
    navLinks.style.setProperty('--cursor-y', '-100px');
    
    navLinks.addEventListener('mousemove', function(e) {
      const rect = navLinks.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      navLinks.style.setProperty('--cursor-x', x + 'px');
      navLinks.style.setProperty('--cursor-y', y + 'px');
    });
    
    navLinks.addEventListener('mouseleave', function() {
      // Hide glow when leaving
      navLinks.style.setProperty('--cursor-x', '-100px');
      navLinks.style.setProperty('--cursor-y', '-100px');
    });
    
    // Prevent glow on tab selection/click
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        // Don't show glow on click
        navLinks.style.setProperty('--cursor-x', '-100px');
        navLinks.style.setProperty('--cursor-y', '-100px');
      });
    });
  }
}

/**
 * Initialize all common functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
  // Try to initialize immediately
  initMobileMenu();
  initCardGlow();
  initButtonWaterFill();
  initHeaderCursorGlow();
  
  // Also try after a short delay for dynamically created content
  setTimeout(initMobileMenu, 100);
  setTimeout(initMobileMenu, 500);
  setTimeout(initCardGlow, 100);
  setTimeout(initCardGlow, 500);
  setTimeout(initButtonWaterFill, 100);
  setTimeout(initButtonWaterFill, 500);
  setTimeout(initHeaderCursorGlow, 100);
  setTimeout(initHeaderCursorGlow, 500);
});

