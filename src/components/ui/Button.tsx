import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', fullWidth, children, ...props }, ref) => {
    // px-8 provides the 1.2x bilingual buffer to ensure Spanish text fits comfortably
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded transition-colors duration-200 px-8 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
      primary: "bg-primary text-white hover:opacity-90 focus:ring-primary",
      secondary: "bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:bg-opacity-10 focus:ring-secondary",
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
