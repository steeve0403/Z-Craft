import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    as?: React.ElementType;
    to?: string;
    isLoading?: boolean;
    disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading = false, disabled = false, ...props }, ref) => {
        return (
            <button
                className={cn(
                    'button',
                    `button--${variant}`,
                    `button--${size}`,
                    { 'button--loading': isLoading },
                    className
                )}
                ref={ref}
                disabled={isLoading || disabled}
                {...props}
            >
                {isLoading ? <span className="button-spinner" /> : props.children}
            </button>
        );
    }
);

export { Button };
