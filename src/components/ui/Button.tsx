import React from 'react';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg' | string;
  fullWidth?: boolean;
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size, fullWidth, children, asChild, href, target, rel, onClick, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 px-6 py-2.5 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";
    
    const variants = {
      primary: "bg-primary text-white hover:opacity-90 focus:ring-primary shadow-sm active:scale-[0.99]",
      secondary: "bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-white focus:ring-secondary active:scale-[0.99]",
      outline: "bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-400 active:scale-[0.99]",
    };
    
    const widthClass = fullWidth ? "w-full" : "";
    const combinedClassName = `${baseStyles} ${variants[variant]} ${widthClass} ${className}`;

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href && (href.startsWith("#") || href.startsWith("/#"))) {
        const hashId = href.split("#")[1];
        if (hashId) {
          const el = document.getElementById(hashId);
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState({}, '', href);
          }
        }
      }
      if (onClick) {
        (onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>)(e);
      }
    };

    if (href) {
      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          onClick={handleAnchorClick}
          className={combinedClassName}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
