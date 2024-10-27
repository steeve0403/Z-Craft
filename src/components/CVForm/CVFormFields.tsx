import {Controller, FieldError, RegisterOptions, useFormContext} from 'react-hook-form';
import {Input} from '../ui/Input';
import {Textarea} from '../ui/Textarea';
import React from 'react';

interface FieldProps {
    name: string;
    label: string;
    type?: 'text' | 'date';
    rules?: RegisterOptions;
    component?: 'input' | 'textarea';
    list?: string;
}

export const CVField: React.FC<FieldProps> = ({name, label, type = 'text', rules = {}, component = 'input', list}) => {
    const {control, formState: {errors}} = useFormContext();
    const error = errors[name] as FieldError | undefined;

    const Component = component === 'input' ? Input : Textarea;

    return (
        <div className="cv-form__field">
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({field}) => (
                    <Component
                        label={label}
                        type={type}
                        list={list}
                        {...field}
                        error={error}
                    />
                )}
            />
        </div>
    );
};

