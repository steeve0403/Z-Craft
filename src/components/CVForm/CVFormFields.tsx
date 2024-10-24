import {Controller, FieldError, RegisterOptions, useFormContext} from 'react-hook-form';
import {Input} from "../ui/Input.tsx";
import {Textarea} from "../ui/Textarea.tsx";
import React from "react";

export const CVInputField: React.FC<{ name: string; label: string; type?: string; rules?: RegisterOptions; list?: string }> = ({ name, label, type = 'text', rules = {}, list }) => {
    const { control, formState: { errors } } = useFormContext();
    const error = errors[name] as FieldError | undefined;


    return (
        <div className="cv-form__field">
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field}) => (
                    <Input
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

export const CVTextareaField: React.FC<{ name: string; label: string; rules?: RegisterOptions }> = ({ name, label, rules = {} }) => {
    const { control, formState: { errors } } = useFormContext();
    const error = errors[name] as FieldError | undefined;


    return (
        <div className="cv-form__field">
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Textarea
                        label={label}
                        {...field}
                        error={error}
                    />
                )}
            />
        </div>
    );
};

export const CVDateField: React.FC<{ name: string; label: string; rules?: RegisterOptions }> = ({ name, label, rules = {} }) => {
    const { control, formState: { errors } } = useFormContext();
    const error = errors[name] as FieldError | undefined;


    return (
        <div className="cv-form__field">
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Input
                        label={label}
                        type="date"
                        {...field}
                        error={error}
                    />
                )}
            />
        </div>
    );
};
