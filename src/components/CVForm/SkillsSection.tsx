import React from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import { CVInputField } from './CVFormFields';
import { PlusCircle, MinusCircle } from 'lucide-react';
import {Button} from "../ui/Button.tsx";

const SkillsSection: React.FC = () => {
    const { control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'skills',
    });

    return (
        <div className="cv-form__section">
            <h3>Skills</h3>
            {fields.map((_item, index) => (
                <div key={index} className="cv-form__item">
                    <CVInputField name={`skills.${index}`} label="Skill" />
                    <Button onClick={() => remove(index)} type="button" variant="outline">
                        <MinusCircle /> Remove
                    </Button>
                </div>
            ))}
            <Button onClick={() => append('')} type="button">
                <PlusCircle /> Add Skill
            </Button>
        </div>
    );
};

export default SkillsSection;

