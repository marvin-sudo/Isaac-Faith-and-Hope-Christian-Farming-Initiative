import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  target: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  start,
  duration = 5000,
  prefix = '',
  suffix = '',
  separator = ',',
  className = '',
}) => {
  const initialStart = start !== undefined ? start : Math.floor(target / 2);
  const [count, setCount] = useState<number>(initialStart);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if IntersectionObserver is available
    if (typeof IntersectionObserver === 'undefined') {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          const startTime = performance.now();

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic curve: fast at start, gently settling at the end
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(initialStart + (target - initialStart) * easeOutProgress);

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(step);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [target, initialStart, duration]);

  // Format number with thousands separator if needed
  const formatNumber = (num: number) => {
    if (separator) {
      return num.toLocaleString('en-US');
    }
    return num.toString();
  };

  return (
    <span ref={elementRef} className={`tabular-nums inline-block ${className}`}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};
