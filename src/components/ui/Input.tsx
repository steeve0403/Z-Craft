import React, {forwardRef} from 'react';
import {FieldError} from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string | FieldError;
    list?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({label, error, list, value='', ...props}, ref) => {
        const errorMessage = typeof error === 'string' ? error : error?.message;

        return (
            <div className="input-wrapper">
                <label className="input-label">
                    {label}
                    <input
                        ref={ref}
                        className={`input ${errorMessage ? 'input--error' : ''}`}
                        list={list}
                        value={value || ''}
                        {...props} />
                </label>
                {error && <span className="input-error">{errorMessage}</span>}
            </div>
        );
    }
);
