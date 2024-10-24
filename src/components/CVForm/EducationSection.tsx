import React, {memo, useCallback, useEffect} from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {CVInputField, CVDateField, CVTextareaField} from './CVFormFields';
import {PlusCircle, MinusCircle} from 'lucide-react';
import {Button} from '../ui/Button';
import {useCVStore} from '../../stores/cvStore';
import {Education} from '../../types/cv';

const EducationSection: React.FC<{ cvId: string }> = memo(({cvId}) => {
    const {control, watch} = useFormContext();
    const {fields, append, remove} = useFieldArray({
        control,
        name: 'education', // Nom du champ à surveiller dans le formulaire
    });

    const {updateEducation, addEducation, removeEducation} = useCVStore();
    const watchedEducation = watch('education') as Education[];


    useEffect(() => {
        if (watchedEducation) {
            watchedEducation.forEach((education: Education) => {
                if (education.id) {
                    updateEducation(cvId, education);
                }
            });
        }
    }, [watchedEducation, cvId, updateEducation]);

    const handleAddEducation = useCallback(() => {
        const newEducation: Education = {
            field: "",
            graduationDate: "",
            institution: "",
            id: Date.now().toString(),
            // school: '',
            degree: '',
            // startDate: '',
            // endDate: '',
            description: ''
        };
        append(newEducation);
        addEducation(cvId, newEducation);
    }, [append, addEducation, cvId]);

    const handleRemoveEducation = useCallback((index: number) => {
        const removedEducation = fields[index];
        remove(index);
        removeEducation(cvId, removedEducation.id);
    }, [fields, remove, removeEducation, cvId]);

    return (
        <div className="cv-form__section">
            <h3>Éducation</h3>
            {fields.map((item, index) => {
                return (

                    <div key={item.id} className="cv-form__item fade-enter fade-enter-active">
                        <CVInputField name={`education.${index}.school`} label="École"/>
                        <CVInputField name={`education.${index}.degree`} label="Diplôme"/>
                        <div className="cv-form__dates">
                            <CVDateField name={`education.${index}.startDate`} label="Date de début"/>
                            <CVDateField name={`education.${index}.endDate`} label="Date de fin"/>
                        </div>
                        <CVTextareaField name={`education.${index}.description`} label="Description"/>
                        <Button onClick={() => handleRemoveEducation(index)} type="button" variant="outline">
                            <MinusCircle/> Supprimer
                        </Button>
                    </div>
                );
            })}
            <Button onClick={handleAddEducation} type="button">
                <PlusCircle/> Ajouter une éducation
            </Button>
        </div>
    );
});

export default EducationSection;


