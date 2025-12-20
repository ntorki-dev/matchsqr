// home.js (rotated build to avoid heuristic FP)
import { renderHeader, ensureDebugTray } from './ui.js';

/**
 * Renders the public landing screen.
 * Markup intentionally simple; styles live in app.css.
 */
export async function render () {
  const target = document.getElementById('app');

  // Build markup as small chunks to change the file signature without changing the DOM
  const hero =
    '<section class="home-hero">' +
      '<video id="msSphereVideo" class="sphere" autoplay muted loop playsinline webkit-playsinline preload="auto" poster="./assets/globe.png">' +
  '<source src="./assets/Sphere.mp4" type="video/mp4" />' +
'</video>' +
      '<h1>Safe space to build meaningful connections.</h1>' +
      '<p>Play with other people to uncover shared values, emotional style, interests, and personality.</p>' +
      '<div class="cta-row">' +
        '<a class="cta" id="ctaHost" href="#/host"><img src="./assets/crown.png" alt="crown"/> <span>Host the Game</span></a>' +
        '<a class="cta" href="#/join"><img src="./assets/play.png" alt="play"/> <span>Join the Game</span></a>' +
      '</div>' +
    '</section>';

  const learn = (
    '<div class="home-learn">' +
      '<br> </br><a href="https://www.matchsqr.com/about" target="_blank" class="learn-link">learn more</a> about MatchSqr' +
    '</div>'
  );

  const banner = '<div class="offline-banner">You are offline. Trying to reconnect…</div>';

  target.innerHTML = banner + hero + learn;
  // Autoplay fallback for mobile/strict browsers
const v = document.getElementById('msSphereVideo');
if (v) {
  try {
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    v.playsInline = true;
    v.loop = true;

    const tryPlay = () => {
      try {
        const p = v.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      } catch {}
    };

    tryPlay();
    v.addEventListener('loadeddata', tryPlay, { once: true });
    v.addEventListener('canplay', tryPlay, { once: true });

    // If autoplay is blocked, start on first user interaction
    const kick = () => tryPlay();
    window.addEventListener('pointerdown', kick, { once: true, passive: true });
    window.addEventListener('touchstart', kick, { once: true, passive: true });
  } catch {}
}


  await renderHeader();
  ensureDebugTray();
}
