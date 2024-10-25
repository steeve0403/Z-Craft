import {Controller, FieldError, RegisterOptions, useFormContext} from 'react-hook-form';
import {Input} from "../ui/Input";
import {Textarea} from "../ui/Textarea";
import React from "react";

interface FieldProps {
    name: string;
    label: string;
    rules?: RegisterOptions;
}

export const CVInputField: React.FC<FieldProps & { type?: string; list?: string }> = ({name, label, type = 'text', rules = {}, list,}) => {
    const {control, formState: {errors}} = useFormContext();
    const error = errors[name] as FieldError | undefined;

    return (
        <div className="cv-form__field">
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({field}) => (
                    <Input label={label} type={type} list={list} {...field} error={error}/>
                )}
            />
        </div>
    );
};

export const CVTextareaField: React.FC<FieldProps> = ({name, label, rules = {}}) => {
    const {control, formState: {errors}} = useFormContext();
    const error = errors[name] as FieldError | undefined;

    return (
        <div className="cv-form__field">
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({field}) => <Textarea label={label} {...field} error={error}/>}
            />
        </div>
    );
};

export const CVDateField: React.FC<FieldProps> = ({name, label, rules = {}}) => {
    const {control, formState: {errors}} = useFormContext();
    const error = errors[name] as FieldError | undefined;

    return (
        <div className="cv-form__field">
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({field}) => <Input label={label} type="date" {...field} error={error}/>}
            />
        </div>
    );
};

