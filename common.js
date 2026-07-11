/**
 * Common utilities and functionality
 * Shared across all pages
 */

/// Initialize PostHog (stubbed in development mode to prevent local event tracking)
const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';

if (isDev) {
  const createMock = (name = 'posthog') => {
    return new Proxy(() => { }, {
      get: (target, prop) => {
        if (prop === 'then') return undefined;
        return createMock(`${name}.${prop}`);
      },
      apply: (target, thisArg, argumentsList) => {
        console.log(`[PostHog Dev] ${name}()`, ...argumentsList);
      }
    });
  };
  window.posthog = createMock();
  posthog.init('phc_mprnqcAsEua9jXB3xZqUyHSbZjtNEDpZnezcuh28HQdA');
} else {
  !function (t, e) { var o, n, p, r; e.__SV || (window.posthog && window.posthog.__loaded) || (window.posthog = e, e._i = [], e.init = function (i, s, a) { function g(t, e) { var o = e.split("."); 2 == o.length && (t = t[o[0]], e = o[1]), t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } } (p = t.createElement("script")).type = "text/javascript", p.crossOrigin = "anonymous", p.async = !0, p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js", (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r); var u = e; for (void 0 !== a ? u = e[a] = [] : a = "posthog", u.people = u.people || [], u.toString = function (t) { var e = "posthog"; return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e }, u.people.toString = function () { return u.toString(1) + ".people (stub)" }, o = "Fi Di init Ji Xi Tr Ki tn Zi capture calculateEventProperties ln register register_once register_for_session unregister unregister_for_session dn getFeatureFlag getFeatureFlagPayload getFeatureFlagResult getAllFeatureFlags isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync cn identify setPersonProperties unsetPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetPersonPropertiesForFlags reset shutdown setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty un sn createPersonProfile setInternalOrTestUser hn Wi pn opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing rn debug Er it getPageViewId captureTraceFeedback captureTraceMetric Ui".split(" "), n = 0; n < o.length; n++)g(u, o[n]); e._i.push([i, s, a]) }, e.__SV = 1) }(document, window.posthog || []);
  posthog.init('phc_mprnqcAsEua9jXB3xZqUyHSbZjtNEDpZnezcuh28HQdA', {
    api_host: 'https://t.innoveloper.com',
    ui_host: 'https://us.posthog.com',
    defaults: '2026-05-30'
  });
}


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
  menuToggle.addEventListener('touchstart', function (e) {
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

  menuToggle.addEventListener('touchmove', function (e) {
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
  menuToggle.addEventListener('click', function (e) {
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
  menuToggle.addEventListener('touchend', function (e) {
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
  overlay.addEventListener('click', function (e) {
    // Only close menu if overlay is active (menu is open)
    if (overlay.classList.contains('active')) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      closeMenu();
    }
  }, true);

  overlay.addEventListener('touchend', function (e) {
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
    link.addEventListener('click', function (e) {
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

    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      lastX = x + '%';
      lastY = y + '%';

      card.style.setProperty('--mouse-x', lastX);
      card.style.setProperty('--mouse-y', lastY);
    });

    card.addEventListener('mouseleave', function () {
      // Keep the last position instead of resetting to prevent blinking
      // The opacity transition will handle the fade out smoothly
      // Don't reset position to avoid the blink effect
    });
  });
}

function initButtonWaterFill() {
  const buttons = document.querySelectorAll('.btn-book, .btn-send, .back-button, .back-button-process, #cta-get-started-btn, button[type="submit"], a.btn-book, button:not(.menu-toggle), #read-story-btn, .btn-hero');

  buttons.forEach(button => {
    if (button.classList.contains('menu-toggle')) return;

    button.addEventListener('mouseenter', function (e) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      button.style.setProperty('--x', x + 'px');
      button.style.setProperty('--y', y + 'px');
    });
  });
}

/**
 * Initialize Header Cursor Glow Effect
 */
function initHeaderCursorGlow() {
  const navLinks = document.querySelector('.nav-links');

  if (navLinks) {
    navLinks.style.setProperty('--cursor-x', '-100px');
    navLinks.style.setProperty('--cursor-y', '-100px');

    navLinks.addEventListener('mousemove', function (e) {
      const rect = navLinks.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      navLinks.style.setProperty('--cursor-x', x + 'px');
      navLinks.style.setProperty('--cursor-y', y + 'px');
    });

    navLinks.addEventListener('mouseleave', function () {
      navLinks.style.setProperty('--cursor-x', '-100px');
      navLinks.style.setProperty('--cursor-y', '-100px');
    });

    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
      item.addEventListener('click', function () {
        navLinks.style.setProperty('--cursor-x', '-100px');
        navLinks.style.setProperty('--cursor-y', '-100px');
      });
    });
  }
}

/**
 * Initialize Full-Screen Countdown Splash Timer until Launch Date (July 12, 2026)
 */
function initLaunchCountdownTimer() {
  // Launch Target Time: July 12, 2026 00:00:00 (GMT+05:30)
  const launchTime = new Date('2026-07-12T00:00:00+05:30').getTime();

  // Developer bypass check: ?bypass=true in URL lets you view the actual pages
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('bypass') === 'true') {
    document.body.classList.add('launch-ready');
    return;
  }

  const now = Date.now();
  if (now >= launchTime) {
    document.body.classList.add('launch-ready');
    return; // Already launched
  }

  // Create styles block
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    html.launch-blocking, html.launch-blocking body {
      overflow: hidden !important;
      height: 100% !important;
    }
    #launch-countdown-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: #030712;
      z-index: 9999999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #ffffff;
    }
    .countdown-grid {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 60px 60px;
      background-position: center center;
      z-index: 1;
    }
    .countdown-aura {
      position: absolute;
      width: 800px;
      height: 800px;
      background: radial-gradient(circle, rgba(48, 92, 222, 0.15) 0%, transparent 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      pointer-events: none;
      filter: blur(40px);
    }
    .countdown-content {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 24px;
      max-width: 600px;
    }
    .countdown-logo {
      margin-bottom: 24px;
      animation: pulseGlow 4s infinite ease-in-out;
    }
    .countdown-title {
      font-size: 32px;
      font-weight: 900;
      letter-spacing: 0.25em;
      margin-bottom: 12px;
      background: linear-gradient(180deg, #ffffff 0%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-transform: uppercase;
    }
    .countdown-subtitle {
      font-size: 14px;
      color: #94a3b8;
      margin-bottom: 48px;
      letter-spacing: 0.1em;
      font-weight: 600;
      text-transform: uppercase;
    }
    .countdown-timer {
      display: flex;
      gap: 16px;
      margin-bottom: 36px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .timer-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 20px;
      padding: 24px;
      min-width: 110px;
      backdrop-filter: blur(16px);
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      transition: transform 0.3s ease;
    }
    .timer-card:hover {
      transform: translateY(-4px);
      border-color: rgba(48, 92, 222, 0.3);
    }
    .timer-card span {
      font-size: 44px;
      font-weight: 800;
      font-family: monospace;
      color: #305CDE;
      line-height: 1;
      margin-bottom: 10px;
      text-shadow: 0 0 16px rgba(48, 92, 222, 0.4);
    }
    .timer-card label {
      font-size: 10px;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.12em;
    }
    .code-terminal {
      width: 100%;
      max-width: 480px;
      background: rgba(13, 18, 29, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(12px);
      margin-bottom: 36px;
      text-align: left;
      font-family: 'Fira Code', 'Courier New', Courier, monospace;
    }
    .terminal-chrome {
      background: rgba(7, 11, 19, 0.95);
      padding: 10px 16px;
      display: flex;
      align-items: center;
      gap: 6px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }
    .chrome-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
    }
    .chrome-dot.red { background: #ff5f56; }
    .chrome-dot.yellow { background: #ffbd2e; }
    .chrome-dot.green { background: #27c93f; }
    .terminal-title {
      font-size: 10px;
      color: #475569;
      margin-left: auto;
      margin-right: auto;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .terminal-body {
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 11px;
      line-height: 1.5;
    }
    .term-line {
      display: block;
    }
    .term-line.comment { color: #475569; }
    .term-line.command { color: #f8fafc; }
    .term-line.command .prompt { color: #305CDE; font-weight: 750; margin-right: 6px; }
    .term-line.success { color: #10b981; }
    .term-line.info { color: #38bdf8; }
    .term-line.warning { color: #fbbf24; }
    .term-line.prompt { color: #f1f5f9; font-weight: 600; }
    .term-line.prompt .cursor {
      display: inline-block;
      width: 7px;
      height: 13px;
      background: #305CDE;
      margin-left: 4px;
      animation: blink 1s infinite steps(2, start);
      vertical-align: middle;
    }
    .countdown-launch-date {
      font-size: 12px;
      color: #475569;
      margin-bottom: 36px;
      font-family: monospace;
      letter-spacing: 0.08em;
    }
    .countdown-socials {
      display: flex;
      gap: 28px;
    }
    .countdown-socials a {
      color: #64748b;
      text-decoration: none;
      font-size: 12px;
      font-weight: 700;
      transition: color 0.3s ease;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .countdown-socials a:hover {
      color: #305CDE;
    }
    @keyframes pulseGlow {
      0%, 100% {
        transform: scale(1);
        filter: drop-shadow(0 0 10px rgba(48, 92, 222, 0.1));
      }
      50% {
        transform: scale(1.03);
        filter: drop-shadow(0 0 25px rgba(48, 92, 222, 0.35));
      }
    }
    @keyframes blink {
      to { visibility: hidden; }
    }
    @media (max-width: 600px) {
      .timer-card {
        min-width: 85px;
        padding: 16px;
      }
      .timer-card span {
        font-size: 32px;
      }
      .countdown-title {
        font-size: 24px;
      }
      .code-terminal {
        max-width: 90%;
      }
    }
  `;
  document.head.appendChild(styleEl);

  // Create overlay container
  const overlay = document.createElement('div');
  overlay.id = 'launch-countdown-overlay';
  overlay.innerHTML = `
    <div class="countdown-grid"></div>
    <div class="countdown-aura"></div>
    <div class="countdown-content">
      <div class="countdown-logo">
        <svg class="w-20 h-20" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M688.978 582.268H547.555L688.978 440.902L618.343 370.295L618.272 370.366L476.887 229.037H618.235L618.272 229L688.907 299.606L688.978 299.535L830.4 440.902L688.978 582.268Z" fill="#305CDE"/>
          <path d="M335.422 440.902L476.845 440.902L335.422 582.268L406.057 652.875L406.128 652.804L547.513 794.133H406.165L406.128 794.17L335.493 723.563L335.422 723.634L194 582.268L335.422 440.902Z" fill="#305CDE"/>
          <path d="M441.488 652.951L370.777 582.268L582.911 370.218L653.622 440.901L441.488 652.951Z" fill="#002060"/>
          <path d="M741.602 352.336L670.891 423.02L600.18 352.336L670.891 281.653L741.602 352.336Z" fill="#002060"/>
        </svg>
      </div>
      <h1 class="countdown-title">Innoveloper</h1>
      <p class="countdown-subtitle">High-Velocity Software Engineering</p>
      
      <div class="countdown-timer">
        <div class="timer-card">
          <span id="countdown-days">00</span>
          <label>Days</label>
        </div>
        <div class="timer-card">
          <span id="countdown-hours">00</span>
          <label>Hours</label>
        </div>
        <div class="timer-card">
          <span id="countdown-minutes">00</span>
          <label>Minutes</label>
        </div>
        <div class="timer-card">
          <span id="countdown-seconds">00</span>
          <label>Seconds</label>
        </div>
      </div>
      
      <div class="code-terminal">
        <div class="terminal-chrome">
          <span class="chrome-dot red"></span>
          <span class="chrome-dot yellow"></span>
          <span class="chrome-dot green"></span>
          <span class="terminal-title">bash - innoveloper.sh</span>
        </div>
        <div class="terminal-body" id="countdown-terminal-body">
          <!-- Live printed logs -->
        </div>
      </div>
      
      <div class="countdown-launch-date">TARGETING OFFICIAL LAUNCH: JULY 12, 2026 (GMT+5:30)</div>
      
      <div class="countdown-socials">
        <a href="https://www.linkedin.com/company/innoveloper" target="_blank">LinkedIn</a>
        <a href="https://www.instagram.com/innoveloper/" target="_blank">Instagram</a>
        <a href="https://www.youtube.com/@Innoveloper" target="_blank">YouTube</a>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  document.body.classList.add('launch-ready');
  document.documentElement.classList.add('launch-blocking');

  // Setup simulated IT terminal live logs
  const terminalLines = [
    { type: 'comment', text: '// Initializing high-velocity dev environment...' },
    { type: 'command', text: 'npm run build:innoveloper' },
    { type: 'success', text: '✓ 142 UI design tokens compiled successfully' },
    { type: 'info', text: 'ℹ Optimizing cross-platform compilation speeds' },
    { type: 'info', text: 'ℹ Human engineering matched with AI workflow tools' },
    { type: 'warning', text: '⚠ Bypassing corporate PowerPoint presentations... Done' },
    { type: 'prompt', text: 'Innoveloper Engine: READY_TO_LAUNCH' }
  ];

  const termBody = document.getElementById('countdown-terminal-body');
  let heartbeatInterval = null;

  if (termBody) {
    let lineIdx = 0;

    function printNextLine() {
      if (lineIdx >= terminalLines.length) {
        startTerminalHeartbeat();
        return;
      }

      const line = terminalLines[lineIdx];
      const el = document.createElement('span');
      el.className = `term-line ${line.type}`;

      if (line.type === 'command') {
        el.innerHTML = `<span class="prompt">$</span>${line.text}`;
      } else if (line.type === 'prompt') {
        el.innerHTML = `${line.text}<span class="cursor"></span>`;
      } else {
        el.innerText = line.text;
      }

      termBody.appendChild(el);
      lineIdx++;

      let delay = 500;
      if (line.type === 'command') delay = 900;
      setTimeout(printNextLine, delay);
    }

    function startTerminalHeartbeat() {
      const heartbeats = [
        () => `ℹ [system] CPU usage: ${(Math.random() * 15 + 5).toFixed(1)}% | RAM: ${(Math.random() * 2 + 3).toFixed(2)}GB`,
        () => `ℹ [engine] Active connection pipelines: OK`,
        () => `✓ [sync] Design tokens match validated`,
        () => `ℹ [speed] Current benchmark factor: ${(Math.random() * 0.2 + 2.3).toFixed(2)}x standard agency speed`
      ];

      heartbeatInterval = setInterval(() => {
        // Keep terminal body clean: max 8 lines total including prompt
        while (termBody.children.length >= 8) {
          termBody.removeChild(termBody.firstElementChild);
        }

        const textFn = heartbeats[Math.floor(Math.random() * heartbeats.length)];
        const text = textFn();
        const type = text.startsWith('✓') ? 'success' : 'info';

        const el = document.createElement('span');
        el.className = `term-line ${type}`;
        el.innerText = text;

        // Find existing prompt element and insert the new log line right before it
        const promptEl = termBody.querySelector('.term-line.prompt');
        if (promptEl) {
          termBody.insertBefore(el, promptEl);
        } else {
          termBody.appendChild(el);
        }
      }, 4000);
    }

    setTimeout(printNextLine, 800);
  }

  // Update loop
  function updateTimer() {
    const now = Date.now();
    const distance = launchTime - now;

    if (distance < 0) {
      clearInterval(timerInterval);
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      overlay.remove();
      document.body.style.overflow = '';
      document.documentElement.classList.remove('launch-blocking');
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown-days').innerText = String(days).padStart(2, '0');
    document.getElementById('countdown-hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('countdown-minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('countdown-seconds').innerText = String(seconds).padStart(2, '0');
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

/**
 * Dynamically updates page SEO, Open Graph, and Twitter metadata during the pre-launch phase
 */
function initDynamicSEO() {
  const launchTime = new Date('2026-07-12T00:00:00+05:30').getTime();
  const now = Date.now();

  if (now >= launchTime) {
    return; // Already launched - leave permanent business tags as defined in HTML files
  }

  // 1. Dynamic Title Tag Update
  document.title = `LAUNCHING JULY 12 | Innoveloper | High-Velocity Software Engineering`;

  // 2. Dynamic Description Update
  let descMeta = document.querySelector('meta[name="description"]');
  const launchDescription = "The new home for high-velocity software engineering drops on July 12, 2026. Zero bloated dev cycles. Pure engineering speed. Follow our live countdown.";
  if (descMeta) {
    descMeta.setAttribute('content', launchDescription);
  } else {
    descMeta = document.createElement('meta');
    descMeta.setAttribute('name', 'description');
    descMeta.setAttribute('content', launchDescription);
    document.head.appendChild(descMeta);
  }

  // Helper function to set or create meta elements
  function setMetaProperty(name, content, isProperty = false) {
    const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let el = document.querySelector(selector);
    if (el) {
      el.setAttribute('content', content);
    } else {
      el = document.createElement('meta');
      if (isProperty) {
        el.setAttribute('property', name);
      } else {
        el.setAttribute('name', name);
      }
      el.setAttribute('content', content);
      document.head.appendChild(el);
    }
  }

  // 3. Open Graph (OG) Social Tags
  setMetaProperty('og:title', 'Innoveloper — Official Launch July 12, 2026', true);
  setMetaProperty('og:description', 'We are re-engineering how digital products get built. See the countdown timer and explore our services live on July 12.', true);

  // 4. Twitter Card Social Tags
  setMetaProperty('twitter:card', 'summary_large_image');
  setMetaProperty('twitter:title', 'Innoveloper — Official Launch July 12, 2026');
  setMetaProperty('twitter:description', 'We are re-engineering how digital products get built. See the countdown timer and explore our services live on July 12.');
}

/**
 * Custom Scrollbar Functionality (Trackless, scroll/hover visible, draggable)
 */
function initCustomScrollbar() {
  // Create Scrollbar Elements
  const scrollContainer = document.createElement('div');
  scrollContainer.className = 'custom-scrollbar-container';

  const scrollThumb = document.createElement('div');
  scrollThumb.className = 'custom-scrollbar-thumb';

  scrollContainer.appendChild(scrollThumb);
  document.body.appendChild(scrollContainer);

  let scrollTimeout;
  let isDragging = false;
  let startY = 0;
  let startScrollTop = 0;

  // Function to update thumb height and position
  function updateScrollbar() {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Hide scrollbar if content is shorter than viewport
    if (scrollHeight <= clientHeight) {
      scrollContainer.style.display = 'none';
      return;
    } else {
      scrollContainer.style.display = 'block';
    }

    const scrollPercent = scrollTop / (scrollHeight - clientHeight);
    const thumbHeight = Math.max(40, (clientHeight / scrollHeight) * clientHeight);
    const maxTop = clientHeight - thumbHeight;
    const thumbTop = scrollPercent * maxTop;

    scrollThumb.style.height = `${thumbHeight}px`;
    scrollThumb.style.transform = `translateY(${thumbTop}px)`;
  }

  // Show thumb on scroll and fade out after scrolling stops
  function triggerScrollVisibility() {
    scrollContainer.classList.add('scrolling');
    clearTimeout(scrollTimeout);

    if (!isDragging) {
      scrollTimeout = setTimeout(() => {
        scrollContainer.classList.remove('scrolling');
      }, 1000); // Fades out after 1 second of inactivity
    }
  }

  window.addEventListener('scroll', () => {
    updateScrollbar();
    triggerScrollVisibility();
  }, { passive: true });

  window.addEventListener('resize', updateScrollbar);

  // Implement Dragging Feature
  scrollThumb.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
    startScrollTop = window.scrollY;

    document.body.classList.add('scrollbar-select-none');
    scrollContainer.classList.add('scrolling');

    e.preventDefault(); // Prevents selection/focus behavior
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const deltaY = e.clientY - startY;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const thumbHeight = scrollThumb.offsetHeight;
    const maxTop = clientHeight - thumbHeight;

    const scrollRange = scrollHeight - clientHeight;
    const scrollDelta = (deltaY / maxTop) * scrollRange;

    window.scrollTo(0, startScrollTop + scrollDelta);
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      document.body.classList.remove('scrollbar-select-none');
      triggerScrollVisibility(); // re-evaluates scroll timeout
    }
  });

  // Initial setup
  updateScrollbar();

  // Re-run setup using ResizeObserver to handle dynamic content loads and page size changes
  if (window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(() => {
      updateScrollbar();
    });
    resizeObserver.observe(document.body);
  } else {
    // Fallback for browsers without ResizeObserver
    setTimeout(updateScrollbar, 500);
    window.addEventListener('load', updateScrollbar);
  }
}

/**
 * Initialize all common functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function () {
  // Check launch countdown overlay
  initLaunchCountdownTimer();

  // Apply dynamic SEO parameters for pre-launch phase
  initDynamicSEO();

  // Initialize custom scrollbar
  initCustomScrollbar();

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


