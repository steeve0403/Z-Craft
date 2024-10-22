import React, {forwardRef} from 'react';
import {FieldError} from "react-hook-form";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string | FieldError;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({label, error, value='', ...props}, ref) => {
        const errorMessage = typeof error === 'string' ? error : error?.message;

        return (
            <div className="textarea-wrapper">
                <label className="textarea-label">
                    {label}
                    <textarea
                        ref={ref}
                        className="textarea-field"
                        value={value || ''}
                        {...props} />
                </label>
                {error && <span className="textarea-error">{errorMessage}</span>}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';
