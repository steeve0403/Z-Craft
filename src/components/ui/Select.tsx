import React, {forwardRef} from 'react';
import {FieldError} from 'react-hook-form';
import {cn} from '../../utils/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string | FieldError;
    options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({label, error, options, className, ...props}, ref) => {
        const errorMessage = typeof error === 'string' ? error : error?.message;

        return (
            <div className={cn("select-wrapper", className)}>
                <label className="select-label">
                    {label}
                    <select ref={ref} className={cn("select-field", {'select-field--error': error})} {...props}>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                {error && <span className="select-error">{errorMessage}</span>}
            </div>
        );
    }
);

Select.displayName = 'Select';

export {Select};
