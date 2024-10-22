import React from 'react';
import {FieldError} from "react-hook-form";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string | FieldError;
}

export const Textarea: React.FC<TextareaProps> = ({label, error, ...props}) => {
    const errorMessage = typeof error === 'string' ? error : error?.message;

    return (
        <div className="textarea-wrapper">
            <label className="textarea-label">{label}</label>
            <textarea className={`textarea ${errorMessage ? 'textarea--error' : ''}`} {...props} />
            {error && <span className="textarea-error">{errorMessage}</span>}
        </div>
    );
};
