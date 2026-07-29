import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  href,
  className = '',
  ...props
}) => {
  // Base: always include WCAG 2.1 AA focus-visible rings
  const baseStyles = [
    'inline-flex items-center justify-center font-semibold rounded-xl whitespace-nowrap',
    'transition-all duration-300 active:scale-95',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500',
  ].join(' ');

  const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'text-xs px-4   py-2   gap-1.5',
    md: 'text-sm px-6   py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5',
  };

  const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
    // Primary — industrial navy (main CTA)
    primary:   'bg-industrial_blue-700 hover:bg-industrial_blue-800 text-white shadow-md shadow-industrial_blue-700/20 hover:shadow-lg hover:-translate-y-0.5',
    // Secondary — subtle navy fill (card actions)
    secondary: 'bg-slate-50 hover:bg-industrial_blue-700 text-slate-700 hover:text-white border border-slate-200 hover:border-industrial_blue-700 shadow-sm',
    // Outline — transparent bordered (hero secondary)
    outline:   'bg-white hover:bg-slate-100/80 border border-slate-300/80 text-slate-700 hover:text-slate-900 shadow-sm hover:-translate-y-0.5',
    // Ghost — icon-only / minimal
    ghost:     'bg-transparent text-slate-600 hover:text-industrial_blue-700 hover:bg-slate-100/60',
    // Accent — amber/gold for high-conversion placement
    accent:    'bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/25 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-amber-500',
  };

  const combinedClasses = [
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    fullWidth ? 'w-full' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0">
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </span>
  );

  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};
