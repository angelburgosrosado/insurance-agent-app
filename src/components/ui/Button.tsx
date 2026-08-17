import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg' | string;
  fullWidth?: boolean;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size, fullWidth, children, asChild, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded transition-colors duration-200 px-6 py-2.5 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
      primary: "bg-primary text-white hover:opacity-90 focus:ring-primary",
      secondary: "bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:bg-opacity-10 focus:ring-secondary",
      outline: "bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-400",
    };
    
    const widthClass = fullWidth ? "w-full" : "";
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
