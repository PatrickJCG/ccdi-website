import type { NavigateFunction } from 'react-router-dom';

/**
 * Smoothly scrolls to the on-page `#contact` section (offset for sticky headers),
 * or optionally navigates to `/#contact` if the section is not mounted on the current route.
 */
export const scrollToContact = (navigate?: NavigateFunction, offset = 72): void => {
  const el = document.getElementById('contact');
  if (el) {
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    window.scrollTo({ top: Math.max(0, elementRect - bodyRect - offset), behavior: 'smooth' });
  } else if (navigate) {
    navigate('/#contact');
  }
};
