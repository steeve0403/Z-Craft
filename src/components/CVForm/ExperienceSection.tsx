import { useFieldArray, useFormContext } from 'react-hook-form';
import { CVInputField, CVTextareaField, CVDateField } from './CVFormFields';
import { PlusCircle, MinusCircle } from 'lucide-react';
import {Button} from "../ui/Button.tsx";

const ExperienceSection = () => {
    const { control } = useFormContext(); // Utilisation du contexte react-hook-form
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'experience',
    });

    return (
        <div className="cv-form__section">
            <h3>Work Experience</h3>
            {fields.map((item, index) => (
                <div key={item.id} className="cv-form__item">
                    {/* Utilisation des champs réutilisables */}
                    <CVInputField name={`experience.${index}.company`} label="Company" />
                    <CVInputField name={`experience.${index}.position`} label="Position" />
                    <div className="cv-form__dates">
                        <CVDateField name={`experience.${index}.startDate`} label="Start Date" />
                        <CVDateField name={`experience.${index}.endDate`} label="End Date" />
                    </div>
                    <CVTextareaField name={`experience.${index}.description`} label="Description" />
                    <Button onClick={() => remove(index)} type="button" variant="outline">
                        <MinusCircle /> Remove
                    </Button>
                </div>
            ))}
            <Button onClick={() => append({ id: '', company: '', position: '', startDate: '', endDate: '', description: '' })} type="button">
                <PlusCircle /> Add Experience
            </Button>
        </div>
    );
};

export default ExperienceSection;

