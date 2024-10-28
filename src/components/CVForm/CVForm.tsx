// src/components/CVForm/CVForm.tsx
import React, {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {CVField} from './CVFormFields';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import LanguagesSection from './LanguagesSection';
import GeneralInfoSection from './GeneralInfoSection';
import {CV} from '../../types/cv';
import {Button} from '../ui/Button';

export interface CVFormProps {
    initialData?: CV;
    onSubmit?: (data: CV) => void;
    onChange?: (data: Partial<CV>) => void;
    isEditable?: boolean; // Nouvelle prop pour basculer entre aperçu et édition
}

export const CVForm: React.FC<CVFormProps> = ({initialData, onSubmit, onChange, isEditable = true}) => {
    const methods = useForm<CV>({
        defaultValues: initialData,
    });

    const {watch, reset, handleSubmit} = methods;

    useEffect(() => {
        if (onChange) {
            onChange(watch());
        }
    }, [watch, onChange]);

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={isEditable ? handleSubmit(onSubmit!) : undefined} className="cv-form">
                <div className="cv-form__section">
                    {isEditable ? (
                        <CVField name="title" label="CV Title" rules={{required: 'CV Title is required'}}/>
                    ) : (
                        <p><strong>Title:</strong> {initialData?.title || 'Untitled CV'}</p>
                    )}
                </div>

                <GeneralInfoSection cvId={initialData?.id || ''} isEditable={isEditable}/>
                <ExperienceSection cvId={initialData?.id || ''} isEditable={isEditable}/>
                <EducationSection cvId={initialData?.id || ''} isEditable={isEditable}/>
                <SkillsSection cvId={initialData?.id || ''} isEditable={isEditable}/>
                <LanguagesSection cvId={initialData?.id || ''} isEditable={isEditable}/>

                {isEditable && (
                    <div className="cv-form__actions">
                        <Button type="submit">Save CV</Button>
                        <Button type="button" variant="outline" onClick={() => reset(initialData)}>
                            Reset
                        </Button>
                    </div>
                )}
            </form>
        </FormProvider>
    );
};





