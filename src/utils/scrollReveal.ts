/**
 * Premium Scroll-Reveal Animation Engine
 * Automatically observes elements with .reveal-init, .reveal-image, .reveal-left, .reveal-right
 * and adds .reveal-visible when scrolled into view.
 */

export function initScrollReveal(): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const selector = '.reveal-init, .reveal-image, .reveal-left, .reveal-right, [data-reveal]';

  // If user prefers reduced motion or IntersectionObserver is not supported, reveal all immediately
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => el.classList.add('reveal-visible'));
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    }
  );

  const observeElements = () => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      // If already visible, don't observe again
      if (!el.classList.contains('reveal-visible')) {
        observer.observe(el);
      }
    });
  };

  // Run on initial call
  observeElements();

  // Also check after a brief tick to catch newly mounted DOM trees
  const timer = setTimeout(observeElements, 100);

  // MutationObserver to catch dynamically rendered elements
  let mutationObserver: MutationObserver | null = null;
  if ('MutationObserver' in window) {
    mutationObserver = new MutationObserver(() => {
      observeElements();
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Cleanup handler
  return () => {
    clearTimeout(timer);
    observer.disconnect();
    if (mutationObserver) {
      mutationObserver.disconnect();
    }
  };
}
