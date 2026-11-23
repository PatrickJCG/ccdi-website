import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop ensures that:
 * 1. When switching routes without a hash (e.g. / to /solutions), the viewport scrolls to top (0,0).
 * 2. When navigating to a hash link (e.g. /#about, /#contact), the viewport smoothly scrolls to that
 *    element with an offset for the sticky navbar, retrying briefly while lazy-loaded route chunks mount.
 */
export const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      let cancelled = false;
      let attempts = 0;
      const maxAttempts = 40;
      let pollTimer: ReturnType<typeof setTimeout> | undefined;
      let scrollTimer: ReturnType<typeof setTimeout> | undefined;

      const tryScroll = () => {
        if (cancelled) return;
        const element = document.getElementById(targetId);
        if (element) {
          scrollTimer = setTimeout(() => {
            if (cancelled) return;
            const el = document.getElementById(targetId);
            if (!el) return;
            const offset = 72; // Navbar height offset
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const offsetPosition = elementRect - bodyRect - offset;
            window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
          }, 100);
          return;
        }

        attempts += 1;
        if (attempts < maxAttempts) {
          pollTimer = setTimeout(tryScroll, 50);
        }
      };

      tryScroll();

      return () => {
        cancelled = true;
        if (pollTimer) clearTimeout(pollTimer);
        if (scrollTimer) clearTimeout(scrollTimer);
      };
    } else {
      // Direct user to the top of the page on route transition
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash, key]);

  return null;
};
