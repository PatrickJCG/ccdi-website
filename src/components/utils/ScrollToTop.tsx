import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop ensures that:
 * 1. When switching routes without a hash (e.g. / to /solutions), the viewport scrolls to top (0,0).
 * 2. When clicking a hash link (e.g. #about, #contact), the viewport smoothly scrolls to that element with a offset for the sticky navbar.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const timer = setTimeout(() => {
          const offset = 72; // Navbar height offset
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const offsetPosition = elementRect - bodyRect - offset;
          window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      // Direct user to the top of the page on route transition
      window.scrollTo({ top: 0, behavior: 'instant' });
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);

  return null;
};
