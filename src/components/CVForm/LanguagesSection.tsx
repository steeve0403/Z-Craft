import React from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import { CVInputField } from './CVFormFields';
import { PlusCircle, MinusCircle } from 'lucide-react';
import {Button} from "../ui/Button.tsx";

const LanguagesSection: React.FC = () => {
    const { control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'languages',
    });

    return (
        <div className="cv-form__section">
            <h3>Languages</h3>
            {fields.map((_item, index) => (
                <div key={index} className="cv-form__item">
                    <CVInputField name={`languages.${index}.name`} label="Language" />
                    <CVInputField name={`languages.${index}.proficiency`} label="Proficiency" list="proficiency-options" />
                    <datalist id="proficiency-options">
                        <option value="Beginner" />
                        <option value="Intermediate" />
                        <option value="Advanced" />
                        <option value="Fluent" />
                    </datalist>
                    <Button onClick={() => remove(index)} type="button" variant="outline">
                        <MinusCircle /> Remove
                    </Button>
                </div>
            ))}
            <Button onClick={() => append({ name: '', proficiency: 'Beginner' })} type="button">
                <PlusCircle /> Add Language
            </Button>
        </div>
    );
};

export default LanguagesSection;

