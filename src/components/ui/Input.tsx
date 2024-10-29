import React, {forwardRef} from 'react';
import {FieldError} from 'react-hook-form';
import {cn} from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string | FieldError;
    list?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({label, error, list, value = '', className, ...props}, ref) => {
        const errorMessage = typeof error === 'string' ? error : error?.message;

        return (
            <div className={cn("input-wrapper", className)}>
                <label className="input-label">
                    {label}
                    <input
                        ref={ref}
                        className={cn("input-field", {'input-field--error': error})}
                        list={list}
                        value={value || ''}
                        {...props}
                    />
                </label>
                {error && <span className="input-error">{errorMessage}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export {Input};