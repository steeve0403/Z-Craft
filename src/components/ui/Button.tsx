import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    as?: React.ElementType;
    to?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                className={cn(
                    'button',
                    `button--${variant}`,
                    `button--${size}`,
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button };
