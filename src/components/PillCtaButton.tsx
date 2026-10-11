import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface PillCtaButtonProps {
  /** Text or label inside the button (e.g. "Explore More") */
  label?: string;
  children?: React.ReactNode;
  /** Navigation destination if used as a link */
  href?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /** Additional styling overrides or utility classes */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Optional custom icon to replace the default right arrow */
  icon?: React.ReactNode;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  /** Accessibility title / label */
  ariaLabel?: string;
  /** Target attribute if link */
  target?: string;
  /** Rel attribute if link */
  rel?: string;
}

/**
 * Reusable "Pill-Style" CTA Button with embedded circular icon badge.
 * 
 * Design Specifications:
 * - Shape: Fully rounded horizontal capsule/pill (`border-radius: 9999px` / `rounded-full`)
 * - Primary Background: Soft light yellow (`#FEF08A` / `#FFF3B0`)
 * - Text & Icon Badge Background: Dark teal / dark forest green (`#064E3B` / `#0F382C`)
 * - Icon Color: Light yellow / white contrast (`#FEF08A` / `#FFFFFF`)
 * - Interactive States: Smooth hover scale, badge color/scale shift, active press feedback
 */
export const PillCtaButton: React.FC<PillCtaButtonProps> = ({
  label = 'Explore More',
  children,
  href,
  onClick,
  className = '',
  size = 'md',
  icon,
  type = 'button',
  ariaLabel,
  target,
  rel,
}) => {
  // Size configurations for pill padding, typography, and embedded circular badge dimensions
  const sizeStyles = {
    sm: {
      container: 'pl-3.5 pr-1.5 py-1 text-xs gap-2',
      badge: 'w-5 h-5 text-xs',
      iconSize: 'w-3 h-3',
    },
    md: {
      container: 'pl-5 pr-2 py-2 text-sm gap-3.5',
      badge: 'w-7 h-7 text-sm',
      iconSize: 'w-3.5 h-3.5',
    },
    lg: {
      container: 'pl-6 pr-2.5 py-2.5 text-base gap-4',
      badge: 'w-9 h-9 text-base',
      iconSize: 'w-4 h-4',
    },
  }[size];

  // Base styling for the pill container
  const baseClasses = `
    group
    inline-flex
    items-center
    justify-between
    select-none
    rounded-full
    font-sans
    font-bold
    tracking-tight
    bg-[#FEF08A]
    hover:bg-[#FDE047]
    active:bg-[#FACC15]
    text-[#064E3B]
    shadow-sm
    hover:shadow-md
    hover:-translate-y-0.5
    active:translate-y-0
    active:scale-[0.98]
    transition-all
    duration-200
    ease-out
    cursor-pointer
    no-underline
    outline-none
    focus-visible:ring-2
    focus-visible:ring-[#064E3B]
    focus-visible:ring-offset-2
    ${sizeStyles.container}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Embedded circular icon badge markup
  const renderBadge = () => (
    <span
      className={`
        shrink-0
        flex
        items-center
        justify-center
        rounded-full
        bg-[#064E3B]
        group-hover:bg-[#043327]
        text-[#FEF08A]
        transition-all
        duration-200
        ease-out
        transform
        group-hover:scale-105
        group-active:scale-95
        shadow-xs
        ${sizeStyles.badge}
      `.trim().replace(/\s+/g, ' ')}
      aria-hidden="true"
    >
      {icon ? (
        icon
      ) : (
        <ArrowRight
          className={`
            transition-transform
            duration-200
            ease-out
            group-hover:translate-x-0.5
            ${sizeStyles.iconSize}
          `.trim().replace(/\s+/g, ' ')}
        />
      )}
    </span>
  );

  const content = (
    <>
      <span className="truncate leading-none">
        {children || label}
      </span>
      {renderBadge()}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={baseClasses}
        aria-label={ariaLabel || (typeof children === 'string' ? children : label)}
        target={target}
        rel={target === '_blank' ? rel || 'noopener noreferrer' : rel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel || (typeof children === 'string' ? children : label)}
    >
      {content}
    </button>
  );
};

export default PillCtaButton;
