import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined);
    
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-primary font-semibold text-sm">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`
            w-full px-4 py-2.5 rounded border bg-white text-foreground
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            transition-colors duration-200
            ${error ? 'border-[#ba1a1a] focus:ring-[#ba1a1a]' : 'border-slate-300'}
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="text-[#ba1a1a] text-xs mt-1 font-medium">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
