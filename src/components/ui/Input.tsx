import React from 'react';
import {FieldError} from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string | FieldError;
    list?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, list, ...props }) => {
    const errorMessage = typeof error === 'string' ? error : error?.message;

    return (
        <div className="input-wrapper">
            <label className="input-label">{label}</label>
            <input className={`input ${errorMessage ? 'input--error' : ''}`} list={list} {...props} />
            {error && <span className="input-error">{errorMessage}</span>}
        </div>
    );
};
