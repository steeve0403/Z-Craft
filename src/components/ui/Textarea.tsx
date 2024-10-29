import React, {forwardRef} from 'react';
import {FieldError} from 'react-hook-form';
import {cn} from '../../utils/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string | FieldError;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({label, error, value = '', className, ...props}, ref) => {
        const errorMessage = typeof error === 'string' ? error : error?.message;

        return (
            <div className={cn("textarea-wrapper", className)}>
                <label className="textarea-label">
                    {label}
                    <textarea
                        ref={ref}
                        className={cn("textarea-field", {'textarea-field--error': error})}
                        value={value || ''}
                        {...props}
                    />
                </label>
                {error && <span className="textarea-error">{errorMessage}</span>}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export {Textarea};