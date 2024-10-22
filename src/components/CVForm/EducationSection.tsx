import React from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import { CVInputField, CVDateField } from './CVFormFields';
import { PlusCircle, MinusCircle } from 'lucide-react';
import {Button} from "../ui/Button.tsx";

const EducationSection: React.FC = () => {
    const { control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'education',
    });

    return (
        <div className="cv-form__section">
            <h3>Education</h3>
            {fields.map((item, index) => (
                <div key={item.id} className="cv-form__item">
                    {/* Utilisation des champs réutilisables */}
                    <CVInputField name={`education.${index}.institution`} label="Institution" />
                    <CVInputField name={`education.${index}.degree`} label="Degree" />
                    <CVInputField name={`education.${index}.field`} label="Field of Study" />
                    <CVDateField name={`education.${index}.graduationDate`} label="Graduation Date" />
                    <Button onClick={() => remove(index)} type="button" variant="outline">
                        <MinusCircle /> Remove
                    </Button>
                </div>
            ))}
            <Button onClick={() => append({ institution: '', degree: '', field: '', graduationDate: '' })} type="button">
                <PlusCircle /> Add Education
            </Button>
        </div>
    );
};

export default EducationSection;

