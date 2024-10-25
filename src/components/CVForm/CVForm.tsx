import React, {useEffect, useRef} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {CVInputField} from './CVFormFields';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import LanguagesSection from './LanguagesSection';
import {CV} from '../../types/cv';
import {Button} from '../ui/Button';
import GeneralInfoSection from "./GeneralInfoSection.tsx";

export interface CVFormProps {
    initialData?: CV;
    onSubmit: (data: CV) => void;
    onChange: (data: Partial<CV>) => void;
}

export const CVForm: React.FC<CVFormProps> = ({initialData, onSubmit, onChange}) => {
    const methods = useForm<CV>({defaultValues: initialData});
    const watchedFields = methods.watch();
    const prevWatchedFields = useRef<Partial<CV> | undefined>(watchedFields);
    const cvId = initialData?.id || ''; // Définir cvId de manière dynamique

    // Synchroniser les changements dans le formulaire avec onChange
    useEffect(() => {
        if (JSON.stringify(prevWatchedFields.current) !== JSON.stringify(watchedFields)) {
            onChange(watchedFields);
            prevWatchedFields.current = watchedFields;
        }
    }, [watchedFields, onChange]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="cv-form">
                <div className="cv-form__section">
                    <CVInputField name="generalInfo.title" label="CV Title" rules={{required: 'CV Title is required'}}/>
                    <CVInputField name="generalInfo.fullName" label="Full Name" rules={{
                        required: 'Full name is required',
                        minLength: {value: 2, message: 'Minimum 2 characters required'}
                    }}/>
                </div>

                {/* Charger chaque section seulement si cvId est valide */}
                {cvId && (
                    <>
                        <GeneralInfoSection cvId={cvId}/>
                        <ExperienceSection cvId={cvId}/>
                        <EducationSection cvId={cvId}/>
                        <SkillsSection cvId={cvId}/>
                        <LanguagesSection cvId={cvId}/>
                    </>
                )}

                <div className="cv-form__actions">
                    <Button type="submit">Save CV</Button>
                </div>
            </form>
        </FormProvider>
    );
};


